import React, { useState } from "react";
import { Send, Bot, Sparkles, User, ArrowRight, CheckCircle2, RotateCcw, Building2, Eye } from "lucide-react";
import { Property, Language } from "../types";

interface AiRealEstateAdvisorProps {
  properties: Property[];
  language: Language;
  onSelectProperty: (property: Property) => void;
}

interface Message {
  sender: "bot" | "user";
  text: string;
  isDemo?: boolean;
  recommendedIds?: string[];
}

export const AiRealEstateAdvisor: React.FC<AiRealEstateAdvisorProps> = ({
  properties,
  language,
  onSelectProperty,
}) => {
  const [activeMode, setActiveMode] = useState<"chat" | "quiz">("chat");

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: language === "fr"
        ? "Bonjour ! Je suis le conseiller augmenté Numa & Saham Prestige. Décrivez-moi votre projet en langage naturel (ex: 'Je cherche un appartement 3 chambres à Casablanca avec vue mer' ou 'Une villa avec piscine à Marrakech'), et je vous orienterai immédiatement vers nos programmes d'exception."
        : "Hello! I am your Numa & Saham Prestige AI advisor. Describe your ideal property in natural language (e.g., 'Looking for a 3-bedroom sea view apartment in Casablanca' or 'A villa with a pool in Marrakech'), and I will guide you to our finest listings.",
      isDemo: false
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Guided Quiz State
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizObjective, setQuizObjective] = useState<string>("investment");
  const [quizCity, setQuizCity] = useState<string>("Casablanca");
  const [quizBudget, setQuizBudget] = useState<string>("mid");
  const [quizFeature, setQuizFeature] = useState<string>("neuf");
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Send message to `/api/assistant`
  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputPrompt).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend, userCity: "Casablanca" }),
      });
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.text || "Nos conseillers sont à votre disposition pour vous orienter.",
          isDemo: data.isDemo,
          recommendedIds: data.recommendedPropertyIds || []
        }
      ]);
    } catch (err) {
      console.warn("Assistant request failed, using local PropTech parser:", err);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Pour votre recherche, nous vous conseillons de découvrir notre programme phare Vert Marine à Casablanca ou nos résidences à Marrakech Palmeraie.",
          isDemo: true,
          recommendedIds: ["residence-vert-marine", "villa-palmeraie-oasis"]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Evaluate quiz matches
  const getQuizMatchedProperties = () => {
    return properties.filter((p) => {
      let matches = true;
      if (quizCity !== "all" && p.city.toLowerCase() !== quizCity.toLowerCase()) {
        matches = false;
      }
      if (quizBudget === "low" && p.priceDH > 2000000) matches = false;
      if (quizBudget === "mid" && (p.priceDH < 1500000 || p.priceDH > 6000000)) matches = false;
      if (quizBudget === "high" && p.priceDH < 5000000) matches = false;
      return matches;
    });
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xl text-stone-900">
      
      {/* Top Header Mode Switcher (Light Theme) */}
      <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/80">
        <div>
          <div className="inline-flex items-center gap-2 text-[#8C6D37] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{language === "fr" ? "Intelligence Artificielle Immobilière" : "AI Real Estate Engine"}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase text-stone-950">
            {language === "fr" ? "Conseiller Augmenté & Moteur de Recommandation" : "AI Advisor & Matching Engine"}
          </h3>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl border border-stone-300/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveMode("chat")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeMode === "chat" ? "bg-white text-stone-900 font-bold shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {language === "fr" ? "Discussion Libre" : "Natural Language"}
          </button>
          <button
            onClick={() => setActiveMode("quiz")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeMode === "quiz" ? "bg-white text-stone-900 font-bold shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {language === "fr" ? "Recommandation Guidée" : "Guided Quiz"}
          </button>
        </div>
      </div>

      {/* MODE 1: CONVERSATIONAL CHAT */}
      {activeMode === "chat" && (
        <div className="p-6 flex flex-col h-[520px] bg-white">
          
          {/* Quick Prompts */}
          <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-stone-100 text-xs">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Suggestions :</span>
            {[
              "Appartement 3 chambres vue mer à Casablanca",
              "Villa d'exception avec piscine à Marrakech",
              "Quel rendement pour le projet Vert Marine ?",
              "Penthouse de standing à Casa Anfa",
            ].map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 hover:text-stone-900 transition-colors text-[11px]"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B38B4D] text-black flex items-center justify-center shrink-0 shadow-sm font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-[#0C0F17] text-white font-medium rounded-br-none shadow-sm"
                      : "bg-[#F9F8F5] text-stone-800 border border-stone-200 rounded-bl-none shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* If recommended property IDs */}
                  {m.recommendedIds && m.recommendedIds.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-[#8C6D37]">Biens correspondants :</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {m.recommendedIds.map((propId) => {
                          const prop = properties.find((p) => p.id === propId);
                          if (!prop) return null;
                          return (
                            <button
                              key={propId}
                              onClick={() => onSelectProperty(prop)}
                              className="flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-left transition-colors group shadow-xs"
                            >
                              <img src={prop.images.hero} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <div className="truncate">
                                <div className="font-bold text-stone-900 text-[11px] truncate group-hover:text-[#B38B4D]">{prop.name.fr}</div>
                                <div className="text-[10px] text-stone-500 font-mono">{(prop.priceDH).toLocaleString("fr-FR")} DH</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {m.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <div className="w-8 h-8 rounded-full bg-[#B38B4D]/20 text-[#8C6D37] flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <span>Le conseiller analyse le marché et formule votre recommandation...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="mt-4 pt-3 border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ex: Je cherche une villa à Marrakech Palmeraie avec piscine pour 8 MDH..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B38B4D]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-3 bg-[#0C0F17] hover:bg-stone-800 text-white font-bold rounded-xl transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>

        </div>
      )}

      {/* MODE 2: GUIDED QUIZ RECOMMENDER */}
      {activeMode === "quiz" && (
        <div className="p-6 sm:p-10 bg-white">
          {!quizCompleted ? (
            <div className="max-w-2xl mx-auto space-y-8">
              
              {/* Progress Stepper */}
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 border-b border-stone-200 pb-3">
                <span>Étape {quizStep} sur 4</span>
                <span className="text-[#8C6D37] font-bold">Diagnostic Investissement Saham & Numa</span>
              </div>

              {/* Step 1: Objectif */}
              {quizStep === 1 && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg sm:text-xl font-bold uppercase text-stone-900">
                    1. Quel est votre objectif patrimonial prioritaire ?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "investment", title: "Investissement Locatif", desc: "Rendement net maximisé (7-9%) et plus-value" },
                      { id: "primary", title: "Résidence Principale", desc: "Confort absolu, finitions de prestige et écoles" },
                      { id: "holiday", title: "Pied-à-Terre & Loisirs", desc: "Vue mer, golf ou médina pour séjours exclusifs" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setQuizObjective(opt.id);
                          setQuizStep(2);
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          quizObjective === opt.id
                            ? "bg-white border-[#B38B4D] text-stone-900 shadow-md ring-2 ring-[#B38B4D]/30"
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white"
                        }`}
                      >
                        <div className="font-serif font-bold text-sm text-stone-900 mb-1">{opt.title}</div>
                        <div className="text-xs text-stone-500 font-light">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Ville */}
              {quizStep === 2 && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg sm:text-xl font-bold uppercase text-stone-900">
                    2. Dans quelle ville marocaine souhaitez-vous investir ?
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "Casablanca", name: "Casablanca", desc: "Anfa, CFC, Coast" },
                      { id: "Marrakech", name: "Marrakech", desc: "Palmeraie, Medina" },
                      { id: "Tanger", name: "Tanger", desc: "Malabata, Marina" },
                      { id: "Rabat", name: "Rabat", desc: "Souissi, Ambassades" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setQuizCity(c.id);
                          setQuizStep(3);
                        }}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          quizCity === c.id
                            ? "bg-white border-[#B38B4D] text-stone-900 shadow-md ring-2 ring-[#B38B4D]/30"
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white"
                        }`}
                      >
                        <Building2 className="w-5 h-5 mx-auto mb-2 text-[#8C6D37]" />
                        <div className="font-bold text-sm text-stone-900">{c.name}</div>
                        <div className="text-[10px] text-stone-500">{c.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {quizStep === 3 && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg sm:text-xl font-bold uppercase text-stone-900">
                    3. Quel est votre ordre de budget prévisionnel ?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "low", title: "< 2 500 000 DH", desc: "Appartements 1-2 chambres ou locations meublées" },
                      { id: "mid", title: "2,5 MDH à 6 MDH", desc: "Grands appartements neufs, penthouses, vue mer" },
                      { id: "high", title: "> 6 000 000 DH", desc: "Villas de maître, domaines et penthouses ultra-luxe" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setQuizBudget(b.id);
                          setQuizStep(4);
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          quizBudget === b.id
                            ? "bg-white border-[#B38B4D] text-stone-900 shadow-md ring-2 ring-[#B38B4D]/30"
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white"
                        }`}
                      >
                        <div className="font-bold text-stone-900 text-base mb-1">{b.title}</div>
                        <div className="text-xs text-stone-500 font-light">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Priorité */}
              {quizStep === 4 && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg sm:text-xl font-bold uppercase text-stone-900">
                    4. Quelle prestation prime pour vous ?
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "neuf", title: "Programme Neuf VEFA" },
                      { id: "sea", title: "Vue Océan / Mer" },
                      { id: "pool", title: "Piscine Privée" },
                      { id: "terrace", title: "Grande Terrasse" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          setQuizFeature(f.id);
                          setQuizCompleted(true);
                        }}
                        className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#B38B4D] hover:bg-white text-center text-xs font-bold text-stone-800 transition-all shadow-xs"
                      >
                        {f.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Back */}
              {quizStep > 1 && (
                <div className="pt-4 border-t border-stone-200">
                  <button
                    onClick={() => setQuizStep((prev) => prev - 1)}
                    className="text-xs text-stone-600 hover:text-stone-900 transition-colors font-medium"
                  >
                    ← Retour à l'étape précédente
                  </button>
                </div>
              )}

            </div>
          ) : (
            // Quiz Results Display in Light Theme
            <div className="space-y-8 max-w-4xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6D37]">
                    Résultat de l'analyse algorithmique
                  </span>
                  <h4 className="font-serif text-2xl font-bold uppercase text-stone-950 mt-1">
                    Nos meilleures correspondances ({getQuizMatchedProperties().length} biens)
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setQuizStep(1);
                    setQuizCompleted(false);
                  }}
                  className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 px-3 py-1.5 rounded-lg bg-stone-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer le diagnostic</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getQuizMatchedProperties().map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-lg p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 rounded-2xl overflow-hidden mb-4 shadow-xs">
                        <img src={prop.images.hero} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-[#B38B4D] text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow-xs">
                          Correspondance 98%
                        </div>
                      </div>
                      <h5 className="font-serif font-bold text-base text-stone-900">{prop.name.fr}</h5>
                      <p className="text-xs text-stone-500 mt-1">{prop.city} · {prop.neighborhood}</p>
                      <div className="mt-3 font-serif font-bold text-lg text-[#8C6D37]">
                        {(prop.priceDH).toLocaleString("fr-FR")} DH
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      <Eye className="w-4 h-4 text-[#D4AF37]" />
                      <span>Consulter ce bien</span>
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
};
