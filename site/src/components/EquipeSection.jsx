import React from 'react';
import { Users, Award, Code, Wrench, Zap, Flag, Palette, FileText, FolderGit2 } from 'lucide-react';
import { playGlassClick, playWaterDrop } from '../utils/audio';

export default function EquipeSection() {
  const roles = [
    {
      icon: Flag,
      title: 'Piloto & Controle',
      color: 'from-amber-400 to-orange-500',
      badgeColor: 'text-amber-800 bg-amber-100',
      desc: 'Alinhamento na linha de partida, acionamento do gatilho de largada e calibração dos sensores de pista antes do sinal verde.'
    },
    {
      icon: Code,
      title: 'Programação & Firmware',
      color: 'from-lime-400 to-emerald-500',
      badgeColor: 'text-lime-800 bg-lime-100',
      desc: 'Desenvolvimento do algoritmo PID em C++ para Arduino, sintonização de Kp/Ki/Kd e leitura dos 5 sensores reflexivos.'
    },
    {
      icon: Zap,
      title: 'Elétrica & Potência',
      color: 'from-sky-400 to-blue-600',
      badgeColor: 'text-sky-800 bg-sky-100',
      desc: 'Dimensionamento da bateria LiPo 3S 11.1V, isolamento óptico da Ponte H e proteção de ruído para o microcontrolador.'
    },
    {
      icon: Wrench,
      title: 'Mecânica & Chassi',
      color: 'from-slate-400 to-slate-700',
      badgeColor: 'text-slate-800 bg-slate-200',
      desc: 'Corte e polimento do chassi em acrílico 30×30×30 cm, montagem dos suportes de motor e alinhamento de tração.'
    },
    {
      icon: Award,
      title: 'Estratégia & Telemetria',
      color: 'from-purple-400 to-indigo-600',
      badgeColor: 'text-purple-800 bg-purple-100',
      desc: 'Análise de cronometragem de voltas, teste de coeficiente de atrito dos pneus de silicone e plano de corrida.'
    },
    {
      icon: Palette,
      title: 'Design & Identidade',
      color: 'from-teal-400 to-cyan-500',
      badgeColor: 'text-teal-800 bg-teal-100',
      desc: 'Criação do mascote robô Chad "Core", aplicação da estética Frutiger Aero 2000s e desenvolvimento deste portal oficial.'
    }
  ];

  return (
    <section id="equipe" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header with frosted backing for perfect readability */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-white shadow-md backdrop-blur-md">
          <Users className="w-3.5 h-3.5 text-sky-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
            Estrutura & Divisão de Engenharia
          </span>
        </div>
        <div className="inline-block p-4 sm:p-6 rounded-3xl bg-white/80 border border-white/90 shadow-lg backdrop-blur-xl max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            A EQUIPE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-600">
              MOGGER CORE
            </span>
          </h2>
          <p className="text-slate-800 text-sm sm:text-base font-semibold mt-2">
            Trabalho multidisciplinar unindo hardware, software embarcado e identidade visual. Foco absoluto no pódio da competição Arduino.
          </p>
        </div>
      </div>

      {/* Team Roles Grid (Opaque Frosted Aero Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map((r, idx) => {
          const Icon = r.icon;
          return (
            <div
              key={idx}
              onClick={() => playWaterDrop()}
              className="aero-card p-6 rounded-3xl border-2 border-white/95 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1.5 group cursor-pointer relative overflow-hidden"
            >
              {/* Gloss Cap shine */}
              <div className="fj-gloss-cap" />

              <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
                {/* Vista glossy avatar badge */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                  <div className="w-full h-full rounded-2xl bg-slate-900/90 flex items-center justify-center text-white border border-white/60">
                    <Icon className="w-6 h-6 text-lime-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-950 group-hover:text-sky-700 transition-colors">
                    {r.title}
                  </h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${r.badgeColor}`}>
                    DIVISÃO OFICIAL
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-semibold relative z-10">
                {r.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Repository Documentation Box */}
      <div className="mt-12 vista-window aero-glass border-2 border-white/95 shadow-2xl p-6 sm:p-8 text-left relative overflow-hidden">
        <div className="fj-gloss-cap" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300/60 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-6 h-6 text-lime-600" />
            <h3 className="text-lg font-black text-slate-950">
              Documentação e Arquivos do Repositório Oficial
            </h3>
          </div>
          <span className="text-xs font-mono bg-white/90 px-3 py-1.5 rounded-lg border border-white shadow-sm text-slate-900 font-extrabold">
            Branch: origin/main • 100% Sincronizado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs relative z-10">
          <div className="p-4 rounded-2xl bg-white/95 border-2 border-white shadow-md">
            <div className="font-black text-slate-950 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>logo/</span>
            </div>
            <p className="text-[11px] text-slate-700 font-medium">
              Arquivos vetoriais SVG e versão PNG com vidro Aero e cursor.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border-2 border-white shadow-md">
            <div className="font-black text-slate-950 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-4 h-4 text-lime-600" />
              <span>identidade/mascote/</span>
            </div>
            <p className="text-[11px] text-slate-700 font-medium">
              Conceito, poses e vetor do Mascote Core "Chad Based".
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border-2 border-white shadow-md">
            <div className="font-black text-slate-950 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>carrinho/mecanica/</span>
            </div>
            <p className="text-[11px] text-slate-700 font-medium">
              Medidas do chassi de acrílico (30x30x30cm) e montagem CAD.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border-2 border-white shadow-md">
            <div className="font-black text-slate-950 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>carrinho/firmware/</span>
            </div>
            <p className="text-[11px] text-slate-700 font-medium">
              Código Arduino em C++, bibliotecas e controle PID.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
