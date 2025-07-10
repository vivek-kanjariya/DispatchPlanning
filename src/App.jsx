import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Background from "./Components/background";
import Home from "./Pages/home";
import Dashboard from "./Pages/dashboard";
import PopUp from "./Components/popup"; // Import your popup
import Sop from '../src/Pages/Sop';


export default function App() {
  const [popup, setPopup] = useState(null); // Message trigger

  return (
    <div className="min-h-screen relative text-black dark:text-white transition-colors duration-600">
      
            {/* Popup shown just under Nav */}
      {popup && (
        <PopUp
          type={popup.type}
          message={popup.message}
          duration={3000}
          onClose={() => setPopup(null)}
        />
      )}
      
      <Background />
      <NavBar />

      <main className="p-4 z-10 relative">
        <Routes>
          <Route path="/" element={<Home setPopup={setPopup} />} />
          <Route path="/dashboard" element={<Dashboard setPopup={setPopup} />} />
          <Route path="/sop" element={< Sop setPopup={setPopup} />} />
          <Route path="*" element={<PopUp type="error" message="Route not found" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
