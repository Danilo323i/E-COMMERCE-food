import React, { useState, useEffect, useRef } from "react";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import "../MyNavbar/MyNavbar.css";

const MyNavbar = ({ placeholder, onChange }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const cartRef = useRef(null);

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
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
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
        <IoPersonOutline
          className={`nav-icon ${isProfileMenuOpen ? "rotateShadow" : ""}`}
          size={30}
          onClick={toggleProfileMenu}
          ref={profileRef}
        />
        <IoCartOutline
          className={`nav-icon ${isCartMenuOpen ? "rotateShadow" : ""}`}
          size={30}
          onClick={toggleCartMenu}
          ref={cartRef}
        />
      </div>

      {isProfileMenuOpen && (
        <div className="dropdownMenu" ref={profileRef}>
          <p>Profilo</p>
          <p>Impostazioni</p>
          <p>Logout</p>
        </div>
      )}

      {isCartMenuOpen && (
        <div className="dropdownMenu" ref={cartRef}>
          <p>Visualizza Carrello</p>
          <p>Checkout</p>
        </div>
      )}
    </div>
  );
};

export default MyNavbar;
