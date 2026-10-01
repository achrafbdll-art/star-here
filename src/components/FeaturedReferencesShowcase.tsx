import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, ChevronRight, Eye } from "lucide-react";
import { Property, Language } from "../types";

interface FeaturedReferencesShowcaseProps {
  properties: Property[];
  language: Language;
  onSelectProperty: (property: Property) => void;
  onNavigateTab: (tab: any) => void;
}

export const FeaturedReferencesShowcase: React.FC<FeaturedReferencesShowcaseProps> = ({
  properties,
  language,
  onSelectProperty,
  onNavigateTab,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("amenagement");

  const categories = [
    {
      id: "projet-neuf",
      title: language === "fr" ? "PROJET NEUF" : language === "en" ? "NEW PROJECTS" : "مشاريع جديدة",
      subtag: language === "fr" ? "COMMERCIALISATION VEFA" : language === "en" ? "DEVELOPMENT & SALES" : "تسويق عقاري",
      badgeTop: "PROJET NEUF",
      badgeBottom: "100% PREMIUM",
      targetTab: "projets-neufs",
      images: {
        topLeft: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
        bottomLeft: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        topRight: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
        bottomRight: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      },
      featuredPropertyId: "residence-vert-marine",
    },
    {
      id: "courte-duree",
      title: language === "fr" ? "COURTE DURÉE" : language === "en" ? "SHORT STAY" : "كراء قصير",
      subtag: language === "fr" ? "HOSPITALITY & APARTHÔTEL" : language === "en" ? "APARTHOTEL STAYS" : "شقق فندقية",
      badgeTop: "COURTE DURÉE",
      badgeBottom: "DIGITAL 100%",
      targetTab: "how-it-works",
      images: {
        topLeft: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
        bottomLeft: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
        topRight: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        bottomRight: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
      },
      featuredPropertyId: "riad-numa-dar-el-bacha",
    },
    {
      id: "longue-duree",
      title: language === "fr" ? "LONGUE DURÉE" : language === "en" ? "LONG TERM" : "كراء طويل",
      subtag: language === "fr" ? "RÉSIDENCES EXÉCUTIVES" : language === "en" ? "EXECUTIVE RENTALS" : "إقامات تنفيذية",
      badgeTop: "LONGUE DURÉE",
      badgeBottom: "GESTION 360°",
      targetTab: "properties",
      images: {
        topLeft: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
        bottomLeft: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
        topRight: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
        bottomRight: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
      },
      featuredPropertyId: "studio-maarif-business",
    },
    {
      id: "amenagement",
      title: language === "fr" ? "AMÉNAGEMENT" : language === "en" ? "FURNISHING" : "تأثيث وتصميم",
      subtag: language === "fr" ? "DESIGN D'INTÉRIEUR" : language === "en" ? "INTERIOR DESIGN" : "تصميم داخلي",
      badgeTop: "AMÉNAGEMENT",
      badgeBottom: "100% PREMIUM",
      targetTab: "services",
      images: {
        topLeft: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        bottomLeft: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
        topRight: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
        bottomRight: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
      },
      featuredPropertyId: "anfa-club-penthouse",
    },
    {
      id: "ventes-achats",
      title: language === "fr" ? "VENTES & ACHATS" : language === "en" ? "SALES & BUYS" : "بيع وشراء",
      subtag: language === "fr" ? "IMMOBILIER DE PRESTIGE" : language === "en" ? "PRIME BROKERAGE" : "عقارات فاخرة",
      badgeTop: "VENTES & ACHATS",
      badgeBottom: "SÉLECTION OFF-MARKET",
      targetTab: "properties",
      images: {
        topLeft: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        bottomLeft: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        topRight: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
        bottomRight: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
      },
      featuredPropertyId: "villa-palmeraie-oasis",
    },
  ];

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[3];

  const handleCardClick = () => {
    const matched = properties.find((p) => p.id === currentCat.featuredPropertyId) || properties[0];
    if (matched) {
      onSelectProperty(matched);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-white border-b border-stone-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Navigation Column + Right Asymmetrical 4-Card Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: KICKER, TITLE, AND 5 SERVICES ================= */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Kicker & Heading */}
            <div className="space-y-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C05621] block">
                {language === "fr" ? "NOS EXPERTISES" : language === "en" ? "OUR EXPERTISE" : "خبراتنا"}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-black uppercase text-stone-950 tracking-tight leading-[1.1]">
                {language === "fr" 
                  ? "DÉCOUVREZ NOS SERVICES" 
                  : language === "en" 
                  ? "DISCOVER OUR SERVICES" 
                  : "اكتشفوا خدماتنا"}
              </h2>
            </div>

            {/* List of 5 Interactive Categories (styled exactly as image.png) */}
            <div className="space-y-2.5 sm:space-y-3.5 pt-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;

                if (isActive) {
                  return (
                    <div
                      key={cat.id}
                      className="flex flex-wrap items-center gap-3 sm:gap-4 cursor-pointer py-1"
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {/* Active Blue Text with Arrow */}
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0066FF] hover:brightness-110 transition-colors text-left"
                      >
                        <span className="text-xl sm:text-2xl font-black">↗</span>
                        <span>{cat.title}</span>
                      </button>

                      {/* Pill Tag with Blue Border and Blue Text */}
                      <span className="px-3.5 py-1 rounded-full border border-[#0066FF] text-[#0066FF] text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0066FF]/5 whitespace-nowrap shadow-xs">
                        {cat.subtag}
                      </span>
                    </div>
                  );
                }

                // Inactive Category: Large semi-transparent muted gray text
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className="block w-full text-left text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-stone-400 hover:text-stone-700 transition-colors py-1 cursor-pointer select-none"
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Direct Link to Explore full catalog */}
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab(currentCat.targetTab)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#0066FF] transition-colors group"
              >
                <span>Accéder à l'espace {currentCat.title}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: 4-CARD ASYMMETRICAL MASONRY COLLAGE ================= */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start"
              >
                
                {/* Left Masonry Column: 2 Cards */}
                <div className="space-y-4 sm:space-y-6">
                  
                  {/* Card 1: Top-Left (Living Room with Round Coffee Table & Badge) */}
                  <div
                    onClick={handleCardClick}
                    className="group relative h-[220px] sm:h-[260px] rounded-[28px] overflow-hidden shadow-xl border border-stone-200/90 cursor-pointer bg-stone-100"
                  >
                    <img
                      src={currentCat.images.topLeft}
                      alt={currentCat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                    {/* Top-Left Black Pill Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider shadow-md backdrop-blur-xs">
                        {currentCat.badgeTop}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <span className="p-2.5 rounded-full bg-white/95 text-stone-900 shadow-md">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Bottom-Left (Luxury Master Bedroom) */}
                  <div
                    onClick={handleCardClick}
                    className="group relative h-[190px] sm:h-[220px] rounded-[28px] overflow-hidden shadow-xl border border-stone-200/90 cursor-pointer bg-stone-100"
                  >
                    <img
                      src={currentCat.images.bottomLeft}
                      alt={currentCat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <span className="p-2.5 rounded-full bg-white/95 text-stone-900 shadow-md">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right Masonry Column: 2 Cards */}
                <div className="space-y-4 sm:space-y-6">
                  
                  {/* Card 3: Top-Right (Infinity Pool Overlooking Ocean) */}
                  <div
                    onClick={handleCardClick}
                    className="group relative h-[180px] sm:h-[200px] rounded-[28px] overflow-hidden shadow-xl border border-stone-200/90 cursor-pointer bg-stone-100"
                  >
                    <img
                      src={currentCat.images.topRight}
                      alt={currentCat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <span className="p-2.5 rounded-full bg-white/95 text-stone-900 shadow-md">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Card 4: Bottom-Right (Luminous Penthouse + 100% PREMIUM badge) */}
                  <div
                    onClick={handleCardClick}
                    className="group relative h-[250px] sm:h-[290px] rounded-[28px] overflow-hidden shadow-xl border border-stone-200/90 cursor-pointer bg-stone-100"
                  >
                    <img
                      src={currentCat.images.bottomRight}
                      alt={currentCat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                    {/* Bottom-Right Light Pink 100% PREMIUM Pill Badge */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="px-4 py-1.5 rounded-full bg-[#FACCD1] text-stone-950 font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-md">
                        {currentCat.badgeBottom}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <span className="p-2.5 rounded-full bg-white/95 text-stone-900 shadow-md">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
