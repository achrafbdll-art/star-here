import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, MapPin, Search, Filter, SlidersHorizontal, ArrowUpDown, 
  Grid, Map as MapIcon, Key, CheckCircle, ShieldCheck, Sparkles, 
  ChevronRight, Lock, Unlock, PhoneCall, Award, Users, RefreshCw
} from "lucide-react";

import { Property, Language } from "./types";
import { STATIC_PROPERTIES } from "./propertiesData";
import { HeaderPrestige } from "./components/HeaderPrestige";
import { HeroSahamSearch } from "./components/HeroSahamSearch";
import { FeaturedReferencesShowcase } from "./components/FeaturedReferencesShowcase";
import { AboutWhyUsSection } from "./components/AboutWhyUsSection";
import { PolesSection } from "./components/PolesSection";
import { PropertyCard } from "./components/PropertyCard";
import { PropertyDetailModal } from "./components/PropertyDetailModal";
import { InteractiveMapMaroc } from "./components/InteractiveMapMaroc";
import { AiRealEstateAdvisor } from "./components/AiRealEstateAdvisor";
import { EstimatorModal } from "./components/EstimatorModal";
import { PropertyComparatorModal } from "./components/PropertyComparatorModal";
import { FavoritesDrawer } from "./components/FavoritesDrawer";
import { FloatingWhatsAppWidget, WHATSAPP_CONFIG } from "./components/FloatingWhatsAppWidget";
import { ScheduleVisitModal } from "./components/ScheduleVisitModal";
import { ToastNotification, Toast } from "./components/ToastNotification";
import { FooterPrestige } from "./components/FooterPrestige";

