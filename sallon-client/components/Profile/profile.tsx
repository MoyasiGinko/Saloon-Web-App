'use client'
import React, { useState, useEffect } from 'react';
import { Protected } from '../utils/protectRoutes';

const Profile = () => {
  const isAuthenticated = Protected('http://localhost:3000/api/users/authenticate');
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

  if(!isAuthenticated)
  {
    return <p>Loading....</p>
  }

  return (
    <>
      <h1 className='text-center p-3'>Profile</h1>
      <div className='flex flex-col items-center mt-20 gap-2 '>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
    </>
  );
};

export default Profile;