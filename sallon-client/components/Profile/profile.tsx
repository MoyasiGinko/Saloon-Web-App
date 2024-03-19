'use client'
import React, {useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name : "",
    email: "",
    accessToken: "",
    refreshToken: ""
  })

  useEffect(() => {
    const storedName = localStorage.getItem("name") ?? "";
    const storedEmail = localStorage.getItem("email") ?? "";
    const storedAccessToken = localStorage.getItem("accessToken") ?? "";
    const storedRefreshToken = getCookie("refreshToken") ?? "";
    setUserInfo({
      name: storedName,
      email: storedEmail,
      accessToken: storedAccessToken,
      refreshToken: storedRefreshToken
    })
  },[])

  return (
    <>
      <h1 className='text-center p-3'>Profile</h1>
      <div className='flex flex-col items-center mt-20 gap-2 '>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className='px-4 w-[80%] mx-auto overflow-x-auto mb-10'>Access Token: {userInfo.accessToken}</div>
      <div className='px-4 w-[80%] mx-auto overflow-x-auto'>Refresh Token: {userInfo.refreshToken}</div>
    </>
  )
}

export default Profile;