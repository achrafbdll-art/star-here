import React, { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, Send, MapPin, Video } from "lucide-react";
import { Property, Language } from "../types";

interface ScheduleVisitModalProps {
  property: Property | null;
  onClose: () => void;
  language: Language;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  onClose,
  language,
}) => {
  const [visitType, setVisitType] = useState<"physique" | "virtuelle">("physique");
  const [visitDate, setVisitDate] = useState<string>("2026-07-20");
  const [timeSlot, setTimeSlot] = useState<string>("10h00 - 12h00 (Matin)");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!email && !phone)) return;

    setIsSubmitting(true);
    const ref = "VIS-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "visit_request",
          fullName: name,
          email,
          phone,
          propertyId: property?.id || "general",
          propertyRef: property?.referenceCode || "PROGRAMMES-NEUFS",
          visitDate,
          visitTimeSlot: `${visitType.toUpperCase()} : ${timeSlot}`,
          message: notes || `Demande de visite pour ${property?.name.fr || "rendez-vous agence"}`,
        }),
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F5] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-300 my-auto text-stone-900 flex flex-col">
        
        {/* Header (Light Theme) */}
        <div className="bg-stone-50 px-6 py-4 flex items-center justify-between border-b border-stone-200 text-stone-900">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#B38B4D]/15 text-[#8C6D37]">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold uppercase tracking-wide text-stone-950">
              {language === "fr" ? "Planifier une Visite Privée" : "Schedule a Private Viewing"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Brief Preview */}
        {property && (
          <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex items-center gap-3">
            <img src={property.images.hero} alt="" className="w-12 h-12 rounded-lg object-cover" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-[#B38B4D] font-bold">{property.referenceCode}</span>
              <h4 className="font-serif font-bold text-xs text-stone-900 truncate">{property.name.fr}</h4>
              <div className="flex items-center gap-1 text-[11px] text-stone-500">
                <MapPin className="w-3 h-3 text-[#B38B4D]" />
                <span className="truncate">{property.city} · {property.neighborhood}</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-900">Visite Confirmée</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Référence de rendez-vous : <span className="font-mono font-bold text-stone-900">{bookingRef}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-left space-y-1 text-stone-700">
                <div>📅 <strong>Date :</strong> {visitDate} ({timeSlot})</div>
                <div>📍 <strong>Modalité :</strong> {visitType === "physique" ? "Visite privée sur site avec un conseiller" : "Visite 3D immersive par visioconférence"}</div>
                <div>📱 Un rappel SMS et WhatsApp vous sera adressé 2h avant le rendez-vous.</div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#0C0F17] text-white text-xs font-bold uppercase tracking-wider"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Type of visit (On-site vs Virtual 3D) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisitType("physique")}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                    visitType === "physique"
                      ? "bg-[#0C0F17] text-white border-black shadow"
                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sur Place (Maroc)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisitType("virtuelle")}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                    visitType === "virtuelle"
                      ? "bg-[#0C0F17] text-white border-black shadow"
                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Visite Virtuelle 3D</span>
                </button>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    Date souhaitée *
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    Créneau horaire *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                  >
                    <option value="10h00 - 12h00 (Matin)">Matinée (10h00 - 12h00)</option>
                    <option value="14h00 - 16h00 (Après-midi)">Après-midi (14h00 - 16h00)</option>
                    <option value="16h30 - 18h30 (Fin de journée)">Fin de journée (16h30 - 18h30)</option>
                  </select>
                </div>
              </div>

              {/* Contact Inputs */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="M. / Mme Youssef Berrada"
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@exemple.com"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    Téléphone (+212) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38B4D] hover:from-[#E5C158] hover:to-[#C59B38] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 mt-2"
              >
                {isSubmitting ? "Validation de la visite..." : "Confirmer le Rendez-vous"}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Visite confidentielle et sans aucun engagement.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
