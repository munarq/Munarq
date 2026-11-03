import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Copy,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  Building2,
  Trees,
  Compass,
  Mountain,
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  History,
  RotateCcw,
} from "lucide-react";
import { submitCommissionRfp, type CommissionPayload } from "@/lib/api";

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SavedRfpRecord {
  referenceId: string;
  timestamp: string;
  typology: string;
  areaM2: number;
  zone: string;
  tectonic: string;
  clientName: string;
  clientEmail: string;
  dossierText: string;
}

const STORAGE_KEY = "munarq_active_rfp";

const TYPOLOGIES = [
  {
    id: "residential",
    code: "01",
    label: "Residencial Bioclimático",
    desc: "Vivienda unifamiliar o colectiva pasiva de alta inercia térmica y envolvente viva.",
    icon: Building2,
  },
  {
    id: "cultural",
    code: "02",
    label: "Pabellón Cultural / Cívico",
    desc: "Espacio público de escala institucional, tectónica mineral vista y luz cenital.",
    icon: Compass,
  },
  {
    id: "research",
    code: "03",
    label: "Investigación & Paisaje",
    desc: "Laboratorio de campo, observatorio eco-brutalista o refugio bioclimático.",
    icon: Trees,
  },
  {
    id: "regeneration",
    code: "04",
    label: "Regeneración Urbana",
    desc: "Intervención adaptativa, reprogramación de estructuras existentes y sutura vegetal.",
    icon: Mountain,
  },
];

const BIOMES = [
  {
    id: "coastal",
    code: "Z-01",
    name: "Litoral Béntico",
    desc: "Ambiente salino, brisas marinas continuas y alta corrosión ambiental.",
  },
  {
    id: "estuary",
    code: "Z-02",
    name: "Humedal Estuárico",
    desc: "Nivel freático alto, oscilaciones de marea y humedad relativa saturada.",
  },
  {
    id: "subtropical",
    code: "Z-03",
    name: "Dosel Subtropical",
    desc: "Radiación solar intensa, lluvias torrenciales y ventilación cruzada crítica.",
  },
  {
    id: "alpine",
    code: "Z-04",
    name: "Macizo Alpino",
    desc: "Gradiente térmico severo, cargas periódicas de nieve y radiación UV alta.",
  },
  {
    id: "urban",
    code: "Z-05",
    name: "Densidad Urbana",
    desc: "Microclima modificado, isla de calor antrópica y barrera acústica mineral.",
  },
];

