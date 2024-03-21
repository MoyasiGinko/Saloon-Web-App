"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import "../../styles/login-register.css"; 
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      if (req.status === 200) {
        const response = req.data;
        localStorage.setItem("name", JSON.stringify(response.name));
        localStorage.setItem("email", JSON.stringify(response.email));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.accessToken)
        );

        const cookieName = "refreshToken";
        const cookieValue = response.refreshToken;
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/; SameSite=strict`;
        router.push("/profile");
        toast.success("Login successful");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.data.error === 'Invalid Credintails'
        ) {
          console.log('Credentials error')
          setError("Email or password is incorrect");
        } else {
          console.log("unknown Error: ", error);
          toast.error("An Error has occurred");
        }
      } else {
        console.log("Unhandled Error:", error);
        toast.error("An unKnown error occurred");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="picture-section"></div>
        <div className="login-content">
          <div className="logo-card-header">
            <Image src={logoImage} alt="Logo" className="logo-card" />
            <span className="login-card-text">Sign in</span>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <span className="text-red-500">{error}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="p-1 text-red-900"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="p-1 text-red-900"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center mt-2">
              <input type="submit" value="Submit" className="submit-btn" />
            </div>
          </form>
          <div>
            <p>
              Dont have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
