import React, { useState } from 'react';
import { X, Clock, Moon, Check, AlertCircle } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const SleepTimerModal: React.FC = () => {
  const {
    isSleepTimerOpen,
    setIsSleepTimerOpen,
    sleepTimerRemaining,
    setSleepTimer,
    language,
  } = useMusic();

  const [customMin, setCustomMin] = useState<string>('20');

  if (!isSleepTimerOpen) return null;

  const presets = [15, 30, 45, 60];

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleApplyCustom = () => {
    const val = parseInt(customMin, 10);
    if (!isNaN(val) && val > 0) {
      setSleepTimer(val);
      setIsSleepTimerOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'vi' ? 'Hẹn giờ tắt nhạc' : 'Sleep Timer'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'vi' ? 'Tự động dừng phát sau khoảng thời gian' : 'Automatically stops playback'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSleepTimerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status if active */}
        {sleepTimerRemaining !== null && (
          <div className="my-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
              <Clock className="w-4 h-4 animate-spin-slow" />
              <span>
                {language === 'vi' ? 'Đang đếm ngược:' : 'Countdown:'} {formatCountdown(sleepTimerRemaining)}
              </span>
            </div>
            <button
              onClick={() => setSleepTimer(null)}
              className="text-xs text-rose-300 underline font-bold hover:text-white"
            >
              {language === 'vi' ? 'Hủy bỏ' : 'Cancel'}
            </button>
          </div>
        )}

        {/* Preset buttons */}
        <div className="my-4 space-y-2">
          {presets.map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setSleepTimer(mins);
                setIsSleepTimerOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition text-sm font-medium text-slate-200"
            >
              <span>{mins} {language === 'vi' ? 'phút' : 'minutes'}</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="pt-2 border-t border-slate-800">
          <label className="text-xs text-slate-400 block mb-2 font-medium">
            {language === 'vi' ? 'Hoặc nhập số phút tùy ý:' : 'Or custom minutes:'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={360}
              value={customMin}
              onChange={(e) => setCustomMin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={handleApplyCustom}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl transition shrink-0"
            >
              {language === 'vi' ? 'Đặt' : 'Set'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
