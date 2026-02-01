import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCw, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const VideoModal = ({ isOpen, onClose }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Use a direct video URL that works with HTML5 video element
  // You can replace this with your actual demo video URL
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  
  // Alternative healthcare/donation related videos:
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          setError("Failed to play video");
        });
      }
      setPlaying(!playing);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    const videoContainer = document.querySelector('.video-container');
    if (!document.fullscreenElement && videoContainer) {
      videoContainer.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(total);
      if (total > 0) {
        setVideoProgress((current / total) * 100);
      }
    }
  };

  // Handle video ended
  const handleVideoEnded = () => {
    setPlaying(false);
    setVideoProgress(100);
  };

  // Handle loaded data
  const handleLoadedData = () => {
    setVideoLoaded(true);
    setLoading(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      // Auto play when loaded
      videoRef.current.play().catch(e => {
        console.error("Auto-play failed:", e);
        setPlaying(false);
      });
    }
  };

  // Handle video error
  const handleVideoError = (e) => {
    console.error("Video error:", e);
    setError("Failed to load video. Please check your connection.");
    setLoading(false);
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle seeking
  const handleSeek = (e) => {
    const seekPercentage = e.target.value;
    const seekTime = (seekPercentage / 100) * duration;
    if (videoRef.current && duration > 0) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      setVideoProgress(seekPercentage);
    }
  };

  // Skip forward/backward
  const skipTime = (seconds) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setVideoProgress((newTime / duration) * 100);
    }
  };

  // Reset video when modal closes
  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
      setVideoProgress(0);
      setCurrentTime(0);
      setVideoLoaded(false);
      setLoading(true);
      setError(null);
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch(e.key.toLowerCase()) {
        case ' ':
        case 'spacebar':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'escape':
          if (fullscreen) {
            toggleFullscreen();
          } else {
            onClose();
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          skipTime(-5);
          break;
        case 'arrowright':
          e.preventDefault();
          skipTime(5);
          break;
        case '0':
        case 'home':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
          }
          break;
        case 'end':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = duration;
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, fullscreen, playing, muted, duration]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Reset video when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetVideo();
    } else {
      // Reset states when opening
      setLoading(true);
      setVideoLoaded(false);
      setError(null);
    }
  }, [isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-lg transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`relative video-container ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl mx-4 md:mx-auto'} transition-all duration-300`}>
        {/* Video Container */}
        <div className="relative bg-black rounded-0 md:rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Element Container */}
          <div className="relative pt-[56.25%] bg-black">
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="absolute inset-0 w-full h-full object-contain"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onLoadedData={handleLoadedData}
              onError={handleVideoError}
              onCanPlay={() => setLoading(false)}
              playsInline
              preload="auto"
              muted={muted}
            />

            {/* Loading Overlay */}
            {(loading || !videoLoaded) && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                  </div>
                </div>
                <p className="mt-4 text-white/80 text-sm">Loading video...</p>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Video Error</h3>
                  <p className="text-gray-300 mb-6">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setLoading(true);
                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Play Button Overlay (shown when paused and video is loaded) */}
            {!playing && videoLoaded && !loading && !error && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-colors"></div>
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-10 w-10 md:h-12 md:w-12 text-white ml-2" fill="currentColor" />
                  </div>
                </div>
              </button>
            )}

            {/* Video Title Overlay */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    LifeStream Platform Demo
                  </h3>
                  <p className="text-emerald-300 text-xs md:text-sm">3 minutes</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/80 transition-colors"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Controls - Only show when video is loaded */}
          {videoLoaded && !error && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transition-opacity duration-300">
              {/* Progress Bar */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={videoProgress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-gray-700/80 rounded-lg appearance-none cursor-pointer 
                           [&::-webkit-slider-thumb]:appearance-none 
                           [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:w-4 
                           [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-emerald-500 
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:hover:scale-125
                           [&::-webkit-slider-thumb]:transition-transform
                           hover:[&::-webkit-slider-thumb]:bg-emerald-400"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls Bottom Row */}
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center space-x-3 md:space-x-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? (
                      <Pause className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <Play className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" />
                    )}
                  </button>

                  {/* Volume Control */}
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? (
                      <VolumeX className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </button>

                  {/* Time Display */}
                  <div className="text-white text-xs md:text-sm font-mono hidden sm:block">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Center Controls (Mobile Only) */}
                <div className="flex items-center space-x-4 md:hidden">
                  {/* 10s Back */}
                  <button
                    onClick={() => skipTime(-10)}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label="10 seconds back"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* 10s Forward */}
                  <button
                    onClick={() => skipTime(10)}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label="10 seconds forward"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-3 md:space-x-4">
                  {/* Restart Button */}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        setPlaying(true);
                        videoRef.current.play();
                      }
                    }}
                    className="text-white hover:text-emerald-400 transition-colors p-1 hidden md:block"
                    title="Restart"
                    aria-label="Restart video"
                  >
                    <RotateCw className="h-5 w-5 md:h-6 md:w-6" />
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <Maximize2 className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Hint (Desktop Only) */}
          <div className="absolute top-4 right-4 hidden md:block">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-xs text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd>
                  <span>Play/Pause</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">M</kbd>
                  <span>Mute</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info (Below video on desktop) */}
        {videoLoaded && !error && (
          <div className="hidden md:block mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-xl font-bold mb-3">About This Demo</h3>
            <p className="text-gray-300 mb-4">
              This video demonstrates how the LifeStream platform connects donors with recipients, 
              manages emergency requests, and streamlines the donation process to save lives efficiently.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-white font-bold text-lg">3 min</div>
                <div className="text-gray-400 text-sm">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">HD</div>
                <div className="text-gray-400 text-sm">Quality</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">EN</div>
                <div className="text-gray-400 text-sm">Audio</div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden fixed top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors z-50 shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Bottom Info */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <h3 className="text-white font-semibold mb-2">LifeStream Platform Demo</h3>
        <p className="text-gray-300 text-sm">
          Learn how our platform saves lives in 3 minutes
        </p>
      </div>
    </div>
  );
};

// Usage Component
const WatchDemoButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="group flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
      >
        <svg className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Watch Demo (3 min)</span>
      </button>

      <VideoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

// Hook for using the modal anywhere
export const useVideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const Modal = () => (
    <VideoModal isOpen={isOpen} onClose={closeModal} />
  );

  return { openModal, closeModal, Modal, isOpen };
};

export default VideoModal;
export { WatchDemoButton };