import React from 'react';

interface StickyFilterBarProps {
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  selectedFormat: string;
  onSelectFormat: (fmt: string) => void;
}

const LANGUAGES = ['Tất cả', 'Phụ đề', 'Lồng tiếng', 'Tiếng Việt', 'Tiếng Anh', 'Tiếng Hàn'];
const FORMATS = ['Tất cả', '2D', '3D', 'IMAX', '4DX', 'ScreenX'];

export const StickyFilterBar: React.FC<StickyFilterBarProps> = ({
  selectedLanguage,
  onSelectLanguage,
  selectedFormat,
  onSelectFormat,
}) => {
  return (
    <div className="relative w-full bg-[#15151A] py-3.5 mb-8 border-y border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
        {/* Language Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] text-[#A8A8B3] uppercase tracking-wider shrink-0 mr-1 font-bold">
            Ngôn ngữ:
          </span>
          {LANGUAGES.map((lang) => {
            const isActive = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => onSelectLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#E50914] text-white shadow-[0_0_10px_rgba(229,9,20,0.4)]'
                    : 'bg-[#1F1F23] text-[#A8A8B3] hover:text-white hover:bg-[#2A292E]'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>

        {/* Format Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] text-[#A8A8B3] uppercase tracking-wider shrink-0 mr-1 font-bold">
            Định dạng:
          </span>
          {FORMATS.map((fmt) => {
            const isActive = selectedFormat === fmt;
            return (
              <button
                key={fmt}
                onClick={() => onSelectFormat(fmt)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#E50914] text-white shadow-[0_0_10px_rgba(229,9,20,0.4)]'
                    : 'bg-[#1F1F23] text-[#A8A8B3] hover:text-white hover:bg-[#2A292E]'
                }`}
              >
                {fmt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
