import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import "./css/lock.css";
import CardText from "./CardText";
import GiftBox from "./Gift";

interface UnlockProps {
  onUnlock: () => void;
}

const UnlockComponent: React.FC<UnlockProps> = ({ onUnlock }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showQuestionContainer, setShowQuestionContainer] = useState(true);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonMoving, setIsButtonMoving] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showStopButton, setShowStopButton] = useState(true);

  const navigate = useNavigate(); // สร้าง instance ของ useNavigate

  // ฟังก์ชันเพื่อไปที่หน้า AnimatedBirthdayMessage
  const handleViewMore = () => {
    setShowGiftBox(true);
    setShowQuestionContainer(false);
    navigate("/animated-birthday-message"); // นำทางไปที่หน้าข้อความแอนิเมชัน
  };

  const handleStopMovingButton = () => {
    setIsButtonDisabled(true);
    setIsButtonMoving(true);
    setMoveCount((prevCount) => prevCount + 1);
    setIsButtonClicked(true);

    setTimeout(() => {
      setShowStopButton(false);
    }, 2000);
  };

  const randomMovement = () => {
    if (isButtonMoving) {
      const randomX = Math.floor(Math.random() * 200) - 100;
      const randomY = Math.floor(Math.random() * 200) - 100;
      return {
        transform: `translate(${randomX}px, ${randomY}px)`,
      };
    }
    return {};
  };

  return (
    <div className="card">
      <CardText
        title="Happy Birthday!"
        message="อันนี้ที่เค้าทำเค้าตั้งใจทำมากๆเพื่อเธอเลยนะ เพราะวันนี้เป็นวันที่สำคัญของเธอเค้าอยากให้เธอได้อะไรที่สำคัญจากเค้า เค้าไม่เคยทำอะไรอย่างนี้เลย อยากให้เธอมีความสุขกับสิ่งที่เค้าทำให้นะ หวังว่าเธอจะชอบ จำได้มั้ยตอนถามว่าชอบแมว🐈‍⬛ หรือ คริสต์มาส☃️ เธอเลือกคริสต์มาส เค้าก็เลยเอาหิมะมาให้เธอให้อยู่ในธีมคริสต์มาส เค้าเริ่มทำวันนั้นแหละ 🎄❄️☃️🦌"
      />

      {showQuestionContainer && (
        <div className="button-container">
          <div className="question-container">
            อยากได้ของขวัญอีกมั้ย ?
          </div>

          <div className="button-group">
            <button
              className="continue-button"
              onClick={handleViewMore}
            >
              อยากได้อีก
            </button>
            {showStopButton && (
              <button
                className="stop-button"
                onClick={handleStopMovingButton}
                style={randomMovement()}
              >
                พอแล้ว
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlockComponent;
