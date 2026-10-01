import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { STATIC_PROPERTIES } from "./src/propertiesData";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily to avoid crashing on startup if the key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize Gemini client:", err);
      }
    }
  }
  return aiClient;
}

// 1. Static Moroccan Properties Data
const PROPERTIES_DATA = [...STATIC_PROPERTIES];

// In-memory leads & visit requests storage
const activeLeads: any[] = [];

// Helper to simulate booking storage in-memory
const activeBookings: Record<string, any> = {};

// 2. API Routes
app.get("/api/properties", (req, res) => {
  const { city, transactionType, propertyType, minPrice, maxPrice, isNew } = req.query;
  let results = [...PROPERTIES_DATA];

  if (city && city !== "all") {
    results = results.filter(
      p => p.city.toLowerCase() === (city as string).toLowerCase()
    );
  }

  if (transactionType && transactionType !== "all") {
    results = results.filter(
      p => p.transactionType === transactionType
    );
  }

  if (propertyType && propertyType !== "all") {
    results = results.filter(
      p => p.propertyType === propertyType
    );
  }

  if (minPrice) {
    results = results.filter(p => (p.priceDH || p.pricePerNight * 10) >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter(p => (p.priceDH || p.pricePerNight * 10) <= Number(maxPrice));
  }

  if (isNew === "true") {
    results = results.filter(p => p.isNew);
  }

  res.json(results);
});

// Real estate leads, visit requests & callbacks
app.post("/api/leads", (req, res) => {
  const { type, fullName, email, phone, message, propertyId, propertyRef, visitDate, visitTimeSlot, surface, city, neighborhood } = req.body;
  
  if (!fullName || (!email && !phone)) {
    return res.status(400).json({ error: "Nom et contact (email ou téléphone) requis." });
  }

  const lead = {
    id: "LEAD-" + Date.now(),
    type: type || "contact", // "contact" | "visit" | "brochure" | "estimation" | "callback" | "newsletter"
    fullName,
    email,
    phone,
    message,
    propertyId,
    propertyRef,
    visitDate,
    visitTimeSlot,
    surface,
    city,
    neighborhood,
    createdAt: new Date().toISOString(),
    status: "PROCESSED"
  };

  activeLeads.unshift(lead);
  res.json({
    success: true,
    message: "Votre demande a été transmise à notre équipe commerciale prestige. Un conseiller dédié vous recontactera dans les plus brefs délais.",
    lead
  });
});

// Real estate instant estimation engine based on Moroccan market data
app.post("/api/estimate", (req, res) => {
  const { city, neighborhood, propertyType, surface, condition, standing } = req.body;
  const numSurface = Math.max(20, Number(surface) || 100);
  
  // Base price per m² in Moroccan Dirhams (DH)
  let basePricePerM2 = 18000;
  const c = (city || "").toLowerCase();
  const n = (neighborhood || "").toLowerCase();

  if (c.includes("casa")) {
    if (n.includes("anfa") || n.includes("gauthier") || n.includes("racine") || n.includes("triangle")) basePricePerM2 = 28000;
    else if (n.includes("maarif") || n.includes("bourgogne") || n.includes("palm")) basePricePerM2 = 20000;
    else if (n.includes("dar bouazza") || n.includes("tamaris")) basePricePerM2 = 18500;
    else basePricePerM2 = 16500;
  } else if (c.includes("rak") || c.includes("marrakech")) {
    if (n.includes("palmeraie") || n.includes("hivernage")) basePricePerM2 = 26000;
    else if (n.includes("gueliz") || n.includes("medina")) basePricePerM2 = 19500;
    else basePricePerM2 = 15000;
  } else if (c.includes("tanger")) {
    if (n.includes("malabata") || n.includes("vieille montagne") || n.includes("marina")) basePricePerM2 = 23000;
    else basePricePerM2 = 16000;
  } else if (c.includes("rabat")) {
    if (n.includes("souissi") || n.includes("hay riad")) basePricePerM2 = 27000;
    else if (n.includes("agdal")) basePricePerM2 = 21000;
    else basePricePerM2 = 17000;
  }

  // Multipliers
  let standingMult = 1.0;
  if (standing === "luxe") standingMult = 1.35;
  else if (standing === "haut-standing") standingMult = 1.15;

  let conditionMult = 1.0;
  if (condition === "neuf") conditionMult = 1.25;
  else if (condition === "renove") conditionMult = 1.08;

  const estimatedM2 = Math.round(basePricePerM2 * standingMult * conditionMult);
  const medianPrice = Math.round(estimatedM2 * numSurface);
  const lowPrice = Math.round(medianPrice * 0.92);
  const highPrice = Math.round(medianPrice * 1.08);

  const estimatedRentMonthly = Math.round((medianPrice * 0.065) / 12);

  res.json({
    city: city || "Casablanca",
    neighborhood: neighborhood || "Anfa",
    surface: numSurface,
    estimatedPricePerM2: estimatedM2,
    medianPrice,
    lowPrice,
    highPrice,
    estimatedRentMonthly,
    confidenceScore: "95%",
    marketTrend: "+5.1% sur 12 mois au Maroc"
  });
});

// Create new review and dynamically recalculate ratings
app.post("/api/properties/:id/reviews", (req, res) => {
  const { id } = req.params;
  const { author, rating, comment } = req.body;

  if (!author || !rating || !comment) {
    return res.status(400).json({ error: "Required fields (author, rating, comment) are missing." });
  }

  const property = PROPERTIES_DATA.find(p => p.id === id);
  if (!property) {
    return res.status(404).json({ error: "Property not found." });
  }

  const newReview = {
    id: "rev-" + Math.floor(1000 + Math.random() * 9000),
    author,
    rating: Number(rating),
    date: new Date().toISOString().split("T")[0],
    comment: typeof comment === "string" ? { fr: comment, en: comment, ar: comment } : comment
  };

  if (!property.reviews) {
    property.reviews = [];
  }

  property.reviews.unshift(newReview);

  // Dynamically recalculate average rating
  const totalRating = property.reviews.reduce((acc, rev) => acc + rev.rating, 0);
  property.rating = Number((totalRating / property.reviews.length).toFixed(1));

  res.json({
    message: "Review submitted successfully!",
    review: newReview,
    updatedRating: property.rating,
    reviews: property.reviews
  });
});

// Create booking and generate access codes
app.post("/api/booking/create", (req, res) => {
  const { propertyId, guests, checkInDate, checkOutDate, clientName, clientEmail } = req.body;

  if (!propertyId || !clientName || !clientEmail) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const property = PROPERTIES_DATA.find(p => p.id === propertyId);
  if (!property) {
    return res.status(404).json({ error: "Property not found." });
  }

  // Generate mock booking details
  const bookingCode = "DAR-" + Math.floor(100000 + Math.random() * 900000);
  const pinCode = "*" + Math.floor(1000 + Math.random() * 9000) + "#";
  const numNights = Math.max(1, Math.ceil(
    (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24)
  ) || 2);
  const totalPrice = property.pricePerNight * numNights;

  const newBooking = {
    bookingCode,
    propertyId,
    propertyName: property.name,
    city: property.city,
    neighborhood: property.neighborhood,
    clientName,
    clientEmail,
    guests,
    checkInDate,
    checkOutDate,
    totalPrice,
    pinCode,
    status: "CONFIRMED", // CONFIRMED, CHECKED_IN
    checkedInAt: null,
    wifiCode: "Maroc_Aparthotel_5G_Pass:" + property.id.substring(0,4).toUpperCase() + "2026",
    idVerified: false
  };

  activeBookings[bookingCode] = newBooking;

  res.json({
    message: "Booking simulated successfully!",
    booking: newBooking
  });
});

// Self-Check-in engine
app.post("/api/booking/check-in", (req, res) => {
  const { bookingCode, passportNumber, simulateIdUpload } = req.body;

  if (!bookingCode) {
    return res.status(400).json({ error: "Reservation code is required." });
  }

  const booking = activeBookings[bookingCode];
  if (!booking) {
    return res.status(404).json({ error: "Reservation not found. Please try with DAR-123456 or create a booking first." });
  }

  if (booking.status === "CHECKED_IN") {
    return res.json({
      message: "You are already checked in!",
      booking
    });
  }

  // Simulate verification
  booking.idVerified = true;
  booking.status = "CHECKED_IN";
  booking.checkedInAt = new Date().toISOString();

  res.json({
    message: "Self-Check-in complete! Welcome to your home in Morocco.",
    booking
  });
});

// Pre-seeded booking example for quick demonstration
const demoBooking = {
  bookingCode: "DAR-777888",
  propertyId: "dar-essaada",
  propertyName: {
    fr: "Dar Essaada - Maarif",
    en: "Dar Essaada - Maarif",
    ar: "دار السعادة - المعاريف"
  },
  city: "Casablanca",
  neighborhood: "Maarif",
  clientName: "Youssef Alaoui",
  clientEmail: "youssef@example.com",
  guests: 2,
  checkInDate: "2026-07-15",
  checkOutDate: "2026-07-18",
  totalPrice: 225,
  pinCode: "*8439#",
  status: "CONFIRMED",
  checkedInAt: null,
  wifiCode: "Maroc_Aparthotel_5G_Pass:DARE2026",
  idVerified: false
};
activeBookings[demoBooking.bookingCode] = demoBooking;

// 3. Gemini-powered Moroccan Travel & Local Guide Assistant
app.post("/api/assistant", async (req, res) => {
  const { prompt, chatHistory, userCity, userNeighborhood } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // High fidelity offline fallback for real estate advice and concierge
    console.warn("GEMINI_API_KEY is not defined. Falling back to local PropTech AI simulation.");
    
    const pLower = prompt.toLowerCase();
    let reply = "";
    let matchedIds: string[] = [];

    if (pLower.includes("casablanca") || pLower.includes("casa")) {
      if (pLower.includes("neuf") || pLower.includes("mer") || pLower.includes("dar bouazza")) {
        matchedIds.push("residence-vert-marine");
        reply = `✨ **Recommandation Prestige Saham & Numa : Résidence Vert Marine & Spa**\n\nPour votre recherche à Casablanca, nous vous recommandons notre programme emblématique **Vert Marine** à Dar Bouazza / Anfa Coast :\n\n• **Type** : Appartement d'exception 3 chambres (145 m²)\n• **Budget** : À partir de 2 450 000 DH\n• **Atouts** : Vue imprenable sur l'océan, club-house avec spa, double orientation, terrasses suspendues.\n• **Rentabilité estimée** : 7.8% net annuel.`;
      } else if (pLower.includes("penthouse") || pLower.includes("luxe") || pLower.includes("cfc")) {
        matchedIds.push("anfa-club-penthouse");
        reply = `👑 **Recommandation Ultra-Luxe : Penthouse Horizon Casa Anfa (CFC)**\n\n• **Type** : Penthouse suspendu de 240 m² habitables + 95 m² de terrasse\n• **Budget** : 5 400 000 DH\n• **Prestations** : Piscine privative chauffée sans vis-à-vis, ascenseur privatif direct, vue 360° sur Anfa Park et l'océan.`;
      } else {
        matchedIds.push("dar-essaada", "gauthier-loft");
        reply = `🏙️ **Opportunités Immobilières à Casablanca (Maarif & Gauthier)** :\n\n1. **Résidence Dar Essaada (Maarif)** : 2 pièces design, 72 m², idéal pied-à-terre ou investissement locatif meublé (13 500 DH/mois).\n2. **Loft Art-Déco Gauthier** : 110 m², traversant avec terrasse arborée et parquet chêne (16 500 DH/mois).\n\nSouhaitez-vous planifier une visite privée ou recevoir la brochure confidentielle ?`;
      }
    } else if (pLower.includes("marrakech")) {
      matchedIds.push("villa-palmeraie-oasis", "riad-al-amine");
      reply = `🌴 **Sélection d'Exception à Marrakech** :\n\n1. **Domaine des Oliviers (Palmeraie)** : Villa de maître de 580 m² sur parc arboré d'un hectare, piscine lagon 22m, hammam spa (8 750 000 DH).\n2. **Riad Al Amine (Médina)** : Riad traditionnel de 280 m² rénové avec patio zelliges et rooftop vue Atlas (950 DH/nuit ou exploitation maison d'hôtes).`;
    } else if (pLower.includes("tanger")) {
      matchedIds.push("tanger-malabata");
      reply = `🌊 **Opportunité Front de Mer : Malabata Horizon & Marina Bay (Tanger)**\n\n• **Budget** : 2 850 000 DH\n• **Type** : 130 m², 2 chambres, terrasse filante de 35 m²\n• **Situation** : À 2 minutes de la corniche et à 5 minutes de la gare TGV Al Boraq.`;
    } else if (pLower.includes("rabat")) {
      matchedIds.push("rabat-souissi-domaine");
      reply = `🏛️ **Propriété Diplomatique à Rabat Souissi** :\n\n• **Domaine Diplomatique Souissi** : Villa de 650 m² sur parc de 2 200 m², quartier des ambassades, piscine chauffée, sécurité maximale (12 500 000 DH).`;
    } else {
      matchedIds.push("residence-vert-marine", "anfa-club-penthouse", "villa-palmeraie-oasis");
      reply = `Bonjour ! Je suis votre conseiller immobilier augmenté Numa & Saham Prestige.\n\nJe peux vous orienter sur nos **5 pôles d'expertise** au Maroc :\n1. 🏗️ **Commercialisation de Projets Neufs** (Casablanca Anfa Coast, Tanger Baie)\n2. 🔑 **Location Courte Durée & Gestion Hôtelière**\n3. 📋 **Location Longue Durée Résidentielle & Corporate**\n4. 🎨 **Aménagement & Architecture d'Intérieur**\n5. 🤝 **Ventes & Achats de Biens de Prestige**\n\nIndiquez-moi votre ville cible, votre budget en DH ou le type de bien convoité pour une recommandation personnalisée.`;
    }

    return res.json({
      text: reply,
      isDemo: true,
      recommendedPropertyIds: matchedIds
    });
  }

  try {
    const systemInstruction = `
      You are the elite AI Real Estate Advisor and Concierge for "Numa & Saham Prestige", the leading premium PropTech platform in Morocco.
      You represent both architectural excellence (like Saham Immobilier flagship developments: Vert Marine, Casa Anfa) and high-tech digital comfort (Numa smart check-in, 24/7 WhatsApp concierge).
      
      Available portfolio data:
      - "residence-vert-marine" (Casablanca Dar Bouazza, Neuf, 145m², 3 ch, 2 450 000 DH, sea view, spa)
      - "anfa-club-penthouse" (Casablanca Casa Anfa CFC, Penthouse, 240m², 4 ch, 5 400 000 DH, private pool, 360° view)
      - "villa-palmeraie-oasis" (Marrakech Palmeraie, Villa, 580m², 5 ch, 8 750 000 DH, 1 hectare, 22m pool)
      - "riad-al-amine" (Marrakech Medina, Riad, 280m², 4 ch, 950 DH/night, patio zellige, rooftop)
      - "dar-essaada" (Casablanca Maarif, Appt meublé, 72m², 1 ch, 13 500 DH/month)
      - "tanger-malabata" (Tanger Malabata, Neuf vue mer, 130m², 2 ch, 2 850 000 DH)
      - "rabat-souissi-domaine" (Rabat Souissi, Villa ambassade, 650m², 6 ch, 12 500 000 DH)
      - "gauthier-loft" (Casablanca Gauthier, Loft d'architecte, 110m², 2 ch, 16 500 DH/month)
      
      When the user expresses a search criteria (e.g., budget in DH, city, bedrooms, purpose: living or investment), provide refined, professional, and courteous advice in their language (French, English, or Arabic). Mention specific properties from our portfolio and offer to book a private tour or download the brochure.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text,
      isDemo: false
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Failed to fetch response from Gemini. Running in fallback mode.",
      text: "Bienvenue chez Numa & Saham Prestige. Nos conseillers sont à votre disposition pour vous orienter vers nos programmes neufs et biens d'exception à Casablanca, Marrakech, Tanger et Rabat."
    });
  }
});


// Vite middleware setup for Development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Dar & Numa Backend] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
