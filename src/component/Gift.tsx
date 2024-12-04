import React, { useState, useEffect } from "react";
import "./css/Gift.css";

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



  const handleOpenGift = () => {
    setShowGif(true);
    const gifTimeout = setTimeout(() => {
      setShowGif(false);
      setShowVideo(true);
      setShowButton(true);
    }, 4000); // เปลี่ยนเป็นระยะเวลาที่ตรงกับ GIF จริง

    return () => clearTimeout(gifTimeout);
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

    </div>
  );
};

export default GiftBox;
