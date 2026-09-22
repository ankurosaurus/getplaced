import React from 'react';
import { X } from 'lucide-react';

export const VideoModal = ({ isOpen, onClose, videoUrl, videoTitle }) => {
  if (!isOpen || !videoUrl) return null;

  // Format youtube embed URL if standard watch or youtu.be link
  let embedUrl = videoUrl;
  try {
    if (videoUrl.includes('youtu.be/')) {
      const parts = videoUrl.split('youtu.be/')[1].split('?');
      const videoId = parts[0];
      const params = parts[1] ? `?${parts[1].replace('t=', 'start=')}` : '';
      embedUrl = `https://www.youtube.com/embed/${videoId}${params}`;
    } else if (videoUrl.includes('youtube.com/watch')) {
      const urlObj = new URL(videoUrl);
      const videoId = urlObj.searchParams.get('v');
      const time = urlObj.searchParams.get('t');
      embedUrl = `https://www.youtube.com/embed/${videoId}${time ? `?start=${time}` : ''}`;
    }
  } catch (e) {
    embedUrl = videoUrl;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-lexend font-bold text-sm sm:text-base text-zinc-900 dark:text-white truncate">
            {videoTitle || 'Video Solution Walkthrough'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={videoTitle || 'Video Solution'}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
