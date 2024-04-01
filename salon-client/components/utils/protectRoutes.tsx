import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

export const Protected = () => {
  const route = "http://localhost:3000/api/users/authenticate"; //TODO: use env variable
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken") as string;
      if (!accessToken) {
        toast.error("session expired");
        router.push("/signin");
        return;
      }
      const parsedAccessToken = JSON.parse(accessToken);
      const headers = { Authorization: `Bearer ${parsedAccessToken}` };
      console.log("The headers is", headers);
      const response = await axios.get(route, {
        headers,
        withCredentials: true,
      });
      setIsAuthenticated(true);
      console.log("user authenticated", response.data.message);
      if (response.data.message === "Refresh Token has verified") {
        console.log("new access token is ", response.data.accessToken);
        const newAccessToken = JSON.stringify(response.data.accessToken);
        localStorage.setItem("accessToken", newAccessToken);
        toast.success("accessToken refreshed successfully");
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      try {
        if (error.response.data.message === "Invalid refresh  token") {
          console.log("Invalid refresh token", error);
          toast.error("session expired");
        } else {
          console.error("Unknown error happend", error);
        }
      } catch {
        console.error("Unhandled error ", error);
      }
      router.push("/signin");
    }
  };

  return isAuthenticated;
};
