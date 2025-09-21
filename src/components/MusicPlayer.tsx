import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      console.log('Music player initialized with volume:', volume);
    }
  }, [volume]);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        console.log('Music paused');
      } else {
        audioRef.current.play().then(() => {
          console.log('Music playing successfully');
        }).catch(error => {
          console.error('Failed to play music:', error);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.error('Audio element not found');
    }
  };
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  return <div className="fixed bottom-20 right-4 z-50">
      
    </div>;
};
export default MusicPlayer;