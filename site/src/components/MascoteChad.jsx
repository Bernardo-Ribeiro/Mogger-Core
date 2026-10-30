import React, { useState } from 'react';
import { Sparkles, Zap, Award, Flame, Smile, Check, Shield } from 'lucide-react';
import { playVistaChime, playGlassClick } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function MascoteChad() {
  const [selectedView, setSelectedView] = useState('chad'); // 'chad' | 'conceito' | 'svg'
  const [mogLevel, setMogLevel] = useState(100);

  const handleMogChange = (e) => {
    const val = parseInt(e.target.value);
    setMogLevel(val);
    if (val === 100) {
      playVistaChime();
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#A6FF00', '#F5F7F2', '#38bdf8']
      });
    }
  };

  const selectView = (view) => {
    playGlassClick();
    setSelectedView(view);
  };

  return (
    <section id="mascote" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-white shadow-md backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-lime-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
            Identidade Visual & Mascote Oficial
          </span>
        </div>
        <div className="inline-block p-4 sm:p-6 rounded-3xl bg-white/80 border border-white/90 shadow-lg backdrop-blur-xl max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            CONHEÇA O MASCOTE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600">
              "CORE"
            </span>
          </h2>
          <p className="text-slate-800 max-w-2xl mx-auto text-sm sm:text-base font-semibold mt-2">
            O arquétipo do robô Chad: queixo quadrado escultural, cabelo metálico escovado, núcleo verde elétrico e postura 100% confiante.
          </p>
        </div>
      </div>

      <div className="vista-window aero-glass border-2 border-white/95 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="fj-gloss-cap" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Interactive Holo Card with Mascot */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* View Selector Buttons */}
            <div className="flex items-center gap-2 mb-4 bg-white/90 p-1.5 rounded-2xl border-2 border-white shadow-sm">
              <button
                onClick={() => selectView('chad')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedView === 'chad'
                    ? 'aqua-button-neon text-slate-950 shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Mascote Chad
              </button>
              <button
                onClick={() => selectView('conceito')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedView === 'conceito'
                    ? 'aqua-button-neon text-slate-950 shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Prancha de Poses
              </button>
              <button
                onClick={() => selectView('svg')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedView === 'svg'
                    ? 'aqua-button-neon text-slate-950 shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Vetor Oficial (SVG)
              </button>
            </div>

            {/* Mascot Holo Display Frame */}
            <div 
              className="relative w-full max-w-md aspect-square rounded-3xl p-6 flex items-center justify-center border-2 border-white/90 shadow-2xl overflow-hidden group"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(166,255,0,${mogLevel / 200}) 0%, rgba(255,255,255,0.7) 60%, rgba(220,245,255,0.8) 100%)`,
                boxShadow: `0 20px 40px rgba(0, 50, 100, 0.2), 0 0 ${mogLevel * 0.4}px rgba(166, 255, 0, ${mogLevel / 150})`
              }}
            >
              {/* Glossy highlight line */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-3xl pointer-events-none" />

              {/* Dynamic Image */}
              {selectedView === 'chad' && (
                <img
                  src="/mascote-chad.png"
                  alt="Mascote Chad Core"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {selectedView === 'conceito' && (
                <img
                  src="/mascote-conceito.png"
                  alt="Prancha de Conceito do Mascote"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {selectedView === 'svg' && (
                <img
                  src="/mascote.svg"
                  alt="Mascote Vetor"
                  className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"
                />
              )}

              {/* Watermark badge */}
              <div className="absolute bottom-4 left-4 px-2 py-1 rounded-md bg-slate-900/80 text-lime-400 font-mono text-[10px] font-bold border border-white/40">
                PROV_NAME: CORE_CHAD.bin
              </div>
            </div>

            {/* Interactive Mog-O-Meter Slider */}
            <div className="w-full max-w-md mt-5 p-4 rounded-2xl bg-white/95 border-2 border-white shadow-md space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-950">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-lime-600" />
                  <span>Mog-O-Meter (Nível Based):</span>
                </span>
                <span className="font-mono text-lime-800 bg-lime-200 px-2.5 py-0.5 rounded font-extrabold">
                  {mogLevel}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={mogLevel}
                onChange={handleMogChange}
                className="w-full accent-lime-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                <span>Robô Amigável</span>
                <span>Chassi Polido</span>
                <span className="text-lime-700 font-extrabold">100% GigaChad</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mascot Details & Visual Identity Specs */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div>
              <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200">
                ESPECIFICAÇÃO DE DESIGN
              </span>
              <h3 className="text-2xl font-black text-slate-950 mt-2">
                Conceito & Personalidade
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed mt-2 font-medium">
                O mascote <strong>Core</strong> foi criado para transmitir confiança serena e espírito de equipe. A referência ao meme “Chad” simboliza o preparo técnico impecável, sem arrogância: foco absoluto antes da largada e apoio total aos companheiros na bancada de montagem.
              </p>
            </div>

            {/* Brand Color Palette Display */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                Paleta de Cores Oficial do Mascote:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-white/95 border-2 border-white text-center shadow-sm">
                  <div className="w-full h-8 rounded-lg bg-[#171A1D] shadow-inner mb-1.5" />
                  <div className="text-[11px] font-black text-slate-950">Carvão</div>
                  <div className="text-[10px] font-mono font-bold text-slate-600">#171A1D</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/95 border-2 border-white text-center shadow-sm">
                  <div className="w-full h-8 rounded-lg bg-[#A6FF00] shadow-inner mb-1.5 border border-black/10" />
                  <div className="text-[11px] font-black text-slate-950">Verde Neon</div>
                  <div className="text-[10px] font-mono font-bold text-slate-600">#A6FF00</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/95 border-2 border-white text-center shadow-sm">
                  <div className="w-full h-8 rounded-lg bg-[#F5F7F2] shadow-inner mb-1.5 border border-slate-300" />
                  <div className="text-[11px] font-black text-slate-950">Branco Mist</div>
                  <div className="text-[10px] font-mono font-bold text-slate-600">#F5F7F2</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/95 border-2 border-white text-center shadow-sm">
                  <div className="w-full h-8 rounded-lg bg-[#C7CDD1] shadow-inner mb-1.5 border border-slate-300" />
                  <div className="text-[11px] font-black text-slate-950">Prata Metálico</div>
                  <div className="text-[10px] font-mono font-bold text-slate-600">#C7CDD1</div>
                </div>
              </div>
            </div>

            {/* Application Guidelines */}
            <div className="p-4 rounded-2xl bg-white/95 border-2 border-white shadow-md space-y-2 text-xs text-slate-800 font-medium">
              <div className="font-black text-slate-950 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sky-600" />
                <span>Aplicação no Carrinho e na Equipe:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-800">
                <li><strong>Adesivo Frontal:</strong> Cabeça do mascote centralizada acima dos sensores óticos.</li>
                <li><strong>Laterais do Chassi:</strong> Grafismos de circuitos verdes elétricos integrados ao acrílico.</li>
                <li><strong>Uniforme da Equipe:</strong> Símbolo compacto bordado no peito e Core Chad em pose ampla nas costas.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
