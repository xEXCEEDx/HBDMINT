import React, { useState, useEffect } from "react";
import "./Gift.css";

interface GiftBoxProps {
  onClose: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onClose }) => {
  const [showGif, setShowGif] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);  // สถานะสำหรับปุ่ม
  const [messageContent, setMessageContent] = useState<string[]>([]);
  const [messageLoaded, setMessageLoaded] = useState(false);

  const message = [
    "🎉 แฮปปี้เบิร์ดเดย์นะคะ 🎉",
    "🎉 แฮปปี้เบิร์ดเดย์นะคะ 🎉",
    "ปีนี้อายุ 23 แล้ว โตขึ้นมากเลยนะ ขอให้ปีนี้เป็นปีที่เต็มไปด้วยความสุขและความสำเร็จ ขอให้ทุกอย่างที่ทำมีแต่ความราบรื่น ไม่มีอุปสรรคหรืออะไรที่เครียดๆนะคะ ขอให้ร่างกายแข็งแรงและสดใสไปตลอด และอะไรที่มันไม่ดีก็ให้ผ่านไปนะ ผ่านมาได้ก็เก่งแล้ว ต่อไปนี้ก็ยิ้มให้เยอะๆ และก็ขอให้ช่วงฝึกงานผ่านไปด้วยดีไม่ให้มีอะไรต้องเครียดนะ และสามารถประสบความสำเร็จในทุกๆ อย่างที่ตั้งใจจะทำนะคะ🎄❄️☃️🎁",
    "ดีใจที่ได้อยู่ด้วยกันในตอนนี้นะคะ ถึงแม้ที่ทำให้จะไม่ได้มีอะไรมากมาย แต่ตั้งใจทำให้นะ เป็นกำลังใจให้กันเสมอ 💖"
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
          setMessageLoaded(true);  // ตั้งค่าการโหลดข้อความเสร็จ
        }
      }, 1000);  // เพิ่มข้อความทุก 1 วินาที

      return () => clearInterval(interval);
    }
  }, [showMessage, messageLoaded]); // ใช้ `showMessage` และ `messageLoaded` เป็น dependency

  const handleOpenGift = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowGif(false);
      setShowVideo(true);
      setShowButton(true); // เปิดปุ่มหลังจากแสดง gif และวิดีโอ
    }, 4000);  // รอให้ GIF เล่นเสร็จก่อนแล้วค่อยแสดงวิดีโอ
  };

  const toggleMessages = () => {
    setShowMessage((prev) => !prev);
    if (!showMessage) {
      setMessageContent([]);  // รีเซ็ตข้อความเมื่อเปิดใหม่
      setMessageLoaded(false);  // รีเซ็ตการโหลดข้อความ
    }
  };

  return (
    <div className="gift-box">
      {/* แสดงกล่องของขวัญหากยังไม่ได้เปิด */}
      {!showGif && !showVideo && (
        <img
          src="https://i.ibb.co/kGCLg22/gift-box.png"
          alt="Gift Box"
          className="gift-image"
          onClick={handleOpenGift}
        />
      )}

      {/* แสดง gif เมื่อเปิดกล่องของขวัญ */}
      {showGif && (
        <img
          src="https://i.ibb.co/rQrBG22/Gift-Box-Explode.gif"
          alt="Opening Gift"
          className="gif-animation"
        />
      )}
      {/* ปุ่มเพื่อเปิดข้อความ */}
      {showButton && (
        <button className="toggle-button" onClick={toggleMessages}>
          {showMessage ? "ปิดข้อความ❄️" : "เปิดข้อความ☃️"}
        </button>
      )}

      {/* แสดงข้อความก่อนแสดงวิดีโอ */}
      {showMessage && (
        <div className="gift-message-container">
          <div className="gift-message">
            {messageContent.map((msg, index) => (
              <p key={index} className="message-content show">
                {msg}
              </p>
            ))}
          </div>
          <img src="https://media.tenor.com/J6xumGwaxh8AAAAi/flowers-flower.gif" alt="" />
        </div>
      )}


      {/* แสดงวิดีโอหลังจาก gif หมดแล้ว */}
      {showVideo && (
        <div className="video-container">
          <video controls className="gift-video">
            <source src="/audio/vdo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default GiftBox;
