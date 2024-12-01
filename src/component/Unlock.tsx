import React, { useState } from "react";
import Swal from "sweetalert2";
import CardText from "./CardText"; // นำเข้า CardText แทน Card
import GiftBox from "./Gift";
import "./lock.css";

interface UnlockProps {
  onUnlock: () => void;
}

const UnlockComponent: React.FC<UnlockProps> = ({ onUnlock }) => {
  const [isUnlocked, setIsUnlocked] = useState(false); // เช็คสถานะของการ Unlock
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [showGiftBox, setShowGiftBox] = useState(false); // สถานะสำหรับแสดง GiftBox
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // ใช้สำหรับปุ่ม "พอแค่นี้"
  const [isButtonMoving, setIsButtonMoving] = useState(false); // สถานะการขยับปุ่มเมื่อกด
  const [moveCount, setMoveCount] = useState(0); // นับจำนวนการกดปุ่ม
  const [showQuestionContainer, setShowQuestionContainer] = useState(true); // สถานะสำหรับแสดงคำถาม

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, [field]: value });

    if (value.length === 1) {
      const nextInputId = `input-${parseInt(field.slice(-1)) + 1}`;
      const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleUnlock = () => {
    if (
      inputValues.input1.toLowerCase() === "m" &&
      inputValues.input2.toLowerCase() === "i" &&
      inputValues.input3.toLowerCase() === "n" &&
      inputValues.input4.toLowerCase() === "t"
    ) {
      setIsUnlocked(true); // เมื่อปลดล็อกสำเร็จ ตั้งค่า isUnlocked เป็น true
      onUnlock(); // Notify parent component
      Swal.fire({
        title: "เก่งมากก ถูกต้องแล้ว",
        text: "Happy Birthday mint!",
        imageUrl:
          "https://media.giphy.com/media/HIh3Bjd9edbvzPnOYg/giphy.gif?cid=ecf05e4778va817m7ak53bxrztib6yqmyu3ptkk09ybpvh5u&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Gift Icon",
        confirmButtonText: "Yay!",
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "โอ้ย ไม่ใช่",
        text: "ลองใส่ใหม่!",
        imageUrl:
          "https://media.giphy.com/media/OOezqqxPB8aJ2/giphy.gif?cid=ecf05e47z74e96uxz038p2jtnxfphrzn9d3r52ti0n04aiwi&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Angry Icon",
        confirmButtonText: "NOOOO!",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        // รีเซ็ตค่า input ทั้งหมดเมื่อใส่ผิด
        setInputValues({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        });
        // โฟกัสไปที่ช่องแรก
        const firstInput = document.getElementById("input-1") as HTMLInputElement;
        if (firstInput) firstInput.focus();
      });
    }
  };

  const handleViewMore = () => {
    setShowGiftBox(true); // แสดง GiftBox
    setShowQuestionContainer(false); // ซ่อนคำถามเมื่อกด "ดูต่อ"
  };

  const handleStopMovingButton = () => {
    setIsButtonDisabled(true); // เมื่อกดปุ่ม "พอแค่นี้" จะหยุดการขยับ
    setIsButtonMoving(true); // เริ่มขยับปุ่มเมื่อกด
    setMoveCount((prevCount) => prevCount + 1); // เพิ่มการนับการกดปุ่ม
  };

  const randomMovement = () => {
    if (isButtonMoving) {
      const randomX = Math.floor(Math.random() * 200) - 100; // ขยับในระยะ -100 ถึง 100
      const randomY = Math.floor(Math.random() * 200) - 100;
      return {
        transform: `translate(${randomX}px, ${randomY}px)`,
      };
    }
    return {};
  };

  return (
    <div>
      <div className="input-box">
        {["input1", "input2", "input3", "input4"].map((field, index) => (
          <input
            key={index}
            id={`input-${index + 1}`}
            type="text"
            value={inputValues[field as keyof typeof inputValues]}
            onChange={(e) => handleInputChange(e, field)}
            className="input-field"
            maxLength={1}
          />
        ))}
      </div>
      <button
        className="unlock-button"
        onClick={handleUnlock}
        disabled={!(inputValues.input1 && inputValues.input2 && inputValues.input3 && inputValues.input4)}
      >
        <div className="unlock-container">
          <img
            className="unlock-icon"
            src="https://cdn-icons-png.flaticon.com/512/5951/5951623.png"
            alt="Unlock Icon"
          />
          <h6>Unlock gift</h6>
        </div>
      </button>

      <div className="card">
        {isUnlocked && (
          <>
            <CardText
              title="Happy Birthday!"
              message="อันนี้ที่เค้าทำเค้าตั้งใจทำมากๆเพื่อเธอเลยนะ เพราะวันนี้เป็นวันที่สำคัญของเธอเค้าอยากให้เธอได้อะไรที่สำคัญจากเค้า เค้าไม่เคยทำอะไรอย่างนี้เลย อยากให้เธอมีความสุขกับสิ่งที่เค้าทำให้นะ หวังว่าเธอจะชอบ จำได้มั้ยตอนถามว่าชอบแมว🐈‍⬛ หรือ คริสต์มาส☃️ เธอเลือกคริสต์มาส เค้าก็เลยเอาหิมะมาให้เธอให้อยู่ในธีมคริสต์มาส เค้าเริ่มทำวันนั้นแหละ 🎄❄️☃️🦌"
            />

            {/* ปุ่มที่ปรากฏหลังจากการปลดล็อก */}
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
                  <button
                    className="stop-button"
                    onClick={handleStopMovingButton}
                    style={randomMovement()}
                  >
                    พอแล้ว
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="giftbox">
        {/* เมื่อกด "ดูต่อ" จะแสดงกล่องของขวัญ */}
        {showGiftBox && (
          <GiftBox
            onClose={() => console.log("Gift Box Closed")} // ตัวอย่าง: สามารถเพิ่มฟังก์ชันเพิ่มเติมได้
          />
        )}
      </div>
    </div>
  );
};

export default UnlockComponent;
