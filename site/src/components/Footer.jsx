import React from 'react';
import { Sparkles, Heart, Shield, Terminal, ArrowUp } from 'lucide-react';
import { playVistaChime, playGlassClick } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Footer() {
  const scrollToTop = () => {
    playGlassClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerCelebration = () => {
    playVistaChime();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#A6FF00', '#00f0ff', '#ffffff', '#22c55e']
    });
  };

  return (
    <footer className="relative z-10 pt-10 pb-8 px-4">
      {/* Frosted Glass Vista Dock Container */}
      <div className="max-w-6xl mx-auto aero-glass border-2 border-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Gloss Cap shine */}
        <div className="fj-gloss-cap" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Brand */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-full bg-slate-900 border-2 border-lime-400 p-1 flex items-center justify-center shadow-orb shrink-0">
              <img src="/mogger-core.svg" alt="Mogger Core Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <div className="font-black text-xl tracking-wider text-slate-950">
                MOGGER CORE RACING
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Frutiger Aero Aesthetics • Competição Arduino de Carrinhos
              </p>
            </div>
          </div>

          {/* 2000s Nostalgia Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-[11px] font-bold border border-white/40 shadow-sm">
              RESOLUTION: 1024×768
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-lime-400 text-slate-950 font-mono text-[11px] font-black border border-black/20 shadow-sm">
              ARDUINO INSIDE
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-sky-500 text-white font-mono text-[11px] font-bold border border-white/40 shadow-sm">
              FRUTIGER AERO CERTIFIED
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-mono text-[11px] font-bold border border-white/40 shadow-sm">
              W3C VALID AERO
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full aqua-button-blue text-white shadow-md hover:scale-105 transition-transform"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Credits & Fun Celebration Button */}
        <div className="pt-5 border-t border-slate-300/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-800 font-semibold relative z-10">
          <div>
            © {new Date().getFullYear()} Equipe <strong>Mogger Core</strong>. Todos os direitos reservados. Feito com estética anos 2000 e robótica de alta frequência.
          </div>

          <button
            onClick={triggerCelebration}
            className="px-4 py-2 rounded-full aqua-button-neon text-slate-950 font-black text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Celebrar com Vidro & Confete!</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
