# Mogger Core — Portal Oficial Frutiger Aero (Anos 2000)

Site de apresentação da equipe **Mogger Core**, desenvolvido com estética **Frutiger Aero**, referências aos anos 2000 (Windows Vista, MSN Messenger, Gadgets), animações com GSAP e sintetizador de áudio Web Audio API integrado.

## ✨ Recursos & Destaques

- **Estética Frutiger Aero Autêntica:**
  - Vidro Aero Glass translúcido com reflexos especulares e desfoque dinâmico (`backdrop-filter`).
  - Botões Aqua / Gel skeuomórficos com feedback tátil responsivo (`active:scale-[0.97]`).
  - Céu azul brilhante, colinas verdes onduladas e bolhas d'água interativas que estouram com efeito sonoro.
  - Janelas com controles clássicos do Windows Vista (minimizar, maximizar, fechar).

- **Windows Vista Gadgets Sidebar:**
  - **Relógio Analógico Glass Orb** com ponteiros em tempo real.
  - **Arduino Live Telemetry Gauge:** RPM dos motores, voltagem da LiPo 3S, leitura do sonar ultrassônico e Mog-Meter 100% Based.
  - **Windows Media Player (Aero Jukebox):** Sintetizador generativo de pads e arpejos estilo Frutiger Aero ambient em puro Web Audio API.

- **Seções Interativas:**
  - **Hero 3D Parallax:** Movimento responsivo do cursor com GSAP e o logotipo oficial com acabamento de vidro.
  - **O Projeto do Carrinho Arduino:** Especificações regulamentares de 30 × 30 × 30 cm, chassi acrílico, motores, eletrônica e código C++ do firmware com algoritmo PID.
  - **Bancada de Testes Live:** Controle de PWM dos motores e sintonizadores de Kp, Ki, Kd.
  - **Mascote Core (Chad Based):** Visualizador de prancha de poses, vetor SVG e foto do mascote com "Mog-O-Meter".
  - **Simulador de Pista 2D:** Mini-game de volta rápida na pista com modo Turbo Overclock.
  - **Equipe & Paddock:** Atribuições de cada integrante conforme a documentação oficial.
  - **MSN Messenger Toast:** Notificação clássica dos anos 2000 com som autêntico.

## 🚀 Como Executar

```bash
cd site
pnpm install
pnpm run dev
```

Acesse em: `http://localhost:3000`

## 📦 Build para Produção

```bash
pnpm run build
```
Os arquivos otimizados são gerados na pasta `dist/`.
