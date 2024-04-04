"use client";

import React, { FormEvent, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import "../../styles/login-register.css";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    cPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, firstName, lastName, password, cPassword } = formData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !password || !cPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== cPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const req: AxiosResponse<any> = await axios.post(
        "http://localhost:3000/api/users/register", //TODO: use env variable
        formData
      );
      if (req.status === 201) {
        router.push("/signin");
        toast.success("Registration successful");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as { error: string };
          if (
            axiosError.response.status === 400 &&
            responseData.error === "User already exists"
          ) {
            setError("User already exists");
          } else {
            setError("An error occurred");
          }
        } else {
          console.log("Error:", axiosError.message);
          setError("Network error. Please try again later.");
        }
      } else {
        console.log("Unknown error: ", error);
        setError("An unknown error occurred.");
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
            <span className="login-card-text">Sign up</span>
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
                type="text"
                name="firstName"
                placeholder="First Name"
                className="p-1 text-red-900"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="p-1 text-red-900"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-1 text-red-900"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="cPassword"
                placeholder="Confirm Password"
                className="p-1 text-red-900"
                value={cPassword}
                onChange={handleChange}
              />
            </div>
            <div className="text-center mt-2">
              <input type="submit" value="Submit" className="submit-btn" />
            </div>
          </form>
          <div>
            <p>
              Dont have an account? <a href="/signin">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
