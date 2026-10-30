// Self-contained Frutiger Aero Ambient Pad & Arp Generator
class AeroSynthPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Dreamy Frutiger Aero chords: Emaj9 -> C#m9 -> Aadd9 -> Bsus4
    const chordProgressions = [
      [329.63, 493.88, 659.25, 783.99, 987.77], // Emaj
      [277.18, 415.30, 554.37, 659.25, 830.61], // C#m
      [220.00, 329.63, 440.00, 554.37, 659.25], // Aadd9
      [246.94, 369.99, 493.88, 587.33, 739.99]  // Bsus4
    ];

    let chordIdx = 0;
    this.step = 0;

    const playChordPad = () => {
      if (!this.isPlaying) return;
      const chord = chordProgressions[chordIdx];
      chordIdx = (chordIdx + 1) % chordProgressions.length;
      const now = this.ctx.currentTime;

      // Play soft warm pad
      chord.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq / 2, now); // lower octave for warmth

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.linearRampToValueAtTime(750, now + 1.5);
        filter.frequency.linearRampToValueAtTime(400, now + 3.0);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.8);
        gain.gain.linearRampToValueAtTime(0.015, now + 2.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.5);
      });
    };

    // Arpeggio notes
    const arpNotes = [659.25, 783.99, 987.77, 1174.66, 1318.51];
    let arpIdx = 0;

    const playArpTick = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(arpNotes[arpIdx % arpNotes.length], now);
      arpIdx++;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    };

    // Initial chord
    playChordPad();

    this.intervalId = setInterval(() => {
      this.step++;
      if (this.step % 8 === 0) {
        playChordPad();
      }
      if (this.step % 2 === 0) {
        playArpTick();
      }
    }, 400);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const aeroPlayer = new AeroSynthPlayer();