const TECTONICS = [
  {
    id: "clt",
    label: "Madera Laminada (CLT) & Biomasa",
    carbonFactor: -450,
    unit: "kg CO₂/m³",
    desc: "Fijación biogénica de carbono, prefabricación milimétrica CNC.",
  },
  {
    id: "concrete",
    label: "Hormigón Puzolánico de Bajo Clinker",
    carbonFactor: 180,
    unit: "kg CO₂/m³",
    desc: "Inercia térmica estacional masiva con árido reciclado y puzolana activa.",
  },
  {
    id: "stone",
    label: "Piedra Maciza Estructural & Ensambles",
    carbonFactor: 60,
    unit: "kg CO₂/m³",
    desc: "Tectónica ciclópea de baja energía incorporada y junta seca.",
  },
  {
    id: "hybrid",
    label: "Estructura Híbrida Acero + Celosía Vegetal",
    carbonFactor: 280,
    unit: "kg CO₂/m³",
    desc: "Grandes luces de alta esbeltez con soporte para capas botánicas perennes.",
  },
];

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [confirmedDossierText, setConfirmedDossierText] = useState<string | null>(null);
  const [requiresEmailDispatch, setRequiresEmailDispatch] = useState(false);

  // Anti-bot & Honeypot
  const [renderedAt, setRenderedAt] = useState<number>(Date.now());
  const [websiteHp, setWebsiteHp] = useState("");

  // Privacy & Legal (LFPDPPP México)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

  // Previous Session Recovery
  const [savedRfp, setSavedRfp] = useState<SavedRfpRecord | null>(null);

  // Form State
  const [typology, setTypology] = useState("residential");
  const [areaM2, setAreaM2] = useState(380);
  const [timeline, setTimeline] = useState("12-24 meses");
  const [biome, setBiome] = useState("coastal");
  const [tectonic, setTectonic] = useState("concrete");
  const [priority, setPriority] = useState("Carbono Neutro");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Read saved RFP on mount or when opening
  useEffect(() => {
    if (isOpen) {
      setRenderedAt(Date.now());
      setFormError(null);
      setWebsiteHp("");

      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as SavedRfpRecord;
          if (parsed && parsed.referenceId) {
            setSavedRfp(parsed);
          }
        }
      } catch {
        setSavedRfp(null);
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedTypologyObj = TYPOLOGIES.find((t) => t.id === typology) ?? TYPOLOGIES[0];
  const selectedBiomeObj = BIOMES.find((b) => b.id === biome) ?? BIOMES[0];
  const selectedTectonicObj = TECTONICS.find((t) => t.id === tectonic) ?? TECTONICS[0];

  // Estimated carbon balance (approx: area * thickness 0.25m * carbon factor)
  const estimatedCarbonTotalKg = Math.round(areaM2 * 0.25 * selectedTectonicObj.carbonFactor);

  const handleNextStep = () => {
    setFormError(null);
    if (step < 3) {
      setStep((s) => (s + 1) as 2 | 3);
    }
  };

  const handlePrevStep = () => {
    setFormError(null);
    if (step > 1) {
      setStep((s) => (s - 1) as 1 | 2);
    }
  };

  const buildDossierText = (refCode: string) => {
    return [
      `MUNΛRQ — PLIEGO DE ENCARGO // RFP`,
      `=============================================`,
      `REFERENCIA: ${refCode}`,
      `FECHA: ${new Date().toLocaleDateString("es-ES")}`,
      ``,
      `[1] PROGRAMA ARQUITECTÓNICO`,
      `· Tipología: ${selectedTypologyObj.label}`,
      `· Superficie proyectada: ${areaM2} m²`,
      `· Horizonte de desarrollo: ${timeline}`,
      ``,
      `[2] CONDICIÓN BIOCLIMÁTICA & TECTÓNICA`,
      `· Bioma / Emplazamiento: ${selectedBiomeObj.name}`,
      `· Sistema constructivo: ${selectedTectonicObj.label}`,
      `· Huella de carbono estimada (A1-A3): ${estimatedCarbonTotalKg > 0 ? "+" : ""}${estimatedCarbonTotalKg} kg CO₂e`,
      `· Objetivo ambiental prioritario: ${priority}`,
      ``,
      `[3] INFORMACIÓN DE PROMOTOR`,
      `· Nombre / Entidad: ${name}`,
      `· Contacto: ${email} ${phone ? `(${phone})` : ""}`,
      `· Emplazamiento / Parcela: ${siteLocation || "No especificado"}`,
      `· Requerimientos particulares: ${notes || "Ninguno"}`,
      `=============================================`,
      `AVISO LFPDPPP: Datos tratados bajo confidencialidad técnica por MUNΛRQ Studio.`,
      `MUNΛRQ ARCHITECTURE STUDIO — studio@munarq.mx`,
    ].join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validate fields
    if (!name.trim()) {
      setFormError("Por favor ingrese su nombre o entidad.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Por favor proporcione un correo electrónico válido.");
      return;
    }

    // 2. Validate Privacy Acceptance (LFPDPPP)
    if (!acceptedPrivacy) {
      setFormError("Debe aceptar el Aviso de Privacidad conforme a la LFPDPPP para registrar el encargo.");
      return;
    }

    setIsSubmitting(true);

    const payload: CommissionPayload = {
      typology: selectedTypologyObj.label,
      areaM2,
      timeline,
      zone: selectedBiomeObj.name,
      tectonicSystem: selectedTectonicObj.label,
      environmentalObjective: priority,
      clientName: name.trim(),
      clientEmail: email.trim(),
      clientPhone: phone.trim() || undefined,
      siteLocationNotes: [siteLocation.trim(), notes.trim()].filter(Boolean).join(" // "),
      website_hp: websiteHp,
      renderedAt,
    };

    try {
      const response = await submitCommissionRfp(payload);
      const dossier = buildDossierText(response.referenceId);

      setSubmittedReference(response.referenceId);
      setConfirmedDossierText(dossier);
      setRequiresEmailDispatch(Boolean(response.requiresEmailDispatch));

      // Save to localStorage
      const record: SavedRfpRecord = {
        referenceId: response.referenceId,
        timestamp: response.timestamp,
        typology: selectedTypologyObj.label,
        areaM2,
        zone: selectedBiomeObj.name,
        tectonic: selectedTectonicObj.label,
        clientName: name.trim(),
        clientEmail: email.trim(),
        dossierText: dossier,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      setSavedRfp(record);
    } catch {
      // Deterministic fallback
      const fallbackRef = `MNQ-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const dossier = buildDossierText(fallbackRef);

      setSubmittedReference(fallbackRef);
      setConfirmedDossierText(dossier);
      setRequiresEmailDispatch(true);

      const record: SavedRfpRecord = {
        referenceId: fallbackRef,
        timestamp: new Date().toISOString(),
        typology: selectedTypologyObj.label,
        areaM2,
        zone: selectedBiomeObj.name,
        tectonic: selectedTectonicObj.label,
        clientName: name.trim(),
        clientEmail: email.trim(),
        dossierText: dossier,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      setSavedRfp(record);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyDossier = () => {
    const text = confirmedDossierText || (savedRfp ? savedRfp.dossierText : "");
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLoadSavedRfp = () => {
    if (savedRfp) {
      setSubmittedReference(savedRfp.referenceId);
      setConfirmedDossierText(savedRfp.dossierText);
    }
  };

  const handleResetForm = () => {
    setSubmittedReference(null);
    setConfirmedDossierText(null);
    setRequiresEmailDispatch(false);
    setStep(1);
    setFormError(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="commission-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-onyx/85 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-pure dark:bg-dark-surface border border-onyx/20 dark:border-concrete/20 my-auto flex flex-col max-h-[92vh] overflow-hidden text-onyx dark:text-concrete"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-onyx/20 dark:border-concrete/20 bg-concrete dark:bg-dark-canvas">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold px-2 py-1 bg-onyx text-concrete dark:bg-moss dark:text-concrete uppercase tracking-wider">
              {submittedReference ? "REGISTRO CONFIRMADO" : `CONFIGURADOR RFP // 0${step} DE 03`}
            </span>
            <div>
              <h3 id="commission-modal-title" className="font-serif text-2xl md:text-3xl font-light">
                {submittedReference ? "Pliego de Encargo Registrado" : "Iniciar Encargo Arquitectónico"}
              </h3>
              <p className="font-mono text-[10px] text-carbon dark:text-concrete/60 uppercase tracking-wider">
                MUNΛRQ · Protocolo de Parametrización y Tectónica Bioclimática
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-onyx/20 dark:border-concrete/20 hover:bg-onyx hover:text-concrete dark:hover:bg-moss transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing RFP Notification Banner if found in LocalStorage */}
        {!submittedReference && savedRfp && (
          <div className="px-6 py-2.5 bg-greige/50 dark:bg-dark-canvas/80 border-b border-onyx/10 dark:border-concrete/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-moss" />
              <span className="font-mono text-[11px] text-onyx dark:text-concrete">
                Pliego previo registrado en este navegador:{" "}
                <strong className="text-moss dark:text-moss-bright">{savedRfp.referenceId}</strong> (
                {savedRfp.typology}, {savedRfp.areaM2} m²)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSavedRfp}
                className="font-mono text-[10px] uppercase tracking-wider text-moss dark:text-moss-bright underline hover:opacity-80 cursor-pointer"
              >
                Consultar Pliego →
              </button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 bg-pure dark:bg-dark-surface">
          {submittedReference ? (
            /* Confirmation State */
            <div className="space-y-6">
              <div
                className={`p-6 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                  requiresEmailDispatch
                    ? "bg-amber-500/10 border-amber-600/40 dark:bg-amber-950/25 dark:border-amber-500/40"
                    : "bg-concrete dark:bg-dark-canvas border-onyx/20 dark:border-concrete/20"
                }`}
              >
                <div className="space-y-1">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5 ${
                      requiresEmailDispatch
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-moss dark:text-moss-bright"
                    }`}
                  >
                    {requiresEmailDispatch ? (
                      <>
                        <FileText className="w-4 h-4" /> Pliego Estructurado // Requiere Despacho Directo
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" /> Registro Oficial y Persistido
                      </>
                    )}
                  </span>
                  <h4 className="font-mono text-xl md:text-2xl font-bold tracking-tight">
                    {submittedReference}
                  </h4>
                  <p className="text-xs text-carbon dark:text-concrete/70 font-sans">
                    {requiresEmailDispatch
                      ? "Su pliego técnico ha sido generado. Pulse en 'Despacho studio@munarq.mx' para formalizar su recepción directa por correo."
                      : "Pliego estructurado. Despache por email con el botón contiguo para completar el registro en el sistema oficial de MUNΛRQ."}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopyDossier}
                    className="px-4 py-2 border border-onyx/30 dark:border-concrete/30 hover:bg-onyx hover:text-concrete dark:hover:bg-moss font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-moss-bright" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copiado" : "Copiar Pliego"}
                  </button>
                  <a
                    href={`mailto:studio@munarq.mx?subject=Encargo%20MUNARQ%20[${submittedReference}]&body=${encodeURIComponent(
                      confirmedDossierText || ""
                    )}`}
                    className={`px-4 py-2 text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors ${
                      requiresEmailDispatch
                        ? "bg-amber-600 hover:bg-amber-700 shadow-sm"
                        : "bg-moss hover:bg-moss/90"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" /> Despacho studio@munarq.mx
                  </a>
                </div>
              </div>

              {/* Dossier Code Block */}
              <div className="border border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 p-6 font-mono text-xs text-onyx/90 dark:text-concrete/90 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-onyx/10 dark:border-concrete/10 text-[10px] uppercase text-carbon dark:text-concrete/60 tracking-wider">
                  <span>RESUMEN TÉCNICO DEL PLIEGO RFP</span>
                  <span>CANON MUNΛRQ // A1-A3</span>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed overflow-x-auto">
                  {confirmedDossierText}
                </pre>
              </div>

              <div className="p-4 border-l-2 border-moss bg-concrete dark:bg-dark-canvas text-xs text-carbon dark:text-concrete/80 font-sans space-y-1">
                <p>
                  <strong>Red de seguridad de contacto:</strong> Si su cliente de correo no se abrió automáticamente, puede enviar
                  el pliego copiado a <span className="font-mono text-onyx dark:text-concrete font-semibold">studio@munarq.mx</span> citando la referencia{" "}
                  <span className="font-mono text-onyx dark:text-concrete font-semibold">{submittedReference}</span>.
                </p>
                <p className="text-[11px] text-carbon/80 dark:text-concrete/60">
                  Respuesta técnica y análisis de masa térmica estimada en menos de 48 horas hábiles.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="font-mono text-[11px] uppercase tracking-wider text-carbon hover:text-onyx dark:text-concrete/60 dark:hover:text-concrete flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Configurar otro encargo
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-onyx text-concrete dark:bg-concrete dark:text-onyx font-mono text-xs uppercase tracking-wider hover:bg-moss hover:text-white dark:hover:bg-moss dark:hover:text-white transition-colors cursor-pointer"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          ) : (
            /* 3-Step Configurator Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Invisible Honeypot to intercept automated spam bots */}
              <input
                type="text"
                name="website_hp"
                value={websiteHp}
                onChange={(e) => setWebsiteHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="opacity-0 pointer-events-none absolute -left-[9999px]"
              />

              {/* Step Indicators */}
              <div className="grid grid-cols-3 gap-2 border-b border-onyx/10 dark:border-concrete/10 pb-4">
                {[
                  { num: 1, title: "Tipología & Escala" },
                  { num: 2, title: "Bioma & Tectónica" },
                  { num: 3, title: "Promotor & Pliego" },
                ].map((s) => (
                  <div
                    key={s.num}
                    className={`pb-2 border-b-2 text-left transition-colors ${
                      step === s.num
                        ? "border-moss text-onyx dark:text-concrete"
                        : step > s.num
                        ? "border-onyx/40 dark:border-concrete/40 text-carbon dark:text-concrete/60"
                        : "border-transparent text-onyx/30 dark:text-concrete/30"
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider block">
                      0{s.num} // FASE
                    </span>
                    <span className="font-sans text-xs font-medium hidden sm:inline">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* STEP 1: Tipología & Escala */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-3 font-semibold">
                      01.1 // SELECCIONE EL PROGRAMA ARQUITECTÓNICO
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {TYPOLOGIES.map((t) => {
                        const Icon = t.icon;
                        const isSelected = typology === t.id;
                        return (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setTypology(t.id)}
                            className={`p-4 text-left border transition-all cursor-pointer ${
                              isSelected
                                ? "border-moss bg-moss/5 dark:bg-moss/10"
                                : "border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 hover:border-onyx/50 dark:hover:border-concrete/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-[10px] text-moss dark:text-moss-bright uppercase tracking-wider font-bold">
                                {t.code}
                              </span>
                              <Icon className={`w-4 h-4 ${isSelected ? "text-moss" : "text-carbon/60"}`} />
                            </div>
                            <h4 className="font-sans font-semibold text-sm mb-1 text-onyx dark:text-concrete">
                              {t.label}
                            </h4>
                            <p className="font-sans text-xs text-carbon dark:text-concrete/70 leading-relaxed">
                              {t.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 font-semibold">
                          01.2 // SUPERFICIE ÚTIL (M²)
                        </label>
                        <span className="font-mono text-sm font-bold text-moss dark:text-moss-bright">
                          {areaM2} m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min={60}
                        max={3000}
                        step={20}
                        value={areaM2}
                        onChange={(e) => setAreaM2(Number(e.target.value))}
                        className="w-full accent-moss cursor-pointer"
                      />
                      <div className="flex gap-2 mt-2">
                        {[150, 380, 850, 1800].map((val) => (
                          <button
                            type="button"
                            key={val}
                            onClick={() => setAreaM2(val)}
                            className={`flex-1 py-1 font-mono text-[10px] border border-onyx/20 dark:border-concrete/20 transition-colors cursor-pointer ${
                              areaM2 === val
                                ? "bg-onyx text-concrete dark:bg-moss"
                                : "bg-concrete dark:bg-dark-canvas hover:bg-onyx/10"
                            }`}
                          >
                            {val} m²
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-2 font-semibold">
                        01.3 // HORIZONTE DE EJECUCIÓN
                      </label>
                      <div className="space-y-2">
                        {["6 - 12 meses (Urgente / Fase 1)", "12 - 24 meses (Estándar)", "24+ meses (Plan Director)"].map((t) => (
                          <label
                            key={t}
                            className={`flex items-center gap-3 p-2.5 border cursor-pointer text-xs font-sans transition-colors ${
                              timeline === t
                                ? "border-moss bg-moss/5 dark:bg-moss/10 text-onyx dark:text-concrete font-medium"
                                : "border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 text-carbon dark:text-concrete/70"
                            }`}
                          >
                            <input
                              type="radio"
                              name="timeline"
                              value={t}
                              checked={timeline === t}
                              onChange={() => setTimeline(t)}
                              className="accent-moss"
                            />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Bioma & Tectónica */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-3 font-semibold">
                      02.1 // BIOMA Y EMPLAZAMIENTO CLIMÁTICO
                    </label>
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      {BIOMES.map((b) => {
                        const isSelected = biome === b.id;
                        return (
                          <button
                            type="button"
                            key={b.id}
                            onClick={() => setBiome(b.id)}
                            className={`p-3 text-left border transition-all cursor-pointer ${
                              isSelected
                                ? "border-moss bg-moss/5 dark:bg-moss/10"
                                : "border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 hover:border-onyx/40"
                            }`}
                          >
                            <span className="font-mono text-[9px] text-moss dark:text-moss-bright uppercase tracking-wider block">
                              {b.code}
                            </span>
                            <h5 className="font-sans text-xs font-semibold mt-0.5 text-onyx dark:text-concrete">
                              {b.name}
                            </h5>
                            <p className="font-sans text-[11px] text-carbon dark:text-concrete/60 mt-1 leading-snug">
                              {b.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-3 font-semibold">
                      02.2 // SISTEMA TECTÓNICO PRINCIPAL
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {TECTONICS.map((tec) => {
                        const isSelected = tectonic === tec.id;
                        return (
                          <button
                            type="button"
                            key={tec.id}
                            onClick={() => setTectonic(tec.id)}
                            className={`p-3.5 text-left border transition-all cursor-pointer ${
                              isSelected
                                ? "border-moss bg-moss/5 dark:bg-moss/10"
                                : "border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 hover:border-onyx/40"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-sans text-xs font-semibold text-onyx dark:text-concrete">
                                {tec.label}
                              </span>
                              <span
                                className={`font-mono text-[10px] px-1.5 py-0.5 ${
                                  tec.carbonFactor < 0
                                    ? "bg-moss/20 text-moss dark:text-moss-bright font-bold"
                                    : "bg-onyx/10 dark:bg-concrete/10 text-carbon dark:text-concrete/70"
                                }`}
                              >
                                {tec.carbonFactor > 0 ? `+${tec.carbonFactor}` : tec.carbonFactor} {tec.unit}
                              </span>
                            </div>
                            <p className="font-sans text-[11px] text-carbon dark:text-concrete/60 leading-relaxed">
                              {tec.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 border border-onyx/20 dark:border-concrete/20 bg-concrete dark:bg-dark-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-moss dark:text-moss-bright shrink-0" />
                      <div>
                        <span className="font-mono text-[10px] uppercase text-carbon dark:text-concrete/60 block">
                          BALANCE DE CARBONO PRELIMINAR (A1-A3)
                        </span>
                        <span className="font-sans text-xs text-onyx dark:text-concrete">
                          Basado en {areaM2} m² de envolvente útil y tectónica {selectedTectonicObj.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-mono text-base font-bold ${
                          estimatedCarbonTotalKg < 0 ? "text-moss dark:text-moss-bright" : "text-onyx dark:text-concrete"
                        }`}
                      >
                        {estimatedCarbonTotalKg > 0 ? `+${estimatedCarbonTotalKg.toLocaleString()}` : estimatedCarbonTotalKg.toLocaleString()} kg CO₂e
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Promotor, Privacidad & Emisión */}
              {step === 3 && (
                <div className="space-y-6">
                  {formError && (
                    <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400 font-mono text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-1 font-semibold">
                        03.1 // NOMBRE / RAZÓN SOCIAL *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Fundación Arqueológica / María Sotomayor"
                        className="w-full px-3 py-2 text-xs border border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 focus:border-moss outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-1 font-semibold">
                        03.2 // CORREO ELECTRÓNICO *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="estudio@empresa.com o particular@gmail.com"
                        className="w-full px-3 py-2 text-xs border border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 focus:border-moss outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-1 font-semibold">
                        03.3 // TELÉFONO / WHATSAPP (OPCIONAL)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+52 55 0000 0000"
                        className="w-full px-3 py-2 text-xs border border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 focus:border-moss outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-1 font-semibold">
                        03.4 // EMPLAZAMIENTO / PARCELA
                      </label>
                      <input
                        type="text"
                        value={siteLocation}
                        onChange={(e) => setSiteLocation(e.target.value)}
                        placeholder="Municipio, coordenadas o referencia catastral"
                        className="w-full px-3 py-2 text-xs border border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 focus:border-moss outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 block mb-1 font-semibold">
                      03.5 // REQUERIMIENTOS DEL PROGRAMA O NOTAS PARTICULARES
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describa especificidades del terreno, orientación solar, necesidades funcionales o preexistencias."
                      className="w-full px-3 py-2 text-xs border border-onyx/20 dark:border-concrete/20 bg-concrete/50 dark:bg-dark-canvas/50 focus:border-moss outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Mexican LFPDPPP Privacy Compliance Checkbox & Drawer */}
                  <div className="border border-onyx/20 dark:border-concrete/20 p-3.5 bg-concrete/60 dark:bg-dark-canvas/60 space-y-2.5">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedPrivacy}
                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                        className="mt-0.5 accent-moss cursor-pointer"
                      />
                      <span className="font-sans text-[11px] text-carbon dark:text-concrete/80 leading-relaxed">
                        Acepto el <strong>Aviso de Privacidad</strong> conforme a la <strong>LFPDPPP (México)</strong>. Los datos
                        personales recabados serán tratados exclusivamente para evaluar la viabilidad técnica, elaborar el pliego RFP y
                        establecer contacto directo por parte de MUNΛRQ Studio.
                      </span>
                    </label>

                    <div className="pt-1 flex items-center justify-between text-[10px] font-mono border-t border-onyx/10 dark:border-concrete/10">
                      <button
                        type="button"
                        onClick={() => setShowPrivacyNotice((v) => !v)}
                        className="text-moss dark:text-moss-bright hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        {showPrivacyNotice ? "Ocultar cláusula legal completa" : "Ver cláusula legal y derechos ARCO (LFPDPPP)"}
                        {showPrivacyNotice ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                      <span className="text-carbon/60 dark:text-concrete/40 uppercase">CDMX · MUNΛRQ STUDIO</span>
                    </div>

                    {showPrivacyNotice && (
                      <div className="p-3 bg-concrete dark:bg-dark-canvas border border-onyx/10 dark:border-concrete/10 font-sans text-[10px] text-carbon dark:text-concrete/70 space-y-1.5 leading-relaxed">
                        <p>
                          <strong>Responsable del tratamiento:</strong> MUNΛRQ Arquitectura y Computación Tectónica (Ciudad de México, CP 06100).
                        </p>
                        <p>
                          <strong>Finalidad:</strong> Los datos proporcionados serán utilizados exclusivamente para la pre-dimensionación estructural,
                          análisis bioclimático y formulación de la propuesta económica y arquitectónica del encargo. No se transferirán a terceros
                          sin consentimiento previo.
                        </p>
                        <p>
                          <strong>Ejercicio de Derechos ARCO:</strong> Puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición
                          enviando un correo con el asunto "Derechos ARCO" a <span className="font-mono text-onyx dark:text-concrete">privacidad@munarq.mx</span> o <span className="font-mono text-onyx dark:text-concrete">studio@munarq.mx</span>.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Live Dossier Summary Matrix */}
                  <div className="border border-onyx/20 dark:border-concrete/20 p-4 bg-concrete dark:bg-dark-canvas space-y-2 font-mono text-[10px] text-carbon dark:text-concrete/70">
                    <div className="flex justify-between items-center text-onyx dark:text-concrete font-bold pb-2 border-b border-onyx/10 dark:border-concrete/10">
                      <span>MATRIZ DEL ENCARGO</span>
                      <span>MUNΛRQ // CANON 2026</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div>
                        <span className="block text-carbon/60 dark:text-concrete/40 uppercase">PROGRAMA:</span>
                        <span className="text-onyx dark:text-concrete font-medium">{selectedTypologyObj.label}</span>
                      </div>
                      <div>
                        <span className="block text-carbon/60 dark:text-concrete/40 uppercase">ESCALA:</span>
                        <span className="text-onyx dark:text-concrete font-medium">{areaM2} m²</span>
                      </div>
                      <div>
                        <span className="block text-carbon/60 dark:text-concrete/40 uppercase">BIOMA:</span>
                        <span className="text-onyx dark:text-concrete font-medium">{selectedBiomeObj.name}</span>
                      </div>
                      <div>
                        <span className="block text-carbon/60 dark:text-concrete/40 uppercase">TECTÓNICA:</span>
                        <span className="text-onyx dark:text-concrete font-medium">{selectedTectonicObj.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation & Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-onyx/10 dark:border-concrete/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 border border-onyx/20 dark:border-concrete/20 hover:bg-onyx hover:text-concrete dark:hover:bg-concrete dark:hover:text-onyx font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Fase Anterior
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-onyx text-concrete dark:bg-concrete dark:text-onyx font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-moss hover:text-white dark:hover:bg-moss dark:hover:text-white cursor-pointer transition-colors"
                  >
                    Siguiente // 0{step + 1} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !acceptedPrivacy}
                    className="px-6 py-2.5 bg-moss text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-moss/90 disabled:opacity-50 cursor-pointer transition-colors"
                  >
                    {isSubmitting ? (
                      "Registrando en Servidor..."
                    ) : (
                      <>
                        Emitir Pliego // RFP <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