export default function App() {
  // Navigation & Locale
  const [activeTab, setActiveTab] = useState<"home" | "projets-neufs" | "properties" | "services" | "assistant" | "how-it-works" | "member">("home");
  const [language, setLanguage] = useState<Language>("fr");

  // Properties State
  const [properties, setProperties] = useState<Property[]>(STATIC_PROPERTIES);

  // Favorites State (stored in localStorage)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("numa_saham_favorites");
      return stored ? JSON.parse(stored) : ["residence-vert-marine", "anfa-club-penthouse"];
    } catch {
      return ["residence-vert-marine"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("numa_saham_favorites", JSON.stringify(favoriteIds));
    } catch (e) {
      console.warn("localStorage unavailable:", e);
    }
  }, [favoriteIds]);

  // Comparison State (max 4 properties)
  const [comparisonList, setComparisonList] = useState<Property[]>([]);

  // Modals & Drawers State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scheduleVisitProperty, setScheduleVisitProperty] = useState<Property | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);
  const [isComparatorModalOpen, setIsComparatorModalOpen] = useState<boolean>(false);

  // Toasts System
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    const id = "toast-" + Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Search & Filter State
  const [searchTransaction, setSearchTransaction] = useState<string>("all");
  const [searchCity, setSearchCity] = useState<string>("all");
  const [searchType, setSearchType] = useState<string>("all");
  const [searchPriceMax, setSearchPriceMax] = useState<number>(15000000);
  const [searchBedrooms, setSearchBedrooms] = useState<string>("all");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterPool, setFilterPool] = useState<boolean>(false);
  const [filterSeaView, setFilterSeaView] = useState<boolean>(false);
  const [filterTerrace, setFilterTerrace] = useState<boolean>(false);

  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortOption, setSortOption] = useState<string>("recommended");

  // Fetch properties from server if available
  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProperties(data);
        }
      })
      .catch((err) => {
        console.warn("Using offline static properties data:", err);
      });
  }, []);

  // Sync RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // Favorite toggle handler
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        addToast("info", "Bien retiré de vos favoris.");
        return prev.filter((item) => item !== id);
      } else {
        addToast("success", "Bien ajouté à vos favoris.");
        return [...prev, id];
      }
    });
  };

  // Compare toggle handler
  const handleToggleCompare = (property: Property, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        addToast("info", "Bien retiré du comparateur.");
        return prev.filter((p) => p.id !== property.id);
      } else {
        if (prev.length >= 4) {
          addToast("error", "Vous pouvez comparer jusqu'à 4 biens simultanément.");
          return prev;
        }
        addToast("success", "Bien ajouté au comparateur.");
        return [...prev, property];
      }
    });
  };

  // Share property handler
  const handleShare = (property: Property) => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        addToast("success", "Lien copié dans le presse-papier !");
      });
    } else {
      addToast("info", `Référence du bien : ${property.referenceCode || property.id}`);
    }
  };

  // Brochure request simulation
  const handleBrochureRequested = (property: Property) => {
    addToast("success", `Brochure confidentielle de "${property.name.fr}" générée et prête au téléchargement.`);
  };

  // Filtered properties
  const filteredProperties = properties.filter((p) => {
    if (searchTransaction !== "all" && p.transactionType !== searchTransaction) return false;
    if (searchCity !== "all" && p.city.toLowerCase() !== searchCity.toLowerCase()) return false;
    if (searchType !== "all" && p.propertyType !== searchType) return false;
    if (p.priceDH > searchPriceMax) return false;
    if (searchBedrooms !== "all" && p.bedrooms < Number(searchBedrooms)) return false;
    if (filterPool && !p.pool) return false;
    if (filterSeaView && !p.amenities.some((a) => a.includes("mer") || a.includes("ocean"))) return false;
    if (filterTerrace && !p.terrace) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = (p.name[language] || p.name.fr).toLowerCase().includes(q);
      const matchCity = p.city.toLowerCase().includes(q);
      const matchNeighbor = p.neighborhood.toLowerCase().includes(q);
      const matchRef = (p.referenceCode || "").toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchNeighbor && !matchRef) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortOption === "price-asc") return a.priceDH - b.priceDH;
    if (sortOption === "price-desc") return b.priceDH - a.priceDH;
    if (sortOption === "surface-desc") return b.surface - a.surface;
    return b.rating - a.rating;
  });

  // Featured New Projects
  const newProjectsList = properties.filter((p) => p.transactionType === "projet-neuf");

  // Favorite objects
  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  // Digital Lock Simulator states for preserved "how-it-works"
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [lockStatus, setLockStatus] = useState<"closed" | "opened" | "error">("closed");

  const handleKeypadPress = (val: string) => {
    if (lockStatus === "opened") return;
    if (val === "C") {
      setEnteredPin("");
      setLockStatus("closed");
      return;
    }
    if (val === "#") {
      const pinWithHash = enteredPin + "#";
      if (pinWithHash === "*8439#" || pinWithHash === "*1234#" || enteredPin.length >= 4) {
        setLockStatus("opened");
        addToast("success", "Serrure déverrouillée avec succès !");
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
      setEnteredPin((prev) => prev + val);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-[#B38B4D] selection:text-white">
      
      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* Prestige Saham & Numa Top Bar */}
      <HeaderPrestige
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        comparisonCount={comparisonList.length}
        onOpenComparison={() => {
          if (comparisonList.length > 0) {
            setIsComparatorModalOpen(true);
          } else {
            addToast("info", "Ajoutez au moins 2 biens au comparateur à l'aide de l'icône balance sur les cartes.");
          }
        }}
        onOpenEstimate={() => setIsEstimatorOpen(true)}
        onOpenScheduleVisit={() => setScheduleVisitProperty(null)}
      />

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1">
        
        {/* ======================= TAB: HOME ======================= */}
        {activeTab === "home" && (
          <div className="space-y-0">
            
            {/* 1. Cinematic Hero & Integrated Real Estate Search Engine */}
            <HeroSahamSearch
              language={language}
              totalPropertiesCount={properties.length}
              onSearch={(filters) => {
                setSearchTransaction(filters.transactionType);
                setSearchCity(filters.city);
                setSearchType(filters.propertyType);
                setSearchPriceMax(filters.maxPriceDH);
                setSearchBedrooms(filters.bedrooms);
                setFilterPool(filters.poolOnly);
                setFilterSeaView(filters.seaViewOnly);
                setFilterTerrace(filters.terraceOnly);
                setActiveTab("properties");
              }}
              onExploreProjects={() => setActiveTab("projets-neufs")}
              onOpenEstimator={() => setIsEstimatorOpen(true)}
            />

            {/* 2. Qui Sommes-Nous (remonté d'un pas, directement après le Hero) */}
            <AboutWhyUsSection
              language={language}
              onExploreMore={() => setActiveTab("services")}
              onOpenScheduleVisit={() => setScheduleVisitProperty(null)}
            />

            {/* 3. Sélection d'Exception & Références Phares (Nos Expertises) */}
            <FeaturedReferencesShowcase
              properties={properties}
              language={language}
              onSelectProperty={(p) => setSelectedProperty(p)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />

            {/* Marquee Featured Properties Grid */}
            <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/80">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C05621] block mb-2">
                    Sélection d'Exception
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-stone-900 tracking-tight">
                    Nos Biens d'Élite au Maroc
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSearchTransaction("all");
                    setActiveTab("properties");
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] transition-colors"
                >
                  <span>Voir l'ensemble du catalogue ({properties.length} biens)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3-Column Luxury Property Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.slice(0, 6).map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    language={language}
                    onSelect={(p) => setSelectedProperty(p)}
                    isFavorite={favoriteIds.includes(prop.id)}
                    onToggleFavorite={handleToggleFavorite}
                    isCompared={comparisonList.some((c) => c.id === prop.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            </section>

            {/* 3. The 5 Pillars of Excellence (Past Request Maintained & Polished) */}
            <PolesSection
              language={language}
              onSelectPole={(poleId) => {
                if (poleId === "projet-neuf") {
                  setActiveTab("projets-neufs");
                } else if (poleId === "courte-duree" || poleId === "longue-duree") {
                  setSearchTransaction("location");
                  setActiveTab("properties");
                } else if (poleId === "ventes-achats") {
                  setSearchTransaction("vente");
                  setActiveTab("properties");
                } else {
                  setActiveTab("services");
                }
              }}
              onOpenScheduleVisit={() => setScheduleVisitProperty(null)}
            />

            {/* 4. Interactive Geographic Map of Morocco */}
            <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B38B4D] block mb-2">
                  Cartographie & Territoires
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-stone-900 tracking-tight">
                  Carte Interactive des Adresses Prestigieuses
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light">
                  Explorez nos emplacements clés à Casablanca, Marrakech, Tanger et Rabat avec leurs commodités, écoles internationales et corniches balnéaires.
                </p>
              </div>

              <InteractiveMapMaroc
                properties={properties}
                language={language}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            </section>

            {/* 5. AI Advisor Spotlight Banner (Light Luxury Theme) */}
            <section className="py-16 bg-white border-y border-stone-200 text-stone-900 shadow-xs relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#B38B4D]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-2 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B38B4D]/15 text-[#8C6D37] text-[10px] uppercase font-bold tracking-widest border border-[#B38B4D]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    PropTech & Intelligence Artificielle
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-stone-950">
                    Votre recherche immobilière formulée en langage naturel
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light max-w-xl">
                    Indiquez votre budget en Dirhams, votre quartier de prédilection ou vos objectifs de rendement : notre IA analyse nos biens pour vous.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab("assistant")}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38B4D] hover:from-[#E5C158] hover:to-[#C59B38] text-stone-950 font-extrabold uppercase tracking-wider text-xs shadow-md transition-all active:scale-95"
                  >
                    Consulter le Conseiller IA
                  </button>
                  <button
                    onClick={() => setIsEstimatorOpen(true)}
                    className="px-5 py-3.5 rounded-xl border border-stone-300 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Simulateur de Valeur
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ======================= TAB: PROJETS NEUFS ======================= */}
        {activeTab === "projets-neufs" && (
          <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="border-b border-stone-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B38B4D] block mb-2">
                  Promotion & VEFA de Prestige
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-stone-900 tracking-tight">
                  Nos Programmes Neufs Emblématiques
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 max-w-2xl">
                  Découvrez nos résidences d'exception en cours de commercialisation (style Saham Immobilier : Vert Marine Dar Bouazza, Horizons Casa Anfa, Baie de Malabata Tanger).
                </p>
              </div>

              <button
                onClick={() => setScheduleVisitProperty(null)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#B38B4D] hover:bg-[#9E773B] text-white font-bold text-xs uppercase tracking-wider transition-all self-start md:self-auto shrink-0 shadow-md active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Prendre RDV Promoteur</span>
              </button>
            </div>

            {/* Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newProjectsList.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  language={language}
                  onSelect={(p) => setSelectedProperty(p)}
                  isFavorite={favoriteIds.includes(prop.id)}
                  onToggleFavorite={handleToggleFavorite}
                  isCompared={comparisonList.some((c) => c.id === prop.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>

            {/* Guarantees Box (Light Luxury Prestige) */}
            <div className="p-8 rounded-3xl bg-white text-stone-900 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm border border-stone-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B38B4D]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#8C6D37]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm uppercase text-stone-950">Garantie d'Achèvement (GFA)</h4>
                  <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                    Couverture bancaire intégrale conforme à la loi 107-12 relative à la VEFA au Maroc.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B38B4D]/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#8C6D37]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm uppercase text-stone-950">Matériaux d'Élite</h4>
                  <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                    Marbres nobles, menuiserie aluminium thermique et domotique connectée.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B38B4D]/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#8C6D37]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm uppercase text-stone-950">Accompagnement Notarié</h4>
                  <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                    Sécurisation complète des contrats préliminaires et actes authentiques définitifs.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB: PROPERTIES CATALOGUE ======================= */}
        {activeTab === "properties" && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Header & View Mode Switcher */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B38B4D] block mb-1">
                  Catalogue Immobilier Maroc
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-stone-900 tracking-tight">
                  Nos Biens d'Exception ({filteredProperties.length})
                </h1>
              </div>

              {/* View Mode Toggle: Grid vs Map with Smooth Spring Animation */}
              <div className="flex items-center gap-3">
                <div className="flex items-center p-1 bg-stone-200/80 rounded-xl border border-stone-300 relative">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      viewMode === "grid" ? "text-stone-900" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {viewMode === "grid" && (
                      <motion.span
                        layoutId="activeViewPill"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Grid className="w-3.5 h-3.5" />
                      <span>Grille</span>
                    </span>
                  </button>

                  <button
                    onClick={() => setViewMode("map")}
                    className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      viewMode === "map" ? "text-stone-900" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {viewMode === "map" && (
                      <motion.span
                        layoutId="activeViewPill"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>Carte</span>
                    </span>
                  </button>
                </div>

                {/* Sort Option Dropdown */}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#B38B4D]"
                >
                  <option value="recommended">Recommandé</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                  <option value="surface-desc">Surface : Plus grande</option>
                </select>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              
              {/* Transaction */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">Transaction</label>
                <select
                  value={searchTransaction}
                  onChange={(e) => setSearchTransaction(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="all">Toutes (Achat & Location)</option>
                  <option value="projet-neuf">Projets Neufs</option>
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">Ville</label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="all">Toutes les villes</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Tanger">Tanger</option>
                  <option value="Rabat">Rabat</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">Type de bien</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="all">Tous types</option>
                  <option value="appartement">Appartement</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="duplex">Duplex & Loft</option>
                  <option value="riad">Riad</option>
                </select>
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">Mots-clés</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Quartier, réf..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Reset Filter Button */}
              <div>
                <button
                  onClick={() => {
                    setSearchTransaction("all");
                    setSearchCity("all");
                    setSearchType("all");
                    setSearchKeyword("");
                    setSearchPriceMax(15000000);
                  }}
                  className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
              </div>

            </div>

            {/* Content Display: Animated Grid vs Map View */}
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProperties.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-stone-500 space-y-3">
                      <Search className="w-10 h-10 mx-auto text-stone-300" />
                      <p className="font-serif text-lg text-stone-700">Aucun bien ne correspond à ces critères.</p>
                      <button
                        onClick={() => {
                          setSearchTransaction("all");
                          setSearchCity("all");
                          setSearchType("all");
                        }}
                        className="text-xs font-bold text-[#B38B4D] underline"
                      >
                        Afficher tous les biens disponibles
                      </button>
                    </div>
                  ) : (
                    filteredProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        language={language}
                        onSelect={(p) => setSelectedProperty(p)}
                        isFavorite={favoriteIds.includes(prop.id)}
                        onToggleFavorite={handleToggleFavorite}
                        isCompared={comparisonList.some((c) => c.id === prop.id)}
                        onToggleCompare={handleToggleCompare}
                      />
                    ))
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                >
                  <InteractiveMapMaroc
                    properties={filteredProperties}
                    language={language}
                    onSelectProperty={(prop) => setSelectedProperty(prop)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* ======================= TAB: SERVICES 360 ======================= */}
        {activeTab === "services" && (
          <div className="py-12 sm:py-20 space-y-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B38B4D] block mb-2">
                Offre Globale 360°
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-stone-900 tracking-tight">
                Une Expertise Complète du Marché Marocain
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                De la conception architecturale à la commercialisation exclusive et à la gestion hôtelière 100% numérique.
              </p>
            </div>

            <PolesSection
              language={language}
              onSelectPole={(poleId) => {
                if (poleId === "projet-neuf") setActiveTab("projets-neufs");
                else {
                  setSearchTransaction("all");
                  setActiveTab("properties");
                }
              }}
              onOpenScheduleVisit={() => setScheduleVisitProperty(null)}
            />
          </div>
        )}

        {/* ======================= TAB: ASSISTANT IA ======================= */}
        {activeTab === "assistant" && (
          <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B38B4D] block mb-1">
                Technologie & Conseil
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-stone-900 tracking-tight">
                Conseiller Augmenté Numa & Saham
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-2">
                Posez vos questions sur le marché marocain, les rendements locatifs ou planifiez une recherche ultra-ciblée.
              </p>
            </div>

            <AiRealEstateAdvisor
              properties={properties}
              language={language}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
            />
          </div>
        )}

        {/* ======================= TAB: HOW IT WORKS & DIGITAL CHECK-IN (PRESERVED) ======================= */}
        {(activeTab === "how-it-works" || activeTab === "member") && (
          <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B38B4D] block mb-1">
                Technologie Numa Staystar
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-stone-900 tracking-tight">
                L'Autonomie 100% Numérique
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-2">
                Accédez à votre suite sans clé physique, sans attente au comptoir, avec notre serrure connectée intelligente.
              </p>
            </div>

            {/* Preserved Keypad Lock Simulator in High-Tech Light Theme */}
            <div className="bg-white text-stone-900 p-8 rounded-3xl border border-stone-200 shadow-xl max-w-md mx-auto space-y-6">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#B38B4D]/15 flex items-center justify-center mx-auto text-[#8C6D37]">
                  {lockStatus === "opened" ? <Unlock className="w-6 h-6 text-emerald-600" /> : <Lock className="w-6 h-6" />}
                </div>
                <h4 className="font-serif font-bold text-base uppercase text-stone-950">Simulateur de Serrure Connectée</h4>
                <p className="text-[11px] text-stone-500">Code démo prédéfini : <strong className="text-stone-900 font-mono">*8439#</strong></p>
              </div>

              {/* Status display */}
              <div className={`p-3 rounded-xl text-center text-xs font-mono font-bold tracking-widest ${
                lockStatus === "opened"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                  : lockStatus === "error"
                  ? "bg-red-50 text-red-700 border border-red-300"
                  : "bg-stone-100 text-stone-800 border border-stone-200"
              }`}>
                {lockStatus === "opened" ? "ACCÈS AUTORISÉ ✔" : lockStatus === "error" ? "CODE INCORRECT ✖" : enteredPin || "ENTREZ LE PIN"}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKeypadPress(k)}
                    className="py-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-base font-bold font-mono text-stone-900 active:scale-95 transition-all shadow-xs"
                  >
                    {k}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleKeypadPress("C")}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 text-xs font-bold font-mono transition-colors"
              >
                Effacer (C)
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Floating Comparison Bottom Bar (Light Theme) */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl border border-stone-300 text-stone-900 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B38B4D] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-serif text-stone-950">
              {comparisonList.length}/4 Biens au Comparateur
            </span>
          </div>

          <div className="flex items-center gap-1.5 hidden sm:flex">
            {comparisonList.map((p) => (
              <img key={p.id} src={p.images.hero} alt="" className="w-8 h-8 rounded-lg object-cover border border-stone-200" />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparatorModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38B4D] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95"
            >
              Comparer ({comparisonList.length})
            </button>
            <button
              onClick={() => setComparisonList([])}
              className="p-2 text-stone-400 hover:text-stone-700"
              title="Vider"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp and Callback Contact Widget */}
      <FloatingWhatsAppWidget language={language} />

      {/* MODALS */}
      {/* 1. Property Full Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          language={language}
          isFavorite={favoriteIds.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          isCompared={comparisonList.some((c) => c.id === selectedProperty.id)}
          onToggleCompare={handleToggleCompare}
          onOpenScheduleVisit={(p) => setScheduleVisitProperty(p)}
          onShare={handleShare}
          onBrochureRequested={handleBrochureRequested}
        />
      )}

      {/* 2. Schedule Private Visit Modal */}
      {scheduleVisitProperty !== undefined && scheduleVisitProperty !== null && (
        <ScheduleVisitModal
          property={scheduleVisitProperty}
          onClose={() => setScheduleVisitProperty(null)}
          language={language}
        />
      )}

      {/* 3. Estimator Modal */}
      {isEstimatorOpen && (
        <EstimatorModal
          onClose={() => setIsEstimatorOpen(false)}
          language={language}
        />
      )}

      {/* 4. Comparison Modal */}
      {isComparatorModalOpen && (
        <PropertyComparatorModal
          properties={comparisonList}
          onClose={() => setIsComparatorModalOpen(false)}
          onRemoveProperty={(id) => setComparisonList((prev) => prev.filter((p) => p.id !== id))}
          onClearAll={() => {
            setComparisonList([]);
            setIsComparatorModalOpen(false);
          }}
          onSelectProperty={(p) => setSelectedProperty(p)}
          language={language}
        />
      )}

      {/* 5. Favorites Slide-over Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favoriteProperties}
        onRemoveFavorite={(id) => setFavoriteIds((prev) => prev.filter((item) => item !== id))}
        onClearFavorites={() => setFavoriteIds([])}
        onSelectProperty={(p) => setSelectedProperty(p)}
        language={language}
      />

      {/* Prestige Saham-Style Corporate Footer */}
      <FooterPrestige
        language={language}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenEstimate={() => setIsEstimatorOpen(true)}
      />

    </div>
  );
}
