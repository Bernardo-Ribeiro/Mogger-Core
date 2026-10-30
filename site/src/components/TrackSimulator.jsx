import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Zap, Flag, Trophy, Compass, Activity } from 'lucide-react';
import { playEngineMog, playWaterDrop, playGlassClick } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function TrackSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1 along circuit
  const [laps, setLaps] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [bestLap, setBestLap] = useState(null);
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Track loop animation
  useEffect(() => {
    if (!isRunning) {
      lastTimeRef.current = null;
      return;
    }

    const updateLoop = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const speed = turbo ? 0.45 : 0.22; // laps per second

      setProgress((prev) => {
        const next = prev + speed * dt;
        if (next >= 1) {
          // Lap completed!
          setLaps((l) => l + 1);
          setBestLap((curr) => (!curr || lapTime < curr ? lapTime : curr));
          playWaterDrop();
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 }
          });
          setLapTime(0);
          return next % 1;
        }
        return next;
      });

      setLapTime((t) => t + dt);
      animRef.current = requestAnimationFrame(updateLoop);
    };

    animRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, turbo, lapTime]);

  const toggleRun = () => {
    playGlassClick();
    if (!isRunning) {
      playEngineMog();
    }
    setIsRunning(!isRunning);
  };

  const resetTrack = () => {
    playGlassClick();
    setIsRunning(false);
    setProgress(0);
    setLaps(0);
    setLapTime(0);
    setTurbo(false);
  };

  const triggerTurbo = () => {
    playEngineMog();
    setTurbo(true);
    setTimeout(() => {
      setTurbo(false);
    }, 2500);
  };

  // Parametric circuit track coordinates (oval with slight chicane)
  // Oval path: x = cx + rx * cos(theta), y = cy + ry * sin(theta)
  const theta = progress * 2 * Math.PI;
  const carX = 300 + 220 * Math.cos(theta);
  const carY = 170 + 95 * Math.sin(theta) + 20 * Math.sin(2 * theta); // chicane wave

  // Calculate tangent rotation angle for car
  const dX = -220 * Math.sin(theta);
  const dY = 95 * Math.cos(theta) + 40 * Math.cos(2 * theta);
  const angleDeg = (Math.atan2(dY, dX) * 180) / Math.PI;

  return (
    <section id="simulador" className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-white shadow-md backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
            Simulador Interativo 2000s
          </span>
        </div>
        <div className="inline-block p-4 sm:p-6 rounded-3xl bg-white/80 border border-white/90 shadow-lg backdrop-blur-xl max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            CIRCUITO DE TESTES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
              MOGGER CORE
            </span>
          </h2>
          <p className="text-slate-800 max-w-2xl mx-auto text-sm sm:text-base font-semibold mt-2">
            Teste o comportamento do algoritmo seguidor de linha na pista simulada. Ative o modo Turbo Overclock para sentir a potência máxima do motor Arduino!
          </p>
        </div>
      </div>

      {/* Simulator Vista Box */}
      <div className="vista-window aero-glass border-2 border-white/95 shadow-2xl overflow-hidden relative">
        <div className="fj-gloss-cap" />
        {/* Title bar */}
        <div className="vista-titlebar px-4 py-2 flex items-center justify-between relative z-10">
          <span className="text-xs font-bold text-slate-900">
            Virtual_Track_Arena.exe — [60 FPS Telemetry]
          </span>
          <div className="flex items-center gap-3 text-xs font-mono font-bold">
            <span className="text-slate-800">VOLTAS: <strong className="text-slate-950 bg-white/80 px-2 py-0.5 rounded">{laps}</strong></span>
            <span className="text-slate-800">TEMPO: <strong className="text-slate-950 bg-white/80 px-2 py-0.5 rounded">{lapTime.toFixed(2)}s</strong></span>
          </div>
        </div>

        {/* Track Canvas SVG */}
        <div className="relative w-full h-80 sm:h-96 bg-gradient-to-b from-slate-950/90 via-sky-950/80 to-slate-950/90 flex items-center justify-center overflow-hidden border-b-2 border-white/40">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Circuit SVG Graphic */}
          <svg className="w-full h-full max-w-2xl" viewBox="0 0 600 340">
            <defs>
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <filter id="neonGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#A6FF00" />
              </filter>
            </defs>

            {/* Grass & Curb */}
            <path
              d="M 80,170 C 80,75 520,75 520,170 C 520,265 80,265 80,170 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="48"
              opacity="0.3"
            />
            {/* Asphalt Track */}
            <path
              d="M 80,170 C 80,75 520,75 520,170 C 520,265 80,265 80,170 Z"
              fill="none"
              stroke="url(#trackGrad)"
              strokeWidth="40"
              strokeLinecap="round"
            />
            {/* White Center Line for Optical Sensors */}
            <path
              d="M 80,170 C 80,75 520,75 520,170 C 520,265 80,265 80,170 Z"
              fill="none"
              stroke="#A6FF00"
              strokeWidth="4"
              strokeDasharray="10 8"
              filter="url(#neonGlow)"
            />

            {/* Start / Finish Line */}
            <line x1="300" y1="50" x2="300" y2="90" stroke="#ffffff" strokeWidth="5" strokeDasharray="4 4" />

            {/* The Car */}
            <g
              transform={`translate(${carX}, ${carY}) rotate(${angleDeg})`}
              className="transition-transform duration-75"
            >
              {/* Turbo flame effect behind car */}
              {turbo && (
                <ellipse cx="-20" cy="0" rx="14" ry="5" fill="#A6FF00" opacity="0.8" className="animate-pulse" />
              )}
              {/* Car Body (Frutiger Aero Green / Charcoal) */}
              <rect
                x="-14"
                y="-10"
                width="28"
                height="20"
                rx="6"
                fill="#171A1D"
                stroke={turbo ? "#A6FF00" : "#ffffff"}
                strokeWidth="2"
              />
              {/* Windshield Aero Glass */}
              <rect x="2" y="-7" width="8" height="14" rx="2" fill="#38bdf8" opacity="0.9" />
              {/* Front bumper sensor array */}
              <circle cx="14" cy="-5" r="2" fill="#A6FF00" />
              <circle cx="14" cy="0" r="2" fill="#A6FF00" />
              <circle cx="14" cy="5" r="2" fill="#A6FF00" />
              {/* Rear Spoiler */}
              <rect x="-13" y="-12" width="3" height="24" rx="1" fill="#A6FF00" />
            </g>
          </svg>

          {/* Speed overlay */}
          <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white/70 border border-white/80 shadow-sm backdrop-blur-md text-xs font-mono">
            <div className="text-slate-500 font-bold uppercase text-[9px]">Velocidade Atual</div>
            <div className="text-base font-black text-slate-900">
              {isRunning ? (turbo ? '84.6 cm/s (TURBO)' : '42.8 cm/s') : '0.0 cm/s'}
            </div>
          </div>

          {bestLap && (
            <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-lime-100/80 border border-lime-300 shadow-sm backdrop-blur-md text-xs font-mono text-lime-900 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>MELHOR VOLTA: <strong>{bestLap.toFixed(2)}s</strong></span>
            </div>
          )}
        </div>

        {/* Simulator Control Panel */}
        <div className="p-4 bg-white/95 border-t-2 border-white flex flex-wrap items-center justify-between gap-3 relative z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRun}
              className={`px-5 py-2 rounded-full font-bold text-xs tracking-wide flex items-center gap-2 shadow ${
                isRunning
                  ? 'aqua-button-silver text-slate-900'
                  : 'aqua-button-blue text-white'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'hidden' : ''}`} />
              <span>{isRunning ? 'Pausar Corrida' : 'Iniciar Volta Rápida'}</span>
            </button>

            <button
              onClick={triggerTurbo}
              disabled={!isRunning}
              className={`px-4 py-2 rounded-full font-black text-xs tracking-wide flex items-center gap-1.5 transition-all ${
                isRunning
                  ? 'aqua-button-neon text-slate-950 shadow-aero-neon animate-pulse'
                  : 'opacity-50 cursor-not-allowed bg-slate-200 text-slate-500'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{turbo ? 'OVERCLOCK ATIVADO!' : 'TURBO BOOST'}</span>
            </button>

            <button
              onClick={resetTrack}
              className="p-2 rounded-full aqua-button-silver text-slate-700 hover:text-slate-900"
              title="Reiniciar Pista"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-ping" />
            <span>5 Sensores QTR-8A ativos • PID Loop: 10ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
