// Popup.tsx
import React from "react";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4 shadow-lg">
        <span className="mb-4 text-2xl font-bold">JUMPSCARE</span>
        <img src="ridha.jpg" alt="Ridha" className="h-25 w-25 p-2" />
        <button
          onClick={onClose}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
