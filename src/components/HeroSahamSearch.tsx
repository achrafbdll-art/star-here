import React, { useState, useEffect } from "react";
import { Search, MapPin, Building2, SlidersHorizontal, Sparkles, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Language } from "../types";

const HERO_SLIDES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
    title: "Penthouse de Maître & Salon Baigné de Lumière",
    location: "Casablanca · Racine & Triangle d'Or",
    tag: "Appartement d'Exception",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
    title: "Appartement Panoramique Vue Mer & Finitions Marbre",
    location: "Tanger · Baie & Malabata Supérieur",
    tag: "Appartement Haut Standing",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    title: "Duplex d'Architecte avec Double Hauteur Sous Plafond",
    location: "Rabat · Souissi Prestige",
    tag: "Duplex de Luxe",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2400&q=85",
    title: "Appartement Contemporain & Suite Élite",
    location: "Marrakech · Guéliz & Hivernage",
    tag: "Résidence de Prestige",
  },
];

interface HeroSahamSearchProps {
  language: Language;
  onSearch: (filters: {
    transactionType: string;
    city: string;
    propertyType: string;
    maxPriceDH: number;
    bedrooms: string;
    poolOnly: boolean;
    seaViewOnly: boolean;
    terraceOnly: boolean;
  }) => void;
  totalPropertiesCount: number;
  onExploreProjects: () => void;
  onOpenEstimator: () => void;
}

