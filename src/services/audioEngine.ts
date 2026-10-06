import { EqualizerPreset } from '../types/music';

class AudioEngine {
  private audio: HTMLAudioElement;
  private audioCtx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private filters: BiquadFilterNode[] = [];
  private gainNode: GainNode | null = null;
  private isInitialized = false;
  private synthInterval: number | null = null;

  constructor() {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'metadata';
  }

  public initAudioContext() {
    if (this.isInitialized && this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.audioCtx = new AudioCtxClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.gainNode = this.audioCtx.createGain();

      // Setup 5 EQ bands: 60Hz, 230Hz, 910Hz, 4000Hz, 14000Hz
      const frequencies = [60, 230, 910, 4000, 14000];
      const types: BiquadFilterType[] = ['lowshelf', 'peaking', 'peaking', 'peaking', 'highshelf'];

      this.filters = frequencies.map((freq, idx) => {
        const filter = this.audioCtx!.createBiquadFilter();
        filter.type = types[idx];
        filter.frequency.value = freq;
        filter.gain.value = 0;
        return filter;
      });

      // Connect source -> filter0 -> filter1 -> ... -> analyser -> gain -> destination
      try {
        this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
        let lastNode: AudioNode = this.sourceNode;

        for (const filter of this.filters) {
          lastNode.connect(filter);
          lastNode = filter;
        }

        lastNode.connect(this.analyser);
        this.analyser.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
      } catch (err) {
        console.warn('Web Audio source connection bypassed or already connected:', err);
      }

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio Context initialization error:', e);
    }
  }

  public loadTrack(url: string): Promise<void> {
    return new Promise((resolve) => {
      this.audio.src = url;
      this.audio.load();
      resolve();
    });
  }

  public async play(): Promise<void> {
    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume().catch(() => {});
    }

    try {
      await this.audio.play();
    } catch (e) {
      console.warn('Audio play error, falling back or waiting for user interaction:', e);
      // Fallback: If media network failed, start synth harmonic pad so user experiences music
      this.startSynthesizerFallback();
    }
  }

  public pause(): void {
    this.audio.pause();
    this.stopSynthesizerFallback();
  }

  public seek(time: number): void {
    if (Number.isFinite(time) && this.audio.duration) {
      this.audio.currentTime = Math.min(Math.max(0, time), this.audio.duration);
    }
  }

  public setVolume(vol: number): void {
    this.audio.volume = Math.max(0, Math.min(1, vol));
  }

  public setMuted(muted: boolean): void {
    this.audio.muted = muted;
  }

  public setPlaybackRate(rate: number): void {
    this.audio.playbackRate = Math.max(0.5, Math.min(2, rate));
  }

  public applyEqualizerPreset(preset: EqualizerPreset): void {
    if (this.filters.length < 5) return;

    const presetGains: Record<EqualizerPreset, number[]> = {
      flat: [0, 0, 0, 0, 0],
      'bass-boost': [7, 4, 0, 0, 1],
      vocal: [-2, 1, 5, 3, 1],
      electronic: [6, 4, 0, 3, 6],
      acoustic: [3, 1, 2, 4, 3],
      rock: [5, 2, -1, 3, 5],
    };

    const gains = presetGains[preset] || [0, 0, 0, 0, 0];
    this.filters.forEach((filter, i) => {
      filter.gain.setTargetAtTime(gains[i], this.audioCtx?.currentTime || 0, 0.05);
    });
  }

  public setBandGain(bandIndex: number, gain: number): void {
    if (this.filters[bandIndex]) {
      this.filters[bandIndex].gain.setTargetAtTime(gain, this.audioCtx?.currentTime || 0, 0.05);
    }
  }

  public getFrequencyData(array: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(array as unknown as Uint8Array<ArrayBuffer>);
    } else {
      // Simulate pleasant pulsing if WebAudio analyser not ready
      for (let i = 0; i < array.length; i++) {
        const time = Date.now() / 300;
        array[i] = Math.max(0, Math.floor(Math.sin(time + i * 0.2) * 80 + 90));
      }
    }
  }

  public getTimeDomainData(array: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteTimeDomainData(array as unknown as Uint8Array<ArrayBuffer>);
    } else {
      for (let i = 0; i < array.length; i++) {
        array[i] = 128 + Math.floor(Math.sin((Date.now() / 200) + i * 0.1) * 30);
      }
    }
  }

  public getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  // Backup synthesizer for offline or CORS issues
  private startSynthesizerFallback() {
    if (this.synthInterval || !this.audioCtx) return;
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25]; // C, E, G, B, C
    let step = 0;
    this.synthInterval = window.setInterval(() => {
      if (!this.audioCtx || this.audioCtx.state !== 'running') return;
      try {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = notes[step % notes.length];
        step++;
        const now = this.audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.08, now);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(noteGain);
        if (this.analyser) {
          noteGain.connect(this.analyser);
        } else {
          noteGain.connect(this.audioCtx.destination);
        }
        osc.start(now);
        osc.stop(now + 0.6);
      } catch {
        // ignore
      }
    }, 600);
  }

  private stopSynthesizerFallback() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioEngine = new AudioEngine();
