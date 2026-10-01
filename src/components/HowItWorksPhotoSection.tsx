import React, { useRef } from "react";
import { 
  Award, 
  Users, 
  KeyRound, 
  Headphones, 
  Handshake, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";
import { Language } from "../types";

interface HowItWorksPhotoSectionProps {
  language: Language;
  onExploreProperties?: () => void;
  onOpenScheduleVisit?: () => void;
}

export const HowItWorksPhotoSection: React.FC<HowItWorksPhotoSectionProps> = ({
  language,
  onExploreProperties,
  onOpenScheduleVisit,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const cardsData = [
    {
      id: "certified",
      icon: Award,
      title: language === "fr" 
        ? "Des logements certifiés sélectionnés pour vous :" 
        : language === "en" 
        ? "Certified homes handpicked for you:" 
        : "شقق معتمدة ومختارة بعناية :",
      description: language === "fr"
        ? "Staystar vous propose une sélection rigoureuse de biens meublés haut de gamme, audités et équipés selon des standards hôteliers stricts à Casablanca, Marrakech et Rabat."
        : language === "en"
        ? "Staystar offers a rigorous selection of premium furnished homes, audited and equipped to five-star hospitality standards across Casablanca, Marrakech, and Rabat."
        : "يقدم لك ستايستار تشكيلة مختارة بدقة من الشقق المفروشة الفاخرة والمعتمدة وفق أعلى معايير الضيافة الفندقية.",
    },
    {
      id: "tools",
      icon: Users,
      title: language === "fr" 
        ? "Des outils pour répondre à vos besoins :" 
        : language === "en" 
        ? "Smart tools designed for your needs:" 
        : "أدوات ذكية تلبي كافة احتياجاتك :",
      description: language === "fr"
        ? "Réservez en ligne en temps réel, personnalisez votre séjour et bénéficiez de notre conciergerie locale dédiée disponible à chaque instant pour vous guider."
        : language === "en"
        ? "Book online in real time, customize your stay, and enjoy our dedicated local concierge always available to assist and guide you."
        : "احجز شقتك عبر الإنترنت فورياً، وخصص إقامتك مع دعم كونسيرج محلي متاح في كل لحظة.",
    },
    {
      id: "autonomous-access",
      icon: KeyRound,
      title: language === "fr" 
        ? "Une arrivée 100% autonome 24h/24 :" 
        : language === "en" 
        ? "100% Autonomous 24/7 check-in:" 
        : "وصول ذاتي 100% على مدار 24 ساعة :",
      description: language === "fr"
        ? "Accédez à votre suite en totale liberté grâce à notre système de serrure connectée intelligente et code PIN chiffré, sans contrainte d'horaire ni attente."
        : language === "en"
        ? "Access your suite seamlessly using our smart lock system and encrypted PIN code, without key hassle or waiting at a reception desk."
        : "ادخل إلى شقتك بكل حرية بفضل الأقفال الذكية والرموز الرقمية الآمنة في أي وقت تشاء.",
    },
    {
      id: "hotel-service",
      icon: Headphones,
      title: language === "fr" 
        ? "Un service hôtelier d'exception :" 
        : language === "en" 
        ? "Exceptional hotel-grade comfort:" 
        : "خدمات فندقية استثنائية راقية :",
      description: language === "fr"
        ? "L'ensemble de nos logements bénéficient d'un ménage professionnel avant chaque séjour, d'une literie 5 étoiles, de serviettes premium et de fibre optique 100 Mbps."
        : language === "en"
        ? "Every home features professional cleaning before arrival, 5-star hotel linens, fluffy towels, and ultra-high-speed 100 Mbps fiber Wi-Fi."
        : "تستفيد جميع الشقق من تنظيف احترافي دوري، ومفارش فندقية خمس نجوم وإنترنت ألياف بصرية سريع.",
    },
    {
      id: "trusted-partners",
      icon: Handshake,
      title: language === "fr" 
        ? "Des partenaires de confiance :" 
        : language === "en" 
        ? "Trusted partners & transparency:" 
        : "شركاء موثوقون وشفافية تامة :",
      description: language === "fr"
        ? "Chez Staystar, nous bâtissons des relations durables avec des promoteurs et propriétaires de prestige, garantissant transparence, sérénité et valorisation continue."
        : language === "en"
        ? "At Staystar, we build enduring trust with leading developers and owners, ensuring total peace of mind, high occupancy, and asset appreciation."
        : "نبني في ستايستار علاقات متينة مع الملاك والمستثمرين لضمان أقصى درجات الشفافية والراحة.",
    },
  ];

  return (
    <section 
      id="comment-ca-se-passe" 
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28 text-white select-none"
    >
      {/* ================= BACKGROUND: MODERN ARCHITECTURE WITH PURPLE/MAGENTA OVERLAY (MATCHING PHOTO) ================= */}
      <div className="absolute inset-0 z-0">
        {/* Modern residential architecture photography */}
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=85"
          alt="Architecture résidentielle Staystar"
          className="w-full h-full object-cover object-center"
        />
        {/* Vibrant Magenta / Purple / Violet Gradient Overlay matching photo J%OJIO.png */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#5B1061]/95 via-[#7E1A87]/90 to-[#9B1E94]/85 mix-blend-multiply" 
        />
        {/* Supplementary color-enrichment gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-[#6B1173]/40 to-transparent" 
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TOP SECTION: WHITE ACCENT LINE & BOLD TITLE ================= */}
        <div className="mb-10 sm:mb-14">
          {/* Thick White Accent Bar (Identical to image) */}
          <div className="w-48 sm:w-56 h-[3px] bg-white mb-6 sm:mb-7 shadow-xs" />
          
          {/* Bold Sans-serif Uppercase Title */}
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-[1.08]">
            {language === "fr" ? (
              <>
                COMMENT <br />
                ÇA SE PASSE <br />
                ?
              </>
            ) : language === "en" ? (
              <>
                HOW DOES IT <br />
                WORK <br />
                ?
              </>
            ) : (
              <>
                كيف <br />
                تتم العملية <br />
                ؟
              </>
            )}
          </h2>
        </div>

        {/* ================= 5 SOLID BLACK RECTANGULAR CARDS (FAITHFUL TO PHOTO) ================= */}
        <div className="relative">
          
          {/* Carousel / Cards Track */}
          <div
            ref={scrollContainerRef}
            className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory"
          >
            {cardsData.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  className="w-[280px] sm:w-[320px] lg:w-auto shrink-0 snap-start bg-black text-white p-6 sm:p-7 flex flex-col justify-start border-t-2 border-transparent hover:border-white transition-all duration-300 shadow-2xl group min-h-[340px] sm:min-h-[360px]"
                >
                  {/* Card Header: Icon + Title with colon */}
                  <div className="flex items-start gap-3.5 mb-5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-black transition-colors duration-200">
                      <IconComp className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="font-sans font-extrabold text-[13px] sm:text-sm text-white uppercase tracking-wide leading-snug pt-1">
                      {card.title}
                    </h3>
                  </div>

                  {/* Horizontal line divider identical to image */}
                  <div className="w-full h-px bg-white/20 mb-5" />

                  {/* Card Body Description */}
                  <p className="font-sans text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    {card.description}
                  </p>

                  {/* Step index badge in bottom */}
                  <div className="mt-auto pt-6 flex items-center justify-between text-white/40 text-[10px] font-mono uppercase tracking-widest">
                    <span>ÉTAPE 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Next Arrow Navigation Button (Shown on desktop & tablet on the right side like in photo) */}
          <button
            onClick={scrollRight}
            className="lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-stone-900 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            aria-label="Faire défiler vers la droite"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
};
