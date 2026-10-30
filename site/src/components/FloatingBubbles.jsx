import React, { useState, useEffect } from 'react';
import { playWaterDrop } from '../utils/audio';

export default function FloatingBubbles({ activeWallpaper = 'biosphere' }) {
  const [bubbles, setBubbles] = useState([
    { id: 1, size: 75, left: '8%', bottom: '-5%', speed: 18, delay: 0 },
    { id: 2, size: 45, left: '22%', bottom: '-5%', speed: 14, delay: 2 },
    { id: 3, size: 95, left: '38%', bottom: '-5%', speed: 22, delay: 1 },
    { id: 4, size: 55, left: '58%', bottom: '-5%', speed: 16, delay: 3 },
    { id: 5, size: 85, left: '72%', bottom: '-5%', speed: 20, delay: 0.5 },
    { id: 6, size: 50, left: '88%', bottom: '-5%', speed: 15, delay: 2.5 },
    { id: 7, size: 120, left: '15%', bottom: '-5%', speed: 25, delay: 4 },
    { id: 8, size: 65, left: '82%', bottom: '-5%', speed: 17, delay: 3.5 },
    { id: 9, size: 40, left: '48%', bottom: '-5%', speed: 13, delay: 5 },
  ]);

  const [poppedBubbles, setPoppedBubbles] = useState({});
  const [butterflyPos, setButterflyPos] = useState({ x: 75, y: 35 });

  // Butterfly gentle fluttering motion
  useEffect(() => {
    const interval = setInterval(() => {
      setButterflyPos({
        x: 65 + Math.sin(Date.now() / 2000) * 15,
        y: 35 + Math.cos(Date.now() / 1600) * 12,
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handlePop = (id) => {
    playWaterDrop();
    setPoppedBubbles((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setPoppedBubbles((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Frutiger Aero Wallpaper Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-90"
        style={{
          backgroundImage: 
            activeWallpaper === 'biosphere' 
              ? 'url(/wallpaper-biosphere.jpg)'
              : activeWallpaper === 'skyline'
              ? 'url(/wallpaper-skyline.jpg)'
              : 'none',
          backgroundColor: '#0284c7'
        }}
      />

      {/* Atmospheric Daylight Overlay (Frutiger Aero signature) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.25) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(34, 197, 94, 0.15) 100%)'
        }}
      />

      {/* Sun Lens Flare Elements across Diagonal */}
      <div 
        className="sun-lens-flare top-4 right-12 w-48 h-48 bg-white/90 filter blur-xl shadow-[0_0_90px_rgba(255,255,255,1)] animate-pulse"
      />
      <div 
        className="sun-lens-flare top-24 right-44 w-20 h-20 rounded-full border border-sky-300/40 bg-radial-gradient from-lime-300/30 to-transparent filter blur-sm"
      />
      <div 
        className="sun-lens-flare top-48 right-72 w-12 h-12 rounded-full border border-emerald-300/50 bg-sky-400/20 filter blur-xs"
      />
      <div 
        className="sun-lens-flare top-72 right-96 w-8 h-8 rounded-full border border-lime-400/60 bg-white/40"
      />

      {/* Green Sparkles Floating (from Image 0 / Frutiger Aero Archive) */}
      {[
        { top: '65%', left: '15%', delay: '0s', size: 20 },
        { top: '75%', left: '32%', delay: '1.2s', size: 16 },
        { top: '80%', left: '68%', delay: '0.6s', size: 24 },
        { top: '70%', left: '85%', delay: '1.8s', size: 18 },
        { top: '88%', left: '45%', delay: '2.2s', size: 22 },
      ].map((sp, idx) => (
        <div
          key={idx}
          className="absolute green-sparkle text-lime-400 font-bold select-none drop-shadow-[0_0_8px_rgba(166,255,0,0.9)]"
          style={{
            top: sp.top,
            left: sp.left,
            animationDelay: sp.delay,
            fontSize: `${sp.size}px`,
          }}
        >
          ✦
        </div>
      ))}

      {/* Morpho Blue Butterfly (Iconic Frutiger Aero Element from Image 0) */}
      <div
        className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-125"
        style={{
          top: `${butterflyPos.y}%`,
          left: `${butterflyPos.x}%`,
          filter: 'drop-shadow(0 4px 10px rgba(0, 50, 120, 0.4))',
        }}
        onClick={() => playWaterDrop()}
        title="Borboleta Azul Frutiger Aero (Clique para espantar!)"
      >
        <div className="relative w-12 h-10 flex items-center justify-center">
          {/* Left Wing */}
          <div className="butterfly-wing-l w-5 h-8 bg-gradient-to-br from-cyan-300 via-blue-600 to-indigo-900 rounded-l-full border border-cyan-100 shadow-sm" />
          {/* Body */}
          <div className="w-1.5 h-6 bg-slate-900 rounded-full z-10 mx-[-2px]" />
          {/* Right Wing */}
          <div className="butterfly-wing-r w-5 h-8 bg-gradient-to-bl from-cyan-300 via-blue-600 to-indigo-900 rounded-r-full border border-cyan-100 shadow-sm" />
        </div>
      </div>

      {/* Floating Frutiger.js Bubbles with Realistic Highlights */}
      {bubbles.map((b) => {
        if (poppedBubbles[b.id]) return null;
        return (
          <div
            key={b.id}
            onClick={() => handlePop(b.id)}
            className="frutiger-bubble group pointer-events-auto"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              animation: `bubbleRise ${b.speed}s linear infinite`,
              animationDelay: `${b.delay}s`,
            }}
            title="Clique para estourar a bolha d'água!"
          >
            {/* Specular sheen ring */}
            <div className="absolute inset-1 rounded-full border border-white/60 opacity-70" />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/20" />
          </div>
        );
      })}
    </div>
  );
}
