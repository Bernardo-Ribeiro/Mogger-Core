import React, { useState } from 'react';
import { Cpu, Layers, Sliders, Code2, Gauge, Zap, CheckCircle2, Shield, Wrench, RefreshCw, Flame } from 'lucide-react';
import { playGlassClick, playEngineMog } from '../utils/audio';

export default function CarrinhoViewer() {
  const [activeTab, setActiveTab] = useState('chassi');
  const [motorPwm, setMotorPwm] = useState(210);
  const [kp, setKp] = useState(2.4);
  const [ki, setKi] = useState(0.15);
  const [kd, setKd] = useState(1.2);
  const [sensorValues, setSensorValues] = useState([0, 1, 1, 1, 0]); // 5 IR line sensors

  const handleTabChange = (tab) => {
    playGlassClick();
    setActiveTab(tab);
  };

  const handlePwmChange = (e) => {
    const val = parseInt(e.target.value);
    setMotorPwm(val);
  };

  const simulatePidCurve = () => {
    playEngineMog();
    // Jiggle sensors
    setSensorValues([
      Math.random() > 0.6 ? 1 : 0,
      1,
      1,
      Math.random() > 0.4 ? 1 : 0,
      Math.random() > 0.7 ? 1 : 0,
    ]);
  };

  return (
    <section id="carrinho" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-white shadow-md backdrop-blur-md">
          <Wrench className="w-3.5 h-3.5 text-sky-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
            Engenharia Mecatrônica & Robótica
          </span>
        </div>
        <div className="inline-block p-4 sm:p-6 rounded-3xl bg-white/80 border border-white/90 shadow-lg backdrop-blur-xl max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            O PROJETO DO CARRINHO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-600">
              ARDUINO
            </span>
          </h2>
          <p className="text-slate-800 max-w-2xl mx-auto text-sm sm:text-base font-semibold mt-2">
            Projetado dentro dos limites regulamentares de 30 × 30 × 30 cm. Combinação de chassi em acrílico translúcido Frutiger Aero, motores DC de alto torque e lógica PID ultrarrápida.
          </p>
        </div>
      </div>

      {/* Main Glass Window Container */}
      <div className="vista-window aero-glass border-2 border-white/95 shadow-2xl relative overflow-hidden">
        <div className="fj-gloss-cap" />
        {/* Titlebar Navigation Tabs */}
        <div className="vista-titlebar px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/60">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => handleTabChange('chassi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'chassi'
                  ? 'aqua-button-blue text-white shadow-sm'
                  : 'bg-white/40 text-slate-800 hover:bg-white/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Chassi & Acrílico (30cm)</span>
            </button>

            <button
              onClick={() => handleTabChange('eletronica')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'eletronica'
                  ? 'aqua-button-blue text-white shadow-sm'
                  : 'bg-white/40 text-slate-800 hover:bg-white/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Eletrônica & Motores</span>
            </button>

            <button
              onClick={() => handleTabChange('firmware')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'firmware'
                  ? 'aqua-button-blue text-white shadow-sm'
                  : 'bg-white/40 text-slate-800 hover:bg-white/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Firmware PID</span>
            </button>

            <button
              onClick={() => handleTabChange('simulador-bancada')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'simulador-bancada'
                  ? 'aqua-button-neon text-slate-950 shadow-sm'
                  : 'bg-white/40 text-slate-800 hover:bg-white/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Bancada de Testes Live</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 bg-white/50 px-2.5 py-1 rounded-md border border-white/60">
            <span>REGULAMENTO:</span>
            <span className="text-emerald-700">✓ 100% HOMOLOGADO</span>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: CHASSI & ACRILLICO */}
          {activeTab === 'chassi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-lime-800 bg-lime-100/90 px-2.5 py-1 rounded-full border border-lime-300">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Chassi Aero Glass • Rigidez & Transparência</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Estrutura em Acrílico Cortado a Laser com Linhas Anos 2000
                </h3>

                <p className="text-slate-700 text-sm leading-relaxed">
                  Seguindo estritamente as especificações do regulamento de <strong>30 × 30 × 30 cm</strong>, o chassi do Mogger Core adota placas de acrílico de 3mm com polimento cristalino, refletindo as curvas clássicas do Frutiger Aero.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2 text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Dimensões:</strong> 245 mm de comprimento × 190 mm de largura × 95 mm de altura (respeitando a margem de segurança de 30cm).</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Distribuição de Peso:</strong> Bateria LiPo rebaixada entre eixos para centro de gravidade ultrabaixo e estabilidade em curvas.</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Adesivagem Oficial:</strong> Mascote Core aplicado no painel frontal e faixas de circuito neon nas laterais.</span>
                  </div>
                </div>
              </div>

              {/* 3D Blueprint Visual Container */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-sky-950/90 text-white border-2 border-white/40 shadow-inner relative overflow-hidden">
                <div className="absolute top-2 right-3 font-mono text-[10px] text-lime-400">
                  CAD_REV_2.4.dwg
                </div>

                {/* Car Vector Visualization */}
                <div className="relative w-full h-64 flex items-center justify-center">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Chassis Representation */}
                  <div className="relative w-64 h-44 rounded-2xl border-2 border-lime-400/80 bg-sky-500/10 backdrop-blur-sm p-4 flex flex-col justify-between shadow-[0_0_30px_rgba(166,255,0,0.25)]">
                    {/* Front bumper with sensors */}
                    <div className="flex justify-between items-center border-b border-lime-400/40 pb-2">
                      <span className="text-[10px] font-mono text-lime-300">BARRA SENSORES IR</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                        ))}
                      </div>
                    </div>

                    {/* Middle Core Mascot & Arduino */}
                    <div className="flex items-center justify-center gap-3 my-auto">
                      <div className="p-2 rounded-xl bg-slate-800/80 border border-lime-400/60 text-center">
                        <Cpu className="w-6 h-6 text-lime-400 mx-auto" />
                        <span className="text-[9px] font-mono text-slate-300 block mt-1">ARDUINO CORE</span>
                      </div>
                      <div className="p-2 rounded-xl bg-sky-900/80 border border-sky-400/60 text-center">
                        <Zap className="w-6 h-6 text-sky-400 mx-auto" />
                        <span className="text-[9px] font-mono text-slate-300 block mt-1">PONTE H DUAL</span>
                      </div>
                    </div>

                    {/* Rear Drive & LiPo */}
                    <div className="flex justify-between items-center border-t border-lime-400/40 pt-2 text-[10px] font-mono text-slate-400">
                      <span>RODA ESQ [DC]</span>
                      <span className="text-lime-300">LIPO 3S 11.1V</span>
                      <span>RODA DIR [DC]</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-center text-xs font-mono text-slate-400">
                  Esquema estrutural do chassi translúcido e fixação de placas
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELETRÔNICA & MOTORES */}
          {activeTab === 'eletronica' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-white/95 border-2 border-white shadow-md space-y-3">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800 w-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-950">Microcontrolador Arduino</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Processador ATMega de alto clock configurado para ciclo de controle PID a 100 Hz. Resposta instantânea à leitura dos sensores óticos.
                </p>
                <div className="text-[11px] font-mono font-bold bg-sky-50 text-sky-900 p-2.5 rounded-lg border border-sky-200">
                  Clock: 16 MHz • Entradas ADC: 10-bit • PWM: 8-bit
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/95 border-2 border-white shadow-md space-y-3">
                <div className="p-2.5 rounded-xl bg-lime-100 text-lime-900 w-fit">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-950">Drivers de Potência & Motores</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Ponte H com proteção contra back-EMF e capacidade de pico de 2A por canal. Motores DC com redução metálica para arrancadas explosivas.
                </p>
                <div className="text-[11px] font-mono font-bold bg-lime-50 text-lime-900 p-2.5 rounded-lg border border-lime-200">
                  Torque: 1.8 kg.cm • Rotação: 600 RPM final
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/95 border-2 border-white shadow-md space-y-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 w-fit">
                  <Gauge className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-950">Sensores & Alimentação</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Conjunto de 5 sensores reflexivos QTR para detecção contínua da linha preta e sonar ultrassônico HC-SR04 para desvio autônomo de obstáculos.
                </p>
                <div className="text-[11px] font-mono font-bold bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-200">
                  Bateria: 3S 1500mAh 45C • Regulador Buck 5V
                </div>
              </div>
            </div>
          )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIRMWARE PID CODE */}
          {activeTab === 'firmware' && (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Algoritmo de Controle PID em C++</h4>
                  <p className="text-xs text-slate-600">
                    O código que garante traçado perfeito sem oscilação excessiva na pista de competição.
                  </p>
                </div>
                <button
                  onClick={simulatePidCurve}
                  className="px-3 py-1.5 rounded-xl aqua-button-neon text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simular Resposta</span>
                </button>
              </div>

              <div className="rounded-2xl bg-slate-950 text-lime-400 p-4 font-mono text-xs overflow-x-auto border-2 border-white/20 shadow-inner">
                <pre>{`// Mogger Core - Arduino PID Controller v1.4.2
#define PIN_MOTOR_ESQ_PWM 5
#define PIN_MOTOR_DIR_PWM 6
#define PIN_DIR_1 7
#define PIN_DIR_2 8

// Coeficientes sintonizados para máxima velocidade
float Kp = ${kp.toFixed(2)};
float Ki = ${ki.toFixed(2)};
float Kd = ${kd.toFixed(2)};

int baseSpeed = ${motorPwm};
int lastError = 0;
float integral = 0;

void loop() {
  int position = readLineSensors(); // [${sensorValues.join(', ')}]
  int error = position - 2500;      // Centro da pista
  
  integral += error;
  float derivative = error - lastError;
  float correction = (Kp * error) + (Ki * integral) + (Kd * derivative);
  lastError = error;

  int speedLeft = constrain(baseSpeed + correction, 0, 255);
  int speedRight = constrain(baseSpeed - correction, 0, 255);
  
  applyMotors(speedLeft, speedRight);
  // Status: MOGGING AT TOP VELOCITY
}`}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: BANCADA DE TESTES LIVE */}
          {activeTab === 'simulador-bancada' && (
            <div className="space-y-6 text-left">
              <div className="p-5 rounded-2xl bg-white/95 border-2 border-white shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-black text-slate-950">Sintonizador de Bancada (PID & Motores)</h4>
                    <p className="text-xs text-slate-700 font-medium">Ajuste os parâmetros em tempo real e observe a rotação dos motores.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">Velocidade PWM:</span>
                    <span className="font-mono text-sm font-extrabold text-lime-800 bg-lime-200 px-2 py-0.5 rounded">
                      {motorPwm} / 255
                    </span>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={motorPwm}
                    onChange={handlePwmChange}
                    className="w-full accent-lime-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono font-bold">
                    <span>0 (Parado)</span>
                    <span>128 (Médio)</span>
                    <span>255 (MOGGER OVERCLOCK)</span>
                  </div>
                </div>

                {/* PID Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
                    <div className="flex justify-between text-xs font-bold text-slate-900 mb-1">
                      <span>Proporcional (Kp)</span>
                      <span className="font-mono text-sky-700">{kp}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={kp}
                      onChange={(e) => setKp(parseFloat(e.target.value))}
                      className="w-full accent-sky-500 h-1.5"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
                    <div className="flex justify-between text-xs font-bold text-slate-900 mb-1">
                      <span>Integral (Ki)</span>
                      <span className="font-mono text-lime-700">{ki}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={ki}
                      onChange={(e) => setKi(parseFloat(e.target.value))}
                      className="w-full accent-lime-500 h-1.5"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
                    <div className="flex justify-between text-xs font-bold text-slate-900 mb-1">
                      <span>Derivativo (Kd)</span>
                      <span className="font-mono text-emerald-700">{kd}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={kd}
                      onChange={(e) => setKd(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5"
                    />
                  </div>
                </div>

                {/* Motor Animation Test */}
                <div className="flex items-center justify-around p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-white/20">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto rounded-full border-4 border-dashed border-lime-400 flex items-center justify-center transition-transform"
                      style={{
                        animation: `spin ${motorPwm > 0 ? Math.max(0.15, 2 - (motorPwm / 255) * 1.8) : 0}s linear infinite`,
                      }}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </div>
                    <span className="text-[11px] font-mono font-bold mt-2 block text-lime-300">MOTOR ESQUERDO</span>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => playEngineMog()}
                      className="px-4 py-2 rounded-full aqua-button-neon text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Testar Arrancada</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">Simulação Acústica</span>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto rounded-full border-4 border-dashed border-sky-400 flex items-center justify-center transition-transform"
                      style={{
                        animation: `spin ${motorPwm > 0 ? Math.max(0.15, 2 - (motorPwm / 255) * 1.8) : 0}s linear infinite`,
                      }}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </div>
                    <span className="text-[11px] font-mono font-bold mt-2 block text-sky-300">MOTOR DIREITO</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
