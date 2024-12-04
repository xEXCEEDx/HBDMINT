import React, { useState } from "react";
import Swal from "sweetalert2";
import "./css/Birthday.css";
import Snowfall from "react-snowfall";

interface BirthdayUnlockPageProps {
  onUnlock: () => void;
}

const BirthdayUnlockPage: React.FC<BirthdayUnlockPageProps> = ({ onUnlock }) => {
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const [isUnlocked, setIsUnlocked] = useState(false);

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
      Swal.fire({
        title: "เก่งมากก ถูกต้องแล้ว",
        text: "Happy Birthday mint!",
        imageUrl:
          "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmNrY2R2NGJwaGE3bDZhd2t3a2E1bTVqbWZ3eWpqbzZra2ViaXVuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l9fVX1zfHYGd4rIk47/giphy.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Gift Icon",
        confirmButtonText: "Yay!",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        setIsUnlocked(true);
        onUnlock(); // Call the callback function to notify that unlocking is complete
      });
    } else {
      Swal.fire({
        title: "โอ้ย ไม่ใช่",
        text: "ลองใส่ใหม่!",
        imageUrl:
          "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDA0NWM1c2JyNHZlMTk3YzU5YWUwdGgwM2FuNHk1M2FxenJ1NWd0YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nR4L10XlJcSeQ/giphy.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Angry Icon",
        confirmButtonText: "NOOOO!",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        setInputValues({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        });
        const firstInput = document.getElementById("input-1") as HTMLInputElement;
        if (firstInput) firstInput.focus();
      });
    }
  };

  return (
    <div className="App birthday-page">
      {/* Snowfall component */}
      <Snowfall />

      <div role="img" className="intro" aria-label="Scroll down for the magic">
        <h5>ข้างล่างนี้คืออะไรน้า⬇️ </h5>
      </div>

      <div className="box">
        <p className="text">รู้มั้ยว่าที่อ่านอยู่คืออะไร?</p>
      </div>
      <div className="box">
        <p className="text">ไม่บอกหรอก</p>
      </div>
      <div className="box">
        <p className="text">ตอนนี้อยากรู้หรือยัง</p>
      </div>
      <div className="box">
        <p className="text">ยังไม่บอกดีกว่า</p>
      </div>
      <div className="box">
        <p className="text">อะอะ บอกก็ได้</p>
      </div>
      <div className="box">
        <p className="text">จะเอาละนะ </p>
      </div>
      <div className="box">
        <p className="text">เตรียมตัว</p>
      </div>

      <div className="box">
        <p className="text">วันนี้คือวันเกิดของใครเอ่ยยยยย</p>
      </div>

      <div className="boxx">
        <p className="text">Unlock to read</p>
        <h5>(กรอกคำตอบให้ถูกนะ)</h5>
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
      </div>

      <div className="boxx">
        {!isUnlocked && <p className="text">แหนะๆ จะแอบดูหรอ ไปปลดล็อกก่อน</p>}
      </div>
    </div>
  );
};

export default BirthdayUnlockPage;
