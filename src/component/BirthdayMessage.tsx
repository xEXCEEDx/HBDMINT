import React, { useState, useEffect, useRef } from "react";
import "./css/BirthdayMessage.css"; // For CSS animation
import "./css/Gift.css";

const messages = [
  "ปีนี้อายุ 23 แล้ว โตขึ้นมากเลยนะ",
  "ขอให้ปีนี้เป็นปีที่เต็มไปด้วยความสุขและความสำเร็จ",
  "ขอให้ทุกอย่างที่ทำมีแต่ความราบรื่นไม่มีอุปสรรคหรืออะไรที่เครียดนะคะ",
  "ขอให้ร่างกายแข็งแรงและสดใสไปตลอด",
  "และอะไรที่มันไม่ดีก็ให้ผ่านไปนะ ที่ผ่านมาได้ก็เก่งแล้ว",
  "ต่อไปนี้ก็ยิ้มให้เยอะๆ ʕᵔᴥᵔʔ",
  "และก็ขอให้ช่วงฝึกงานผ่านไปด้วยดีไม่ให้มีอะไรต้องกังวลนะ",
  "และสามารถประสบความสำเร็จในทุกๆ อย่างที่ตั้งใจจะทำนะคะ☃️❄️🎄🎁",
  "ดีใจที่ได้อยู่ด้วยกันในตอนนี้",
  "ถึงแม้ที่ทำให้จะไม่ได้มีอะไรมากมาย แต่ตั้งใจทำให้นะ",
  "จะอยู่ข้างๆเธอตลอดนะ ",
  "เค้าจะเป็นกำลังใจให้เธอเสมอ 💖",
  "♡แฮปปี้เบิร์ดเดย์นะคะ♡"
];

const AnimatedBirthdayMessage: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showVideo, setShowVideo] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenGift = () => {
    setShowGiftBox(false); // ซ่อนกล่องของขวัญเมื่อกด
    setShowGif(true);
    const gifTimeout = setTimeout(() => {
      setShowGif(false);
      setShowMessage(true); // เริ่มแสดงข้อความหลังจาก GIF หมด
    }, 5000); // ระยะเวลาในการแสดง GIF

    return () => clearTimeout(gifTimeout);
  };

  useEffect(() => {
    if (showMessage) {
      if (currentMessageIndex < messages.length) {
        const timeout = setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => prevIndex + 1);
        }, 4000); // เปลี่ยนข้อความทุก 4 วินาที

        return () => clearTimeout(timeout);
      } else {
        setShowCountdown(true);
      }
    }
  }, [currentMessageIndex, showMessage]);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000); // การนับถอยหลังทุก 1 วินาที

      return () => clearInterval(interval);
    } else if (countdown === 0) {
      setShowVideo(true);
    }
  }, [showCountdown, countdown]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.08; // ปรับความดังของเสียงให้เหลือ 20%
      audioRef.current.loop = true; // เล่นเพลงใน loop
      audioRef.current.play();
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio/blue.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="background-decoration">
        <img src="/photo/catsleep.png" alt="Cat Sleep" className="cat1" />
        <img src="/photo/catsleep2.png" alt="Cat Sleep 2" className="cat2" />
        <img src="/photo/chicat.png" alt="Chicat" className="cat3" />
        <img src="/photo/catsnow.png" alt="snow" className="catsnow" />
      </div>
      <div className="gift-box">
        {/* กล่องของขวัญ */}
        {showGiftBox && (
          <img
            src="giftt.png"
            alt="Gift Box"
            className={`gift-image ${!showGiftBox ? "hidden" : ""}`}
            onClick={handleOpenGift} />
        )}

        {/* กล่องของขวัญแบบอนิเมชั่น */}
        {showGif && (
          <img
            src="gift.gif"
            alt="Opening Gift"
            className="gif-animation"
            onLoad={() => console.log("GIF loaded")} />
        )}

        {/* ส่วนสำหรับข้อความและวิดีโอ */}
        <div className="animated-birthday-container">
          {showMessage && !showCountdown && !showVideo && (
            <div className="message">{messages[currentMessageIndex]}</div>
          )}

          {showCountdown && !showVideo && (
            <div className="countdown">{countdown}</div>
          )}

          {showVideo && (
           <video
           controls
           className="gift-video"
           onEnded={() => console.log("Video ended")}
           onPlay={() => {
             if (audioRef.current) {
               audioRef.current.pause(); // หยุดเพลงเมื่อวีดีโอเริ่มเล่น
             }
           }}
         >
           <source src="/audio/LOVE.mp4" type="video/mp4" />
           Your browser does not support the video tag.
         </video>
         
          )}
        </div>
      </div>
    </>
  );
};

export default AnimatedBirthdayMessage;
