import React, { useState, useEffect, useRef } from "react";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import "../MyNavbar/MyNavbar.css";

const MyNavbar = ({ placeholder, onChange }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const cartMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsCartMenuOpen(false);
  };

  const toggleCartMenu = () => {
    setIsCartMenuOpen(!isCartMenuOpen);
    setIsProfileMenuOpen(false);
  };

  // Funzione per chiudere i menu cliccando fuori
  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
    if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
      setIsCartMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navBrand">il mio e-commerce</div>
      <div className="searchInput">
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="searchInputField"
        />
      </div>

      <div className="nav-icons">
        <div onClick={toggleProfileMenu} className={`nav-icon ${isProfileMenuOpen ? "rotateShadow" : ""}`}>
          <IoPersonOutline size={30} />
        </div>
        <div onClick={toggleCartMenu} className={`nav-icon ${isCartMenuOpen ? "rotateShadow" : ""}`}>
          <IoCartOutline size={30} />
        </div>
      </div>

      {isProfileMenuOpen && (
        <div className="dropdownMenu" ref={profileMenuRef}>
          <p>Profilo</p>
          <p>Impostazioni</p>
          <p>Logout</p>
        </div>
      )}

      {isCartMenuOpen && (
        <div className="dropdownMenu" ref={cartMenuRef}>
          <p>Visualizza Carrello</p>
          <p>Checkout</p>
        </div>
      )}
    </div>
  );
};

export default MyNavbar;
