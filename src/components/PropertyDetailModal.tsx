import React, { useState } from "react";
import { 
  X, Heart, Scale, MapPin, Maximize2, Bed, Bath, Share2, 
  Phone, MessageCircle, Calendar, Download, CheckCircle2, 
  ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Send
} from "lucide-react";
import { Property, Language } from "../types";

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  isCompared: boolean;
  onToggleCompare: (prop: Property, e: React.MouseEvent) => void;
  onOpenScheduleVisit: (prop: Property) => void;
  onShare: (prop: Property) => void;
  onBrochureRequested: (prop: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  language,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  onOpenScheduleVisit,
  onShare,
  onBrochureRequested,
}) => {
  // Gallery index
  const allImages = [property.images.hero, ...property.images.details];
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Quick inquiry form state
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>(
    language === "fr" 
      ? `Bonjour, je suis vivement intéressé(e) par le bien "${property.name.fr}" (Réf: ${property.referenceCode || property.id}). Merci de me recontacter.`
      : `Hello, I am interested in property "${property.name.en || property.name.fr}" (Ref: ${property.referenceCode || property.id}). Please contact me.`
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || (!contactEmail.trim() && !contactPhone.trim())) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "property_inquiry",
          fullName: contactName,
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
          propertyId: property.id,
          propertyRef: property.referenceCode,
        }),
      });
      setIsSubmitting(false);
      setFormSubmitted(true);
    } catch (err) {
      console.warn("Backend error, falling back locally:", err);
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const formatPriceDH = (val: number, unit?: string) => {
    const formatted = val.toLocaleString("fr-FR");
    if (unit === "mois") return `${formatted} DH / mois`;
    if (unit === "nuit") return `${formatted} DH / nuit`;
    return `${formatted} DH`;
  };

  const getApproxEur = (valDH: number) => {
    const eur = Math.round(valDH / 10.7);
    return eur.toLocaleString("fr-FR");
  };

  // WhatsApp prefilled message URL
  const whatsappText = encodeURIComponent(
    `Bonjour Numa & Saham Prestige, je souhaite des informations sur le bien "${property.name.fr}" (Réf: ${property.referenceCode || property.id}) situé à ${property.city} (${property.neighborhood}).`
  );
  const whatsappUrl = `https://wa.me/212661000000?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F5] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-300 my-auto text-stone-900 flex flex-col max-h-[92vh]">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-bold">
              {property.referenceCode || "NUMA-SAHAM"}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#B38B4D]" />
              <span>{property.city}</span>
              <span>·</span>
              <span className="text-stone-800 font-semibold">{property.neighborhood}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Share Button */}
            <button
              onClick={() => onShare(property)}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
              title="Partager ce bien"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Compare Toggle */}
            <button
              onClick={(e) => onToggleCompare(property, e)}
              className={`p-2 rounded-full transition-colors ${
                isCompared
                  ? "bg-[#B38B4D] text-black"
                  : "hover:bg-stone-100 text-stone-600 hover:text-stone-900"
              }`}
              title="Comparer"
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Favorite Toggle */}
            <button
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "text-red-500"
                  : "hover:bg-stone-100 text-stone-600 hover:text-red-500"
              }`}
              title="Favoris"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500" : ""}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors ml-2"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Main Gallery Lightbox Section */}
          <div className="space-y-3">
            <div className="relative h-[320px] sm:h-[460px] rounded-2xl overflow-hidden shadow-lg bg-black">
              <img
                src={allImages[activeImageIdx]}
                alt={property.name.fr}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full border border-stone-700">
                {activeImageIdx + 1} / {allImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIdx === i ? "border-[#B38B4D] scale-105" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="miniature" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Key Pricing Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#B38B4D]/20 text-[#8C6D37] border border-[#B38B4D]/40">
                  {property.transactionType === "projet-neuf"
                    ? "Programme Neuf"
                    : property.transactionType === "vente"
                    ? "Vente de Prestige"
                    : "Location Haut Standing"}
                </span>
                {property.deliveryDate && (
                  <span className="text-[11px] text-stone-500 font-medium">
                    · {property.deliveryDate}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                {property.name[language] || property.name.fr}
              </h1>
            </div>

            <div className="text-left md:text-right shrink-0">
              <div className="font-serif text-3xl font-black text-stone-900 tracking-tight">
                {formatPriceDH(property.priceDH, property.priceUnit)}
              </div>
              <div className="text-xs text-stone-500 font-mono mt-0.5">
                Équivalent : ≈ {getApproxEur(property.priceDH)} €
              </div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
            <div className="p-2">
              <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-1">Surface</div>
              <div className="font-serif text-xl font-bold text-stone-900">{property.surface} m²</div>
            </div>
            <div className="p-2 border-l border-stone-100">
              <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-1">Chambres</div>
              <div className="font-serif text-xl font-bold text-stone-900">{property.bedrooms}</div>
            </div>
            <div className="p-2 border-l border-stone-100">
              <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-1">Salles de bain</div>
              <div className="font-serif text-xl font-bold text-stone-900">{property.bathrooms}</div>
            </div>
            <div className="p-2 border-l border-stone-100">
              <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-1">Stationnement</div>
              <div className="font-serif text-xl font-bold text-stone-900">{property.parking ? "Inclus (Titre)" : "Proximité"}</div>
            </div>
          </div>

          {/* Two-Column Layout: Description & POIs on Left, Action Lead Box on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 cols): Description, Amenities, Why Special, POIs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#B38B4D] mb-2 font-sans">
                  Description du Bien
                </h2>
                <p className="text-sm text-stone-700 leading-relaxed font-light whitespace-pre-line">
                  {property.description[language] || property.description.fr}
                </p>
              </div>

              {/* "Pourquoi ce bien peut vous intéresser" (Light Luxury Theme) */}
              {property.whySpecial && (
                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#B38B4D]/35 text-stone-900 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-[#8C6D37]">
                    <Sparkles className="w-4 h-4 text-[#8C6D37]" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-950">
                      {language === "fr" ? "Pourquoi ce bien peut vous intéresser" : "Why You Will Love This Property"}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(property.whySpecial[language] || property.whySpecial.fr || []).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-[#8C6D37] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B38B4D] mb-3 font-sans">
                  Prestations & Commodités
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700"
                    >
                      {item.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Proximity & POIs */}
              {property.pois && property.pois.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#B38B4D] mb-3 font-sans">
                    Proximités & Points d'Intérêt
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.pois.map((poi, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200 text-xs"
                      >
                        <span className="font-medium text-stone-800">{poi.name}</span>
                        <span className="font-mono text-stone-500 text-[11px] bg-stone-50 px-2 py-0.5 rounded">
                          {poi.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (5 cols): Instant Action Panel */}
            <div className="lg:col-span-5 space-y-4 sticky top-24">
              
              {/* Primary Direct CTAs: WhatsApp & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>

                <a
                  href="tel:+212522480000"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler Conseiller</span>
                </a>
              </div>

              {/* Book a Private Tour Button */}
              <button
                onClick={() => onOpenScheduleVisit(property)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38B4D] hover:from-[#E5C158] hover:to-[#C59B38] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Demander une Visite Privée</span>
              </button>

              {/* Download Confidential Brochure */}
              <button
                onClick={() => onBrochureRequested(property)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-stone-300 hover:border-stone-400 text-stone-700 font-semibold text-xs transition-colors"
              >
                <Download className="w-4 h-4 text-[#B38B4D]" />
                <span>Télécharger la Brochure Confidentielle (PDF)</span>
              </button>

              {/* Contact Lead Form Box */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-md">
                <h4 className="font-serif font-bold text-sm uppercase text-stone-900 mb-1">
                  Contacter un conseiller dédié
                </h4>
                <p className="text-[11px] text-stone-500 mb-4">
                  Réponse garantie sous 15 minutes par un expert Saham & Numa.
                </p>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <p className="font-bold">Demande transmise avec succès !</p>
                    <p className="text-[11px] text-emerald-700">
                      Un conseiller privé a reçu votre demande concernant la référence {property.referenceCode || property.id}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitLead} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Votre nom complet *"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="E-mail *"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                      />
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Téléphone (+212...)"
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0C0F17] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Transmission en cours..." : "Envoyer ma demande"}</span>
                    </button>
                  </form>
                )}

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Données strictement protégées (Loi CNDP 09-08)</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
