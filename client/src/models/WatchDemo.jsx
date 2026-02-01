import React, { useState, useEffect, useRef } from "react";
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize2, 
  RotateCw, ChevronLeft, ChevronRight, Loader2, 
  ExternalLink, Youtube, Film, Globe
} from "lucide-react";

const VideoModal = ({ 
  isOpen, 
  onClose,
  videoSource = "youtube", // "youtube", "vimeo", "html5", "url"
  videoUrl = "https://youtu.be/A_Cm56WIp48",
  videoTitle = "JeevanDaan Platform Demo",
  videoDescription = "Learn how our platform connects donors with recipients efficiently",
  customThumbnail = null,
  autoPlay = true
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoType, setVideoType] = useState("youtube");
  const videoRef = useRef(null);
  const youtubeRef = useRef(null);

  // Parse video URL to determine type
  useEffect(() => {
    if (!videoUrl) return;

    const url = videoUrl.toLowerCase();
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setVideoType("youtube");
    } else if (url.includes('vimeo.com')) {
      setVideoType("vimeo");
    } else if (url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i)) {
      setVideoType("html5");
    } else {
      setVideoType("url");
    }
  }, [videoUrl]);

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Extract Vimeo ID
  const getVimeoId = (url) => {
    const regExp = /(?:vimeo\.com\/)(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Handle play/pause for all video types
  const togglePlay = () => {
    if (videoType === "youtube" && youtubeRef.current) {
      if (playing) {
        youtubeRef.current.pauseVideo();
      } else {
        youtubeRef.current.playVideo();
      }
    } else if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          setError("Failed to play video");
        });
      }
    }
    setPlaying(!playing);
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (videoType === "youtube" && youtubeRef.current) {
      if (muted) {
        youtubeRef.current.unMute();
      } else {
        youtubeRef.current.mute();
      }
    } else if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted(!muted);
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

  // YouTube API ready
  const onYouTubeReady = (event) => {
    setLoading(false);
    setVideoLoaded(true);
    setDuration(event.target.getDuration());
    
    if (autoPlay) {
      event.target.playVideo();
    }
  };

  // YouTube state change
  const onYouTubeStateChange = (event) => {
    // YouTube player states:
    // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: video cued
    if (event.data === 1) {
      setPlaying(true);
    } else if (event.data === 2) {
      setPlaying(false);
    } else if (event.data === 0) {
      setPlaying(false);
      setVideoProgress(100);
    }
  };

  // YouTube time update
  const onYouTubeTimeUpdate = () => {
    if (youtubeRef.current) {
      const current = youtubeRef.current.getCurrentTime();
      const total = youtubeRef.current.getDuration();
      setCurrentTime(current);
      setDuration(total);
      if (total > 0) {
        setVideoProgress((current / total) * 100);
      }
    }
  };

  // HTML5 video time update
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
      if (autoPlay) {
        videoRef.current.play().catch(e => {
          console.error("Auto-play failed:", e);
          setPlaying(false);
        });
      }
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

  // Handle seeking for HTML5
  const handleSeek = (e) => {
    const seekPercentage = e.target.value;
    const seekTime = (seekPercentage / 100) * duration;
    
    if (videoType === "youtube" && youtubeRef.current) {
      youtubeRef.current.seekTo(seekTime, true);
    } else if (videoRef.current && duration > 0) {
      videoRef.current.currentTime = seekTime;
    }
    
    setCurrentTime(seekTime);
    setVideoProgress(seekPercentage);
  };

  // Skip forward/backward
  const skipTime = (seconds) => {
    if (videoType === "youtube" && youtubeRef.current) {
      const newTime = Math.max(0, Math.min(duration, youtubeRef.current.getCurrentTime() + seconds));
      youtubeRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    } else if (videoRef.current && duration > 0) {
      const newTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    
    if (duration > 0) {
      setVideoProgress((currentTime / duration) * 100);
    }
  };

  // Reset video when modal closes
  const resetVideo = () => {
    if (videoType === "youtube" && youtubeRef.current) {
      youtubeRef.current.stopVideo();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    setPlaying(false);
    setVideoProgress(0);
    setCurrentTime(0);
    setVideoLoaded(false);
    setLoading(true);
    setError(null);
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
          skipTime(-currentTime);
          break;
        case 'end':
          e.preventDefault();
          skipTime(duration - currentTime);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, fullscreen, playing, muted, duration, currentTime]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Load YouTube API
  useEffect(() => {
    if (videoType === "youtube" && isOpen) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        if (!youtubeRef.current) {
          const player = new window.YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: getYouTubeId(videoUrl),
            playerVars: {
              'autoplay': autoPlay ? 1 : 0,
              'modestbranding': 1,
              'rel': 0,
              'showinfo': 0,
              'controls': 0,
              'disablekb': 1,
              'enablejsapi': 1,
              'origin': window.location.origin
            },
            events: {
              'onReady': onYouTubeReady,
              'onStateChange': onYouTubeStateChange,
              'onError': () => setError("Failed to load YouTube video")
            }
          });
          youtubeRef.current = player;
        }
      };

      // Set interval for time updates
      const interval = setInterval(() => {
        if (youtubeRef.current && playing) {
          onYouTubeTimeUpdate();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        if (youtubeRef.current) {
          youtubeRef.current.destroy();
          youtubeRef.current = null;
        }
      };
    }
  }, [videoType, isOpen, videoUrl, autoPlay]);

  // Reset video when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetVideo();
    } else {
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
      if (youtubeRef.current) {
        youtubeRef.current.destroy();
      }
    };
  }, []);

  // Render video source based on type
  const renderVideoSource = () => {
    switch(videoType) {
      case "youtube":
        const videoId = getYouTubeId(videoUrl);
        return (
          <div className="absolute inset-0 w-full h-full">
            <div id="youtube-player" className="w-full h-full"></div>
          </div>
        );
      
      case "vimeo":
        const vimeoId = getVimeoId(videoUrl);
        return (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}&controls=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              setLoading(false);
              setVideoLoaded(true);
            }}
          />
        );
      
      case "html5":
        return (
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
        );
      
      default:
        return (
          <iframe
            src={videoUrl}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={() => {
              setLoading(false);
              setVideoLoaded(true);
            }}
          />
        );
    }
  };

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
          {/* Video Type Indicator */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              {videoType === "youtube" && <Youtube className="h-4 w-4 text-red-500" />}
              {videoType === "vimeo" && <Film className="h-4 w-4 text-blue-400" />}
              {videoType === "html5" && <Play className="h-4 w-4 text-emerald-400" />}
              {videoType === "url" && <Globe className="h-4 w-4 text-purple-400" />}
              <span className="text-white text-xs font-medium">
                {videoType.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Video Element Container */}
          <div className="relative pt-[56.25%] bg-black">
            {renderVideoSource()}

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
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setError(null);
                        setLoading(true);
                        if (videoType === "youtube" && youtubeRef.current) {
                          youtubeRef.current.loadVideoById(getYouTubeId(videoUrl));
                        } else if (videoRef.current) {
                          videoRef.current.load();
                        }
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => window.open(videoUrl, '_blank')}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Directly
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Play Button Overlay */}
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
                  <button
                    onClick={() => skipTime(-10)}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label="10 seconds back"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="text-xs ml-1">10s</span>
                  </button>
                  <button
                    onClick={() => skipTime(10)}
                    className="text-white hover:text-emerald-400 transition-colors p-1"
                    aria-label="10 seconds forward"
                  >
                    <span className="text-xs mr-1">10s</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-3 md:space-x-4">
                  {/* Restart Button */}
                  <button
                    onClick={() => {
                      if (videoType === "youtube" && youtubeRef.current) {
                        youtubeRef.current.seekTo(0, true);
                        youtubeRef.current.playVideo();
                      } else if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                      setPlaying(true);
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

          {/* Keyboard Shortcuts Hint */}
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
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">← →</kbd>
                  <span>Seek</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        {videoLoaded && !error && (
          <div className="hidden md:block mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white text-xl font-bold mb-1">{videoTitle}</h3>
                <p className="text-gray-300 text-sm">{videoDescription}</p>
              </div>
              <button
                onClick={() => window.open(videoUrl, '_blank')}
                className="flex items-center gap-2 text-white hover:text-emerald-300 transition-colors px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">Open</span>
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="text-white font-bold">{formatTime(duration)}</div>
                <div className="text-gray-400 text-sm">Duration</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-white font-bold">{videoType.toUpperCase()}</div>
                <div className="text-gray-400 text-sm">Source</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-white font-bold">HD</div>
                <div className="text-gray-400 text-sm">Quality</div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden fixed top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors z-50 shadow-lg"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Bottom Info */}
      {videoLoaded && !error && (
        <div className="md:hidden fixed bottom-6 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-1">{videoTitle}</h3>
          <p className="text-gray-300 text-sm mb-3">{videoDescription}</p>
          <button
            onClick={() => window.open(videoUrl, '_blank')}
            className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">Open in {videoType === "youtube" ? "YouTube" : "New Tab"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Usage Component with multiple video source options
const WatchDemoButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState("youtube");

  const videoOptions = [
    {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/embed/xcJtL7QggTI", // Your YouTube URL
      icon: <Youtube className="h-5 w-5" />,
      color: "text-red-500"
    },
    {
      id: "html5",
      name: "Direct Video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      icon: <Film className="h-5 w-5" />,
      color: "text-blue-500"
    }
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setModalOpen(true)}
          className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Watch Demo (3 min)</span>
        </button>

        <div className="flex gap-2 justify-center">
          {videoOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedSource(option.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedSource === option.id 
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className={option.color}>{option.icon}</span>
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      <VideoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        videoSource={selectedSource}
        videoUrl={videoOptions.find(o => o.id === selectedSource)?.url}
        videoTitle="JeevanDaan Platform Demo"
        videoDescription="See how we connect donors with recipients to save lives efficiently"
        autoPlay={true}
      />
    </>
  );
};

// Hook for using the modal anywhere
export const useVideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const openModal = (props = {}) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalProps({});
  };

  const Modal = () => (
    <VideoModal 
      isOpen={isOpen} 
      onClose={closeModal} 
      {...modalProps}
    />
  );

  return { openModal, closeModal, Modal, isOpen };
};

export default VideoModal;
export { WatchDemoButton };