import React, { useState } from 'react';
import { BriefRequest } from '../types';
import { X, Check, Copy, Send, ShieldCheck } from 'lucide-react';

interface BriefBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectTitle?: string;
  initialParametricData?: {
    tideAmplitude: number;
    salinity: number;
    porosity: number;
    wallThickness: number;
    waveDissipation: number;
    carbonCapture: number;
  };
}

export const BriefBuilder: React.FC<BriefBuilderProps> = ({
  isOpen,
  onClose,
  initialProjectTitle,
  initialParametricData,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<BriefRequest>({
    clientName: '',
    organization: '',
    email: '',
    typology: initialProjectTitle ? `Inspirado en: ${initialProjectTitle}` : 'Coastal Monolith',
    location: '',
    targetArea: 450,
    marineExposure: 'Coastal Cliff (<100m)',
    sustainabilityGoals: [
      'Hormigón Puzolánico de Baja Huella',
      'Superficie Bioreceptiva Intermareal',
      'Inercia Térmica Pesada Pasiva'
    ],
    estimatedBudget: '500k€ - 1.5M€',
    briefNotes: initialParametricData 
      ? `Parámetros calibrados en simulador: Carrera marea: ${initialParametricData.tideAmplitude}m, Muro: ${initialParametricData.wallThickness}cm, Porosidad: ${initialParametricData.porosity}%, Disipación estimada: ${initialParametricData.waveDissipation}%.`
      : ''
  });

  if (!isOpen) return null;

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      sustainabilityGoals: prev.sustainabilityGoals.includes(goal)
        ? prev.sustainabilityGoals.filter(g => g !== goal)
        : [...prev.sustainabilityGoals, goal]
    }));
  };

  const generateSummaryText = () => {
    return `=== ENCARGO ARQUITECTÓNICO // ESTUDIO MUNΛRQ ===
Cliente: ${formData.clientName || 'No especificado'} (${formData.organization || 'Particular'})
Contacto: ${formData.email || 'arqmoonu@gmail.com'}
Tipología: ${formData.typology}
Emplazamiento: ${formData.location || 'Pendiente de definir'}
Superficie Objetivo: ${formData.targetArea} m²
Exposición Litoral: ${formData.marineExposure}
Rango Presupuestario: ${formData.estimatedBudget}

OBJETIVOS BIOCULTURALES:
${formData.sustainabilityGoals.map(g => `- ${g}`).join('\n')}

NOTAS TÉCNICAS:
${formData.briefNotes || 'Sin notas adicionales'}
=============================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(`Encargo de Proyecto MUNΛRQ: ${formData.typology} - ${formData.clientName || 'Nuevo Cliente'}`);
    const body = encodeURIComponent(generateSummaryText());
    window.location.href = `mailto:arqmoonu@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[var(--theme-card)] border-2 border-[var(--theme-border)] shadow-brutalist-lg my-8 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="flex items-center gap-3">
            <span className="font-ui text-xs font-bold text-[var(--theme-primary)] bg-[var(--theme-card)] px-2 py-1 border border-[var(--theme-border)]">
              COMMISSION BRIEF
            </span>
            <div>
              <h3 className="font-display text-2xl font-medium text-[var(--theme-primary)] tracking-tight">
                Configurador de Encargo Litoral // MUNΛRQ
              </h3>
              <span className="font-dimensioning text-[10px] text-[var(--theme-secondary)] uppercase tracking-wider block">
                Paso 0{step} de 03 — {step === 1 ? 'Tipología y Escala' : step === 2 ? 'Condiciones de Emplazamiento' : 'Resumen y Envío'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-primary)] hover:text-white transition-colors text-[var(--theme-primary)]"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Ribbon */}
        <div className="grid grid-cols-3 border-b-2 border-[var(--theme-border)] text-xs font-ui uppercase tracking-wider divide-x-2 divide-[var(--theme-border)]">
          <button
            onClick={() => setStep(1)}
            className={`py-2 text-center transition-colors ${
              step === 1 ? 'bg-[var(--theme-primary)] text-white font-bold' : 'bg-[var(--theme-bg)] text-[var(--theme-secondary)]'
            }`}
          >
            01. Programa
          </button>
          <button
            onClick={() => setStep(2)}
            className={`py-2 text-center transition-colors ${
              step === 2 ? 'bg-[var(--theme-primary)] text-white font-bold' : 'bg-[var(--theme-bg)] text-[var(--theme-secondary)]'
            }`}
          >
            02. Entorno Marino
          </button>
          <button
            onClick={() => setStep(3)}
            className={`py-2 text-center transition-colors ${
              step === 3 ? 'bg-[var(--theme-primary)] text-white font-bold' : 'bg-[var(--theme-bg)] text-[var(--theme-secondary)]'
            }`}
          >
            03. Ficha Encargo
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[var(--theme-card)] flex-1">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                    Nombre o Representante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carmen Souto"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-sm focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                    Entidad / Particular
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Fundación de Mareas / Privado"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-sm focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                  Correo Electrónico de Contacto *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@entidad.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-sm focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                    Tipología del Proyecto
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-sm focus:outline-hidden"
                  >
                    <option value="Coastal Monolith">Monolito Costero / Vivienda Tectónica</option>
                    <option value="Benthic Observatory">Observatorio Béntico / Laboratorio Marino</option>
                    <option value="Saline Habitat">Hábitat Salino / Balsa Vegetada</option>
                    <option value="Parametric Infrastructure">Infraestructura Paramétrica Litoral</option>
                    <option value="Equipamiento Público">Equipamiento Público / Centro Cultural</option>
                  </select>
                </div>

                <div>
                  <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                    Superficie Estimada (m² construidos)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="50"
                      max="15000"
                      value={formData.targetArea}
                      onChange={(e) => setFormData({ ...formData, targetArea: parseInt(e.target.value, 10) || 100 })}
                      className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-dimensioning text-sm focus:outline-hidden font-bold"
                    />
                    <span className="font-dimensioning text-xs text-[var(--theme-primary)] font-bold">M²</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                  Rango Presupuestario Orientativo
                </label>
                <select
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-sm focus:outline-hidden"
                >
                  <option value="300k€ - 600k€">300.000 € – 600.000 €</option>
                  <option value="600k€ - 1.5M€">600.000 € – 1.500.000 €</option>
                  <option value="1.5M€ - 4M€">1.500.000 € – 4.000.000 €</option>
                  <option value="> 4M€ (Institucional / Gran Escala)">Supera 4.000.000 € (Concurso / Institucional)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                  Ubicación Geográfica o Litoral
                </label>
                <input
                  type="text"
                  placeholder="Ej. Rías Baixas, Galicia / Costa de Sintra / Cantábrico"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                  Nivel de Exposición Marina del Emplazamiento
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-ui">
                  {[
                    'Submerged / Intertidal',
                    'Coastal Cliff (<100m)',
                    'Coastal Plain (<1km)',
                    'Continental Inland'
                  ].map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setFormData({ ...formData, marineExposure: exp as any })}
                      className={`p-3 border-2 border-[var(--theme-border)] text-left transition-colors font-medium ${
                        formData.marineExposure === exp 
                          ? 'bg-[var(--theme-primary)] text-white font-bold' 
                          : 'bg-[var(--theme-bg)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-2">
                  Objetivos de Sostenibilidad y Materia Tectónica:
                </label>
                <div className="space-y-2">
                  {[
                    'Hormigón Puzolánico de Baja Huella',
                    'Superficie Bioreceptiva Intermareal',
                    'Inercia Térmica Pesada Pasiva',
                    'Incorporación de Áridos de Conchas de Bivalvos',
                    'Carpintería y Remates en Bronce / Titanio Marino',
                    'Tratamiento Pasivo de Niebla y Salinidad'
                  ].map((goal) => {
                    const isSelected = formData.sustainabilityGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`w-full p-2.5 border-2 border-[var(--theme-border)] text-left text-xs font-ui flex items-center justify-between transition-colors ${
                          isSelected ? 'bg-[var(--theme-surface)] text-[var(--theme-primary)] font-bold' : 'bg-[var(--theme-bg)] text-[var(--theme-muted)] hover:bg-[var(--theme-surface)]'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-[var(--theme-primary)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase block mb-1">
                  Notas de Programa o Parámetros del Solar
                </label>
                <textarea
                  rows={3}
                  placeholder="Detallar condiciones particulares del terreno..."
                  value={formData.briefNotes}
                  onChange={(e) => setFormData({ ...formData, briefNotes: e.target.value })}
                  className="w-full p-2.5 bg-[var(--theme-bg)] border-2 border-[var(--theme-border)] font-body text-xs focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-2 border-[var(--theme-border)] bg-[#031d27] p-5 text-white font-ui text-xs relative blueprint-lines-dark overflow-x-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#194c60] text-[10px] text-[#88c0d0] uppercase font-dimensioning">
                  <span>RESUMEN TÉCNICO NORMALIZADO // MUNΛRQ</span>
                  <span>DESTINATARIO: ARQMOONU@GMAIL.COM</span>
                </div>
                <pre className="py-4 text-[12px] leading-relaxed whitespace-pre-wrap text-[#c6e2ed]">
                  {generateSummaryText()}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-3 bg-[var(--theme-bg)] hover:bg-[var(--theme-surface)] text-[var(--theme-primary)] font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-[var(--theme-primary)]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiado al Portapapeles' : 'Copiar Texto del Encargo'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleMailto}
                  className="w-full py-3 bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] shadow-brutalist-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar a arqmoonu@gmail.com</span>
                </button>
              </div>

              <div className="p-3 border border-[var(--theme-border)] bg-[var(--theme-surface)] flex items-center gap-2 text-xs font-ui text-[var(--theme-secondary)]">
                <ShieldCheck className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <span>MUNΛRQ garantiza estricta confidencialidad para encargos institucionales y privados.</span>
              </div>
            </div>
          )}

        </div>

        {/* Stepper Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t-2 border-[var(--theme-border)] bg-[var(--theme-surface)]">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-bg)] font-ui text-xs font-semibold uppercase tracking-wider text-[var(--theme-primary)]"
            >
              ← Anterior
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="px-6 py-2.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] shadow-brutalist-sm"
            >
              Siguiente Paso →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-bg)] font-ui text-xs font-semibold uppercase tracking-wider text-[var(--theme-primary)]"
            >
              Finalizar y Volver
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
