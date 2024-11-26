import React, { useState, useEffect, useRef } from "react";
import "./Music.css";

const Music: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleFirstClick = () => {
      if (audioRef.current && !hasClicked) {
        audioRef.current.play();
        setIsPlaying(true);
        setHasClicked(true);
      }
    };
    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, [hasClicked]);

  return (
    <div>
      <span onClick={togglePlayPause} className="music-toggle">
        {isPlaying ? "Click to pause music ♫" : "Click to play music ♫"}
      </span>
      <div id="wrap">
        <div id="album">
          <div id="cover">
            <div id="print"></div>
          </div>
          <div id="vinyl">
            <div id="print"></div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src="/audio/HBD.mp3" />
    </div>
  );
};

export default Music;
