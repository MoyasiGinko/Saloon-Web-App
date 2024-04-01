"use client";
import React, { useState, useEffect } from "react";
import { Protected } from "../utils/protectRoutes";
import { useRouter } from "next/navigation"; // Import useRouter hook
import handleLogout from "../utils/AuthLogout"; // Import handleLogout function
import styles from "../../styles/profile.module.css";

const Profile = () => {
  const isAuthenticated = Protected();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedName = localStorage.getItem("name") ?? "";
    const storedEmail = localStorage.getItem("email") ?? "";
    setUserInfo({
      name: storedName,
      email: storedEmail,
    });
  }, []);

  // Get the router object using useRouter hook
  const router = useRouter();

  if (!isAuthenticated) {
    return <p>Loading....</p>;
  }

  const handleLogoutClick = () => {
    // Pass the router object as an argument to handleLogout function
    handleLogout(router);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h1 className="text-center mb-4">Profile</h1>
        <div className={styles.profileInfo}>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
        <div className={styles.logoutButton}>
          <button type="button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
