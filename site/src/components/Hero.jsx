import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Play, Sparkles, Cpu, ShieldCheck, Zap, Gauge, Flame, Terminal } from 'lucide-react';
import { playEngineMog, playGlassClick, playVistaChime } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Hero({ onExploreClick }) {
  const windowRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // GSAP 3D mouse parallax tilt effect for the hero window
    const handleMouseMove = (e) => {
      if (!windowRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;

      gsap.to(windowRef.current, {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.8,
      });

      if (logoRef.current) {
        gsap.to(logoRef.current, {
          x: x * 1.4,
          y: y * 1.4,
          ease: 'power2.out',
          duration: 0.6,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleIgnition = () => {
    playEngineMog();
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#A6FF00', '#00f0ff', '#ffffff', '#38bdf8']
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center px-4 overflow-hidden">
      {/* Centered Main Aero Glass Window */}
      <div
        ref={windowRef}
        className="w-full max-w-5xl vista-window fj-glass border-2 border-white/90 shadow-2xl relative z-10 transition-shadow duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Frutiger.js Gloss Cap Curved Highlight */}
        <div className="fj-gloss-cap" />

        {/* Vista Aero Window Header */}
        <div className="vista-titlebar px-4 py-2.5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-lime-400 border border-white/80 shadow-sm animate-pulse" />
            <span className="text-xs font-bold text-slate-900 tracking-wide drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]">
              MoggerCore_OS_v2.000 — [Frutiger Aero Racing Division]
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => playGlassClick()} 
              className="vista-control-btn vista-min-btn"
              title="Minimizar"
            >
              _
            </button>
            <button 
              onClick={() => playGlassClick()} 
              className="vista-control-btn vista-max-btn"
              title="Maximizar"
            >
              □
            </button>
            <button 
              onClick={() => {
                playGlassClick();
                playVistaChime();
              }} 
              className="vista-control-btn vista-close-btn"
              title="Mogger Core não fecha!"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-6 sm:p-10 lg:p-12 relative overflow-hidden z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Retro Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/95 shadow-sm backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-lime-500 animate-ping" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
                  Competição Arduino • Engenharia & Velocidade
                </span>
                <span className="text-[10px] bg-slate-950 text-lime-400 px-1.5 py-0.5 rounded font-mono font-bold">
                  2000s AERO
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
                  O CARRINHO MAIS{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-emerald-600 to-sky-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    BASED
                  </span>{' '}
                  DA PISTA.
                </h1>
                <p className="text-slate-800 text-sm sm:text-base lg:text-lg font-medium leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  Equipe <strong className="text-slate-950 font-black">Mogger Core</strong>. Chassi de acrílico translúcido Frutiger Aero, eletrônica refinada, controle PID de precisão milimétrica e o mascote robô Chad com queixo de titânio.
                </p>
              </div>

              {/* Status Spec Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-white/60 border border-white/90 shadow-sm flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 font-bold uppercase">Regulamento</div>
                    <div className="text-xs font-extrabold text-slate-950">30 × 30 × 30 cm</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/60 border border-white/90 shadow-sm flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-lime-100 text-lime-900">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 font-bold uppercase">Potência</div>
                    <div className="text-xs font-extrabold text-slate-950">Overclocked Core</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/60 border border-white/90 shadow-sm flex items-center gap-2 col-span-2 sm:col-span-1">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 font-bold uppercase">Mog Factor</div>
                    <div className="text-xs font-extrabold text-slate-950">100% GigaChad</div>
                  </div>
                </div>
              </div>

              {/* Interactive Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={handleIgnition}
                  className="px-6 py-3 rounded-full aqua-button-neon text-slate-950 font-black text-sm tracking-wide flex items-center gap-2.5 shadow-md group"
                >
                  <Flame className="w-4 h-4 text-slate-950 group-hover:animate-bounce" />
                  <span>ACELERAR MOTOR (IGNIÇÃO)</span>
                </button>

                <button
                  onClick={() => {
                    playGlassClick();
                    onExploreClick('carrinho');
                  }}
                  className="px-5 py-3 rounded-full aqua-button-blue text-white font-bold text-sm tracking-wide flex items-center gap-2 shadow-md"
                >
                  <Cpu className="w-4 h-4 text-sky-200" />
                  <span>Ver Especificações Técnicas</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-700 flex items-center gap-2 pt-1 font-mono font-semibold">
                <Terminal className="w-3.5 h-3.5 text-lime-700" />
                <span>Firmware: Arduino PID v1.4.2 [STATUS: PRONTO PARA LARGADA]</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Glass Logo with Floor Reflection */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="fj-reflection-wrap flex flex-col items-center">
                <div
                  ref={logoRef}
                  className="relative w-full max-w-sm aspect-square flex items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-white/60 via-white/20 to-transparent border border-white/80 shadow-lg group cursor-pointer"
                  onClick={() => {
                    playVistaChime();
                    confetti({ particleCount: 45, spread: 55 });
                  }}
                  title="Clique no emblema de vidro para tocar o sino Aero!"
                >
                  {/* Official Glass Logo */}
                  <img
                    src="/mogger-core-glass.png"
                    alt="Mogger Core Glass Finished Logo"
                    className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,30,60,0.35)] transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Cursor mouse indicator overlay from the official logo concept */}
                  <div className="absolute bottom-6 right-8 px-2.5 py-1 rounded-md bg-white/90 border border-white shadow-md text-[10px] font-bold text-slate-900 flex items-center gap-1 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-lime-500 animate-ping" />
                    <span>AERO GLASS 3D</span>
                  </div>
                </div>

                {/* Mirror Reflection beneath logo (Web 2.0 / Frutiger.js signature) */}
                <div className="fj-reflection-mirror w-3/4 max-w-[240px]">
                  <img
                    src="/mogger-core-glass.png"
                    alt="Logo Reflection"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Visual caption */}
              <p className="text-xs text-slate-800 font-bold mt-2 text-center drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Logotipo Oficial Mogger Core com acabamento de Vidro Aero & Fundo Transparente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
