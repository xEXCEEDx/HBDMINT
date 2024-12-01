import React, { useState, useEffect } from "react";
import "./Gift.css";

interface GiftBoxProps {
  onClose: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onClose }) => {
  const [showGif, setShowGif] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [messageContent, setMessageContent] = useState<string[]>([]);
  const [messageLoaded, setMessageLoaded] = useState(false);

  const message = [
    "🎉 แฮปปี้เบิร์ดเดย์นะคะ 🎉",
    "🎉 แฮปปี้เบิร์ดเดย์นะคะ 🎉",
    "ปีนี้อายุ 23 แล้ว โตขึ้นมากเลยนะ ขอให้ปีนี้เป็นปีที่เต็มไปด้วยความสุขและความสำเร็จ ขอให้ทุกอย่างที่ทำมีแต่ความราบรื่นไม่มีอุปสรรคหรือความเครียดนะคะ ขอให้ร่างกายแข็งแรงและสดใสไปตลอด  และอะไรที่มันไม่ดีก็ให้ผ่านไป นะ ผ่านมาได้ก็เก่งแล้ว ต่อไปนี้ก็ยิ้มให้เยอะๆ และก็ขอให้ช่วงฝึกงานผ่านไปด้วยดีไม่ให้มีอะไรต้องเครียดนะ และสามารถประสบความสำเร็จในทุกๆ อย่างที่ตั้งใจจะทำนะคะ☃️❄️🎄🎁",
    "ดีใจที่ได้อยู่ด้วยกันในตอนนี้นะคะ ถึงแม้ที่ทำให้จะไม่ได้มีอะไรมากมาย แต่ตั้งใจทำให้นะ เป็นกำลังใจให้เสมอ 💖",
  ];

  useEffect(() => {
    if (showMessage && !messageLoaded) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.length) {
          setMessageContent((prev) => [...prev, message[index]]);
          index++;
        } else {
          clearInterval(interval);
          setMessageLoaded(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showMessage, messageLoaded]);

  const handleOpenGift = () => {
    setShowGif(true);
    const gifTimeout = setTimeout(() => {
      setShowGif(false);
      setShowVideo(true);
      setShowButton(true);
    }, 5000); // เปลี่ยนเป็นระยะเวลาที่ตรงกับ GIF จริง

    return () => clearTimeout(gifTimeout);
  };

  const toggleMessages = () => {
    setShowMessage((prev) => !prev);
    if (!showMessage) {
      setMessageContent([]);
      setMessageLoaded(false);
    }
  };

  return (
    <div className="gift-box">
      {/* กล่องของขวัญ */}
      {!showGif && !showVideo && (
        <img
          src="giftt.png"
          alt="Gift Box"
          className="gift-image"
          onClick={handleOpenGift}
        />
      )}

      {/* แอนิเมชันเปิดกล่อง */}
      {showGif && (
        <img
          src="gift.gif"
          alt="Opening Gift"
          className="gif-animation"
          onLoad={() => console.log("GIF loaded")}
        />
      )}

      {/* ปุ่มแสดงข้อความ */}
      {showButton && (
        <button className="toggle-button" onClick={toggleMessages}>
          {showMessage ? "ปิดข้อความ❄️" : "เปิดข้อความ☃️"}
        </button>
      )}

      {/* ข้อความ */}
      {showMessage && (
        <div className="gift-message-container">
          <div className="gift-message">
            {messageContent.map((msg, index) => (
              <p key={index} className="message-content show">
                {msg}
              </p>
            ))}
          </div>
          <img
            src="https://media.tenor.com/J6xumGwaxh8AAAAi/flowers-flower.gif"
            alt="Flower Animation"
          />
        </div>
      )}

      {/* วิดีโอ */}
      {showVideo && (
        <div className="video-container">
          <video
            controls
            className="gift-video"
            onEnded={() => console.log("Video ended")}
          >
            <source src="/audio/vdo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default GiftBox;
