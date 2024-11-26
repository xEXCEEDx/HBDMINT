import React from "react";
import Snowfall from "react-snowfall";
import "./App.css";
import BirthdayPage from "./component/BirthdayPage";
import Music from "./component/MusicPage";

const App: React.FC = () => {
  return (
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
      <BirthdayPage />
      < hr/>
      <Music />
    </div>
  );
};

export default App;
