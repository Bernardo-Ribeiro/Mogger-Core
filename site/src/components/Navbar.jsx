import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Cpu, Award, PlayCircle, Radio, Image as ImageIcon } from 'lucide-react';
import { playGlassClick, playVistaChime, getSoundEnabled, setSoundEnabled } from '../utils/audio';
import { aeroPlayer } from '../utils/ambientSynth';

export default function Navbar({ onOpenGadgets, isGadgetsOpen, currentWallpaper, onSelectWallpaper }) {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) playGlassClick();
  };

  const toggleMusic = () => {
    playGlassClick();
    const playing = aeroPlayer.toggle();
    setMusicPlaying(playing);
  };

  const handleNavClick = (id) => {
    playGlassClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerChime = () => {
    playVistaChime();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 sm:px-6">
      <div className="max-w-7xl mx-auto fj-glass rounded-2xl px-4 py-2.5 flex items-center justify-between border border-white/80 shadow-lg relative overflow-hidden">
        {/* Frutiger.js Gloss Cap Sheen */}
        <div className="fj-gloss-cap" />

        {/* Brand with Vista Start Orb aesthetic */}
        <div 
          onClick={triggerChime}
          className="flex items-center gap-3 cursor-pointer group relative z-10"
          title="Clique para tocar o som de inicialização Mogger Aero!"
        >
          {/* Start Orb */}
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center p-0.5 bg-gradient-to-br from-white/95 via-sky-300 to-sky-600 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-lime-400/60 shadow-inner">
              <img 
                src="/mogger-core.svg" 
                alt="Mogger Core Logo" 
                className="w-6 h-6 object-contain filter drop-shadow-[0_0_8px_rgba(166,255,0,0.8)]"
              />
            </div>
            {/* Specular sheen */}
            <div className="absolute top-1 left-2 right-2 h-3.5 bg-white/70 rounded-full blur-[1px] pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-wider text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                MOGGER
              </span>
              <span className="text-xs px-2 py-0.5 font-bold rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 shadow-sm border border-white/80">
                CORE
              </span>
            </div>
            <p className="text-[10px] text-slate-700 tracking-tight font-medium -mt-1 hidden sm:block">
              ARDUINO RACING • FRUTIGER AERO
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 relative z-10">
          <button
            onClick={() => handleNavClick('hero')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 hover:bg-white/50 transition-all flex items-center gap-1.5"
          >
            <span>Início</span>
          </button>
          <button
            onClick={() => handleNavClick('carrinho')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 hover:bg-white/50 transition-all flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>O Carrinho</span>
          </button>
          <button
            onClick={() => handleNavClick('mascote')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 hover:bg-white/50 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            <span>Mascote Chad</span>
          </button>
          <button
            onClick={() => handleNavClick('simulador')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 hover:bg-white/50 transition-all flex items-center gap-1.5"
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulador de Pista</span>
          </button>
          <button
            onClick={() => handleNavClick('equipe')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-slate-950 hover:bg-white/50 transition-all flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-sky-700" />
            <span>Equipe</span>
          </button>
        </nav>

        {/* Sound, Wallpaper & Gadgets Controls */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Wallpaper Toggle (Biosphere / Skyline) */}
          <div className="hidden sm:flex items-center bg-white/40 rounded-xl p-0.5 border border-white/60">
            <button
              onClick={() => {
                playGlassClick();
                onSelectWallpaper('biosphere');
              }}
              title="Papel de parede: Biosfera & Colinas"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                currentWallpaper === 'biosphere'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Biosfera
            </button>
            <button
              onClick={() => {
                playGlassClick();
                onSelectWallpaper('skyline');
              }}
              title="Papel de parede: Skyline & Gramado"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                currentWallpaper === 'skyline'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Skyline
            </button>
          </div>

          {/* Ambient Jukebox button */}
          <button
            onClick={toggleMusic}
            title={musicPlaying ? "Pausar sintetizador Frutiger Aero" : "Tocar som ambiente Frutiger Aero (Sintetizador)"}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              musicPlaying
                ? 'aqua-button-neon text-slate-950 animate-pulse'
                : 'aqua-button-silver text-slate-700 hover:text-slate-900'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${musicPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden lg:inline">{musicPlaying ? 'Aero Synth: ON' : 'Aero Synth'}</span>
          </button>

          {/* SFX Mute/Unmute */}
          <button
            onClick={toggleSound}
            title={soundOn ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros (Web Audio)"}
            className="p-1.5 rounded-xl aqua-button-silver text-slate-700 hover:text-slate-900 border"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-sky-700" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Vista Sidebar Gadgets Toggle */}
          <button
            onClick={() => {
              playGlassClick();
              onOpenGadgets();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold aqua-button-blue text-white flex items-center gap-1.5 shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-sky-200" />
            <span>{isGadgetsOpen ? 'Fechar Gadgets' : 'Gadgets'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
