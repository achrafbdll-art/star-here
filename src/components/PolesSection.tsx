import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Building, Key, Home, Palette, Briefcase } from "lucide-react";
import { Language } from "../types";

interface PolesSectionProps {
  language: Language;
  onSelectPole: (poleKey: string) => void;
  onOpenScheduleVisit: () => void;
}

export const PolesSection: React.FC<PolesSectionProps> = ({
  language,
  onSelectPole,
  onOpenScheduleVisit,
}) => {
  const [activePole, setActivePole] = useState<string>("projet-neuf");

  const poles = [
    {
      id: "projet-neuf",
      title: language === "fr" ? "PROJET NEUF" : language === "en" ? "NEW PROJECTS" : "مشاريع جديدة",
      subtag: language === "fr" ? "COMMERCIALISATION" : language === "en" ? "DEVELOPMENT & SALES" : "تسويق عقاري",
      icon: Building,
      headline: language === "fr" 
        ? "La référence des programmes immobiliers d'exception au Maroc" 
        : "The benchmark of iconic luxury developments in Morocco",
      description: language === "fr"
        ? "Partenaire privilégié des plus grands promoteurs et investisseurs institutionnels marocains (style Saham Immobilier). Nous assurons la conception, le marketing immersif et la commercialisation exclusive de résidences d'exception, de complexes balnéaires et d'immeubles de bureaux de pointe."
        : "Privileged partner of leading Moroccan developers and institutional funds. We spearhead architectural programming, immersive 3D marketing, and exclusive sales of beachfront residences, master developments, and prime corporate headquarters.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: language === "fr" ? "Programmes commercialisés" : "Projects Delivered", value: "+24" },
        { label: language === "fr" ? "Satisfaction acquéreurs" : "Client Satisfaction", value: "99.4%" },
        { label: language === "fr" ? "Taux de livraison à date" : "On-time Delivery", value: "100%" },
      ],
      features: [
        language === "fr" ? "Emplacements premium (Casablanca Coast, Anfa, Tanger Baie, Rabat Souissi)" : "Prime coastal and city locations",
        language === "fr" ? "Matériaux nobles, marbres d'importation et domotique intégrée" : "Italian marble and integrated smart home systems",
        language === "fr" ? "Garanties d'achèvement extrinsèques bancaires (GFA) conformes loi 107-12" : "Bank-backed completion guarantees (VEFA)",
      ],
      cta: language === "fr" ? "Explorer nos projets neufs" : "Explore New Projects"
    },
    {
      id: "courte-duree",
      title: language === "fr" ? "COURTE DURÉE" : language === "en" ? "SHORT-TERM" : "كراء قصير المدى",
      subtag: language === "fr" ? "LOCATION" : language === "en" ? "HOSPITALITY & STAYS" : "كراء سياحي",
      icon: Key,
      headline: language === "fr" 
        ? "L'aparthôtel nouvelle génération : autonomie 100% numérique et charme marocain" 
        : "Next-gen digital aparthotels: seamless autonomy and authentic Moroccan charm",
      description: language === "fr"
        ? "Fusion du confort d'une suite équipée privée et de l'excellence hôtelière. Accès par digicode autonome, Wi-Fi très haut débit fibre optique, literie 5 étoiles et conciergerie locale 24h/24 par WhatsApp."
        : "Blending private home comfort with 5-star hotel services. Keyless smart lock access, fiber Wi-Fi, premium linens, and 24/7 WhatsApp local concierge.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: language === "fr" ? "Note moyenne clients" : "Average Guest Rating", value: "4.9/5" },
        { label: language === "fr" ? "Temps de check-in" : "Check-in Time", value: "< 30 sec" },
        { label: language === "fr" ? "Taux d'occupation annuel" : "Annual Occupancy", value: "88%" },
      ],
      features: [
        language === "fr" ? "Check-in 100% autonome sans clé physique ni attente" : "100% keyless smart digital check-in",
        language === "fr" ? "Suites climatisées avec cuisines tout équipées et lave-linge" : "Fitted kitchens, in-suite laundry, and work desk",
        language === "fr" ? "Emplacements prisés au cœur de la Médina de Marrakech et Maarif Casablanca" : "Prime city spots in Marrakech and Casablanca",
      ],
      cta: language === "fr" ? "Réserver un séjour" : "Book a Stay"
    },
    {
      id: "longue-duree",
      title: language === "fr" ? "LONGUE DURÉE" : language === "en" ? "LONG-TERM" : "كراء طويل المدى",
      subtag: language === "fr" ? "LOCATION" : language === "en" ? "EXECUTIVE RENTALS" : "كراء سكني",
      icon: Home,
      headline: language === "fr" 
        ? "Location résidentielle haut de gamme et baux corporate clés en main" 
        : "High-end residential leasing and turnkey corporate relocation",
      description: language === "fr"
        ? "Une sélection rigoureuse d'appartements et de villas meublés ou non meublés pour cadres, diplomates et familles exigeantes. Contrats certifiés, gestion des charges simplifiée et conciergerie technique réactive."
        : "A curated portfolio of luxury furnished and unfurnished residences for executives, diplomats, and families. Transparent contracts, digital tenancy portal, and 24/7 maintenance support.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: language === "fr" ? "Biens en gestion locative" : "Properties Under Mgmt", value: "+320" },
        { label: language === "fr" ? "Taux d'impayés" : "Default Rate", value: "0.0%" },
        { label: language === "fr" ? "Délai moyen de relocation" : "Avg. Turnaround", value: "14 jours" },
      ],
      features: [
        language === "fr" ? "Baux conformes avec états des lieux numériques photo HD" : "Digital lease agreements with HD photo inventories",
        language === "fr" ? "Gestion locative complète et virement garanti des loyers" : "Complete management with guaranteed rent transfers",
        language === "fr" ? "Assistance technique et conciergerie de dépannage 7j/7" : "7/7 rapid maintenance and facility response",
      ],
      cta: language === "fr" ? "Voir les locations disponibles" : "View Long-term Rentals"
    },
    {
      id: "amenagement",
      title: language === "fr" ? "AMÉNAGEMENT" : language === "en" ? "FURNISHING" : "تأثيث وتصميم",
      subtag: language === "fr" ? "DESIGN D'INTÉRIEUR" : language === "en" ? "INTERIOR ARCHITECTURE" : "تصميم داخلي",
      icon: Palette,
      headline: language === "fr" 
        ? "Architecture d'intérieur sur-mesure et valorisation patrimoniale" 
        : "Bespoke interior architecture and asset value enhancement",
      description: language === "fr"
        ? "Notre studio d'architectes d'intérieur et décorateurs conçoit des espaces contemporains inspirés du riche patrimoine marocain (bois de cèdre, zelliges revisités, tadelakt lissé, cuivre et luminaires d'artisanat d'art)."
        : "Our interior architecture studio crafts distinctive living spaces marrying contemporary design with noble Moroccan artisan craft (cedar wood, refined zellige, smoothed tadelakt, brass and bronze accents).",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: language === "fr" ? "Plus-value moyenne générée" : "Average Value Added", value: "+22%" },
        { label: language === "fr" ? "Projets livrés clés en main" : "Turnkey Projects", value: "+180" },
        { label: language === "fr" ? "Artisans d'art partenaires" : "Master Artisans", value: "+45" },
      ],
      features: [
        language === "fr" ? "Conception 3D photoréaliste et plans d'agencement sur-mesure" : "3D photorealistic visualization and custom floor plans",
        language === "fr" ? "Mobilier sur-mesure produit par les meilleurs ébénistes marocains" : "Custom furniture handcrafted by master Moroccan woodworkers",
        language === "fr" ? "Suivi rigoureux de chantier jusqu'à la mise en place des rideaux et de la literie" : "End-to-end site supervision to final decoration",
      ],
      cta: language === "fr" ? "Prendre RDV avec un architecte" : "Consult Interior Architect"
    },
    {
      id: "ventes-achats",
      title: language === "fr" ? "VENTES & ACHATS" : language === "en" ? "SALES & BUYING" : "بيع وشراء العقارات",
      subtag: language === "fr" ? "DE BIENS" : language === "en" ? "TRANSACTIONS" : "عقارات",
      icon: Briefcase,
      headline: language === "fr" 
        ? "Conseil patrimonial et transactions immobilières de prestige" 
        : "Private wealth advisory and prime property transactions",
      description: language === "fr"
        ? "Courtage d'élite pour les acquéreurs marocains et internationaux. Nous vous guidons à travers chaque étape juridique, fiscale et notariale pour sécuriser l'acquisition ou la vente de votre bien d'exception au meilleur prix du marché."
        : "Elite brokerage for Moroccan and international investors. We navigate every legal, tax, and notary step to ensure secure acquisitions and maximized sale valuations across the Kingdom.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: language === "fr" ? "Volume de transactions 2025" : "2025 Transaction Volume", value: "480 MDH" },
        { label: language === "fr" ? "Dossiers off-market exclusifs" : "Off-market Portfolio", value: "35+" },
        { label: language === "fr" ? "Réseau notaires & banques" : "Partner Notary Network", value: "National" },
      ],
      features: [
        language === "fr" ? "Évaluation vénale certifiée et audit juridique complet du titre foncier" : "Certified property valuation and title deed due diligence",
        language === "fr" ? "Accompagnement bancaire sur-mesure pour résidents et MRE" : "Tailored mortgage structuring for local & diaspora investors",
        language === "fr" ? "Portfolio confidentiel de biens d'exception 'Off-Market'" : "Exclusive access to off-market private listings",
      ],
      cta: language === "fr" ? "Consulter nos biens à la vente" : "Browse Properties for Sale"
    },
  ];

  const currentPoleData = poles.find((p) => p.id === activePole) || poles[0];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F2] text-stone-900 border-t border-stone-200 relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#B38B4D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-stone-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C6D37] block mb-2 font-sans">
              {language === "fr" ? "Architecture & Services 360°" : "Architecture & 360° Services"}
            </span>
            <h2 className="font-serif tracking-tight text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-stone-950">
              {language === "fr" ? "Nos 5 Pôles d'Excellence" : "Our 5 Pillars of Excellence"}
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            {language === "fr"
              ? "De la commercialisation de programmes neufs à la gestion locative et au design d'intérieur, nous vous accompagnons sur l'ensemble de votre cycle immobilier."
              : "From new development marketing to bespoke interior architecture and executive property management."}
          </p>
        </div>

        {/* 5 Poles Selector Navigation in Light Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-12">
          {poles.map((pole) => {
            const isActive = activePole === pole.id;
            const Icon = pole.icon;
            return (
              <button
                key={pole.id}
                onClick={() => setActivePole(pole.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] ${
                  isActive
                    ? "bg-white border-[#B38B4D] shadow-xl text-stone-950 ring-2 ring-[#B38B4D]/30"
                    : "bg-white/80 border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-white hover:border-stone-300 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#8C6D37]" : "text-stone-400"}`} />
                  <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-[#B38B4D]/15 text-[#8C6D37]" : "bg-stone-100 text-stone-500"
                  }`}>
                    {pole.subtag}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-serif">
                    {pole.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pole Presentation Showcase (Clean White Glass Surface) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B38B4D]/15 border border-[#B38B4D]/30 text-[#8C6D37] text-[10px] uppercase font-bold tracking-widest">
              <span>{currentPoleData.subtag}</span>
              <span>·</span>
              <span>{currentPoleData.title}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-stone-950 leading-tight">
              {currentPoleData.headline}
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
              {currentPoleData.description}
            </p>

            {/* Feature points */}
            <div className="space-y-2.5 pt-2">
              {currentPoleData.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6D37] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              {currentPoleData.stats.map((st, idx) => (
                <div key={idx}>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    {st.value}
                  </div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectPole(currentPoleData.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-bold uppercase tracking-wider text-xs transition-all shadow-md active:scale-95"
              >
                <span>{currentPoleData.cta}</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={onOpenScheduleVisit}
                className="px-5 py-3 rounded-xl border border-stone-300 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {language === "fr" ? "Être contacté par un expert" : "Request Expert Advice"}
              </button>
            </div>

          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[340px] sm:h-[440px] rounded-2xl overflow-hidden shadow-xl border border-stone-200 group">
              <img
                src={currentPoleData.image}
                alt={currentPoleData.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
                    Excellence Certifiée
                  </span>
                  <div className="text-white font-serif font-bold text-lg uppercase tracking-wide">
                    {currentPoleData.title}
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-stone-900 shadow-sm">
                  MAROC 2026
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
