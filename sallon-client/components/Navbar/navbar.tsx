"use client";
// Navbar.tsx
import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import handleLogout from "../utils/AuthLogout"; // corrected import
import { useRouter } from "next/navigation"; // Import useRouter hook
import "../../styles/navbar.css";
import logoImage from "../../assets/logo.jpg";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { accessToken, setAccessToken } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { label: "Products", url: "/products" },
    { label: "Upload", url: "/uploadprod" },
  ];

  const accountItem = {
    label: "Account",
    children: accessToken ? ["My Profile", "Logout"] : ["Sign In", "Sign Up"],
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const clickOnLogout = () => {
    handleLogout(router); // corrected function call
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
          {navItems.map((item) => (
            <a href={item.url} key={item.label} className="navbar-item">
              {item.label}
            </a>
          ))}
          <a
            href="#"
            className="navbar-item"
            aria-haspopup={accountItem.children ? "true" : "false"}
            onClick={toggleDropdown}
          >
            {accountItem.label}
          </a>
          {accountItem.children && showDropdown && (
            <ul className="dropdown">
              {accountItem.children.map((childLabel) => (
                <li key={childLabel} className="dropdown-item">
                  <a
                    href={
                      childLabel === "Sign In"
                        ? "/signin"
                        : childLabel === "Sign Up"
                        ? "/signup"
                        : childLabel === "My Profile"
                        ? "/profile"
                        : "#"
                    }
                    className="dropdown-link"
                    onClick={
                      childLabel === "Logout"
                        ? clickOnLogout // corrected function reference
                        : () => setShowDropdown(false)
                    }
                  >
                    {childLabel}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
