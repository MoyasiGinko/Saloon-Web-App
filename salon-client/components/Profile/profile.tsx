"use client";
import React, { useState, useEffect } from "react";
import { Protected } from "../utils/protectRoutes";
import { useRouter } from "next/navigation"; // Import useRouter hook
import handleLogout from "../utils/AuthLogout"; // Import handleLogout function

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
    <>
      <h1 className="text-center p-3">Profile</h1>
      <div className="flex flex-col items-center mt-20 gap-2 ">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="p-3 bg-red-600"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
