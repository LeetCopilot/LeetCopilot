import React, { useState } from "react";
import Popup from "./Popup";

const NavBar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <nav className="mb-2 flex items-center justify-between">
      <h3 className="text-2xl font-black">
        Leet
        <span className="text-orange-400">Copilot</span>
      </h3>
      <div className="flex items-center gap-4">
        <button>☕︎</button>
        <button>☰</button>
        <button onClick={togglePopup}>X</button>
      </div>
      {showPopup && <Popup onClose={togglePopup} />}
    </nav>
  );
};

export default NavBar;
