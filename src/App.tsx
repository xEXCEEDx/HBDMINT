import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BirthdayUnlockPage from "./component/BirthdayPage";
import Music from "./component/MusicPage";
import Countdown from "./component/Countdown";
import Cake from "./component/Cake";
import Unlock from "./component/Unlock";
import AnimatedBirthdayMessage from "./component/BirthdayMessage";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"countdown" | "birthday" | "cake">("countdown");

  useEffect(() => {
    // Scroll to the top of the page on route change
    window.scrollTo(0, 0);
  }, [currentPage]); // Dependency on `currentPage` to trigger scroll on page change

  const handleCountdown = () => {
    setCurrentPage("birthday");
  };

  const handleUnlockComplete = () => {
    setCurrentPage("cake");
  };

  return (
    <Router>
      <div id="root">
        {/* หิมะตกทั่วทุกหน้า */}
        <Snowfall
          color="#deedfa"
          snowflakeCount={100}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99,
            pointerEvents: "none",
          }}
        />

        <Routes>
          <Route path="/" element={
            currentPage === "countdown" ? (
              <Countdown onCountdown={handleCountdown} />
            ) : currentPage === "birthday" ? (
              <div>
                <BirthdayUnlockPage onUnlock={handleUnlockComplete} />
                {/* แสดง Music เมื่ออยู่ในหน้า birthday */}
                <hr />
                <Music />
              </div>
            ) : (
              <div>
                <Cake />
                {/* แสดง Music เมื่ออยู่ในหน้า cake */}
                <hr />
                <Music />
              </div>
            )
          }/>
          <Route path="/animated-birthday-message" element={<AnimatedBirthdayMessage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
