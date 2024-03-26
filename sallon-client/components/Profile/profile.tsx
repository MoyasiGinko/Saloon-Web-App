"use client";
import React, { useState, useEffect } from "react";
import { Protected } from "../utils/protectRoutes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();
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

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    if (!accessToken) {
      router.push("/");
      return;
    }

    const parsedAccessToken = JSON.parse(accessToken);
    const headers = { Authorization: `Bearer ${parsedAccessToken}` };

    try {
      await axios.post("http://localhost:3000/api/users/logout", null, {
        headers,
        withCredentials: true,
      });
      localStorage.clear(); // Clear all items in localStorage
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  if (!isAuthenticated) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <h1 className="text-center p-3">Profile</h1>
      <div className="flex flex-col items-center mt-20 gap-2 ">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button type="button" className="p-3 bg-red-600" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
