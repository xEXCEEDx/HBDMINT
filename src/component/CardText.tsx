import React, { useState } from "react";
import "./css/Card.css";

interface CardProps {
  title: string;
  message: string;
}

const CardText: React.FC<CardProps> = ({ title, message }) => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const toggleMessageVisibility = () => {
    setIsMessageVisible(!isMessageVisible);
  };

  return (
    <div className="birthday-card-container">
      <div className="birthday-card-content">
        <h6 className="birthday-card-title">สุขสันต์วันเกิดนะคะ🎂</h6>
        <button className="toggle-button" onClick={toggleMessageVisibility}>
          {isMessageVisible ? "ปิดข้อความ" : "คลิกเพื่อเปิดอ่าน"}
        </button>
        {isMessageVisible && (
          <p className="birthday-card-message">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CardText;
