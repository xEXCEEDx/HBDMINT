import React, { useState, useEffect } from "react";
import "./css/Countdown.css";

interface CountdownProps {
  onCountdown: () => void; // ฟังก์ชันที่เรียกเมื่อการนับถอยหลังเสร็จสิ้น
}

const Countdown: React.FC<CountdownProps> = ({ onCountdown }) => {
  const [count, setCount] = useState(4); // เวลาเริ่มต้น
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [question, setQuestion] = useState("");

  // ตัวอย่างคำถาม
  const questions = ["พร้อมจะเริ่มดูหรือยัง?"];

  useEffect(() => {
    // นับถอยหลัง
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // หลังจากนับถอยหลังเสร็จ ให้สุ่มคำถาม
      setIsCountdownFinished(true);
      setQuestion(questions[Math.floor(Math.random() * questions.length)]);
    }
  }, [count, questions]);

  return (
    <div className="countdown-container">
      {!isCountdownFinished ? (
        <h1 className="countdown-number">{count}</h1> // แสดงเลขถอยหลัง
      ) : (
        <div className="question-container">
          <h2 className="question">{question}</h2>
          <button className="ready-button" onClick={onCountdown}>
            พร้อมแล้ว
          </button>
        </div>
      )}
    </div>
  );
};

export default Countdown;
