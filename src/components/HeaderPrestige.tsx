import React, { useState } from "react";
import { Sparkles, Heart, Scale, Menu, X } from "lucide-react";
import { Language } from "../types";

interface HeaderPrestigeProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  comparisonCount: number;
  onOpenComparison: () => void;
  onOpenEstimate: () => void;
  onOpenScheduleVisit: () => void;
}

export const HeaderPrestige: React.FC<HeaderPrestigeProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  favoritesCount,
  onOpenFavorites,
  comparisonCount,
  onOpenComparison,
  onOpenEstimate,
  onOpenScheduleVisit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      label: language === "fr" ? "ACCUEIL" : language === "en" ? "HOME" : "الرئيسية",
      isMultiLine: false,
    },
    {
      id: "properties",
      label: language === "fr" ? "DESTINATIONS" : language === "en" ? "DESTINATIONS" : "الوجهات",
      isMultiLine: false,
    },
    {
      id: "how-it-works",
      line1: language === "fr" ? "COMMENT ÇA" : language === "en" ? "HOW IT" : "كيف",
      line2: language === "fr" ? "MARCHE" : language === "en" ? "WORKS" : "يعمل",
      isMultiLine: true,
    },
    {
      id: "services",
      line1: language === "fr" ? "SERVICES &" : language === "en" ? "SERVICES &" : "خدمات و",
      line2: language === "fr" ? "EXPÉRIENCES" : language === "en" ? "EXPERIENCES" : "تجارب",
      isMultiLine: true,
    },
    {
      id: "projets-neufs",
      line1: language === "fr" ? "À" : language === "en" ? "ABOUT" : "عن",
      line2: language === "fr" ? "PROPOS" : language === "en" ? "US" : "الشركة",
      isMultiLine: true,
    },
    {
      id: "assistant",
      line1: language === "fr" ? "ASSISTANT" : language === "en" ? "ASSISTANT" : "مساعد",
      line2: "IA",
      isMultiLine: true,
      hasSparkle: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 text-stone-900 transition-all shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo styled exactly as photo (staystar.) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-baseline text-left focus:outline-none group select-none"
            aria-label="staystar accueil"
          >
            <span className="font-sans font-black text-2xl sm:text-[28px] tracking-tight text-black lowercase">
              staystar
            </span>
            <span className="font-sans font-black text-2xl sm:text-[28px] text-[#C05621] leading-none">
              .
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar matching image.png */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            // If active and single line like "ACCUEIL" in image.png: light pink capsule badge
            if (isActive && !item.isMultiLine) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="px-4 py-1.5 rounded-full bg-[#FACCD1] text-black font-extrabold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-xs"
                >
                  {item.label}
                </button>
              );
            }

            if (!item.isMultiLine) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="text-stone-900 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-colors px-2 py-1"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 text-stone-900 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all px-2 py-1 ${
                  isActive ? "text-[#C05621]" : ""
                }`}
              >
                {item.hasSparkle && (
                  <Sparkles className="w-3.5 h-3.5 text-[#C05621] shrink-0" />
                )}
                <div className="flex flex-col items-center leading-[1.15]">
                  <span className="text-[11px] font-extrabold tracking-wider">{item.line1}</span>
                  <span className="text-[11px] font-extrabold tracking-wider">{item.line2}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Espace Client + Language Selector + Favorites/Comparator indicators */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Subtle comparison button with badge */}
          {comparisonCount > 0 && (
            <button
              onClick={onOpenComparison}
              className="relative p-2 text-stone-700 hover:text-black hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
              title="Biens au comparateur"
              aria-label="Comparer les biens"
            >
              <Scale className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {comparisonCount}
              </span>
            </button>
          )}

          {/* Subtle favorites button with badge */}
          {favoritesCount > 0 && (
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-stone-700 hover:text-black hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
              title="Mes favoris"
              aria-label="Mes favoris"
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="absolute -top-1 -right-1 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            </button>
          )}

          {/* "ESPACE CLIENT" Pill Button styled exactly as image.png */}
          <button
            onClick={() => setActiveTab("member")}
            className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full border border-stone-900 hover:border-black text-stone-950 hover:bg-black hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xs whitespace-nowrap"
          >
            {language === "fr" ? "ESPACE CLIENT" : language === "en" ? "CLIENT PORTAL" : "فضاء الزبناء"}
          </button>

          {/* Language Selector Pill Capsule styled exactly as image.png */}
          <div className="flex items-center bg-stone-100/90 border border-stone-200 rounded-full p-1 text-[11px] font-bold">
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2.5 py-1 rounded-full transition-all duration-150 ${
                language === "fr"
                  ? "bg-black text-white font-extrabold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full transition-all duration-150 ${
                language === "en"
                  ? "bg-black text-white font-extrabold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1 rounded-full transition-all duration-150 ${
                language === "ar"
                  ? "bg-black text-white font-extrabold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              AR
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-800 hover:text-black rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const displayLabel = item.isMultiLine
                ? `${item.line1} ${item.line2}`
                : item.label;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-left transition-colors ${
                    isActive
                      ? "bg-[#FACCD1] text-black font-extrabold"
                      : "text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  {item.hasSparkle && <Sparkles className="w-4 h-4 text-[#C05621]" />}
                  <span>{displayLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab("member");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full border border-stone-900 text-stone-900 font-extrabold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-center"
            >
              {language === "fr" ? "ESPACE CLIENT" : language === "en" ? "CLIENT PORTAL" : "فضاء الزبناء"}
            </button>

            <button
              onClick={() => {
                onOpenScheduleVisit();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-stone-900 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors text-center"
            >
              {language === "fr" ? "PRENDRE RENDEZ-VOUS" : "BOOK A VISIT"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
