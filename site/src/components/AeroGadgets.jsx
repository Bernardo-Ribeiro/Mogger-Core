import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Music, Activity, Battery, Disc, Compass, Clock, Radio, Zap, Image as ImageIcon } from 'lucide-react';
import { playGlassClick, playWaterDrop } from '../utils/audio';
import { aeroPlayer } from '../utils/ambientSynth';

export default function AeroGadgets({ isOpen, onClose, currentWallpaper, onSelectWallpaper }) {
  // Clock state
  const [time, setTime] = useState(new Date());

  // Telemetry simulation state
  const [rpm, setRpm] = useState(3850);
  const [battery, setBattery] = useState(11.8);
  const [distance, setDistance] = useState(42);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtle telemetry jitter for realism
  useEffect(() => {
    const teleTimer = setInterval(() => {
      setRpm((prev) => Math.floor(Math.min(4500, Math.max(3200, prev + (Math.random() * 80 - 40)))));
      setDistance((prev) => Math.floor(Math.min(90, Math.max(20, prev + (Math.random() * 6 - 3)))));
    }, 1200);
    return () => clearInterval(teleTimer);
  }, []);

  const toggleMusic = () => {
    playGlassClick();
    const playing = aeroPlayer.toggle();
    setIsPlayingMusic(playing);
  };

  if (!isOpen) return null;

  // Clock hands angles
  const secDeg = time.getSeconds() * 6;
  const minDeg = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const hrDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  return (
    <aside 
      className="fixed top-20 right-3 z-40 w-80 max-h-[85vh] overflow-y-auto rounded-3xl fj-glass border-2 border-white/90 shadow-2xl p-4 space-y-4 backdrop-blur-2xl transition-all"
    >
      {/* Gloss Cap */}
      <div className="fj-gloss-cap" />

      {/* Gadget Bar Titlebar */}
      <div className="flex items-center justify-between border-b border-white/60 pb-2 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
          <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Windows Vista Gadgets • Mogger Core</span>
        </div>
        <button
          onClick={() => {
            playGlassClick();
            onClose();
          }}
          className="p-1 rounded-full hover:bg-red-500 hover:text-white text-slate-700 transition-colors"
          title="Fechar Gadgets"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* GADGET 1: AERO ANALOG CLOCK */}
      <div className="p-3 rounded-2xl bg-white/50 border border-white/80 shadow-sm flex flex-col items-center relative z-10">
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Clock className="w-3 h-3 text-sky-600" />
          <span>Aero Timekeeper</span>
        </div>

        {/* Clock Dial */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white/95 via-sky-100 to-sky-300 border-2 border-white shadow-orb flex items-center justify-center">
          {/* Glass sheen highlight */}
          <div className="absolute top-1 left-3 right-3 h-10 bg-white/70 rounded-full blur-[1px] pointer-events-none" />

          {/* Hour markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <div
              key={deg}
              className="absolute w-1 h-2 bg-slate-400/80 rounded-full"
              style={{
                transform: `rotate(${deg}deg) translateY(-46px)`,
              }}
            />
          ))}

          {/* Center Brand */}
          <span className="text-[8px] font-black text-slate-700 tracking-tighter absolute top-7">
            MOGGER
          </span>

          {/* Hour hand */}
          <div
            className="absolute w-1.5 h-8 bg-slate-900 rounded-full origin-bottom shadow-sm"
            style={{
              bottom: '50%',
              transform: `rotate(${hrDeg}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.4, 2, 0.55, 0.44)',
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute w-1 h-11 bg-slate-700 rounded-full origin-bottom shadow-sm"
            style={{
              bottom: '50%',
              transform: `rotate(${minDeg}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.4, 2, 0.55, 0.44)',
            }}
          />

          {/* Second hand */}
          <div
            className="absolute w-0.5 h-12 bg-lime-500 rounded-full origin-bottom shadow"
            style={{
              bottom: '50%',
              transform: `rotate(${secDeg}deg)`,
            }}
          />

          {/* Center pin */}
          <div className="w-3 h-3 rounded-full bg-slate-900 border-2 border-white z-10 shadow" />
        </div>

        <div className="text-[11px] font-mono text-slate-800 font-bold mt-2">
          {time.toLocaleTimeString()}
        </div>
      </div>

      {/* GADGET 2: WALLPAPER SWITCHER (Frutiger Aero Archive) */}
      <div className="p-3 rounded-2xl bg-white/50 border border-white/80 shadow-sm space-y-2 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-sky-600" />
            <span>Papel de Parede Aero</span>
          </span>
          <span className="text-sky-700 font-bold bg-sky-100 px-1.5 py-0.5 rounded text-[9px]">
            ARCHIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              playGlassClick();
              onSelectWallpaper('biosphere');
            }}
            className={`p-1.5 rounded-xl border text-left transition-all ${
              currentWallpaper === 'biosphere'
                ? 'border-sky-500 bg-sky-100/90 shadow-sm'
                : 'border-white/70 bg-white/60 hover:bg-white/80'
            }`}
          >
            <div className="h-10 rounded-lg overflow-hidden mb-1 border border-black/10">
              <img src="/wallpaper-biosphere.jpg" alt="Biosfera" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-bold text-slate-900 leading-tight">Biosfera</div>
            <div className="text-[9px] text-slate-500">Domo & Colinas</div>
          </button>

          <button
            onClick={() => {
              playGlassClick();
              onSelectWallpaper('skyline');
            }}
            className={`p-1.5 rounded-xl border text-left transition-all ${
              currentWallpaper === 'skyline'
                ? 'border-sky-500 bg-sky-100/90 shadow-sm'
                : 'border-white/70 bg-white/60 hover:bg-white/80'
            }`}
          >
            <div className="h-10 rounded-lg overflow-hidden mb-1 border border-black/10">
              <img src="/wallpaper-skyline.jpg" alt="Skyline" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-bold text-slate-900 leading-tight">Skyline</div>
            <div className="text-[9px] text-slate-500">Prédios & Grama</div>
          </button>
        </div>
      </div>

      {/* GADGET 3: ARDUINO TELEMETRY CORE */}
      <div className="p-3 rounded-2xl bg-white/50 border border-white/80 shadow-sm space-y-2.5 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-lime-600" />
            <span>Arduino Telemetry</span>
          </span>
          <span className="text-lime-700 font-bold bg-lime-200/80 px-1.5 py-0.5 rounded text-[9px]">
            ONLINE
          </span>
        </div>

        {/* RPM Meter */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
            <span>Motor RPM:</span>
            <span className="font-mono text-emerald-800">{rpm} RPM</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden p-0.5 border border-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-lime-400 to-emerald-500 shadow-inner transition-all duration-300"
              style={{ width: `${(rpm / 5000) * 100}%` }}
            />
          </div>
        </div>

        {/* Battery & Ultrasonic Sensor */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
          <div className="p-2 rounded-xl bg-white/70 border border-white">
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <Battery className="w-3 h-3 text-sky-600" />
              <span>Bateria LiPo:</span>
            </div>
            <div className="font-mono font-extrabold text-slate-900 mt-0.5">{battery} V</div>
          </div>

          <div className="p-2 rounded-xl bg-white/70 border border-white">
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <Compass className="w-3 h-3 text-lime-600" />
              <span>Sonar Obstáculo:</span>
            </div>
            <div className="font-mono font-extrabold text-slate-900 mt-0.5">{distance} cm</div>
          </div>
        </div>

        {/* Mog factor gauge */}
        <div className="p-2 rounded-xl bg-gradient-to-r from-lime-300/40 to-sky-300/40 border border-white flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Zap className="w-3.5 h-3.5 text-lime-600" />
            <span>Nível de Mogging:</span>
          </div>
          <span className="font-mono font-black text-xs text-lime-800 bg-white px-2 py-0.5 rounded-lg border border-white">
            100% BASED
          </span>
        </div>
      </div>

      {/* GADGET 4: WINDOWS MEDIA PLAYER AERO JUKEBOX */}
      <div className="p-3 rounded-2xl bg-white/50 border border-white/80 shadow-sm space-y-2 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Music className="w-3 h-3 text-sky-600" />
            <span>Windows Media Jukebox</span>
          </span>
          <span className="text-[9px] font-mono text-slate-500">Aero Ambient</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/85 text-white border border-white/20 shadow-inner flex items-center gap-3">
          <div className={`relative w-10 h-10 rounded-full bg-gradient-to-tr from-lime-400 to-sky-400 p-0.5 shadow ${isPlayingMusic ? 'animate-spin' : ''}`}>
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <Disc className="w-5 h-5 text-lime-300" />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="text-xs font-bold truncate text-lime-300">
              Mogger Horizons 2000
            </div>
            <div className="text-[10px] text-sky-200 truncate font-mono">
              Frutiger Aero Ambient Pad
            </div>

            <div className="flex items-end gap-0.5 h-3 mt-1">
              {[60, 100, 40, 80, 50, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-sky-400 to-lime-400 rounded-t transition-all ${
                    isPlayingMusic ? 'animate-pulse' : 'h-1'
                  }`}
                  style={{
                    height: isPlayingMusic ? `${h}%` : '20%',
                    animationDuration: `${0.4 + i * 0.15}s`
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={toggleMusic}
            className="p-2 rounded-full aqua-button-blue text-white shadow"
            title={isPlayingMusic ? "Pausar música" : "Tocar música"}
          >
            {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