export const HeroSahamSearch: React.FC<HeroSahamSearchProps> = ({
  language,
  onSearch,
  totalPropertiesCount,
  onExploreProjects,
  onOpenEstimator,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [transactionTab, setTransactionTab] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [maxPriceDH, setMaxPriceDH] = useState<number>(15000000);
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [poolOnly, setPoolOnly] = useState<boolean>(false);
  const [seaViewOnly, setSeaViewOnly] = useState<boolean>(false);
  const [terraceOnly, setTerraceOnly] = useState<boolean>(false);
  const [searchDistrict, setSearchDistrict] = useState<string>("");

  // Auto-scroll through Morocco luxury real estate hero photos (soft balanced 4.5s rhythm)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      transactionType: transactionTab,
      city: selectedCity,
      propertyType,
      maxPriceDH,
      bedrooms,
      poolOnly,
      seaViewOnly,
      terraceOnly,
    });
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-start items-center text-white overflow-hidden bg-stone-950 group/hero">
      
      {/* ================= HIGH-QUALITY MOROCCO REAL ESTATE SCROLLING BACKGROUND (ZERO NOIR) ================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-100" : "scale-104"
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Lighter, softer overlay so the luxury apartment photos are vibrant, bright and clearly visible */}
        <div className="absolute inset-0 bg-black/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-black/35" />
      </div>

      {/* Manual Left/Right Slide Controls */}
      <button
        onClick={prevSlide}
        aria-label="Photo précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-105"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Photo suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-105"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Corner Floating Photo Badge & Dots */}
      <div className="absolute bottom-5 right-6 z-30 hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white shadow-xl pointer-events-auto">
        <div className="flex items-center gap-1.5 text-stone-300">
          <Camera className="w-3.5 h-3.5 text-[#FACCD1]" />
          <span className="font-semibold text-[11px] tracking-wide text-white">
            {HERO_SLIDES[currentSlideIndex].location}
          </span>
        </div>
        <div className="w-px h-3 bg-white/30" />
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Aller à la photo ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlideIndex ? "w-5 bg-[#FACCD1]" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 text-center flex flex-col items-center">
        
        {/* Top Moroccan Cities Pill Capsule (100% identical to image.png) */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/30 bg-black/60 backdrop-blur-md mb-5 sm:mb-6 shadow-xl">
          <span className="text-[10px] font-black text-white bg-white/20 px-2 py-0.5 rounded-full tracking-wider uppercase">
            MA
          </span>
          <span className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] text-[#FACCD1]">
            MARRAKECH · CASABLANCA · RABAT · TANGER · AGADIR
          </span>
        </div>

        {/* Main Giant Headline: WE DO THE ROOM. (Aligned strictly on a single line) */}
        <h1 className="font-sans font-black tracking-tight text-[clamp(1.85rem,6.5vw,5.5rem)] text-white uppercase leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] select-none whitespace-nowrap max-w-full">
          WE DO THE ROOM.
        </h1>

        {/* Serif Italic Sub-Headline: You do the city. (Aligned on a single line) */}
        <div className="font-serif italic font-normal text-[clamp(1.6rem,5.5vw,4.75rem)] text-[#FACCD1] tracking-normal -mt-1 sm:-mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] select-none whitespace-nowrap max-w-full">
          You do the city.
        </div>

        {/* Description Text (100% verbatim from image.png) */}
        <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          L'aparthôtel de nouvelle génération : autonomie numérique, confort premium, et charme marocain authentique.
        </p>

        {/* White Pill-Shaped Search Console (matching image.png) */}
        <div className="w-full mt-8 sm:mt-11 max-w-5xl bg-white rounded-3xl sm:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-3 sm:p-3.5 text-stone-900 border border-stone-200">
          
          <form onSubmit={handleApply} className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-left">
            
            {/* Field 1: OÙ */}
            <div className="flex-1 px-4 py-2 border-b lg:border-b-0 lg:border-r border-stone-200">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1">
                OÙ
              </span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C05621] shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="all">Toutes les villes (Maroc)</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Tanger">Tanger</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Agadir">Agadir</option>
                </select>
              </div>
            </div>

            {/* Field 2: QUARTIER */}
            <div className="flex-1 px-4 py-2 border-b lg:border-b-0 lg:border-r border-stone-200">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1">
                QUARTIER
              </span>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher par quartier..."
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-stone-900 placeholder:text-stone-400 placeholder:font-normal focus:outline-none"
                />
              </div>
            </div>

            {/* Field 3: TRANSACTION / TYPE */}
            <div className="flex-1 px-4 py-2 border-b lg:border-b-0 lg:border-r border-stone-200">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1">
                TYPE & PROJET
              </span>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C05621] shrink-0" />
                <select
                  value={transactionTab}
                  onChange={(e) => setTransactionTab(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="all">Tous types & séjours</option>
                  <option value="courte-duree">Aparthôtel & Courte durée</option>
                  <option value="projet-neuf">Projets Neufs (VEFA)</option>
                  <option value="vente">Achat & Vente</option>
                  <option value="location">Location Longue durée</option>
                </select>
              </div>
            </div>

            {/* Field 4: BUDGET */}
            <div className="w-full lg:w-44 px-4 py-2 border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1">
                <span>BUDGET MAX</span>
                <span className="font-mono text-stone-900 font-bold">
                  {maxPriceDH >= 15000000 ? "Illimité" : `${(maxPriceDH / 1000000).toFixed(1)} MDH`}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="15000000"
                step="250000"
                value={maxPriceDH}
                onChange={(e) => setMaxPriceDH(Number(e.target.value))}
                className="w-full accent-black h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Action Search Button: Black rounded pill button */}
            <div className="px-2 py-1 flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`p-3 rounded-full border text-xs font-medium transition-colors flex items-center justify-center shrink-0 ${
                  showAdvanced
                    ? "border-black bg-black text-white"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
                title="Filtres avancés"
                aria-label="Filtres avancés"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-stone-950 hover:bg-stone-800 text-white font-black uppercase tracking-wider text-xs px-8 py-3.5 rounded-full transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-white" />
                <span>RECHERCHER</span>
              </button>
            </div>

          </form>

          {/* Advanced Drawer */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-stone-200 px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-700 text-left">
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                  Chambres minimum
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none"
                >
                  <option value="all">Indifférent</option>
                  <option value="1">1 chambre +</option>
                  <option value="2">2 chambres +</option>
                  <option value="3">3 chambres +</option>
                  <option value="4">4 chambres +</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="filter-pool-hero"
                  checked={poolOnly}
                  onChange={(e) => setPoolOnly(e.target.checked)}
                  className="rounded accent-black w-4 h-4 cursor-pointer"
                />
                <label htmlFor="filter-pool-hero" className="cursor-pointer select-none font-medium text-xs text-stone-800">
                  Piscine privée / Club
                </label>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="filter-sea-hero"
                  checked={seaViewOnly}
                  onChange={(e) => setSeaViewOnly(e.target.checked)}
                  className="rounded accent-black w-4 h-4 cursor-pointer"
                />
                <label htmlFor="filter-sea-hero" className="cursor-pointer select-none font-medium text-xs text-stone-800">
                  Vue Océan / Mer
                </label>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="filter-terrace-hero"
                  checked={terraceOnly}
                  onChange={(e) => setTerraceOnly(e.target.checked)}
                  className="rounded accent-black w-4 h-4 cursor-pointer"
                />
                <label htmlFor="filter-terrace-hero" className="cursor-pointer select-none font-medium text-xs text-stone-800">
                  Grande Terrasse
                </label>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
