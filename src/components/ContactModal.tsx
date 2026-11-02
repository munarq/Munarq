import React, { useState } from 'react';
import { X, Check, Copy, Send, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [typology, setTypology] = useState('Monolito Geopolimérico & Galería');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState(450);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const summary = `=== ENCARGO ARQUITECTÓNICO // MUNΛRQ ===
Cliente: ${clientName || 'Particular'}
Contacto: ${email || 'arqmoonu@gmail.com'}
Tipología: ${typology}
Emplazamiento: ${location || 'Pendiente de definir'}
Superficie Estimada: ${area} m²

NOTAS DEL PROYECTO:
${notes || 'Sin notas adicionales'}
========================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    const subject = encodeURIComponent(`Encargo MUNΛRQ: ${typology} - ${clientName || 'Cliente'}`);
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:arqmoonu@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-pure dark:bg-dark-surface border border-onyx/20 dark:border-white/20 shadow-2xl my-8 flex flex-col max-h-[90vh] overflow-hidden text-onyx dark:text-concrete"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-onyx/20 dark:border-white/20 bg-concrete dark:bg-[#151515]">
          <div>
            <h3 className="font-serif text-3xl font-medium tracking-tight">
              Contact Studio // MUNΛRQ
            </h3>
            <span className="font-mono text-[10px] text-carbon dark:text-concrete/60 uppercase tracking-wider block">
              Comisiones de arquitectura biocultural y cálculo computacional
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-onyx/20 dark:border-white/20 hover:bg-onyx hover:text-pure dark:hover:bg-pure dark:hover:text-onyx transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-label text-xs font-bold uppercase tracking-[0.15em] block mb-2">
                Nombre / Organización *
              </label>
              <input
                type="text"
                placeholder="Ej. Estudio Souto"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-3 bg-concrete dark:bg-[#121212] border border-onyx/20 dark:border-white/20 font-sans text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label text-xs font-bold uppercase tracking-[0.15em] block mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                placeholder="contacto@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-concrete dark:bg-[#121212] border border-onyx/20 dark:border-white/20 font-sans text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-label text-xs font-bold uppercase tracking-[0.15em] block mb-2">
                Tipología
              </label>
              <select
                value={typology}
                onChange={(e) => setTypology(e.target.value)}
                className="w-full p-3 bg-concrete dark:bg-[#121212] border border-onyx/20 dark:border-white/20 font-sans text-sm focus:outline-none"
              >
                <option value="Monolito Geopolimérico & Galería">Monolito Geopolimérico & Galería</option>
                <option value="Archivo Subterráneo de Madera">Archivo Subterráneo de Madera</option>
                <option value="Pabellón / Dosel Paramétrico">Pabellón / Dosel Paramétrico</option>
                <option value="Vivienda Tectónica Litoral">Vivienda Tectónica Litoral</option>
                <option value="Infraestructura Científica">Infraestructura Científica</option>
              </select>
            </div>

            <div>
              <label className="font-label text-xs font-bold uppercase tracking-[0.15em] block mb-2">
                Superficie Estimada (m²)
              </label>
              <input
                type="number"
                min="50"
                max="10000"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value, 10) || 100)}
                className="w-full p-3 bg-concrete dark:bg-[#121212] border border-onyx/20 dark:border-white/20 font-mono text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-label text-xs font-bold uppercase tracking-[0.15em] block mb-2">
              Emplazamiento Geográfico
            </label>
            <input
              type="text"
              placeholder="Ej. Costa atlántica, acantilado rocoso, entorno dunar..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-concrete dark:bg-[#121212] border border-onyx/20 dark:border-white/20 font-sans text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="font-label text-xs font-bold uppercase tracking-[0.15em] block mb-2">
              Notas & Condicionantes
            </label>
            <textarea
              rows={3}
              placeholder="Condiciones climáticas, objetivos de fijación de carbono o requerimientos programáticos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-concrete dark:bg-[#121212] border border-onyx/20 dark:border-white/20 font-sans text-xs focus:outline-none"
            />
          </div>

          {/* Quick copy summary preview */}
          <div className="border border-onyx/20 dark:border-white/20 p-4 bg-concrete dark:bg-[#121212] font-mono text-xs">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-onyx/10 dark:border-white/10 text-[10px] text-carbon dark:text-concrete/60 uppercase">
              <span>Resumen Estructurado</span>
              <span>arqmoonu@gmail.com</span>
            </div>
            <pre className="text-[11px] leading-relaxed whitespace-pre-wrap text-carbon dark:text-concrete/80">
              {summary}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-onyx/20 dark:border-white/20 bg-concrete dark:bg-[#151515]">
          <div className="flex items-center gap-2 text-xs font-mono text-carbon dark:text-concrete/60">
            <ShieldCheck className="w-4 h-4 text-moss dark:text-[#8ba83b]" />
            <span>MUNΛRQ garantiza estricta confidencialidad.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2.5 border border-onyx/20 dark:border-white/20 font-label text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-pure dark:hover:bg-dark-surface transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-moss dark:text-[#8ba83b]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleSend}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-onyx text-pure dark:bg-pure dark:text-onyx font-label text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-moss dark:hover:bg-moss dark:hover:text-pure transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Encargo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
