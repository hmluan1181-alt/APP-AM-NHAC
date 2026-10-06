import React, { useState } from 'react';
import { X, ListPlus, FolderPlus } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose }) => {
  const { createPlaylist, setSelectedPlaylistId, setCurrentTab, language } = useMusic();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newId = createPlaylist(title, description);
    setSelectedPlaylistId(newId);
    setCurrentTab('playlist-detail');
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'vi' ? 'Tạo danh sách phát mới' : 'Create New Playlist'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'vi' ? 'Tạo bộ sưu tập âm nhạc của riêng bạn' : 'Organize your favorite music'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              {language === 'vi' ? 'Tên danh sách phát *' : 'Playlist Name *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'vi' ? 'VD: Nhạc Chill Buổi Sáng, Giai Điệu Yêu Thích...' : 'e.g. Chill Morning, Best Hits...'}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              {language === 'vi' ? 'Mô tả (tùy chọn)' : 'Description (optional)'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'vi' ? 'Ghi chú về danh sách phát này...' : 'Describe what this playlist is for...'}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              {language === 'vi' ? 'Hủy' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-lg shadow-rose-500/25 hover:opacity-95 disabled:opacity-50 transition"
            >
              {language === 'vi' ? 'Tạo ngay' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
