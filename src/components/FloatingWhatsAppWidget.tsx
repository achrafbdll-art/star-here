import React, { useState } from "react";
import { MessageCircle, Phone, X, CheckCircle2, Clock, Send, ShieldCheck } from "lucide-react";
import { Language } from "../types";

export const WHATSAPP_CONFIG = {
  phoneNumber: "+212 5 22 48 00 00",
  whatsappNumber: "+212 6 61 00 00 00",
  cleanWhatsappNumber: "212661000000",
  cleanPhoneNumber: "+212522480000",
};

interface FloatingWhatsAppWidgetProps {
  language: Language;
}

export const FloatingWhatsAppWidget: React.FC<FloatingWhatsAppWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showCallbackModal, setShowCallbackModal] = useState<boolean>(false);
  const [callbackName, setCallbackName] = useState<string>("");
  const [callbackPhone, setCallbackPhone] = useState<string>("");
  const [callbackSent, setCallbackSent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRequestCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback_request",
          fullName: callbackName || "Client Intéressé",
          phone: callbackPhone,
          message: "Demande de rappel téléphonique sous 15 minutes.",
        }),
      });
      setCallbackSent(true);
    } catch {
      setCallbackSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAdviserLink = (specialty: string) => {
    const text = encodeURIComponent(
      `Bonjour, je visite votre plateforme Numa & Saham Prestige et je souhaite être mis en relation avec le conseiller spécialisé en : ${specialty}.`
    );
    return `https://wa.me/${WHATSAPP_CONFIG.cleanWhatsappNumber}?text=${text}`;
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Floating Bubble Options Window in Light Theme */}
        {isOpen && (
          <div className="w-80 sm:w-88 bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in slide-in-from-bottom duration-200">
            
            {/* Header */}
            <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-600 absolute -bottom-0.5 -right-0.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm">Conciergerie Prestige</div>
                  <div className="text-[10px] text-emerald-100 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Conseillers en ligne (WhatsApp Maroc)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-700/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Adviser channels */}
            <div className="p-4 space-y-2.5 text-xs">
              <p className="text-[11px] text-stone-500 font-normal">
                Choisissez votre département d'expertise pour une prise en charge immédiate :
              </p>

              <a
                href={getAdviserLink("Projets Neufs & Investissement VEFA")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-emerald-500 transition-all group"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    🏗️ Projets Neufs & Investissement
                  </div>
                  <div className="text-[10px] text-stone-500">Programmes VEFA, Anfa Coast, Tanger</div>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">Ouvrir</span>
              </a>

              <a
                href={getAdviserLink("Ventes, Achats & Transactions de Prestige")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-emerald-500 transition-all group"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    🤝 Ventes & Achats de Biens
                  </div>
                  <div className="text-[10px] text-stone-500">Villas, penthouses, riads & off-market</div>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">Ouvrir</span>
              </a>

              <a
                href={getAdviserLink("Location Courte/Longue Durée & Conciergerie Numa")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-emerald-500 transition-all group"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    🔑 Locations & Support Voyageurs
                  </div>
                  <div className="text-[10px] text-stone-500">Aparthotels autonomes & baux résidentiels</div>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">Ouvrir</span>
              </a>

              {/* Call Me Back CTA */}
              <div className="pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setShowCallbackModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Être rappelé sous 15 minutes</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 group"
          title="WhatsApp & Support"
          aria-label="Contacter par WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 absolute -top-0.5 -right-0.5 animate-ping" />
          </div>
          <span className="text-xs uppercase tracking-wider font-extrabold hidden sm:inline">
            WhatsApp Direct
          </span>
        </button>

      </div>

      {/* Call Me Back Modal (Light Theme) */}
      {showCallbackModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-stone-900 border border-stone-200 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base">
                <Clock className="w-5 h-5 text-[#8C6D37]" />
                <span>Rappel Immédiat (15 min)</span>
              </div>
              <button
                onClick={() => {
                  setShowCallbackModal(false);
                  setCallbackSent(false);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {callbackSent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg">Demande de rappel validée</h4>
                <p className="text-xs text-stone-600">
                  Notre équipe commerciale vous contacte au numéro indiqué sous 15 minutes maximum.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestCallback} className="space-y-3">
                <p className="text-xs text-stone-600 font-normal">
                  Laissez vos coordonnées ci-dessous pour être rappelé sans engagement par l'un de nos directeurs de programmes :
                </p>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="M. / Mme Nom et Prénom"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    Numéro de téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B38B4D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isSubmitting ? "Validation..." : "Confirmer la demande de rappel"}</span>
                </button>

                <div className="flex items-center justify-center gap-1 text-[10px] text-stone-400 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ligne directe agence : {WHATSAPP_CONFIG.phoneNumber}</span>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
