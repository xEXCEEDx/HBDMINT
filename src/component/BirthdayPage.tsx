import React, { useState } from "react";
import "./Birthday.css";
import Snowfall from "react-snowfall";
import UnlockComponent from "./Unlock";
import Swal from "sweetalert2";

const BirthdayUnlockPage: React.FC = () => {
    const [inputValues, setInputValues] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      });
    
      const [isUnlocked, setIsUnlocked] = useState(false);  // เช็คสถานะของการ Unlock
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const { value } = event.target;
        setInputValues({ ...inputValues, [field]: value });
    
        if (value.length === 1) {
          const nextInputId = `input-${parseInt(field.slice(-1)) + 1}`;
          const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
          if (nextInput) nextInput.focus();
        }
    
        // ตรวจสอบการ Unlock
if (
  inputValues.input1.toLowerCase() === "m" &&
  inputValues.input2.toLowerCase() === "i" &&
  inputValues.input3.toLowerCase() === "n" &&
  inputValues.input4.toLowerCase() === "t"
) {
  setIsUnlocked(true);
} else {
  setIsUnlocked(false);
}

      };
      const handleUnlock = () => {
        setIsUnlocked(true);
      };
      
      return (
        <div className="App">
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
        <h5>(กรอกรหัสให้ถูกนะ)</h5>
        <UnlockComponent onUnlock=
        {handleUnlock} />
      </div>

      <div className="boxx">
          {!isUnlocked && <p className="text">แหนะๆ จะแอบดูหรอ ไปปลดล็อกก่อน</p>}
        </div>

        </div>
      );
    };
    

export default BirthdayUnlockPage;
