import React, { createContext, useContext, useState } from 'react';
import { Video, VideoContextType } from '../types';

const VideoContext = createContext<VideoContextType>({
  videos: [],
  addVideo: () => {},
});

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within VideoProvider');
  }
  return context;
};

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  const addVideo = (video: Video) => {
    setVideos((prev) => [...prev, video]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};