import React, { useState } from 'react';
import { X, Sliders, Zap, Check } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { EqualizerPreset } from '../types/music';
import { audioEngine } from '../services/audioEngine';

export const EqualizerModal: React.FC = () => {
  const {
    isEqualizerOpen,
    setIsEqualizerOpen,
    equalizerPreset,
    setEqualizerPreset,
    playbackRate,
    setPlaybackRate,
    language,
  } = useMusic();

  const [customBands, setCustomBands] = useState<number[]>([0, 0, 0, 0, 0]);

  if (!isEqualizerOpen) return null;

  const presets: { id: EqualizerPreset; labelVi: string; labelEn: string; icon: string }[] = [
    { id: 'flat', labelVi: 'Chuẩn (Flat)', labelEn: 'Flat', icon: '⚖️' },
    { id: 'bass-boost', labelVi: 'Siêu trầm (Bass Boost)', labelEn: 'Bass Boost', icon: '🔊' },
    { id: 'vocal', labelVi: 'Giọng hát trong trẻo', labelEn: 'Vocal Clarity', icon: '🎤' },
    { id: 'electronic', labelVi: 'Điện tử & Dance', labelEn: 'Electronic', icon: '⚡' },
    { id: 'acoustic', labelVi: 'Acoustic & Lofi', labelEn: 'Acoustic', icon: '🎸' },
    { id: 'rock', labelVi: 'Rock mạnh mẽ', labelEn: 'Rock & Metal', icon: '🔥' },
  ];

  const bands = [
    { label: '60Hz', sub: 'Sub-Bass' },
    { label: '230Hz', sub: 'Bass' },
    { label: '910Hz', sub: 'Mid' },
    { label: '4kHz', sub: 'Upper-Mid' },
    { label: '14kHz', sub: 'Treble' },
  ];

  const handleBandChange = (index: number, val: number) => {
    const updated = [...customBands];
    updated[index] = val;
    setCustomBands(updated);
    audioEngine.setBandGain(index, val);
  };

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'vi' ? 'Bộ chỉnh âm thanh (Equalizer)' : 'Graphic Equalizer & FX'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'vi' ? 'Tùy biến dải âm và tốc độ phát nhạc' : 'Customize frequency bands and playback speed'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEqualizerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PRESET CHIPS */}
        <div className="my-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            {language === 'vi' ? 'Chế độ cài đặt sẵn' : 'Presets'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presets.map((p) => {
              const active = equalizerPreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setEqualizerPreset(p.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                    active
                      ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span className="truncate">{language === 'vi' ? p.labelVi : p.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-BAND SLIDERS */}
        <div className="my-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between gap-2">
            {bands.map((band, idx) => (
              <div key={band.label} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-[10px] font-mono text-purple-400 font-bold">
                  {customBands[idx] > 0 ? `+${customBands[idx]}` : customBands[idx]} dB
                </span>
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={1}
                  value={customBands[idx]}
                  onChange={(e) => handleBandChange(idx, parseFloat(e.target.value))}
                  className="h-28 w-1.5 appearance-none bg-slate-800 rounded-lg accent-purple-500 cursor-pointer -rotate-180"
                  style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                />
                <span className="text-xs font-bold text-slate-200 mt-1">{band.label}</span>
                <span className="text-[10px] text-slate-500">{band.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PLAYBACK SPEED */}
        <div className="mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            {language === 'vi' ? 'Tốc độ phát' : 'Playback Speed'}
          </label>
          <div className="flex items-center gap-2">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackRate(speed)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  playbackRate === speed
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
