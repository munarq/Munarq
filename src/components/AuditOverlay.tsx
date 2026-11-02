import React from 'react';
import { EyeOff, CheckCircle2, Info } from 'lucide-react';

interface AuditOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const AuditOverlay: React.FC<AuditOverlayProps> = ({
  isOpen,
  onClose,
  onJumpToSection,
}) => {
  if (!isOpen) return null;

  const auditHighlights = [
    {
      title: 'Estándar Tipográfico MUNΛRQ v3.2',
      description: 'Syne eliminado. Cormorant Medium (500) en titulares, Inter en UI/tags/código, Swiss 721 BT en cotas y mediciones técnicas, Lato en prosa operativa.',
      status: 'Normalizado',
      sectionId: 'specimen-canvas'
    },
    {
      title: 'Integración Nord & Solarized Light',
      description: 'Conmutador de paletas dinámico con variables CSS que permite previsualizar la interfaz bajo contrastes polares (Nord) y de archivo (Solarized Light).',
      status: '3 Paletas Activas',
      sectionId: 'specimen-canvas'
    },
    {
      title: 'Geometría 0px & Desplazamiento Duro',
      description: 'Sin bordes redondeados (`rounded-none`). Aristas ortogonales vivas a 90° y sombras proyectadas directas (`4px 4px 0px`).',
      status: 'Activo en toda la interfaz',
      sectionId: 'proyectos'
    },
    {
      title: 'Dossier Técnico con Planimetría Real',
      description: 'Plano en planta SVG interactivo con cotas en Swiss 721 BT, secciones batimétricas y matriz biocultural de materiales.',
      status: 'Inspector SVG Activo',
      sectionId: 'proyectos'
    },
    {
      title: 'Laboratorio Paramétrico Interactivo',
      description: 'Simulador en tiempo real de carrera de marea, empuje hidrodinámico y espesor de muro con reactividad instantánea.',
      status: 'Calculadora FEA en Vivo',
      sectionId: 'laboratorio'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#031d27] border-2 border-[var(--theme-mist)] text-white shadow-brutalist-lg p-5 font-ui text-xs">
      {/* HUD Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#194c60] text-[var(--theme-mist)]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-white" />
          <span className="font-bold tracking-wider uppercase text-white font-dimensioning">MODO AUDITORÍA // MUNΛRQ</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[var(--theme-mist)] hover:text-white hover:bg-[#033141] transition-colors"
          title="Ocultar inspector"
        >
          <EyeOff className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-[var(--theme-tint)] py-3 leading-relaxed border-b border-[#194c60] font-body">
        Auditoría técnica del nuevo estándar tipográfico y decisiones del sistema:
      </p>

      {/* Highlights List */}
      <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
        {auditHighlights.map((h, i) => (
          <div 
            key={i} 
            onClick={() => onJumpToSection(h.sectionId)}
            className="p-2 border border-[#194c60] hover:border-[var(--theme-mist)] hover:bg-[#033141] transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] text-[var(--theme-mist)] mb-1 font-ui">
              <span className="font-bold text-white">0{i + 1}. {h.title}</span>
              <CheckCircle2 className="w-3 h-3 text-[var(--theme-mist)]" />
            </div>
            <p className="text-[10px] text-[var(--theme-tint)] font-body leading-tight">
              {h.description}
            </p>
          </div>
        ))}
      </div>

      {/* HUD Footer */}
      <div className="pt-3 border-t border-[#194c60] flex items-center justify-between text-[10px] text-[#4a798a] font-dimensioning">
        <span>ESTUDIO MUNΛRQ</span>
        <button
          onClick={onClose}
          className="text-white hover:underline uppercase font-ui"
        >
          Cerrar Inspector
        </button>
      </div>
    </div>
  );
};
