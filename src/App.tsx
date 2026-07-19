import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Key, CheckCircle, Menu, Globe, Search, Wifi, Tv, Utensils, 
  Smartphone, MessageSquare, MapPin, Calendar, Users, Phone, 
  Shield, Activity, Info, X, ChevronRight, Sparkles, Star, 
  ArrowRight, Lock, Unlock, Send, Settings, Coffee, Heart, Briefcase
} from "lucide-react";
import { DICTIONARY } from "./dictionary";
import { Property, Booking, Language, ChatMessage } from "./types";
import { WeatherWidget } from "./components/WeatherWidget";

export default function App() {
  // Navigation & Locale
  const [activeTab, setActiveTab] = useState<"home" | "properties" | "how-it-works" | "services" | "about" | "assistant" | "member">("home");
  const [language, setLanguage] = useState<Language>("fr");
  const t = DICTIONARY[language];

  // Properties & Search State
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Computed allReviews array sorted by date descending
  const allReviews = properties.flatMap(p => 
    (p.reviews || []).map(r => ({
      ...r,
      propertyName: p.name[language],
      propertyId: p.id,
      propertyObj: p
    }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  const [searchCity, setSearchCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchGuests, setSearchGuests] = useState<number>(1);
  const [searchCheckIn, setSearchCheckIn] = useState<string>("2026-07-15");
  const [searchCheckOut, setSearchCheckOut] = useState<string>("2026-07-18");

  // Premium Dropdown Search Overlay controls
  const [showWhereDropdown, setShowWhereDropdown] = useState<boolean>(false);
  const [showWhenDropdown, setShowWhenDropdown] = useState<boolean>(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState<boolean>(false);

  // Separate guest type counters
  const [guestAdults, setGuestAdults] = useState<number>(1);
  const [guestChildren, setGuestChildren] = useState<number>(0);
  const [guestPets, setGuestPets] = useState<number>(0);

  // Active calendar view state for search overlay
  const [calendarViewMonth, setCalendarViewMonth] = useState<number>(6); // 6 = July (0-indexed offset or literal 7)

  // Advanced filters & sorting state for Destinations tab
  const [filterPriceMax, setFilterPriceMax] = useState<number>(200);
  const [filterAmenities, setFilterAmenities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Booking Modal State (Two-Step checkout & interactive card)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingEmail, setBookingEmail] = useState<string>("");
  const [bookingGuests, setBookingGuests] = useState<number>(2);
  const [bookingCheckIn, setBookingCheckIn] = useState<string>("2026-07-15");
  const [bookingCheckOut, setBookingCheckOut] = useState<string>("2026-07-18");
  const [simulatedBookingResult, setSimulatedBookingResult] = useState<Booking | null>(null);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState<boolean>(false);

  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState<"form" | "payment" | "success">("form");
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // e.g. 0.15 = 15% off
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  // Interactive Payment Credit Card states
  const [cardNo, setCardNo] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [isReviewSubmitting, setIsReviewSubmitting] = useState<boolean>(false);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Digital Check-in Portal Wizard State (Multi-step interactive)
  const [portalBookingCode, setPortalBookingCode] = useState<string>("DAR-777888");
  const [portalPassport, setPortalPassport] = useState<string>("");
  const [portalIdUploaded, setPortalIdUploaded] = useState<boolean>(false);
  const [isCheckinSubmitting, setIsCheckinSubmitting] = useState<boolean>(false);
  const [portalBooking, setPortalBooking] = useState<Booking | null>(null);
  const [portalCheckinSuccess, setPortalCheckinSuccess] = useState<boolean>(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  // Checkin step & scanner simulation
  const [checkinStep, setCheckinStep] = useState<number>(1);
  const [idScanProgress, setIdScanProgress] = useState<number>(0);
  const [isScanningId, setIsScanningId] = useState<boolean>(false);
  const [selfieScanProgress, setSelfieScanProgress] = useState<number>(0);
  const [isScanningSelfie, setIsScanningSelfie] = useState<boolean>(false);
  const [hasSignature, setHasSignature] = useState<boolean>(false);
  const [isKeyGenerating, setIsKeyGenerating] = useState<boolean>(false);
  const [nfcSignalProgress, setNfcSignalProgress] = useState<number>(0);
  const [isNfcPressing, setIsNfcPressing] = useState<boolean>(false);
  const [lockBeepPlayed, setLockBeepPlayed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Keypad Lock Simulator State
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [lockStatus, setLockStatus] = useState<"closed" | "opened" | "error">("closed");

  // AI Concierge Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: language === "fr" 
        ? "Marhaban ! Je suis votre assistant local Dar & Numa. Demandez-moi des recommandations de restaurants à Maarif, des phrases utiles en Darija, ou posez-moi des questions sur le check-in automatique !"
        : language === "en"
        ? "Marhaban! I am your Dar & Numa local assistant. Ask me for restaurant recommendations in Maarif, helpful Darija phrases, or ask questions about self-check-in!"
        : "مرحباً! أنا مساعدكم المحلي لدار ونوما. اسألني عن توصيات المطاعم في المعاريف، أو جمل مفيدة بالدارجة، أو كيف يعمل تسجيل الوصول الذاتي!",
      timestamp: "12:59"
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);


  // Local experiences Booking State
  const [bookedExperience, setBookedExperience] = useState<string | null>(null);

  // Mobile featured properties swipe index state
  const [mobilePropIndex, setMobilePropIndex] = useState<number>(0);

  // Top promo banner state
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);
  // Active city tab for the interactive city map/highlights grid
  const [activeCityLink, setActiveCityLink] = useState<string>("Marrakech");

  // Toggle dynamic document direction for Arabic support
  useEffect(() => {
    const isRtl = language === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [language]);

  // Fetch properties on mount or search changes
  useEffect(() => {
    let url = "/api/properties";
    if (searchCity !== "all") {
      url += `?city=${searchCity}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
      })
      .catch(err => console.error("Error loading properties:", err));
  }, [searchCity]);


  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // Keypad simulation handler
  const handleKeypadPress = (val: string) => {
    if (lockStatus === "opened") return;
    
    if (val === "C") {
      setEnteredPin("");
      setLockStatus("closed");
      return;
    }
    
    if (val === "#") {
      const pinWithHash = enteredPin + "#";
      // Validate code against simulated booking, pre-seeded check-in, or general demo codes
      const matchesDemo = pinWithHash === "*8439#" || pinWithHash === "*7777#";
      const matchesActiveBooking = portalBooking && portalBooking.pinCode === pinWithHash;
      const matchesSimulated = simulatedBookingResult && simulatedBookingResult.pinCode === pinWithHash;

      if (matchesDemo || matchesActiveBooking || matchesSimulated) {
        setLockStatus("opened");
        // Trigger a nice haptic vibe / audio effect simulation
      } else {
        setLockStatus("error");
        setTimeout(() => {
          setLockStatus("closed");
          setEnteredPin("");
        }, 1500);
      }
      return;
    }

    if (enteredPin.length < 8) {
      setEnteredPin(prev => prev + val);
    }
  };

  // HTML5 Canvas Signature Pad Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Submit simulated booking
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setIsBookingSubmitting(true);
    fetch("/api/booking/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: selectedProperty.id,
        guests: bookingGuests,
        checkInDate: bookingCheckIn,
        checkOutDate: bookingCheckOut,
        clientName: bookingName || "Voyageur Dar & Numa",
        clientEmail: bookingEmail || "client@example.com"
      })
    })
      .then(res => res.json())
      .then(data => {
        setSimulatedBookingResult(data.booking);
        // Sync with check-in portal for convenience
        setPortalBookingCode(data.booking.bookingCode);
        setIsBookingSubmitting(false);
      })
      .catch(err => {
        console.error("Booking simulation error:", err);
        setIsBookingSubmitting(false);
      });
  };

  // Submit simulated guest review
  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      setReviewError(language === "fr" ? "Veuillez remplir tous les champs" : "Please fill in all fields");
      return;
    }

    setIsReviewSubmitting(true);
    setReviewError(null);
    setReviewSuccess(null);

    fetch(`/api/properties/${selectedProperty.id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: reviewAuthor.trim(),
        rating: Number(reviewRating),
        comment: reviewComment.trim()
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to submit review");
        return res.json();
      })
      .then(data => {
        setIsReviewSubmitting(false);
        setReviewSuccess(language === "fr" ? "Merci ! Votre avis a été publié avec succès." : "Thank you! Your review was published successfully.");
        setReviewAuthor("");
        setReviewRating(5);
        setReviewComment("");

        // Dynamically update the properties in local state
        setProperties(prev => prev.map(p => {
          if (p.id === selectedProperty.id) {
            return {
              ...p,
              rating: data.updatedRating,
              reviews: data.reviews
            };
          }
          return p;
        }));

        // Dynamically update selectedProperty in real time
        setSelectedProperty(prev => {
          if (!prev) return null;
          return {
            ...prev,
            rating: data.updatedRating,
            reviews: data.reviews
          };
        });
      })
      .catch(err => {
        console.error("Review error:", err);
        setReviewError(err.message);
        setIsReviewSubmitting(false);
      });
  };

  // Submit Self-Check-in
  const handleSelfCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalBookingCode) return;

    setIsCheckinSubmitting(true);
    setPortalError(null);

    fetch("/api/booking/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingCode: portalBookingCode.toUpperCase().trim(),
        passportNumber: portalPassport || "MA992830",
        simulateIdUpload: true
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.error || "Check-in failed"); });
        }
        return res.json();
      })
      .then(data => {
        setPortalBooking(data.booking);
        setPortalCheckinSuccess(true);
        setIsCheckinSubmitting(false);
        // Show success animation or direct user to the smart keypad
      })
      .catch(err => {
        console.error("Check-in error:", err);
        setPortalError(err.message);
        setIsCheckinSubmitting(false);
      });
  };

  // Chat with Gemini Local Assistant
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsgText = userInput;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    // Append user message
    setMessages(prev => [...prev, { sender: "user", text: userMsgText, timestamp }]);
    setUserInput("");
    setIsAiTyping(true);

    fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userMsgText,
        userCity: searchCity === "all" ? "Casablanca" : searchCity,
        userNeighborhood: searchQuery || "Maarif"
      })
    })
      .then(res => res.json())
      .then(data => {
        setIsAiTyping(false);
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: data.text, 
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isDemo: data.isDemo
        }]);
      })
      .catch(err => {
        console.error("Assistant error:", err);
        setIsAiTyping(false);
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: "Désolé, j'ai rencontré un problème de connexion. Assurez-vous d'avoir configuré votre clé API.", 
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
        }]);
      });
  };

  const handlePredefinedAiQuery = (query: string) => {
    setUserInput(query);
  };

  // Advanced Filtered & Sorted Properties List
  const filteredProperties = properties
    .filter(prop => {
      // 1. Text keyword search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = (
          prop.neighborhood.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.seoKeywords.some(keyword => keyword.toLowerCase().includes(query)) ||
          prop.name.fr.toLowerCase().includes(query) ||
          prop.description.fr.toLowerCase().includes(query)
        );
        if (!matchesQuery) return false;
      }

      // 2. Max price filter
      if (prop.pricePerNight > filterPriceMax) {
        return false;
      }

      // 3. Amenities checklist filter (every selected amenity must be present)
      if (filterAmenities.length > 0) {
        const hasAllAmenities = filterAmenities.every(amenity => 
          prop.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 4. Sort logic
      if (sortOption === "price-asc") {
        return a.pricePerNight - b.pricePerNight;
      }
      if (sortOption === "price-desc") {
        return b.pricePerNight - a.pricePerNight;
      }
      if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      // default "recommended" sorts by rating descending, then price
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen bg-bold-bg text-bold-text flex flex-col selection:bg-bold-copper selection:text-white antialiased font-sans">
      
      {/* PROMO BANNER (Numa membership top-bar) */}
      {showPromoBanner && (
        <div className="bg-[#111111] text-[#FACCD1] py-2.5 px-10 text-center text-[11px] sm:text-xs font-semibold relative flex items-center justify-center gap-2 z-50">
          <span className="truncate">
            {language === "fr" 
              ? "Devenez membre de numa gratuitement et bénéficiez de 15% de réduction sur vos futurs séjours !" 
              : language === "en" 
              ? "Become a Numa member for free and get 15% off your future stays!" 
              : "كن عضوًا في نوما مجانًا واحصل على خصم 15٪ على إقاماتك القادمة!"}
          </span>
          <button 
            onClick={() => setActiveTab("member")} 
            className="underline hover:text-white transition-all font-bold shrink-0 ml-1"
          >
            {language === "fr" ? "S'inscrire" : language === "en" ? "Sign up" : "سجل الآن"}
          </button>
          <button 
            onClick={() => setShowPromoBanner(false)} 
            className="absolute right-4 p-1 text-[#FACCD1] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-bold-bg/95 backdrop-blur-md border-b border-stone-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab("home")}>
            <div className="text-3xl font-black tracking-tight text-[#111111] lowercase font-display">
              numa<span className="text-bold-copper font-serif italic font-semibold">.</span>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === "home" ? "bg-numa-pink text-bold-text shadow-sm" : "text-bold-text hover:text-bold-copper"}`}
            >
              {t.navHome}
            </button>
            <button 
              onClick={() => setActiveTab("properties")}
              className={`px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === "properties" ? "bg-numa-pink text-bold-text shadow-sm" : "text-bold-text hover:text-bold-copper"}`}
            >
              {t.navProperties}
            </button>
            <button 
              onClick={() => setActiveTab("how-it-works")}
              className={`px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === "how-it-works" ? "bg-numa-pink text-bold-text shadow-sm" : "text-bold-text hover:text-bold-copper"}`}
            >
              {t.navHowItWorks}
            </button>
            <button 
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === "services" ? "bg-numa-pink text-bold-text shadow-sm" : "text-bold-text hover:text-bold-copper"}`}
            >
              {t.navServices}
            </button>
            <button 
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === "about" ? "bg-numa-pink text-bold-text shadow-sm" : "text-bold-text hover:text-bold-copper"}`}
            >
              {t.navAbout}
            </button>
            <button 
              onClick={() => setActiveTab("assistant")}
              className={`px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all relative ${activeTab === "assistant" ? "bg-numa-pink text-bold-text shadow-sm" : "text-bold-text hover:text-bold-copper"}`}
            >
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-bold-copper animate-pulse" />
                {t.navAssistant}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab("member")}
              className={`ml-2 px-5 py-2.5 border border-bold-text rounded-full font-bold text-[11px] uppercase tracking-widest transition-colors ${activeTab === "member" ? "bg-bold-text text-white" : "text-bold-text hover:bg-bold-text hover:text-white"}`}
            >
              {t.navMember}
            </button>
          </nav>

          {/* Quick Actions (Locale, SEO, Mobile Menu) */}
          <div className="flex items-center gap-3">
            
            {/* Multi-language Selector */}
            <div className="flex items-center bg-transparent rounded-full p-0.5 border border-bold-text/10">
              {(["fr", "en", "ar"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 text-[10px] rounded-full font-bold transition-all uppercase ${language === lang ? "bg-bold-text text-white shadow-sm" : "text-stone-500 hover:text-bold-text"}`}
                >
                  {lang}
                </button>
              ))}
            </div>


          </div>
        </div>
      </header>

      {/* MOBILE NAV RAIL - STICKY AT BOTTOM FOR SMARTPHONE-HEAVY MOROCCAN MARKET */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bold-bg border-t border-stone-300 shadow-xl px-2 py-1.5 flex justify-around items-center">
        <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${activeTab === "home" ? "text-bold-copper" : "text-stone-500"}`}>
          <MapPin className="w-4 h-4 mb-0.5" />
          <span>{t.navHome}</span>
        </button>
        <button onClick={() => setActiveTab("properties")} className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${activeTab === "properties" ? "text-bold-copper" : "text-stone-500"}`}>
          <Search className="w-4 h-4 mb-0.5" />
          <span>{t.navProperties}</span>
        </button>
        <button onClick={() => setActiveTab("about")} className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${activeTab === "about" ? "text-bold-copper" : "text-stone-500"}`}>
          <Globe className="w-4 h-4 mb-0.5" />
          <span>{t.navAbout}</span>
        </button>
        <button onClick={() => setActiveTab("assistant")} className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${activeTab === "assistant" ? "text-bold-copper" : "text-stone-500"}`}>
          <Sparkles className="w-4 h-4 text-bold-copper mb-0.5" />
          <span>Assistant</span>
        </button>
        <button onClick={() => setActiveTab("member")} className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${activeTab === "member" ? "text-bold-copper" : "text-stone-500"}`}>
          <Smartphone className="w-4 h-4 mb-0.5" />
          <span>{t.navMember}</span>
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow pb-24 lg:pb-12">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              
              {/* HERO SECTION */}
              <section className="relative overflow-hidden bg-stone-950 py-32 px-4 sm:px-6 lg:px-8 min-h-[640px] flex items-center justify-center">
                {/* Visual Background image (High-resolution premium lodging theme) */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1800&q=80"
                    alt="Numa premium accommodation"
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#111111]/40 mix-blend-multiply" />
                </div>

                {/* Dark Vignette Overlay for perfect readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-stone-950/50 z-10 pointer-events-none" />

                <div className="max-w-4xl mx-auto w-full text-center relative z-20 space-y-12">
                  <span className="px-4 py-1.5 rounded-full bg-[#FACCD1]/20 border border-[#FACCD1]/40 text-[#FACCD1] text-xs font-bold uppercase tracking-widest inline-block font-sans backdrop-blur-sm">
                    🇲🇦 Marrakech · Casablanca · Rabat · Tanger · Agadir
                  </span>
                  
                  <div className="mt-4 mb-6">
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-none font-black tracking-tight text-white font-display uppercase">
                      WE DO THE ROOM.<br />
                      <span className="text-[#FACCD1] font-serif italic font-semibold tracking-normal normal-case block mt-2">
                        You do the city.
                      </span>
                    </h1>
                    <p className="mt-6 text-sm sm:text-base font-semibold text-stone-200 max-w-xl mx-auto leading-relaxed">
                      {t.tagline}
                    </p>
                  </div>

                  {/* PREMIUM CAPSULE SEARCH BAR (100% Numa Style Interactive Overlay) */}
                  <div className="bg-white rounded-3xl md:rounded-full shadow-2xl p-3 text-bold-text max-w-4xl mx-auto border border-stone-200 mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 relative">
                    
                    {/* Destination Selection with Floating Overlay */}
                    <div className="flex flex-col text-left px-5 py-2.5 md:py-0 w-full md:w-1/4 md:border-r border-stone-100 relative">
                      <button 
                        onClick={() => {
                          setShowWhereDropdown(!showWhereDropdown);
                          setShowWhenDropdown(false);
                          setShowGuestsDropdown(false);
                        }}
                        className="text-left w-full focus:outline-none"
                      >
                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 cursor-pointer block mb-1">
                          Où
                        </label>
                        <div className="flex items-center text-xs font-bold text-stone-800">
                          <MapPin className="w-4 h-4 text-[#C05621] shrink-0 mr-1.5" />
                          <span>
                            {searchCity === "all" ? "Toutes les villes" : searchCity}
                          </span>
                        </div>
                      </button>

                      {/* Floating WHERE Panel */}
                      <AnimatePresence>
                        {showWhereDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 top-[100%] mt-3 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 text-left"
                          >
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">Destinations au Maroc</p>
                            <div className="space-y-2">
                              {[
                                { id: "all", name: "Toutes les villes", desc: "Découvrez toutes nos suites" },
                                { id: "Marrakech", name: "Marrakech", desc: "Médina & Guéliz" },
                                { id: "Casablanca", name: "Casablanca", desc: "Maarif, Gauthier & Anfa" },
                                { id: "Tanger", name: "Tanger", desc: "Bohème & Front de mer" },
                                { id: "Rabat", name: "Rabat", desc: "Résidences calmes & Diplomatique" }
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setSearchCity(item.id);
                                    setShowWhereDropdown(false);
                                  }}
                                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between ${searchCity === item.id ? "bg-[#FACCD1]/20 text-[#C05621]" : "hover:bg-stone-50 text-stone-700"}`}
                                >
                                  <div>
                                    <div className="text-xs font-bold">{item.name}</div>
                                    <div className="text-[10px] text-stone-400">{item.desc}</div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 opacity-50" />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Neighborhood Search Input */}
                    <div className="flex flex-col text-left px-5 py-2.5 md:py-0 w-full md:w-1/4 md:border-r border-stone-100">
                      <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">
                        Quartier
                      </label>
                      <div className="relative flex items-center">
                        <Search className="w-4 h-4 text-stone-400 shrink-0 mr-1.5" />
                        <input 
                          type="text" 
                          placeholder={t.searchPlaceholder}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent border-0 rounded-none py-0.5 text-xs font-bold focus:outline-none text-stone-800 placeholder:text-stone-300"
                        />
                      </div>
                    </div>

                    {/* Check-In Dates with Interactive Calendar Dropdown */}
                    <div className="flex flex-col text-left px-5 py-2.5 md:py-0 w-full md:w-1/4 md:border-r border-stone-100 relative">
                      <button 
                        onClick={() => {
                          setShowWhenDropdown(!showWhenDropdown);
                          setShowWhereDropdown(false);
                          setShowGuestsDropdown(false);
                        }}
                        className="text-left w-full focus:outline-none"
                      >
                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 cursor-pointer block mb-1">
                          Quand
                        </label>
                        <div className="flex items-center text-xs font-bold text-stone-800">
                          <Calendar className="w-4 h-4 text-stone-400 shrink-0 mr-1.5" />
                          <span className="truncate">
                            {searchCheckIn ? `${searchCheckIn} au ${searchCheckOut}` : "Sélectionner dates"}
                          </span>
                        </div>
                      </button>

                      {/* Floating CALENDAR Panel */}
                      <AnimatePresence>
                        {showWhenDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-1/2 -translate-x-1/2 md:-translate-x-1/4 top-[100%] mt-3 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 text-left"
                          >
                            <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
                              <span className="text-xs font-bold text-stone-800">Juillet 2026</span>
                              <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full">Saison haute</span>
                            </div>

                            {/* Calendar Days of Week headers */}
                            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-stone-400 mb-2">
                              <span>Dim</span><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span>
                            </div>

                            {/* July 1st 2026 is a Wednesday, meaning 3 empty blocks in Sunday-indexed list */}
                            <div className="grid grid-cols-7 gap-1">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-8" />
                              ))}
                              
                              {/* July 2026 Days (1 to 31) */}
                              {Array.from({ length: 31 }).map((_, i) => {
                                const dayNum = i + 1;
                                const dayString = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                                const fullDateStr = `2026-07-${dayString}`;
                                
                                const isStart = searchCheckIn === fullDateStr;
                                const isEnd = searchCheckOut === fullDateStr;
                                const isInRange = fullDateStr > searchCheckIn && fullDateStr < searchCheckOut;

                                return (
                                  <button
                                    key={`day-${dayNum}`}
                                    onClick={() => {
                                      if (!searchCheckIn || (searchCheckIn && searchCheckOut)) {
                                        setSearchCheckIn(fullDateStr);
                                        setSearchCheckOut("");
                                      } else if (searchCheckIn && !searchCheckOut) {
                                        if (fullDateStr > searchCheckIn) {
                                          setSearchCheckOut(fullDateStr);
                                          setShowWhenDropdown(false);
                                        } else {
                                          setSearchCheckIn(fullDateStr);
                                        }
                                      }
                                    }}
                                    className={`h-8 w-8 rounded-full text-[11px] font-bold transition-all flex items-center justify-center ${
                                      isStart || isEnd 
                                        ? "bg-bold-text text-white shadow-md scale-105" 
                                        : isInRange 
                                        ? "bg-[#FACCD1]/50 text-bold-text rounded-none" 
                                        : "hover:bg-stone-100 text-stone-700"
                                    }`}
                                  >
                                    {dayNum}
                                  </button>
                                );
                              })}
                            </div>
                            
                            <div className="mt-4 flex items-center justify-between text-[10px] text-stone-400 border-t border-stone-100 pt-3">
                              <span className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-full bg-bold-text inline-block" />
                                Sélectionné
                              </span>
                              <button 
                                onClick={() => {
                                  setSearchCheckIn("2026-07-15");
                                  setSearchCheckOut("2026-07-18");
                                }}
                                className="text-bold-copper underline hover:text-[#C05621] font-bold"
                              >
                                Réinitialiser
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Guests Count with Interactive Stepper Popover */}
                    <div className="flex flex-col text-left px-5 py-2.5 md:py-0 w-full md:w-1/5 relative">
                      <button 
                        onClick={() => {
                          setShowGuestsDropdown(!showGuestsDropdown);
                          setShowWhereDropdown(false);
                          setShowWhenDropdown(false);
                        }}
                        className="text-left w-full focus:outline-none"
                      >
                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 cursor-pointer block mb-1">
                          Invités
                        </label>
                        <div className="flex items-center text-xs font-bold text-stone-800">
                          <Users className="w-4 h-4 text-stone-400 shrink-0 mr-1.5" />
                          <span>
                            {searchGuests} {searchGuests > 1 ? "Voyageurs" : "Voyageur"}
                            {guestPets > 0 && ` (+${guestPets} 🐾)`}
                          </span>
                        </div>
                      </button>

                      {/* Floating GUESTS Panel */}
                      <AnimatePresence>
                        {showGuestsDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 top-[100%] mt-3 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-5 z-50 text-left text-stone-800"
                          >
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-4">Composition du groupe</p>
                            
                            <div className="space-y-4">
                              {/* Adults counter */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-xs font-bold">Adultes</div>
                                  <div className="text-[10px] text-stone-400">Âge 13+</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => {
                                      const newVal = Math.max(1, guestAdults - 1);
                                      setGuestAdults(newVal);
                                      setSearchGuests(newVal + guestChildren);
                                    }}
                                    className="w-7 h-7 rounded-full border border-stone-200 hover:border-stone-800 flex items-center justify-center font-bold text-xs"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-bold w-4 text-center">{guestAdults}</span>
                                  <button 
                                    onClick={() => {
                                      const newVal = Math.min(4, guestAdults + 1);
                                      setGuestAdults(newVal);
                                      setSearchGuests(newVal + guestChildren);
                                    }}
                                    className="w-7 h-7 rounded-full border border-stone-200 hover:border-stone-800 flex items-center justify-center font-bold text-xs"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Children counter */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-xs font-bold">Enfants</div>
                                  <div className="text-[10px] text-stone-400">Âge 2-12</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => {
                                      const newVal = Math.max(0, guestChildren - 1);
                                      setGuestChildren(newVal);
                                      setSearchGuests(guestAdults + newVal);
                                    }}
                                    className="w-7 h-7 rounded-full border border-stone-200 hover:border-stone-800 flex items-center justify-center font-bold text-xs"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-bold w-4 text-center">{guestChildren}</span>
                                  <button 
                                    onClick={() => {
                                      const newVal = Math.min(3, guestChildren + 1);
                                      setGuestChildren(newVal);
                                      setSearchGuests(guestAdults + newVal);
                                    }}
                                    className="w-7 h-7 rounded-full border border-stone-200 hover:border-stone-800 flex items-center justify-center font-bold text-xs"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Pets counter */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-xs font-bold">Animaux</div>
                                  <div className="text-[10px] text-stone-400">Chien ou chat bien élevé</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => setGuestPets(Math.max(0, guestPets - 1))}
                                    className="w-7 h-7 rounded-full border border-stone-200 hover:border-stone-800 flex items-center justify-center font-bold text-xs"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-bold w-4 text-center">{guestPets}</span>
                                  <button 
                                    onClick={() => setGuestPets(Math.min(2, guestPets + 1))}
                                    className="w-7 h-7 rounded-full border border-stone-200 hover:border-stone-800 flex items-center justify-center font-bold text-xs"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={() => setShowGuestsDropdown(false)}
                              className="w-full mt-5 py-2 bg-bold-text text-white rounded-xl text-[11px] font-bold uppercase tracking-wider text-center block hover:opacity-90"
                            >
                              Confirmer
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <button 
                      onClick={() => {
                        setShowWhereDropdown(false);
                        setShowWhenDropdown(false);
                        setShowGuestsDropdown(false);
                        setActiveTab("properties");
                      }}
                      className="w-full md:w-auto px-7 py-4 bg-bold-text hover:bg-[#FACCD1] hover:text-bold-text text-white rounded-3xl md:rounded-full font-bold uppercase tracking-wider text-[11px] transition-all shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{t.searchBtn}</span>
                    </button>

                  </div>

                </div>
              </section>

              {/* NUMA PINK SECTION (Photo 2 Inspired) */}
              <section className="bg-numa-pink-light border-y border-stone-200 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                  
                  {/* Left Column: Bold Typography */}
                  <div className="flex flex-col justify-center space-y-6 md:space-y-8 text-left max-w-xl">
                    <h2 className="font-display font-black tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase leading-[1.05]">
                      Affaires ou loisirs.<br />
                      Long séjour ou week-end.<br />
                      Chambres ou appartements.<br />
                      <span className="text-[#C05621] italic font-serif tracking-normal normal-case block mt-2">
                        Il y a toujours un numa pour vous.
                      </span>
                    </h2>
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {language === "fr" 
                        ? "Dar & Numa réinvente l'hospitalité haut de gamme au Maroc. Profitez de l'autonomie totale offerte par nos technologies de check-in numérique et d'un support local disponible 24h/24 via WhatsApp, allié au confort ultime d'appartements d'architecte."
                        : "Dar & Numa reinvents premium hospitality in Morocco. Enjoy absolute autonomy offered by our smart check-in technology and a local 24/7 WhatsApp support, coupled with the ultimate comfort of architect-designed suites."}
                    </p>
                    <div>
                      <button 
                        onClick={() => setActiveTab("properties")}
                        className="px-8 py-3.5 bg-[#111111] text-white hover:bg-[#FACCD1] hover:text-[#111111] rounded-full font-bold uppercase tracking-wider text-[11px] transition-all shadow-md"
                      >
                        {language === "fr" ? "Explorer nos adresses" : "Explore our spots"}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Tall Elegant Image Frame */}
                  <div className="relative h-[380px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group">
                    <img 
                      src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" 
                      alt="Numa room interior" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 text-white text-left">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FACCD1] mb-1">Authentic design</p>
                      <h4 className="font-display font-bold text-lg uppercase">Marrakech Médina Suite</h4>
                    </div>
                  </div>

                </div>
              </section>

              {/* INTERACTIVE CITY MAP/HIGHLIGHTS SHOWCASE (Photo 3 Inspired) */}
              <section 
                className="relative py-12 md:py-20 text-left overflow-hidden bg-cover bg-center border-y border-stone-200"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=80')" }}
              >
                {/* Elegant overlay to blend the Zellij pattern with Numa's warm cream/off-white palette - opacity lowered to make the mosaic pop! */}
                <div className="absolute inset-0 bg-[#FAF6F2]/70 backdrop-blur-[0.5px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Side: Big interactive city typography list */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-[10px] font-bold text-bold-copper uppercase tracking-widest block font-sans">
                      Où nous trouver
                    </span>
                    <h3 className="font-display font-black uppercase tracking-tight text-3xl text-stone-800">
                      Choisissez votre décor
                    </h3>
                    
                    <div className="flex flex-col space-y-3 pt-4">
                      {[
                        { name: "Marrakech", label: "Marrakech", bg: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80", tag: "Design & Tradition" },
                        { name: "Casablanca", label: "Casablanca", bg: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tag: "Affaires & Modernité" },
                        { name: "Tanger", label: "Tanger", bg: "https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=800&q=80", tag: "Vue Mer & Bohème" },
                        { name: "Rabat", label: "Rabat", bg: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", tag: "Culture & Calme" },
                      ].map((cityItem) => {
                        const isActive = activeCityLink === cityItem.name;
                        return (
                          <button
                            key={cityItem.name}
                            onClick={() => {
                              setActiveCityLink(cityItem.name);
                              setSearchCity(cityItem.name);
                            }}
                            className="text-left group flex items-center transition-all py-2 border-b border-stone-200/50"
                          >
                            <span className={`text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase transition-colors ${isActive ? "text-numa-blue" : "text-stone-400 hover:text-stone-800"}`}>
                              {isActive && "↗ "}
                              {cityItem.label}
                            </span>
                            <span className={`ml-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${isActive ? "bg-numa-blue/10 border-numa-blue text-numa-blue" : "bg-transparent border-transparent text-transparent group-hover:text-stone-500"}`}>
                              {cityItem.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side: Double image collage grid matching Numa style */}
                  <div className="lg:col-span-7 grid grid-cols-2 gap-6 relative">
                    <div className="space-y-6">
                      <div className="h-72 rounded-3xl overflow-hidden shadow-lg border border-stone-200 group relative">
                        <img 
                          src={activeCityLink === "Marrakech" ? "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80" : activeCityLink === "Casablanca" ? "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" : activeCityLink === "Tanger" ? "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80" : "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80"}
                          alt="City main scene" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          {activeCityLink}
                        </div>
                      </div>
                      <div className="h-48 rounded-3xl overflow-hidden shadow-lg border border-stone-200 group">
                        <img 
                          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80" 
                          alt="City secondary scene" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-6 pt-12">
                      <div className="h-48 rounded-3xl overflow-hidden shadow-lg border border-stone-200 group">
                        <img 
                          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" 
                          alt="City tertiary scene" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="h-72 rounded-3xl overflow-hidden shadow-lg border border-stone-200 group relative">
                        <img 
                          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80" 
                          alt="City room layout" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-4 right-4 bg-numa-pink text-[#111111] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                          100% Autonome
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* HERO FEATURED PROPERTIES SECTION */}
              <section className="bg-stone-200/40 border-y border-stone-300/60 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-bold-copper uppercase tracking-widest block font-sans">
                        Design d'exception
                      </span>
                      <h2 className="font-display font-black uppercase tracking-tighter text-3xl text-bold-text mt-1">
                        Nos adresses d'exception
                      </h2>
                    </div>
                    <button 
                      onClick={() => { setActiveTab("properties"); setSearchCity("all"); }}
                      className="text-bold-copper font-bold text-[11px] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Voir toutes les destinations
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Desktop view (3-column grid) */}
                  <div className="hidden md:grid md:grid-cols-3 gap-8">
                    {properties.slice(0, 3).map((prop) => (
                      <motion.div 
                        key={prop.id}
                        className="bg-white rounded-3xl overflow-hidden border border-stone-300/80 transition-all group flex flex-col h-full"
                        whileHover={{ 
                          scale: 1.025,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)"
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      >
                        <div 
                          className="relative h-64 overflow-hidden bg-stone-100 cursor-pointer"
                          onClick={() => { setSelectedProperty(prop); }}
                        >
                          <img 
                            src={prop.images.hero} 
                            alt={prop.name[language]} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 bg-bold-bg border border-stone-300/70 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-bold-text flex items-center gap-1 shadow-sm">
                            <MapPin className="w-3 h-3 text-bold-copper" />
                            {prop.city} · <span className="text-bold-copper">{prop.neighborhood}</span>
                          </div>
                          <motion.div 
                            className="absolute bottom-4 right-4 bg-bold-text px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-white shadow-sm"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {prop.pricePerNight}€ / {t.priceNight}
                          </motion.div>
                        </div>

                        <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                          <div className="space-y-2 text-left">
                            <div className="flex items-center justify-between gap-2">
                              <h3 
                                onClick={() => { setSelectedProperty(prop); }}
                                className="font-display font-bold uppercase tracking-tight text-lg text-bold-text truncate cursor-pointer hover:text-bold-copper transition-all"
                              >
                                {prop.name[language]}
                              </h3>
                              <div 
                                onClick={() => { setSelectedProperty(prop); }}
                                className="flex items-center gap-1 text-bold-copper font-bold text-xs shrink-0 bg-bold-copper/5 hover:bg-bold-copper/15 px-2 py-1 rounded-full cursor-pointer transition-all"
                              >
                                <Star className="w-3.5 h-3.5 fill-bold-copper" />
                                <span>{prop.rating}</span>
                                <span className="text-stone-300 font-normal">|</span>
                                <span className="text-[10px] text-stone-500 font-semibold">({prop.reviews?.length || 0})</span>
                              </div>
                            </div>
                            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                              {prop.description[language]}
                            </p>
                          </div>

                          <div className="border-t border-stone-200/60 pt-4 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                              {prop.amenities.slice(0, 3).map((amen) => (
                                <span key={amen} className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-500 hover:text-bold-teal transition-colors" title={amen}>
                                  {amen === "wifi-fast" && <Wifi className="w-3.5 h-3.5" />}
                                  {amen === "kitchenette" && <Utensils className="w-3.5 h-3.5" />}
                                  {amen === "smart-tv" && <Tv className="w-3.5 h-3.5" />}
                                </span>
                              ))}
                            </div>
                            <button 
                              onClick={() => { setSelectedProperty(prop); }}
                              className="px-5 py-2.5 bg-bold-text hover:bg-bold-copper text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
                            >
                              Découvrir
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile swipeable slider view */}
                  <div className="block md:hidden relative overflow-hidden px-1">
                    <div className="relative min-h-[460px]">
                      <AnimatePresence initial={false} mode="wait">
                        {properties.slice(0, 3).map((prop, idx) => {
                          if (idx !== mobilePropIndex) return null;
                          const featuredProps = properties.slice(0, 3);
                          const numFeatured = featuredProps.length;
                          return (
                            <motion.div
                              key={prop.id}
                              initial={{ opacity: 0, x: 80 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -80 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.6}
                              onDragEnd={(_, info) => {
                                if (numFeatured <= 1) return;
                                const swipeThreshold = 50;
                                if (info.offset.x < -swipeThreshold) {
                                  // Swiped left -> Next
                                  setMobilePropIndex((prev) => (prev + 1) % numFeatured);
                                } else if (info.offset.x > swipeThreshold) {
                                  // Swiped right -> Previous
                                  setMobilePropIndex((prev) => (prev - 1 + numFeatured) % numFeatured);
                                }
                              }}
                              className="bg-white rounded-3xl overflow-hidden border border-stone-300/80 flex flex-col h-full touch-pan-y active:cursor-grabbing cursor-grab select-none shadow-sm"
                            >
                              <div 
                                className="relative h-56 overflow-hidden bg-stone-100 cursor-pointer"
                                onClick={() => { setSelectedProperty(prop); }}
                              >
                                <img 
                                  src={prop.images.hero} 
                                  alt={prop.name[language]} 
                                  className="w-full h-full object-cover pointer-events-none select-none"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-4 left-4 bg-bold-bg border border-stone-300/70 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-bold-text flex items-center gap-1 shadow-sm">
                                  <MapPin className="w-3 h-3 text-bold-copper" />
                                  {prop.city} · <span className="text-bold-copper">{prop.neighborhood}</span>
                                </div>
                                <motion.div 
                                  className="absolute bottom-4 right-4 bg-bold-text px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-white shadow-sm"
                                  animate={{
                                    scale: [1, 1.05, 1],
                                  }}
                                  transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {prop.pricePerNight}€ / {t.priceNight}
                                </motion.div>
                              </div>

                              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between text-left">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <h3 
                                      onClick={() => { setSelectedProperty(prop); }}
                                      className="font-display font-bold uppercase tracking-tight text-base text-bold-text truncate cursor-pointer hover:text-bold-copper transition-all"
                                    >
                                      {prop.name[language]}
                                    </h3>
                                    <div 
                                      onClick={() => { setSelectedProperty(prop); }}
                                      className="flex items-center gap-1 text-bold-copper font-bold text-xs shrink-0 bg-bold-copper/5 px-2 py-1 rounded-full cursor-pointer"
                                    >
                                      <Star className="w-3 h-3 fill-bold-copper" />
                                      <span>{prop.rating}</span>
                                      <span className="text-stone-300 font-normal">|</span>
                                      <span className="text-[10px] text-stone-500 font-semibold">({prop.reviews?.length || 0})</span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed select-none">
                                    {prop.description[language]}
                                  </p>
                                </div>

                                <div className="border-t border-stone-200/60 pt-4 flex items-center justify-between mt-auto">
                                  <div className="flex items-center gap-1.5">
                                    {prop.amenities.slice(0, 3).map((amen) => (
                                      <span key={amen} className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-500" title={amen}>
                                        {amen === "wifi-fast" && <Wifi className="w-3.5 h-3.5" />}
                                        {amen === "kitchenette" && <Utensils className="w-3.5 h-3.5" />}
                                        {amen === "smart-tv" && <Tv className="w-3.5 h-3.5" />}
                                      </span>
                                    ))}
                                  </div>
                                  <button 
                                    onClick={() => { setSelectedProperty(prop); }}
                                    className="px-4 py-2 bg-bold-text hover:bg-bold-copper text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
                                  >
                                    Découvrir
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Pagination indicators (Dots) */}
                    <div className="flex justify-center items-center gap-2.5 mt-5">
                      {properties.slice(0, 3).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMobilePropIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${idx === mobilePropIndex ? "w-6 bg-bold-copper" : "w-2 bg-stone-300 hover:bg-stone-400"}`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Swipe hint */}
                    <div className="text-center mt-2.5">
                      <span className="text-[9px] text-stone-400 font-mono font-bold tracking-widest uppercase block animate-pulse">
                        ← Glisser pour naviguer →
                      </span>
                    </div>
                  </div>

                </div>
              </section>

              {/* NUMA MEMBERSHIP SECTION (Photo 5/6 Inspired) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 text-white p-8 md:p-16 text-center">
                  {/* Background picture blurred */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1541088966144-8d9633dbbecc?auto=format&fit=crop&w=1200&q=80" 
                      alt="Scenic city overview" 
                      className="w-full h-full object-cover opacity-25 blur-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#111111]/70" />
                  </div>
                  
                  <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-[#FACCD1] uppercase tracking-widest block">Avant-première exclusive</span>
                      <h3 className="font-display font-black uppercase text-3xl sm:text-4xl tracking-tight max-w-2xl mx-auto">
                        En tant que membre Numa, profitez du meilleur tarif et d'avantages exclusifs !
                      </h3>
                      <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
                        Rejoignez le club de voyageurs numa.dar gratuitement et bénéficiez de services d'exception dès votre première nuitée au Maroc.
                      </p>
                      <button 
                        onClick={() => setActiveTab("member")}
                        className="px-6 py-3 bg-[#FACCD1] hover:bg-white text-bold-text font-bold text-xs uppercase tracking-widest rounded-full transition-all inline-block mt-2"
                      >
                        Inscription gratuite
                      </button>
                    </div>

                    {/* Grid of 6 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      {/* Card 1 */}
                      <div className="bg-[#FAF6F2]/10 backdrop-blur-md border border-[#FACCD1]/20 p-5 rounded-2xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-[#FACCD1]/20 text-[#FACCD1] flex items-center justify-center">
                          <Star className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white">Profitez de 15% de réduction</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">Sur tous vos séjours réservés directement sur notre plateforme.</p>
                      </div>
                      
                      {/* Card 2 */}
                      <div className="bg-[#FAF6F2]/10 backdrop-blur-md border border-[#FACCD1]/20 p-5 rounded-2xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-[#FACCD1]/20 text-[#FACCD1] flex items-center justify-center">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white">25% de réduction dès 7 nuits</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">Tarif résidentiel longue durée automatiquement appliqué.</p>
                      </div>

                      {/* Card 3 */}
                      <div className="bg-[#FAF6F2]/10 backdrop-blur-md border border-[#FACCD1]/20 p-5 rounded-2xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-[#FACCD1]/20 text-[#FACCD1] flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white">Annulation gratuite jusqu'à 18h</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">Annulez sans frais en un clic en cas d'imprévu de dernière minute.</p>
                      </div>

                      {/* Card 4 */}
                      <div className="bg-[#FAF6F2]/10 backdrop-blur-md border border-[#FACCD1]/20 p-5 rounded-2xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-[#FACCD1]/20 text-[#FACCD1] flex items-center justify-center">
                          <Coffee className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white">Boissons et snacks de bienvenue</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">Profitez de rafraîchissements et de douceurs locales offerts à votre arrivée.</p>
                      </div>

                      {/* Card 5 */}
                      <div className="bg-[#FAF6F2]/10 backdrop-blur-md border border-[#FACCD1]/20 p-5 rounded-2xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-[#FACCD1]/20 text-[#FACCD1] flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white">Arrivée anticipée dès 14h</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">Gagnez du temps grâce à notre processus 100% numérique et autonome.</p>
                      </div>

                      {/* Card 6 */}
                      <div className="bg-[#FAF6F2]/10 backdrop-blur-md border border-[#FACCD1]/20 p-5 rounded-2xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-[#FACCD1]/20 text-[#FACCD1] flex items-center justify-center">
                          <Shield className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase text-white">Départ tardif jusqu'à 13h</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">Profitez plus longtemps de votre matinée avant de repartir de votre cocon.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* DYNAMIC RECENT GUEST REVIEWS SECTION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
                    <div className="space-y-1">
                      <span className="px-3 py-1 bg-bold-copper/10 border border-bold-copper/20 text-bold-copper rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">
                        {language === "fr" ? "Retours d'Expériences" : language === "en" ? "Guest Testimonials" : "آراء وتجارب"}
                      </span>
                      <h3 className="font-display font-black uppercase tracking-tighter text-2xl md:text-3xl text-bold-text">
                        {language === "fr" ? "Ce que disent nos voyageurs" : language === "en" ? "What our guests are saying" : "ما يقوله نزلائنا"}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allReviews.slice(0, 3).map((rev) => (
                      <div 
                        key={rev.id} 
                        className="bg-white p-6 rounded-3xl border border-stone-300/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all text-left space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Stars and date */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3.5 h-3.5 ${i < Math.round(rev.rating) ? "fill-bold-copper text-bold-copper" : "text-stone-200"}`} 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-stone-400">{rev.date}</span>
                          </div>

                          {/* Comment */}
                          <p className="text-stone-600 text-xs leading-relaxed italic">
                            "{rev.comment[language] || rev.comment.fr}"
                          </p>
                        </div>

                        {/* Author and Property */}
                        <div className="border-t border-stone-100 pt-3 flex items-center justify-between mt-auto">
                          <div>
                            <span className="text-xs font-bold text-bold-text block">{rev.author}</span>
                            <button 
                              onClick={() => { setSelectedProperty(rev.propertyObj); }}
                              className="text-[10px] text-bold-copper font-bold hover:underline uppercase tracking-wider text-left block mt-0.5"
                            >
                              {rev.propertyName}
                            </button>
                          </div>
                          <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400 uppercase">
                            {rev.author.charAt(0)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* NOS NUMAN STORIES SECTION (Photo 7 Inspired) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
                <div className="space-y-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-bold-copper uppercase tracking-widest block font-sans">
                      Inspirations & Communauté
                    </span>
                    <h3 className="font-display font-black uppercase tracking-tight text-3xl text-stone-800">
                      Nos Numan Stories
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Story 1 */}
                    <div className="relative h-[420px] rounded-3xl overflow-hidden group border border-stone-200 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80" 
                        alt="Marrakech patio" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#0066FF] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          Marrakech
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 text-white text-left space-y-2">
                        <h4 className="font-display font-bold text-lg uppercase">Le charme secret d'un riad modernisé</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">"Une immersion vibrante, à quelques minutes des souks animés."</p>
                      </div>
                    </div>

                    {/* Story 2 */}
                    <div className="relative h-[420px] rounded-3xl overflow-hidden group border border-stone-200 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" 
                        alt="Casablanca lounge" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#9A1F1F] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          Casablanca
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 text-white text-left space-y-2">
                        <h4 className="font-display font-bold text-lg uppercase">Un cocon urbain au Maarif</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">"Le refuge parfait pour mes séjours professionnels au Maroc."</p>
                      </div>
                    </div>

                    {/* Story 3 */}
                    <div className="relative h-[420px] rounded-3xl overflow-hidden group border border-stone-200 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=600&q=80" 
                        alt="Tanger seaside window" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#E8A2A8] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          Tanger
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 text-white text-left space-y-2">
                        <h4 className="font-display font-bold text-lg uppercase">Réveil face à la Méditerranée</h4>
                        <p className="text-stone-300 text-[11px] leading-relaxed">"La douceur de vivre tangéroise, avec l'autonomie d'un chez-soi."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* STAY CONNECTED, STAY INSPIRED FOOTER SUBSCRIPTION (Photo 8 Inspired) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
                <div className="bg-[#FCE4E6] rounded-3xl p-8 md:p-16 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden text-left shadow-md">
                  
                  {/* Left side: Subscription box */}
                  <div className="space-y-6 max-w-md w-full relative z-10">
                    <h3 className="font-display font-black uppercase text-3xl md:text-4xl text-stone-900 tracking-tight leading-none">
                      Stay connected,<br />stay inspired.
                    </h3>
                    <p className="text-stone-700 text-xs sm:text-sm">
                      Inscrivez-vous à notre newsletter pour recevoir nos nouveautés locales, de nouvelles destinations de rêve au Maroc et des promotions exclusives de membre numa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input 
                        type="email" 
                        placeholder="Adresse e-mail" 
                        className="px-5 py-3.5 bg-white border border-stone-300 rounded-full text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-numa-blue w-full font-bold"
                      />
                      <button 
                        onClick={() => alert("Merci pour votre inscription !")}
                        className="px-7 py-3.5 bg-[#111111] hover:bg-[#0066FF] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shrink-0"
                      >
                        Sign me up
                      </button>
                    </div>
                  </div>

                  {/* Right side: Artistic stacked colorful stickers representing locations */}
                  <div className="relative w-full md:w-[450px] h-[300px] flex items-center justify-center overflow-hidden shrink-0">
                    {/* Rome */}
                    <div className="absolute bg-[#9A1F1F] text-white font-black text-xl px-6 py-2.5 rounded-xl shadow-lg -rotate-12 translate-x-[-120px] translate-y-[-50px] font-display uppercase">
                      Marrakech
                    </div>
                    {/* Paris */}
                    <div className="absolute bg-[#065F46] text-white font-black text-xl px-6 py-2.5 rounded-xl shadow-lg rotate-6 translate-x-[90px] translate-y-[-70px] font-display uppercase">
                      Casablanca
                    </div>
                    {/* Berlin */}
                    <div className="absolute bg-[#C05621] text-white font-black text-xl px-6 py-2.5 rounded-xl shadow-lg -rotate-6 translate-x-[-20px] translate-y-[-10px] font-display uppercase">
                      Tanger
                    </div>
                    {/* Munich */}
                    <div className="absolute bg-[#0066FF] text-white font-black text-xl px-6 py-2.5 rounded-xl shadow-lg rotate-12 translate-x-[110px] translate-y-[50px] font-display uppercase">
                      Rabat
                    </div>
                    {/* London */}
                    <div className="absolute bg-[#111111] text-white font-black text-xl px-6 py-2.5 rounded-xl shadow-lg -rotate-12 translate-x-[-100px] translate-y-[60px] font-display uppercase">
                      Agadir
                    </div>
                    {/* Amsterdam */}
                    <div className="absolute bg-[#E8A2A8] text-[#111111] font-black text-xl px-6 py-2.5 rounded-xl shadow-lg rotate-3 translate-y-[110px] translate-x-[5px] font-display uppercase">
                      Fès
                    </div>
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {/* TAB 2: PROPERTIES (DESTINATIONS) */}
          {activeTab === "properties" && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-stone-800"
            >
              
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold text-bold-copper uppercase tracking-widest font-sans">
                  Nos Destinations au Maroc
                </span>
                <h1 className="font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl text-stone-900 leading-none">
                  {t.searchTitle}
                </h1>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                  Découvrez nos appartements entièrement équipés dans les quartiers stratégiques et branchés du Maroc. Idéal pour séjours courts, prolongés ou professionnels.
                </p>
              </div>

              {/* HIGH-FIDELITY FILTERS, BUDGET SLIDER & SORT CONTROLS */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6 text-left">
                
                {/* Top Row: City & View Mode Toggles */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-stone-100 pb-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-black text-stone-400 mr-2 uppercase tracking-widest font-sans">
                      Ville :
                    </span>
                    {["all", "Casablanca", "Marrakech", "Rabat", "Tanger"].map((city) => (
                      <button
                        key={city}
                        onClick={() => { setSearchCity(city); }}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${searchCity === city ? "bg-bold-text text-white shadow-sm" : "bg-stone-50 border border-stone-200/60 text-stone-600 hover:bg-stone-100"}`}
                      >
                        {city === "all" ? t.allCities : city}
                      </button>
                    ))}
                  </div>

                  {/* View Mode & Sort Dropdowns */}
                  <div className="flex items-center gap-3">
                    {/* Sort Select */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans">Trier :</span>
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 focus:outline-none"
                      >
                        <option value="recommended">Recommandé</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                        <option value="rating">Meilleures notes</option>
                      </select>
                    </div>

                    {/* View mode toggle */}
                    <div className="bg-stone-100 p-1 rounded-xl flex items-center">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${viewMode === "grid" ? "bg-white text-bold-text shadow-sm" : "text-stone-500"}`}
                      >
                        Grille
                      </button>
                      <button
                        onClick={() => setViewMode("map")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${viewMode === "map" ? "bg-white text-bold-text shadow-sm" : "text-stone-500"}`}
                      >
                        Carte split
                      </button>
                    </div>
                  </div>
                </div>

                {/* Second Row: Detailed Amenities & Budget limit slider */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Budget Limit Slider */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans">Budget Max :</span>
                      <span className="text-xs font-black text-[#C05621]">{filterPriceMax}€ / nuit</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="200" 
                      value={filterPriceMax} 
                      onChange={(e) => setFilterPriceMax(Number(e.target.value))}
                      className="w-full accent-bold-text h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>50€</span>
                      <span>125€</span>
                      <span>200€</span>
                    </div>
                  </div>

                  {/* Amenities Checklist */}
                  <div className="md:col-span-8 space-y-2 text-left">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans block">Équipements requis :</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "wifi-fast", label: "Fibre Wi-Fi" },
                        { id: "kitchenette", label: "Cuisine équipée" },
                        { id: "smart-tv", label: "Smart TV" },
                        { id: "laundry", label: "Lave-linge" },
                        { id: "coworking-space", label: "Espace bureau" }
                      ].map((amenity) => {
                        const isSelected = filterAmenities.includes(amenity.id);
                        return (
                          <button
                            key={amenity.id}
                            onClick={() => {
                              if (isSelected) {
                                setFilterAmenities(prev => prev.filter(a => a !== amenity.id));
                              } else {
                                setFilterAmenities(prev => [...prev, amenity.id]);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all uppercase tracking-wide ${isSelected ? "bg-bold-copper/10 border-bold-copper/40 text-bold-copper" : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"}`}
                          >
                            {isSelected ? "✓ " : ""}{amenity.label}
                          </button>
                        );
                      })}
                      {filterAmenities.length > 0 && (
                        <button
                          onClick={() => setFilterAmenities([])}
                          className="px-2.5 py-1.5 text-xs font-bold text-stone-400 hover:text-stone-800 underline uppercase tracking-widest"
                        >
                          Effacer tout
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Local Neighborhood Tag Boosters */}
                <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
                  <span className="text-[10px] font-bold text-stone-400 mr-2 uppercase tracking-widest font-sans">
                    Quartiers populaires :
                  </span>
                  {[
                    { name: "Maarif", label: "Maarif (Casa)", search: "Maarif" },
                    { name: "Gauthier", label: "Gauthier (Casa)", search: "Gauthier" },
                    { name: "Anfa", label: "Anfa (Casa)", search: "Anfa" },
                    { name: "Medina", label: "Médina (Marrakech)", search: "Medina" },
                    { name: "Agdal", label: "Agdal (Rabat)", search: "Agdal" },
                  ].map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => { setSearchQuery(tag.search); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${searchQuery === tag.search ? "bg-bold-copper/10 border-bold-copper/40 text-bold-copper animate-none" : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"}`}
                    >
                      {tag.label}
                    </button>
                  ))}
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="px-2 py-1.5 text-xs text-bold-copper hover:underline font-bold uppercase tracking-widest"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>

              </div>

              {/* LISTINGS CONTAINER (GRID vs. SPLIT-MAP) */}
              {filteredProperties.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 space-y-4">
                  <Info className="w-12 h-12 text-stone-300 mx-auto" />
                  <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">
                    Aucun appartement ne correspond à vos critères
                  </h3>
                  <p className="text-stone-500 max-w-md mx-auto text-xs leading-relaxed">
                    Essayez de réinitialiser la recherche par quartier, ajustez le budget max, ou choisissez une autre ville pour découvrir nos propriétés.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSearchCity("all"); setFilterPriceMax(200); setFilterAmenities([]); }}
                    className="px-6 py-3 bg-bold-text text-white rounded-xl text-xs font-bold uppercase tracking-widest"
                  >
                    Effacer tous les filtres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* SPLIT MAP PANEL - Rendered only in "map" view mode */}
                  {viewMode === "map" && (
                    <div className="lg:col-span-5 xl:col-span-4 sticky top-24 h-[550px] bg-white border border-stone-200 rounded-3xl p-3 shadow-sm overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans flex items-center gap-1">
                          <Activity className="w-3 h-3 text-bold-copper animate-pulse" />
                          Carte Interactive Maroc
                        </span>
                        <span className="text-[10px] text-stone-500 font-bold">{filteredProperties.length} suites localisées</span>
                      </div>
                      
                      {/* Stylized Vector SVG Map of Morocco */}
                      <div className="relative w-full h-[470px] bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center">
                        <svg viewBox="0 0 320 400" className="w-full h-full select-none">
                          {/* Morocco Coast outline (Visual Sketch Representation) */}
                          <path 
                            d="M 50,40 Q 80,80 110,65 T 180,105 T 260,90 T 310,135 L 290,390 L 80,390 Z" 
                            fill="#FDFBFAF2" 
                            stroke="#E3DFD4" 
                            strokeWidth="3" 
                            strokeLinejoin="round"
                          />
                          {/* Mountains Ridge */}
                          <path 
                            d="M 120,200 Q 180,260 250,240" 
                            fill="none" 
                            stroke="#ECE6D9" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeDasharray="4,4" 
                          />
                          <text x="35" y="160" fill="#CBD5E1" className="text-[9px] font-mono font-bold tracking-wider -rotate-45 uppercase">Atlantique</text>
                          <text x="170" y="320" fill="#ECE6D9" className="text-[10px] font-serif italic font-bold">Atlas</text>

                          {/* Interactive Pin Overlays mapped to physical coordinates */}
                          {filteredProperties.map((p) => {
                            // Assign coordinates based on city
                            let cx = 130;
                            let cy = 250;
                            if (p.city === "Tanger") { cx = 250; cy = 90; }
                            else if (p.city === "Rabat") { cx = 180; cy = 150; }
                            else if (p.city === "Casablanca") { cx = 150; cy = 185; }
                            else if (p.city === "Marrakech") { cx = 120; cy = 265; }

                            // Slightly offset different properties in same city to avoid perfect stacking
                            const hash = p.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            const offsetX = (hash % 15) - 7.5;
                            const offsetY = ((hash >> 2) % 15) - 7.5;
                            const finalX = cx + offsetX;
                            const finalY = cy + offsetY;

                            return (
                              <g 
                                key={`map-pin-${p.id}`}
                                className="cursor-pointer group"
                                onClick={() => { setSelectedProperty(p); }}
                              >
                                {/* Ripple pulse */}
                                <circle 
                                  cx={finalX} 
                                  cy={finalY} 
                                  r="12" 
                                  fill="#C05621" 
                                  opacity="0.15" 
                                  className="group-hover:scale-150 transition-transform duration-300 origin-center" 
                                />
                                <circle cx={finalX} cy={finalY} r="4" fill="#C05621" className="group-hover:fill-bold-text transition-colors" />
                                
                                {/* Hover Floating Price Tag */}
                                <g transform={`translate(${finalX - 22}, ${finalY - 26})`}>
                                  <rect 
                                    width="44" 
                                    height="18" 
                                    rx="6" 
                                    fill="#111111" 
                                    className="group-hover:fill-[#C05621] transition-colors shadow-lg" 
                                  />
                                  <text 
                                    x="22" 
                                    y="12" 
                                    fill="white" 
                                    textAnchor="middle" 
                                    className="text-[9px] font-mono font-bold"
                                  >
                                    {p.pricePerNight}€
                                  </text>
                                </g>
                              </g>
                            );
                          })}
                        </svg>

                        <div className="absolute bottom-3 left-3 right-3 bg-[#111111]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800 text-[10px] text-stone-300 text-left">
                          💡 <span className="font-bold text-white">Astuce :</span> Cliquez sur un prix sur la carte pour inspecter et simuler la réservation de la suite correspondante.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROPERTY CARDS GRID */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${viewMode === "map" ? "lg:col-span-7 xl:col-span-8" : "lg:grid-cols-3 lg:col-span-12"} gap-8`}>
                    {filteredProperties.map((prop) => {
                      // Get active photo sliding index for this card
                      // Defaults to 0 if not yet set
                      const images = [prop.images.hero, ...(prop.images.details || [])];
                      const activeImgIndex = guestAdults /* reuse state to prevent re-render or use localized dict */ ? (mobilePropIndex + prop.id.charCodeAt(0)) % images.length : 0;
                      
                      return (
                        <motion.div 
                          key={prop.id}
                          className="bg-white rounded-3xl overflow-hidden border border-stone-200 transition-all group flex flex-col h-full hover:shadow-xl relative text-left"
                          whileHover={{ 
                            scale: 1.02,
                            y: -4
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                          {/* Image Carousel Panel */}
                          <div 
                            className="relative h-64 overflow-hidden bg-stone-100 group cursor-grab active:cursor-grabbing"
                            onTouchStart={(e) => {
                              (e.currentTarget as any)._startX = e.touches[0].clientX;
                            }}
                            onTouchEnd={(e) => {
                              const startX = (e.currentTarget as any)._startX || 0;
                              const endX = e.changedTouches[0].clientX;
                              const diff = startX - endX;
                              if (Math.abs(diff) > 40) {
                                if (diff > 0) {
                                  // Swipe left -> Next photo
                                  setMobilePropIndex((prev) => (prev + 1) % images.length);
                                } else {
                                  // Swipe right -> Prev photo
                                  setMobilePropIndex((prev) => (prev - 1 + images.length) % images.length);
                                }
                              }
                            }}
                          >
                            
                            {/* Sliding Images */}
                            <div className="w-full h-full relative">
                              <img 
                                src={images[activeImgIndex % images.length]} 
                                alt={prop.name[language]} 
                                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Left/Right Overlays */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Modulate current index simulation via shifting offset
                                  setMobilePropIndex((prev) => (prev - 1 + images.length) % images.length);
                                }}
                                className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-[#FACCD1] transition-colors focus:outline-none cursor-pointer"
                                aria-label="Previous photo"
                              >
                                <span className="font-bold text-xs">‹</span>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMobilePropIndex((prev) => (prev + 1) % images.length);
                                }}
                                className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-[#FACCD1] transition-colors focus:outline-none cursor-pointer"
                                aria-label="Next photo"
                              >
                                <span className="font-bold text-xs">›</span>
                              </button>
                            </div>

                            {/* Slider Bullet indicators (Dots) */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-[#111111]/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                              {images.map((_, idx) => (
                                <div 
                                  key={idx}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === (activeImgIndex % images.length) ? "w-3 bg-white" : "w-1.5 bg-white/50"}`}
                                />
                              ))}
                            </div>

                            <div className="absolute top-4 left-4 bg-bold-bg border border-stone-200/80 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-bold-text flex items-center gap-1 shadow-sm z-10">
                              <MapPin className="w-3 h-3 text-bold-copper" />
                              {prop.city} · <span className="text-bold-copper font-medium">{prop.neighborhood}</span>
                            </div>

                            <motion.div 
                              className="absolute bottom-4 right-4 bg-bold-text px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-white shadow-sm z-10 cursor-pointer"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              onClick={() => { setSelectedProperty(prop); }}
                            >
                              {prop.pricePerNight}€ / {t.priceNight}
                            </motion.div>
                          </div>

                          {/* Body details */}
                          <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <h3 
                                  onClick={() => { setSelectedProperty(prop); }}
                                  className="font-display font-black uppercase tracking-tight text-base text-[#111111] truncate cursor-pointer hover:text-bold-copper transition-all"
                                >
                                  {prop.name[language]}
                                </h3>
                                <div 
                                  onClick={() => { setSelectedProperty(prop); }}
                                  className="flex items-center gap-1 text-bold-copper font-bold text-xs shrink-0 bg-bold-copper/5 hover:bg-bold-copper/15 px-2 py-1 rounded-full cursor-pointer transition-all"
                                >
                                  <Star className="w-3.5 h-3.5 fill-bold-copper" />
                                  <span>{prop.rating}</span>
                                  <span className="text-stone-300 font-normal">|</span>
                                  <span className="text-[10px] text-stone-500 font-semibold">({prop.reviews?.length || 0})</span>
                                </div>
                              </div>
                              
                              <p className="text-[9px] text-bold-copper tracking-widest font-mono uppercase font-bold block">
                                KEYWORD: {prop.seoKeywords[0]}
                              </p>

                              <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                                {prop.description[language]}
                              </p>
                            </div>

                            {/* Neighborhood Guidance snippet */}
                            <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-2xl space-y-1 text-left">
                              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block font-sans">
                                Conseils de quartier :
                              </span>
                              <ul className="text-xs text-stone-600 space-y-0.5">
                                {prop.localHighlights[language].slice(0, 2).map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1">
                                    <span className="text-bold-copper font-bold">•</span>
                                    <span className="truncate">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Amenity tags + Reserve Trigger */}
                            <div className="border-t border-stone-100 pt-4 flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-1.5">
                                {prop.amenities.map((amen) => (
                                  <span 
                                    key={amen} 
                                    className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-500 hover:text-bold-teal transition-colors relative group"
                                  >
                                    {amen === "wifi-fast" && <Wifi className="w-3.5 h-3.5" />}
                                    {amen === "kitchenette" && <Utensils className="w-3.5 h-3.5" />}
                                    {amen === "smart-tv" && <Tv className="w-3.5 h-3.5" />}
                                    {amen === "laundry" && <Activity className="w-3.5 h-3.5" />}
                                    {amen === "coworking-space" && <Briefcase className="w-3.5 h-3.5" />}
                                    
                                    <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-bold-text text-white text-[9px] px-2 py-1 rounded shadow-xl hidden group-hover:block z-50 whitespace-nowrap normal-case font-sans">
                                      {amen}
                                    </span>
                                  </span>
                                ))}
                              </div>
                               <button 
                                onClick={() => { setSelectedProperty(prop); }}
                                className="px-5 py-2.5 bg-bold-text hover:bg-[#FACCD1] hover:text-bold-text text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm"
                              >
                                {t.bookNow}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: HOW IT WORKS & LOCK SIMULATOR */}
          {activeTab === "how-it-works" && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold text-bold-copper uppercase tracking-widest font-sans">
                  Parcours Client 100% Digital
                </span>
                <h1 className="font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl text-bold-text">
                  {t.howItWorksTitle}
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Découvrez comment nous avons éliminé la lenteur des réceptions traditionnelles pour vous offrir un accès instantané et autonome, tout en restant connectés 24h/24.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Step timeline */}
                <div className="space-y-8">
                  
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-bold-copper bg-bold-bg text-bold-copper flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">
                        {t.howStep1Title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {t.howStep1Desc}
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-bold-copper bg-bold-bg text-bold-copper flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">
                        {t.howStep2Title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {t.howStep2Desc}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-bold-copper bg-bold-bg text-bold-copper flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">
                        {t.howStep3Title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {t.howStep3Desc}
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-bold-copper bg-bold-bg text-bold-copper flex items-center justify-center font-bold text-sm shrink-0">
                      4
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">
                        {t.howStep4Title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {t.howStep4Desc}
                      </p>
                    </div>
                  </div>

                </div>

                {/* INTERACTIVE LOCK SIMULATOR */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-300 shadow-xl space-y-6 text-center max-w-md mx-auto">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-bold-copper/10 border border-bold-copper/20 text-bold-copper rounded-full text-[10px] font-sans font-bold uppercase tracking-widest inline-block">
                      Démonstration interactive
                    </span>
                    <h3 className="font-display font-bold uppercase tracking-tight text-xl text-bold-text">
                      {t.lockTitle}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {t.lockSubtitle}
                    </p>
                  </div>

                  {/* Keyless Door Screen Display */}
                  <div className={`rounded-2xl p-6 border-2 transition-all ${
                    lockStatus === "opened" ? "bg-emerald-50 border-emerald-500 text-emerald-800" :
                    lockStatus === "error" ? "bg-rose-50 border-rose-500 text-rose-800" :
                    "bg-[#1A1A1A] border-[#1A1A1A] text-stone-100"
                  }`}>
                    
                    <div className="flex justify-center mb-2">
                      {lockStatus === "opened" ? (
                        <Unlock className="w-10 h-10 text-emerald-500 animate-bounce" />
                      ) : (
                        <Lock className="w-10 h-10 text-stone-400" />
                      )}
                    </div>

                    <div className="font-mono text-2xl tracking-widest font-bold h-8">
                      {enteredPin || "— — — —"}
                    </div>

                    <div className="text-xs mt-3 opacity-90">
                      {lockStatus === "opened" ? t.lockOpened :
                       lockStatus === "error" ? t.lockError :
                       t.lockClosed}
                    </div>

                    {/* Mint tea welcome reward for unlocking! */}
                    {lockStatus === "opened" && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-center gap-2 text-xs text-stone-800 font-semibold"
                      >
                        <Coffee className="w-4 h-4 text-bold-teal" />
                        <span>🍵 Thé à la menthe servi de bienvenue !</span>
                      </motion.div>
                    )}

                  </div>

                  {/* Keypad numbers */}
                  <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "#"].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => handleKeypadPress(btn)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-lg border transition-all ${
                          btn === "C" ? "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-600" :
                          btn === "#" ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-600" :
                          "bg-stone-50 hover:bg-stone-200 border-stone-300 text-bold-text"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>

                  {/* Demo hints */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-500 space-y-1.5 text-left">
                    <span className="font-bold text-stone-700 uppercase tracking-wide block text-[10px] font-mono">
                      🔑 Codes de démonstration :
                    </span>
                    <p>• Saisissez <span className="font-mono font-bold text-bold-copper">*8439#</span> (Code général du Riad Al Amine)</p>
                    <p>• Saisissez <span className="font-mono font-bold text-bold-copper">*7777#</span> (Accès VIP Dar Essaada)</p>
                    {simulatedBookingResult && (
                      <p className="text-bold-teal font-semibold">• Votre code simulé : <span className="font-mono font-bold">{simulatedBookingResult.pinCode}</span></p>
                    )}
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 4: SERVICES & LOCAL PARTNERSHIPS */}
          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold text-bold-copper uppercase tracking-widest font-sans">
                  Prestations & Immersion
                </span>
                <h1 className="font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl text-bold-text">
                  {t.servicesHeroTitle}
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Profitez de la flexibilité totale d'un appartement autonome, sans renoncer aux services haut de gamme d'un hôtel et aux meilleures immersions locales.
                </p>
              </div>

              {/* SERVICES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Service 1 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-300 hover:shadow-md transition-all space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-bold-teal/10 text-bold-teal flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.serviceCleaning}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{t.serviceCleaningDesc}</p>
                </div>

                {/* Service 2 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-300 hover:shadow-md transition-all space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-bold-copper/10 text-bold-copper flex items-center justify-center">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.serviceLinen}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{t.serviceLinenDesc}</p>
                </div>

                {/* Service 3 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-300 hover:shadow-md transition-all space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-bold-teal/10 text-bold-teal flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.serviceActivities}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{t.serviceActivitiesDesc}</p>
                </div>

                {/* Service 4 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-300 hover:shadow-md transition-all space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-bold-copper/10 text-bold-copper flex items-center justify-center">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.serviceKitchen}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{t.serviceKitchenDesc}</p>
                </div>

              </div>

              {/* LOCAL EXPERIENCE BOOKER */}
              <div className="bg-white rounded-3xl p-8 border border-stone-300 shadow-sm space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="px-3 py-1 bg-bold-teal/10 border border-bold-teal/20 text-bold-teal rounded-full text-[10px] font-sans font-bold uppercase tracking-widest inline-block">
                    Expériences locales réservables
                  </span>
                  <h2 className="font-display font-black uppercase tracking-tighter text-2xl md:text-3xl text-bold-text">
                    {t.experienceTitle}
                  </h2>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.experienceSubtitle}
                  </p>
                </div>

                {bookedExperience && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 text-sm max-w-lg mx-auto font-semibold"
                  >
                    🎉 <strong>Expérience réservée avec succès !</strong> Notre conciergerie locale va vous envoyer les détails d'accès et de rendez-vous sur WhatsApp.
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Exp 1 */}
                  <div className="bg-white rounded-3xl overflow-hidden border border-stone-300 hover:shadow-md transition-all flex flex-col justify-between h-full">
                    <div className="relative h-48 bg-stone-100">
                      <img 
                        src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80" 
                        alt="Cooking class" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-bold-bg border border-stone-300 px-3 py-1 rounded-full text-[10px] font-bold text-bold-text uppercase tracking-wider">
                        Casablanca Maarif
                      </div>
                    </div>
                    <div className="p-6 space-y-4 text-left">
                      <h4 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.cookingClass}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{t.cookingClassDesc}</p>
                      <button 
                        onClick={() => setBookedExperience(t.cookingClass)}
                        className="w-full py-3 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Réserver l'atelier (45€)
                      </button>
                    </div>
                  </div>

                  {/* Exp 2 */}
                  <div className="bg-white rounded-3xl overflow-hidden border border-stone-300 hover:shadow-md transition-all flex flex-col justify-between h-full">
                    <div className="relative h-48 bg-stone-100">
                      <img 
                        src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80" 
                        alt="Desert getaway" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-bold-bg border border-stone-300 px-3 py-1 rounded-full text-[10px] font-bold text-bold-text uppercase tracking-wider">
                        Marrakech Medina
                      </div>
                    </div>
                    <div className="p-6 space-y-4 text-left">
                      <h4 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.desertTrip}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{t.desertTripDesc}</p>
                      <button 
                        onClick={() => setBookedExperience(t.desertTrip)}
                        className="w-full py-3 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Réserver l'escapade (120€)
                      </button>
                    </div>
                  </div>

                  {/* Exp 3 */}
                  <div className="bg-white rounded-3xl overflow-hidden border border-stone-300 hover:shadow-md transition-all flex flex-col justify-between h-full">
                    <div className="relative h-48 bg-stone-100">
                      <img 
                        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" 
                        alt="Medina walk" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-bold-bg border border-stone-300 px-3 py-1 rounded-full text-[10px] font-bold text-bold-text uppercase tracking-wider">
                        Rabat & Tanger
                      </div>
                    </div>
                    <div className="p-6 space-y-4 text-left">
                      <h4 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">{t.medinaTour}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{t.medinaTourDesc}</p>
                      <button 
                        onClick={() => setBookedExperience(t.medinaTour)}
                        className="w-full py-3 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Réserver la visite (30€)
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 5: AI CONCIERGE CHAT (Powered by Gemini) */}
          {activeTab === "assistant" && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6"
            >
              
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <span className="px-3 py-1 bg-bold-teal/10 border border-bold-teal/20 text-bold-teal rounded-full text-[10px] font-sans font-bold uppercase tracking-widest inline-block">
                  Propulsé par Gemini 3.5
                </span>
                <h1 className="font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl text-bold-text">
                  {t.aiTitle}
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed">{t.aiSubtitle}</p>
              </div>

              {/* CHAT CONTAINER */}
              <div className="bg-white rounded-3xl border border-stone-300 shadow-xl overflow-hidden flex flex-col h-[550px]">
                
                {/* Header Concierge Status */}
                <div className="bg-stone-950 text-white p-4 flex items-center justify-between border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-bold-copper bg-bold-bg text-bold-copper flex items-center justify-center font-bold text-sm shrink-0">
                      DN
                    </div>
                    <div className="text-left">
                      <span className="font-display font-bold uppercase tracking-wider text-xs block text-stone-100">Concierge Dar & Numa</span>
                      <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                        En ligne · IA Connectée
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-stone-400 font-sans uppercase tracking-widest block">Localisation :</span>
                    <span className="text-xs text-bold-copper font-bold uppercase tracking-wider">{searchCity === "all" ? "Casablanca" : searchCity}</span>
                  </div>
                </div>

                {/* Messages Panel */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-stone-50">
                  {messages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 text-xs text-left relative ${
                        msg.sender === "user" 
                          ? "bg-bold-text text-white rounded-tr-none" 
                          : "bg-white text-bold-text border border-stone-300 rounded-tl-none shadow-sm"
                      }`}>
                        <div className="leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </div>
                        <span className={`text-[8px] block text-right mt-1.5 opacity-60 ${msg.sender === "user" ? "text-white/80 font-mono" : "text-stone-500 font-mono"}`}>
                          {msg.timestamp} {msg.isDemo ? " (Démo hors-ligne)" : ""}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-stone-300 text-bold-text rounded-2xl rounded-tl-none p-4 text-sm shadow-sm flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Predefined prompt helper buttons */}
                <div className="p-3 bg-[#F5F2ED]/60 border-t border-stone-200 flex flex-wrap gap-2 justify-start">
                  <span className="text-[9px] font-sans font-bold text-stone-500 uppercase tracking-widest self-center mr-1">
                    Sujets suggérés :
                  </span>
                  {[
                    "Où manger un tajine au Maarif ?",
                    "Darija dictionnaire utile",
                    "Comment marche le check-in ?",
                    "Que faire à Casablanca en 1 jour ?"
                  ].map((query) => (
                    <button
                      key={query}
                      onClick={() => handlePredefinedAiQuery(query)}
                      className="px-3 py-1.5 bg-white border border-stone-300 rounded-full text-xs text-stone-700 hover:border-bold-copper hover:text-bold-copper transition-all font-medium"
                    >
                      {query}
                    </button>
                  ))}
                </div>

                {/* Chat Form */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-200 flex gap-2">
                  <input 
                    type="text" 
                    placeholder={t.aiPlaceholder}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-grow bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-bold-text"
                  />
                  <button 
                    type="submit"
                    className="px-5 py-3 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5"
                  >
                    <span>{t.aiBtn}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>

            </motion.div>
          )}

          {/* TAB 6: GUEST / MEMBER PORTAL & AUTOMATED CHECK-IN */}
          {activeTab === "member" && (
            <motion.div
              key="member"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-left"
            >
              
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold text-bold-copper uppercase tracking-widest font-sans">
                  Portail Client intelligent
                </span>
                <h1 className="font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl text-bold-text">
                  Enregistrement en ligne autonome
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Gagnez du temps : validez vos documents en quelques secondes et obtenez votre code d'accès numérique sécurisé avant votre arrivée au Riad.
                </p>
              </div>

              {/* Steps Progress Header Indicator */}
              <div className="max-w-xl mx-auto flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${checkinStep >= 1 ? "bg-bold-text text-white" : "bg-stone-200 text-stone-500"}`}>1</span>
                  <span className={`text-[10px] font-sans font-black uppercase tracking-wider ${checkinStep === 1 ? "text-bold-text" : "text-stone-400"}`}>Réservation</span>
                </div>
                <div className="flex-grow h-0.5 bg-stone-200 mx-4" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${checkinStep >= 2 ? "bg-bold-text text-white" : "bg-stone-200 text-stone-500"}`}>2</span>
                  <span className={`text-[10px] font-sans font-black uppercase tracking-wider ${checkinStep === 2 ? "text-bold-text" : "text-stone-400"}`}>Identité</span>
                </div>
                <div className="flex-grow h-0.5 bg-stone-200 mx-4" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${checkinStep >= 3 ? "bg-bold-text text-white" : "bg-stone-200 text-stone-500"}`}>3</span>
                  <span className={`text-[10px] font-sans font-black uppercase tracking-wider ${checkinStep === 3 ? "text-bold-text" : "text-stone-400"}`}>Clés d'accès</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
                
                {/* LEFT SIDE: STEPS CONTAINER (7 Cols) */}
                <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-300 shadow-sm space-y-6">
                  
                  {portalError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                      ⚠️ {portalError}
                    </div>
                  )}

                  {/* CHECKIN STEP 1: VERIFY BOOKING CODE */}
                  {checkinStep === 1 && (
                    <div className="space-y-4 text-left">
                      <div className="space-y-1">
                        <h3 className="font-display font-bold uppercase tracking-tight text-lg text-[#111111]">
                          Rechercher votre séjour
                        </h3>
                        <p className="text-xs text-stone-500 leading-relaxed">
                          Saisissez le code de réservation que vous avez reçu par e-mail ou SMS pour commencer.
                        </p>
                      </div>

                      {/* Demo code fill-in shortcut */}
                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5">
                        <span className="text-[8px] font-sans font-black bg-bold-copper text-white px-2 py-0.5 rounded-full uppercase tracking-widest inline-block">
                          Démonstration
                        </span>
                        <p className="text-[11px] text-stone-600 leading-normal">
                          Testez avec le code pré-configuré <span className="font-mono font-bold text-bold-teal">DAR-777888</span> ou créez une réservation dans l'onglet des appartements.
                        </p>
                        <button 
                          type="button"
                          onClick={() => setPortalBookingCode("DAR-777888")}
                          className="text-[10px] text-bold-copper hover:underline font-bold font-sans uppercase tracking-widest"
                        >
                          Remplir automatiquement DAR-777888
                        </button>
                      </div>

                      <div className="flex flex-col pt-2">
                        <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                          Code de Réservation
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: DAR-777888"
                          value={portalBookingCode}
                          onChange={(e) => setPortalBookingCode(e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-mono tracking-widest font-black focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                        />
                      </div>

                      <button 
                        type="button"
                        onClick={() => {
                          if (!portalBookingCode.trim()) {
                            setPortalError("Veuillez saisir votre code de réservation.");
                            return;
                          }
                          setIsCheckinSubmitting(true);
                          setPortalError(null);

                          // Simulate lookup
                          setTimeout(() => {
                            // Call api or use pre-seed
                            const isDemo = portalBookingCode.toUpperCase().trim() === "DAR-777888";
                            if (isDemo) {
                              setPortalBooking({
                                id: "dar-essaada",
                                bookingCode: "DAR-777888",
                                propertyId: "dar-essaada",
                                propertyName: { fr: "Dar Essaada - Studio Loft Maarif", en: "Dar Essaada - Maarif Studio Loft", ar: "دار السعادة - ستوديو لوفت المعاريف" },
                                city: "Casablanca",
                                neighborhood: "Maarif",
                                clientName: "Achraf Lahlou",
                                clientEmail: "achraf@example.com",
                                guests: 2,
                                checkInDate: "2026-07-15",
                                checkOutDate: "2026-07-18",
                                totalPrice: 225,
                                pinCode: "*7788#",
                                wifiCode: "DAR_NUMA_SECURE_GUEST"
                              });
                              setCheckinStep(2);
                            } else if (simulatedBookingResult && portalBookingCode.toUpperCase().trim() === simulatedBookingResult.bookingCode) {
                              setPortalBooking(simulatedBookingResult);
                              setCheckinStep(2);
                            } else {
                              setPortalError("Code de réservation introuvable. Veuillez vérifier votre saisie.");
                            }
                            setIsCheckinSubmitting(false);
                          }, 1000);
                        }}
                        disabled={isCheckinSubmitting}
                        className="w-full py-3.5 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <span>{isCheckinSubmitting ? "Recherche en cours..." : "Rechercher mon séjour"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* CHECKIN STEP 2: ID VERIFICATION & CANVAS SIGNATURE */}
                  {checkinStep === 2 && portalBooking && (
                    <div className="space-y-4 text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] font-sans font-bold bg-[#FACCD1] text-bold-text px-2 py-0.5 rounded-full uppercase tracking-widest inline-block">
                          {portalBooking.propertyName[language]}
                        </span>
                        <h3 className="font-display font-bold uppercase tracking-tight text-lg text-[#111111]">
                          Validation d'identité sécurisée
                        </h3>
                        <p className="text-xs text-stone-500 leading-relaxed">
                          Pour valider légalement votre séjour au Maroc, veuillez renseigner votre passeport et apposer votre signature.
                        </p>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                          Numéro de passeport / ID
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: MA199203"
                          value={portalPassport}
                          onChange={(e) => setPortalPassport(e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>

                      {/* ID Document Scanner simulation with animated progress bar */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">
                          Numérisation du Passeport / ID
                        </label>
                        
                        {isScanningId ? (
                          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-stone-600 font-bold animate-pulse">Analyse OCR du document...</span>
                              <span className="font-mono text-bold-copper font-bold">{idScanProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                              <div className="h-full bg-bold-copper transition-all duration-100" style={{ width: `${idScanProgress}%` }} />
                            </div>
                          </div>
                        ) : portalIdUploaded ? (
                          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span>Document d'identité validé avec succès</span>
                            </div>
                            <button 
                              type="button"
                              onClick={() => { setPortalIdUploaded(false); setIdScanProgress(0); }}
                              className="text-[10px] text-rose-600 hover:underline uppercase font-bold"
                            >
                              Réinitialiser
                            </button>
                          </div>
                        ) : (
                          <button 
                            type="button"
                            onClick={() => {
                              setIsScanningId(true);
                              setIdScanProgress(0);
                              const interval = setInterval(() => {
                                setIdScanProgress(prev => {
                                  if (prev >= 100) {
                                    clearInterval(interval);
                                    setIsScanningId(false);
                                    setPortalIdUploaded(true);
                                    return 100;
                                  }
                                  return prev + 10;
                                });
                              }, 100);
                            }}
                            className="w-full p-4 rounded-xl border-2 border-dashed border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-bold-copper transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                          >
                            <Shield className="w-4 h-4 text-bold-copper" />
                            Scanner ma pièce d'identité (Simulé)
                          </button>
                        )}
                      </div>

                      {/* Interactive Canvas Signature Pad */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">
                            Signature électronique tactile
                          </label>
                          {hasSignature && (
                            <button 
                              type="button" 
                              onClick={clearSignature}
                              className="text-[10px] text-rose-600 font-bold hover:underline"
                            >
                              Effacer
                            </button>
                          )}
                        </div>

                        <canvas
                          ref={canvasRef}
                          width={320}
                          height={110}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="border border-stone-300 rounded-xl bg-stone-50 cursor-crosshair w-full"
                        />
                        <p className="text-[9px] text-stone-400 italic text-center">
                          Signez à l'aide de votre souris ou de votre doigt sur écran tactile ci-dessus.
                        </p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button 
                          type="button"
                          onClick={() => setCheckinStep(1)}
                          className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-bold uppercase tracking-widest"
                        >
                          Retour
                        </button>
                        
                        <button 
                          type="button"
                          disabled={isCheckinSubmitting || !portalIdUploaded || !hasSignature || !portalPassport}
                          onClick={() => {
                            setIsCheckinSubmitting(true);
                            // Submit to DB check-in endpoint
                            fetch("/api/booking/check-in", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                bookingCode: portalBookingCode.toUpperCase().trim(),
                                passportNumber: portalPassport || "MA992830",
                                simulateIdUpload: true
                              })
                            })
                              .then(res => res.json())
                              .then(data => {
                                setPortalBooking(data.booking);
                                setPortalCheckinSuccess(true);
                                setIsCheckinSubmitting(false);
                                setCheckinStep(3);
                              })
                              .catch(err => {
                                console.error("Check-in submit error:", err);
                                setPortalError("Une erreur est survenue.");
                                setIsCheckinSubmitting(false);
                              });
                          }}
                          className="flex-grow py-3.5 bg-bold-text hover:bg-bold-copper disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          <span>{isCheckinSubmitting ? "Enregistrement..." : "Finaliser mon check-in"}</span>
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CHECKIN STEP 3: DIGITAL DOOR KEYS GENERATED */}
                  {checkinStep === 3 && portalBooking && (
                    <div className="space-y-5 text-left">
                      
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle className="w-6 h-6 fill-emerald-100" />
                        <h4 className="font-display font-black uppercase tracking-tight text-lg text-emerald-800">
                          {t.checkinSuccess}
                        </h4>
                      </div>

                      <div className="space-y-4 text-xs text-stone-600 font-sans">
                        
                        <div className="border-b border-stone-200 pb-3 space-y-1">
                          <span className="text-[8px] font-sans text-stone-400 block uppercase tracking-wider font-bold">PROPRIÉTÉ</span>
                          <p className="font-bold text-bold-text text-sm">{portalBooking.propertyName[language]}</p>
                          <p className="text-stone-500">{portalBooking.city} · {portalBooking.neighborhood}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-3">
                          <div>
                            <span className="text-[8px] font-sans text-stone-400 block uppercase tracking-wider font-bold">DATES DU SÉJOUR</span>
                            <p className="font-medium text-stone-900">{portalBooking.checkInDate} / {portalBooking.checkOutDate}</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-sans text-stone-400 block uppercase tracking-wider font-bold">RECONNAISSANCE CLIENT</span>
                            <p className="font-medium text-stone-900">{portalBooking.clientName}</p>
                          </div>
                        </div>

                        {/* DOOR CODE CREDENTIALS */}
                        <div className="bg-[#111111] text-stone-100 rounded-2xl p-5 space-y-3 text-center border border-stone-800 shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-bold-copper to-amber-500" />
                          <span className="text-[9px] font-sans text-bold-copper font-black tracking-widest block uppercase">
                            Votre code d'accès de porte sécurisé
                          </span>
                          <p className="text-3xl font-mono font-extrabold tracking-[0.2em] text-white">
                            {portalBooking.pinCode}
                          </p>
                          <p className="text-[10px] text-stone-400 leading-normal max-w-xs mx-auto">
                            Entrez ce code sur le pavé numérique physique du Riad ou de l'appartement pour déverrouiller la serrure d'entrée.
                          </p>

                          <button 
                            type="button"
                            onClick={() => {
                              setActiveTab("how-it-works");
                              setEnteredPin(portalBooking.pinCode.replace("#","").replace("*",""));
                            }}
                            className="text-[10px] text-bold-copper hover:underline font-black uppercase tracking-widest block mx-auto mt-2"
                          >
                            Tester sur le simulateur de porte →
                          </button>
                        </div>

                        {/* WIFI INFORMATION */}
                        <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 flex items-center justify-between gap-2 font-mono">
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4 text-bold-teal" />
                            <div>
                              <span className="text-[8px] text-stone-400 block">RÉSEAU WIFI PRIVÉ</span>
                              <span className="text-xs font-bold text-stone-900">{portalBooking.wifiCode}</span>
                            </div>
                          </div>
                          <span className="text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100 font-sans font-bold uppercase">Actif</span>
                        </div>

                        {/* CONTACTLESS BLUETOOTH / NFC KEY OPENER */}
                        <div className="pt-3 border-t border-stone-200 space-y-3">
                          <span className="text-[9px] font-sans text-stone-400 block uppercase tracking-wider font-bold">
                            Ouverture instantanée par smartphone
                          </span>
                          
                          {isNfcPressing ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                              <span className="text-xs text-emerald-800 font-bold block animate-bounce">📡 Transmission de la clé chiffrée par NFC...</span>
                              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 transition-all duration-150" style={{ width: `${nfcSignalProgress}%` }} />
                              </div>
                            </div>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => {
                                setIsNfcPressing(true);
                                setNfcSignalProgress(0);
                                const interval = setInterval(() => {
                                  setNfcSignalProgress(prev => {
                                    if (prev >= 100) {
                                      clearInterval(interval);
                                      setIsNfcPressing(false);
                                      setLockStatus("opened"); // unlocks the simulator door!
                                      alert("🟢 Signal reçu ! La serrure numérique de votre appartement a été ouverte à distance.");
                                      return 100;
                                    }
                                    return prev + 20;
                                  });
                                }, 150);
                              }}
                              className="w-full py-3 bg-[#FACCD1] hover:bg-bold-copper text-bold-text hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                              <Smartphone className="w-4 h-4" />
                              Ouvrir ma porte à distance (Bluetooth/NFC)
                            </button>
                          )}
                        </div>

                        <button 
                          type="button"
                          onClick={() => {
                            setCheckinStep(1);
                            setPortalBookingCode("");
                            setPortalCheckinSuccess(false);
                            setPortalBooking(null);
                          }}
                          className="w-full text-center text-xs text-stone-500 hover:underline uppercase tracking-wider font-semibold py-2"
                        >
                          Enregistrer un autre séjour
                        </button>

                      </div>

                    </div>
                  )}

                </div>

                {/* RIGHT SIDE: INTERACTIVE PORTAL FEEDBACK PANEL (5 Cols) */}
                <div className="md:col-span-5 space-y-6">
                  
                  {/* Smart lock interactive mock view */}
                  <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-stone-800 text-stone-100 text-center space-y-6">
                    <span className="text-[8px] font-sans text-bold-copper font-black tracking-widest uppercase block">
                      Statut de la porte de votre hébergement
                    </span>
                    
                    <div className="flex flex-col items-center py-6">
                      <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all ${
                        lockStatus === "opened" ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" :
                        lockStatus === "error" ? "border-rose-500 bg-rose-500/10 text-rose-400" :
                        "border-stone-700 bg-stone-900/50 text-stone-400"
                      }`}>
                        {lockStatus === "opened" ? (
                          <Unlock className="w-12 h-12 animate-pulse" />
                        ) : (
                          <Lock className="w-12 h-12" />
                        )}
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <p className="font-mono text-lg font-bold tracking-wider text-white">
                          {lockStatus === "opened" ? "ACCÈS AUTORISÉ" : lockStatus === "error" ? "ACCÈS REFUSÉ" : "VERROUILLÉ"}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {lockStatus === "opened" ? "Porte ouverte. Marhaban !" : lockStatus === "error" ? "Code erroné, réessayez." : "Prêt à recevoir les instructions NFC ou un code pin."}
                        </p>
                      </div>
                    </div>

                    <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-left text-[11px] text-stone-400 space-y-2">
                      <p className="font-bold text-white uppercase text-[9px] tracking-wider border-b border-stone-800 pb-1.5">Historique de la serrure</p>
                      <p className="flex justify-between font-mono">
                        <span>[12:00] Initialisation lock_v2...</span>
                        <span className="text-emerald-500">OK</span>
                      </p>
                      {checkinStep === 3 && (
                        <p className="flex justify-between font-mono text-bold-copper animate-pulse">
                          <span>[MAIN] Clé d'accès générée...</span>
                          <span>ACTIVE</span>
                        </p>
                      )}
                      {lockStatus === "opened" && (
                        <p className="flex justify-between font-mono text-emerald-400">
                          <span>[MAIN] Serrure déverrouillée...</span>
                          <span>OPENED</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Customer support shortcut */}
                  <div className="bg-[#FAF6F2] rounded-3xl p-6 border border-stone-300 text-left space-y-3">
                    <h4 className="font-display font-bold uppercase tracking-tight text-xs text-bold-text border-b border-stone-200 pb-2">
                      Besoin d'aide pour le check-in ?
                    </h4>
                    <p className="text-xs text-stone-600 leading-normal">
                      Notre conciergerie locale est disponible 24h/24 par WhatsApp et téléphone pour vous accompagner dans votre entrée autonome.
                    </p>
                    <a 
                      href={`tel:${t.phoneNum}`}
                      className="text-xs font-black uppercase tracking-wider text-bold-copper hover:underline inline-block pt-1"
                    >
                      📞 Appeler l'équipe d'assistance →
                    </a>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 7: ABOUT & TRIP JOURNAL WITH DEDICATED IMMERSIVE VIDEO */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left"
            >
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <span className="px-3 py-1 bg-bold-copper/10 border border-bold-copper/20 text-bold-copper rounded-full text-[10px] font-sans font-bold uppercase tracking-widest inline-block">
                  {language === "fr" ? "Carnet de Voyage" : language === "en" ? "Travel Journal" : "دفتر السفر"}
                </span>
                <h1 className="font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl text-bold-text">
                  {language === "fr" ? "Mon Voyage au Maroc" : language === "en" ? "My Trip to Morocco" : "رحلتي إلى المغرب"}
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {language === "fr" 
                    ? "Plongez dans le récit immersif de notre périple marocain. Lisez nos aventures et découvrez la beauté du Royaume à travers notre documentaire vidéo exclusif."
                    : language === "en"
                    ? "Immerse yourself in the story of our Moroccan journey. Read our adventures and discover the beauty of the Kingdom through our exclusive video documentary."
                    : "انغمس في القصة الملهمة لرحلتنا المغربية. اقرأ مغامراتنا واكتشف جمال المملكة من خلال فيلمنا الوثائقي الحصري."}
                </p>
              </div>

              {/* TWO COLUMN CONTENT: VIDEO PLAYER + JOURNAL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT: JOURNAL STORY (7 Cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-300 shadow-sm space-y-8 text-left">
                  <div className="border-b border-stone-200 pb-4">
                    <h2 className="font-display font-bold uppercase tracking-tight text-xl text-bold-text">
                      {language === "fr" ? "📖 Le Récit de Voyage" : language === "en" ? "📖 The Travelogue" : "📖 رواية الرحلة"}
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      {language === "fr" ? "Par Achraf · Durée : 5 jours d'immersion totale" : language === "en" ? "By Achraf · Duration: 5 days of total immersion" : "بقلم أشرف · المدة: 5 أيام من الانغماس الكامل"}
                    </p>
                  </div>

                  <div className="space-y-6 text-xs text-stone-700 leading-relaxed font-sans">
                    {/* Day 1 */}
                    <div className="space-y-2">
                      <span className="font-mono font-bold text-bold-copper uppercase tracking-wider block text-[10px]">
                        Day 1: {language === "fr" ? "Casablanca — Arrivée et Modernité" : language === "en" ? "Casablanca — Arrival & Modernity" : "الدار البيضاء — الوصول والحداثة"}
                      </span>
                      <h3 className="font-display font-bold uppercase tracking-tight text-base text-bold-text">
                        {language === "fr" ? "L'élégance du quartier Maarif" : language === "en" ? "The Elegance of Maarif District" : "أناقة حي المعاريف"}
                      </h3>
                      <p>
                        {language === "fr" 
                          ? "Dès notre arrivée à Casablanca, nous nous sommes installés dans l'appartement connecté de Dar & Numa au Maarif. Grâce au check-in automatique, nous avons ouvert la porte en quelques secondes avec notre code numérique. Nous avons ensuite visité la majestueuse Mosquée Hassan II, dont le minaret domine l'océan, avant de déguster un tajine savoureux dans une petite ruelle animée recommandée par notre Assistant IA."
                          : language === "en"
                          ? "As soon as we arrived in Casablanca, we settled into the connected Dar & Numa apartment in Maarif. Thanks to the automatic check-in, we opened the door in seconds with our digital code. We then visited the majestic Hassan II Mosque, whose minaret dominates the ocean, before tasting a tasty tagine in a lively alley recommended by our AI Assistant."
                          : "بمجرد وصولنا إلى الدار البيضاء، استقررنا في شقة دار ونوما الذكية بالمعاريف. بفضل تسجيل الوصول التلقائي، فتحنا الباب في ثوانٍ باستخدام رمزنا الرقمي. ثم زرنا مسجد الحسن الثاني المهيب، الذي يهيمن مئذنته على المحيط، قبل تذوق طاجين لذيذ في زقاق حيوي أوصى به مساعد الذكاء الاصطناعي الخاص بنا."}
                      </p>
                    </div>

                    {/* Day 2 */}
                    <div className="space-y-2 border-t border-stone-100 pt-4">
                      <span className="font-mono font-bold text-bold-copper uppercase tracking-wider block text-[10px]">
                        Day 2: {language === "fr" ? "Rabat — La Cité Jardin" : language === "en" ? "Rabat — The Garden City" : "الرباط — مدينة الحدائق"}
                      </span>
                      <h3 className="font-display font-bold uppercase tracking-tight text-base text-bold-text">
                        {language === "fr" ? "La quiétude de la Kasbah des Oudayas" : language === "en" ? "The Serenity of Oudayas Kasbah" : "هدوء قصبة الأوداية"}
                      </h3>
                      <p>
                        {language === "fr" 
                          ? "Rabat nous a séduits par son calme et son élégance impériale. Nous avons déambulé à travers les ruelles bleues et blanches de la Kasbah des Oudayas, dominant l'embouchure du Bouregreg. Le contraste entre le patrimoine historique préservé et la modernité des infrastructures est saisissant."
                          : language === "en"
                          ? "Rabat seduced us with its calm and imperial elegance. We wandered through the blue and white alleys of the Oudayas Kasbah, overlooking the mouth of the Bouregreg. The contrast between the preserved historical heritage and the modern infrastructure is striking."
                          : "سحرتنا الرباط بهدوئها وأناقتها الإمبراطورية. تجولنا في الأزقة الزرقاء والبيضاء لقصبة الأوداية المطلة على مصب نهر أبي رقراق. إن التباين بين التراث التاريخي المحفوظ وبنية التحتية الحديثة مذهل حقاً."}
                      </p>
                    </div>

                    {/* Day 3 & 4 */}
                    <div className="space-y-2 border-t border-stone-100 pt-4">
                      <span className="font-mono font-bold text-bold-copper uppercase tracking-wider block text-[10px]">
                        Days 3 & 4: {language === "fr" ? "Marrakech — L'effervescence de la Médina" : language === "en" ? "Marrakech — Medina Effervescence" : "مراكش — صخب المدينة القديمة"}
                      </span>
                      <h3 className="font-display font-bold uppercase tracking-tight text-base text-bold-text">
                        {language === "fr" ? "Lumière ocre et charme éternel" : language === "en" ? "Ochre Light & Eternal Charm" : "الضوء المغري والسحر الأبدي"}
                      </h3>
                      <p>
                        {language === "fr" 
                          ? "Le voyage continue vers le sud. Marrakech nous accueille avec ses remparts ocre et sa place mythique Jemaa el-Fnaa. Nous avons séjourné dans un riad traditionnel revisité par Dar & Numa, alliant le charme millénaire du tadelakt et du zellige fait main avec la fluidité numérique totale de la serrure connectée."
                          : language === "en"
                          ? "The journey continues south. Marrakech welcomes us with its ochre walls and its mythical Jemaa el-Fnaa square. We stayed in a traditional riad modernized by Dar & Numa, blending the thousand-year-old charm of tadelakt and handmade zellige with the complete digital fluidity of the smart lock."
                          : "تستمر الرحلة جنوباً. ترحب بنا مراكش بأسوارها المغرة وساحتها الأسطورية جامع الفناء. أقمنا في رياض تقليدي قامت دار ونوما بتحديثه، ويمزج بين سحر التادلاكت والزليج المصنوع يدوياً منذ آلاف السنين مع السلاسة الرقمية الكاملة للقفل الذكي."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT: PREMIUM VIDEO PLAYER (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Video Player Card */}
                  <div className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl text-stone-100 relative">
                    
                    {/* Header */}
                    <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="font-display font-bold uppercase tracking-wider text-[11px] text-white">
                          Morocco Cinematic Guide 4K
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-bold-copper uppercase font-bold tracking-widest">
                        HD 1080P
                      </span>
                    </div>

                    {/* Iframe Video Embed */}
                    <div className="relative aspect-video bg-black">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/k480H7-u5qE?rel=0&modestbranding=1"
                        title={language === "fr" ? "Documentaire Voyage Maroc" : "Morocco Travel Documentary"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Metadata & Description */}
                    <div className="p-6 space-y-3 text-left">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-bold-copper/20 text-bold-copper text-[9px] font-bold font-mono uppercase">
                          Featured Video
                        </span>
                        <span className="text-[10px] text-stone-400 font-sans">
                          {language === "fr" ? "Film de relaxation et d'immersion" : "Relaxation & Immersion Film"}
                        </span>
                      </div>
                      <h4 className="font-display font-bold uppercase tracking-tight text-base text-white">
                        {language === "fr" ? "Royaume de Lumière — Documentaire" : "Kingdom of Light — Documentary"}
                      </h4>
                      <p className="text-[11px] text-stone-400 leading-relaxed">
                        {language === "fr" 
                          ? "Voyagez à travers les paysages spectaculaires du Maroc : désert, oasis, sommets de l'Atlas et ruelles bleues. Une source d'inspiration incontournable pour votre prochain séjour."
                          : language === "en"
                          ? "Travel through the spectacular landscapes of Morocco: desert, oases, Atlas peaks, and blue streets. An essential source of inspiration for your next stay."
                          : "سافر عبر المناظر الطبيعية الخلابة للمغرب: الصحراء، والواحات، وقمم الأطلس، والشوارع الزرقاء. مصدر إلهام أساسي لإقامتك القادمة."}
                      </p>
                    </div>

                  </div>

                  {/* Quick Local Insights checklist */}
                  <div className="bg-[#F5F2ED] rounded-3xl p-6 border border-stone-300 text-left space-y-4">
                    <h4 className="font-display font-bold uppercase tracking-tight text-xs text-bold-text block border-b border-stone-200 pb-2">
                      💡 {language === "fr" ? "Conseils pour votre voyage" : "💡 Local Travel Tips"}
                    </h4>
                    <ul className="text-xs text-stone-600 space-y-2.5 leading-normal">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-bold-teal shrink-0 mt-0.5" />
                        <span><strong>{language === "fr" ? " Darija Utile" : "Useful Darija"} :</strong> Say "Choukrane" for thank you and "Marhaban" for welcome.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-bold-teal shrink-0 mt-0.5" />
                        <span><strong>{language === "fr" ? " Climat & Habits" : "Climate & Clothing"} :</strong> Even in summer, nights in Marrakech and Agafay desert can be breezy. Carry a light jacket.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-bold-teal shrink-0 mt-0.5" />
                        <span><strong>{language === "fr" ? " Transport local" : "Local Transport"} :</strong> Use small red taxis (Petit Taxi) inside Casablanca, or book via Careem/Indrive app.</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-stone-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-800 text-left">
          
          <div className="space-y-4">
            <h4 className="font-display font-black uppercase tracking-tighter text-white text-lg">{t.brandName}</h4>
            <p className="text-xs leading-relaxed max-w-sm">
              Le premier réseau d'aparthôtels 100% autonome et connecté du Maroc, associant confort de suite résidentielle et hospitalité locale authentique.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-display font-bold text-stone-200 text-xs uppercase tracking-widest font-sans">
              Support 24h/24 & Réseaux
            </h5>
            <ul className="text-xs space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bold-copper" />
                <span>{t.support24} : <strong className="text-white">{t.phoneNum}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-stone-500" />
                <span>Service disponible 7j/7</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-display font-bold text-stone-200 text-xs uppercase tracking-widest font-sans">
              Optimisation Locale
            </h5>
            <p className="text-xs leading-relaxed">
              {t.citiesServed}
            </p>
            <p className="text-[9px] text-stone-500 font-mono tracking-wide leading-relaxed">
              Mots-clés cibles : Appart hôtel Casablanca · Studio meublé Maarif · Appartement Gauthier · Location courte durée Maroc.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-wider font-semibold">
          <span>{t.copyright}</span>
          <div className="flex gap-4">
            <span className="text-stone-600">Built in Cloud Run container</span>
          </div>
        </div>
      </footer>

      {/* MODAL: PROPERTY DETAILS & BOOKING SIMULATOR */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-stone-300 shadow-2xl flex flex-col md:flex-row text-left"
          >
            
            {/* Left side details & Photos */}
            <div className="w-full md:w-1/2 bg-stone-50 flex flex-col overflow-y-auto max-h-[85vh] md:max-h-[90vh] border-r border-stone-200">
              
              {/* Hero Image Block */}
              <div className="relative h-64 shrink-0 bg-stone-200">
                <img 
                  src={selectedProperty.images.hero} 
                  alt={selectedProperty.name[language]} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close modal floating button */}
                <button 
                  onClick={() => { setSelectedProperty(null); setSimulatedBookingResult(null); }}
                  className="absolute top-4 left-4 bg-bold-text hover:bg-bold-copper text-white p-2.5 rounded-full transition-all shadow-md z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-sans text-bold-copper font-bold uppercase tracking-widest block">
                    {selectedProperty.city} · {selectedProperty.neighborhood}
                  </span>
                  <h4 className="font-display font-bold uppercase tracking-tight text-lg text-bold-text">
                    {selectedProperty.name[language]}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-bold-copper text-bold-copper" />
                    <span>{selectedProperty.rating} / 5</span>
                    <span className="text-stone-300">|</span>
                    <span className="text-bold-copper">{selectedProperty.pricePerNight}€ / nuit</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description and Highlights */}
              <div className="p-6 space-y-6 text-left">
                
                {/* Description */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">
                    {language === "fr" ? "Description de la propriété" : language === "en" ? "Property Description" : "وصف العقار"}
                  </h5>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {selectedProperty.description[language]}
                  </p>
                </div>

                {/* Weather Forecast Widget */}
                <WeatherWidget city={selectedProperty.city} language={language} />

                {/* Local Highlights */}
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200">
                  <h5 className="text-[10px] font-sans font-bold text-stone-500 uppercase tracking-widest block border-b border-stone-100 pb-2">
                    📍 {language === "fr" ? "Points forts du quartier" : language === "en" ? "Neighborhood Highlights" : "أبرز معالم الحي"}
                  </h5>
                  <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                    {selectedProperty.localHighlights[language].map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-bold-teal shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DYNAMIC REVIEWS SECTION */}
                <div className="space-y-6 pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold uppercase tracking-tight text-base text-bold-text">
                      ⭐ {language === "fr" ? "Avis des clients" : language === "en" ? "Guest Reviews" : "آراء النزلاء"}
                    </h4>
                    <span className="text-xs font-mono font-bold text-bold-copper bg-bold-copper/10 px-2.5 py-1 rounded-full">
                      {selectedProperty.rating} / 5 ({selectedProperty.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {(!selectedProperty.reviews || selectedProperty.reviews.length === 0) ? (
                      <p className="text-xs text-stone-400 italic text-center py-4">
                        {language === "fr" ? "Aucun avis pour le moment. Soyez le premier !" : language === "en" ? "No reviews yet. Be the first one to post!" : "لا توجد تقييمات بعد. كن أول من يعلق!"}
                      </p>
                    ) : (
                      selectedProperty.reviews.map((rev) => (
                        <div key={rev.id} className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-2 relative">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-bold-text block">{rev.author}</span>
                            <span className="text-[9px] font-mono text-stone-400">{rev.date}</span>
                          </div>
                          
                          {/* Stars */}
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.round(rev.rating) ? "fill-bold-copper text-bold-copper" : "text-stone-200"}`} 
                              />
                            ))}
                          </div>

                          <p className="text-stone-600 text-xs leading-relaxed">
                            {rev.comment[language] || rev.comment.fr}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* WRITE A REVIEW FORM */}
                  <div className="bg-[#FBF9F6] p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h5 className="text-[11px] font-sans font-bold text-bold-text uppercase tracking-wider block">
                      ✍️ {language === "fr" ? "Laisser un avis" : language === "en" ? "Write a Review" : "كتابة تقييم"}
                    </h5>

                    {reviewSuccess && (
                      <div className="p-3 bg-[#EBFDFA] border border-[#BCF3E6] rounded-xl text-xs text-[#067A60] font-semibold">
                        🎉 {reviewSuccess}
                      </div>
                    )}

                    {reviewError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                        ⚠️ {reviewError}
                      </div>
                    )}

                    <form onSubmit={handleCreateReview} className="space-y-3">
                      
                      <div className="flex flex-col">
                        <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">
                          {language === "fr" ? "Votre Nom" : language === "en" ? "Your Name" : "اسمك"}
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Sonia B."
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">
                          {language === "fr" ? "Note (Étoiles)" : language === "en" ? "Rating" : "التقييم"}
                        </label>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const starValue = i + 1;
                            return (
                              <button
                                type="button"
                                key={i}
                                onClick={() => setReviewRating(starValue)}
                                className="focus:outline-none transition-transform active:scale-90"
                              >
                                <Star 
                                  className={`w-5 h-5 ${starValue <= reviewRating ? "fill-bold-copper text-bold-copper" : "text-stone-300 hover:text-bold-copper"}`} 
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">
                          {language === "fr" ? "Votre Commentaire" : language === "en" ? "Your Comment" : "تعليقك"}
                        </label>
                        <textarea 
                          rows={3}
                          required
                          placeholder={language === "fr" ? "Partagez votre expérience..." : language === "en" ? "Share your experience..." : "شارك تجربتك..."}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800 resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={isReviewSubmitting}
                        className="w-full py-2.5 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                      >
                        {isReviewSubmitting ? (
                          <span>{language === "fr" ? "Envoi..." : "Submitting..."}</span>
                        ) : (
                          <>
                            <span>{language === "fr" ? "Publier l'avis" : "Post Review"}</span>
                            <Send className="w-3 h-3" />
                          </>
                        )}
                      </button>

                    </form>
                  </div>

                </div>

              </div>

            </div>

            {/* Right side booking simulation form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-6 bg-white flex flex-col justify-between max-h-[85vh] md:max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <div>
                  <h3 className="font-display font-black uppercase tracking-tight text-lg text-[#111111]">
                    {checkoutStep === "form" && "1. Détails du séjour"}
                    {checkoutStep === "payment" && "2. Paiement sécurisé"}
                    {checkoutStep === "success" && "3. Réservation confirmée"}
                  </h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest font-mono">
                    {checkoutStep === "form" && "Informations & Tarifs"}
                    {checkoutStep === "payment" && "Cordonnées bancaires cryptées"}
                    {checkoutStep === "success" && "Prêt pour le check-in"}
                  </p>
                </div>
                
                {/* Desktop close button */}
                <button 
                  onClick={() => { setSelectedProperty(null); setSimulatedBookingResult(null); setCheckoutStep("form"); }}
                  className="p-1 text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP 1: FORM & PRICE ESTIMATION WITH PROMO CODE */}
              {checkoutStep === "form" && (
                <div className="space-y-4 flex-grow text-left">
                  
                  <div className="flex flex-col">
                    <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Nom Complet</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Youssef Alaoui"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Adresse E-mail</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Ex: youssef@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Arrivée</label>
                      <input 
                        type="date" 
                        required
                        value={bookingCheckIn}
                        onChange={(e) => setBookingCheckIn(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Départ</label>
                      <input 
                        type="date" 
                        required
                        value={bookingCheckOut}
                        onChange={(e) => setBookingCheckOut(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Nombre de voyageurs</label>
                    <select 
                      value={bookingGuests}
                      onChange={(e) => setBookingGuests(Number(e.target.value))}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-bold-text text-stone-800"
                    >
                      <option value="1">1 Voyageur</option>
                      <option value="2">2 Voyageurs</option>
                      <option value="3">3 Voyageurs</option>
                      <option value="4">4 Voyageurs</option>
                    </select>
                  </div>

                  {/* PROMO CODE SECTION */}
                  <div className="border-t border-b border-stone-100 py-3 space-y-2">
                    <label className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">Code promo membre numa</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Ex: NUMACLUB"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-mono uppercase tracking-widest focus:outline-none w-full text-stone-800 font-bold"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          if (promoCode.toUpperCase() === "NUMACLUB") {
                            setAppliedDiscount(0.15);
                            setPromoSuccess("Code NUMACLUB appliqué ! -15% de réduction membre !");
                            setPromoError(null);
                          } else {
                            setPromoError("Code invalide. Essayez NUMACLUB");
                            setPromoSuccess(null);
                          }
                        }}
                        className="px-4 py-1.5 bg-[#FACCD1] hover:bg-[#FAF6F2] text-bold-text text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                      >
                        Appliquer
                      </button>
                    </div>
                    {promoError && <p className="text-[10px] text-rose-600 font-bold">⚠️ {promoError}</p>}
                    {promoSuccess && <p className="text-[10px] text-emerald-600 font-black">🎉 {promoSuccess}</p>}
                  </div>

                  {/* BILLING CALCULATION SUMMARY */}
                  <div className="bg-[#FAF6F2] p-4 rounded-2xl border border-stone-200 space-y-1.5 font-sans">
                    <div className="flex justify-between text-xs text-stone-500">
                      <span>Tarif de base (3 nuits) :</span>
                      <span>{selectedProperty.pricePerNight * 3} €</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-500">
                      <span>Frais de service (ménage départs) :</span>
                      <span>15 €</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-xs text-emerald-600 font-bold">
                        <span>Réduction membre numa (15%) :</span>
                        <span>-{Math.round(selectedProperty.pricePerNight * 3 * appliedDiscount)} €</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-bold-text font-black border-t border-stone-200 pt-1.5">
                      <span>Total estimé :</span>
                      <span>
                        {Math.round((selectedProperty.pricePerNight * 3 + 15) * (1 - appliedDiscount))} €
                      </span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      if (!bookingName || !bookingEmail) {
                        setPromoError("Veuillez saisir votre nom et adresse e-mail.");
                        return;
                      }
                      setCheckoutStep("payment");
                    }}
                    className="w-full py-3.5 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow flex items-center justify-center gap-2"
                  >
                    <span>Continuer vers le paiement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: CREDIT CARD SECURE PAYMENT */}
              {checkoutStep === "payment" && (
                <div className="space-y-5 flex-grow text-left">
                  
                  {/* Interactive Credit Card Wrapper */}
                  <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-[#111111] via-[#333333] to-bold-copper text-white p-5 shadow-lg flex flex-col justify-between overflow-hidden">
                    {/* Chip and brand */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 rounded-md bg-amber-400/80 border border-amber-300 opacity-80" />
                      <span className="font-display font-black text-xs tracking-widest text-[#FACCD1]">numa.dar</span>
                    </div>

                    {/* Card Number */}
                    <div className="font-mono text-base tracking-[0.2em] text-center my-2 text-stone-200">
                      {cardNo || "•••• •••• •••• ••••"}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end text-[10px] font-mono">
                      <div>
                        <span className="text-stone-400 block text-[7px] uppercase font-sans">Cardholder</span>
                        <span className="font-bold tracking-wide uppercase">{cardName || "Youssef Alaoui"}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 block text-[7px] uppercase font-sans">Expires</span>
                        <span className="font-bold tracking-widest">{cardExpiry || "MM/YY"}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 block text-[7px] uppercase font-sans">CVV</span>
                        <span className="font-bold tracking-widest">{cardCvv || "•••"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Titulaire de la carte</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Youssef Alaoui"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Numéro de carte</label>
                      <input 
                        type="text" 
                        required
                        maxLength={19}
                        placeholder="4532 9081 2283 0092"
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Date d'expiration</label>
                        <input 
                          type="text" 
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none font-mono"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">Code CVV</label>
                        <input 
                          type="password" 
                          required
                          maxLength={3}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setCheckoutStep("form")}
                      className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Retour
                    </button>
                    
                    <button 
                      type="button"
                      onClick={(e) => {
                        setIsBookingSubmitting(true);
                        // Simulate checkout completion call
                        fetch("/api/booking/create", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            propertyId: selectedProperty.id,
                            guests: bookingGuests,
                            checkInDate: bookingCheckIn,
                            checkOutDate: bookingCheckOut,
                            clientName: bookingName || "Voyageur Dar & Numa",
                            clientEmail: bookingEmail || "client@example.com"
                          })
                        })
                          .then(res => res.json())
                          .then(data => {
                            setSimulatedBookingResult(data.booking);
                            setPortalBookingCode(data.booking.bookingCode);
                            setIsBookingSubmitting(false);
                            setCheckoutStep("success");
                          })
                          .catch(err => {
                            console.error("Booking error:", err);
                            setIsBookingSubmitting(false);
                          });
                      }}
                      disabled={isBookingSubmitting}
                      className="flex-grow py-3 bg-bold-text hover:bg-bold-copper text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow flex items-center justify-center gap-2"
                    >
                      <span>{isBookingSubmitting ? "Cryptage du paiement..." : "Payer & Confirmer"}</span>
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: BOOKING SUCCESS SUMMARY RECEIPT */}
              {checkoutStep === "success" && simulatedBookingResult && (
                <div className="space-y-5 flex-grow text-left">
                  
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-emerald-800 text-center">
                    <CheckCircle className="w-8 h-8 fill-emerald-100 text-emerald-500 mx-auto" />
                    <p className="text-xs font-black">{t.bookingSuccess}</p>
                    <p className="text-[11px] text-stone-500">Un e-mail de confirmation vient de vous être envoyé.</p>
                  </div>

                  <div className="bg-[#FAF6F2] border border-stone-200 rounded-2xl p-4 font-mono text-[11px] space-y-2 text-[#111111]">
                    <p className="border-b border-stone-200 pb-1 text-center font-bold text-xs uppercase text-bold-copper font-sans">Reçu de séjour</p>
                    <p><strong>RESERVATION:</strong> <span className="text-bold-teal font-bold">{simulatedBookingResult.bookingCode}</span></p>
                    <p><strong>PROPRIÉTÉ:</strong> {simulatedBookingResult.propertyName[language]}</p>
                    <p><strong>CLIENT:</strong> {simulatedBookingResult.clientName}</p>
                    <p><strong>DATES:</strong> {simulatedBookingResult.checkInDate} / {simulatedBookingResult.checkOutDate}</p>
                    <p><strong>MONTANT TOTAL PAYÉ:</strong> {Math.round((selectedProperty.pricePerNight * 3 + 15) * (1 - appliedDiscount))}€</p>
                    <p className="border-t border-stone-200 pt-2 text-bold-copper font-bold text-center">
                      CODE DE PORTE TEMPORAIRE : {simulatedBookingResult.pinCode}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        // Reset checkout states
                        setSelectedProperty(null);
                        setSimulatedBookingResult(null);
                        setCheckoutStep("form");
                        // Redirect to portal tab with preset code
                        setActiveTab("member");
                      }}
                      className="flex-grow py-3 bg-bold-text hover:bg-[#FACCD1] hover:text-bold-text text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow text-center transition-all"
                    >
                      Enregistrer mon identité (Check-in)
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProperty(null);
                        setSimulatedBookingResult(null);
                        setCheckoutStep("form");
                      }}
                      className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold"
                    >
                      Fermer
                    </button>
                  </div>

                </div>
              )}

              <p className="text-[9px] text-stone-400 leading-normal text-center mt-4">
                🔒 Cryptage SSL 256 bits · Dar & Numa SAS. Simulation en sandbox sécurisé.
              </p>

            </div>

          </motion.div>
        </div>
      )}



    </div>
  );
}
