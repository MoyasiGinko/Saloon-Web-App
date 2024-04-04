"use client";
import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "../../styles/navbar.css";
import logoImage from "../../assets/logo.jpg";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const clickOnAccount = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    setShowDropdown(false); // Close the dropdown when logout is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <div className="left-nav-items">
          <Image src={logoImage} alt="Logo" className="logo-image" />
          <a href="/" className="logo-text">
            SalonHub
          </a>
        </div>
        <div className="right-nav-items">
          {/* Other menu items */}
          <a href="/products" className="navbar-item">
            Products
          </a>
          <a href="/uploadprod" className="navbar-item">
            Upload
          </a>
          <a href="/category" className="navbar-item">
            Category
          </a>
          <a href="/services" className="navbar-item">
            Services
          </a>
          {/* Account dropdown */}
          <a
            href="#"
            className="navbar-item"
            aria-haspopup="true"
            onClick={clickOnAccount}
          >
            Account
          </a>
          {showDropdown && <DropdownMenu onLogoutClick={handleLogoutClick} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
