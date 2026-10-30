import React, { useState, useEffect } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { playMsnDing, playGlassClick } from '../utils/audio';

export default function MsnToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show toast after 2.5 seconds to greet the user
    const timer = setTimeout(() => {
      setVisible(true);
      playMsnDing();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    playGlassClick();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-2xl aero-glass border-2 border-white/95 shadow-2xl p-4 animate-bounce-short backdrop-blur-xl relative overflow-hidden">
      <div className="fj-gloss-cap" />
      {/* Gloss header */}
      <div className="flex items-center justify-between border-b border-slate-300/60 pb-1.5 mb-2 relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-black text-sky-900">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>MSN Messenger • Notificação Live</span>
        </div>
        <button
          onClick={handleClose}
          className="text-slate-600 hover:text-slate-950 transition-colors p-0.5 rounded-full hover:bg-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        {/* MSN Avatar: Mascote Chad */}
        <div className="relative w-12 h-12 rounded-xl border-2 border-lime-400 bg-slate-900 p-0.5 shrink-0 shadow-md overflow-hidden">
          <img
            src="/mascote-chad.png"
            alt="Core Chad MSN Avatar"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-lime-400 border border-slate-900 shadow" />
        </div>

        <div className="text-left flex-1">
          <div className="text-xs font-black text-slate-900 flex items-center gap-1">
            <span>Core (Chad)</span>
            <span className="text-[10px] text-lime-700 font-mono font-normal">(Online)</span>
          </div>
          <p className="text-[11px] text-slate-700 leading-snug mt-0.5">
            "Chassi alinhado e firmware PID calibrado. Bora moggar essa pista! 🏁"
          </p>
        </div>
      </div>
    </div>
  );
}
