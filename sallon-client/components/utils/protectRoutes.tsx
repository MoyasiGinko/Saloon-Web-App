import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export const Protected = (route: string) => {

  const router = useRouter();;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken") as string;
      if (!accessToken) {
        toast.error("session expired");
        router.push('/signin');
        return;
      }
      const parsedAccessToken = JSON.parse(accessToken)
      const headers = { 'Authorization': `Bearer ${parsedAccessToken}` };
      console.log('The headers is', headers);
      const response = await axios.get(route, { headers });
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Error fetching profile data:", error);
      handleProfileError(error);
    }
  };

  const handleProfileError = async (error: any) => {
    if (error.response && error.response.status === 403) {

      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        console.error("Refresh token not found");
        toast.error("Session expired");
        router.push('/signin');
        return;
      }

      try {
        const refreshResponse = await axios.get('http://localhost:3000/api/users/refresh-token', { withCredentials: true });
        const newAccessToken = JSON.stringify(refreshResponse.data.accessToken);
        localStorage.setItem("accessToken", newAccessToken);
        setIsAuthenticated(true);

      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        toast.error("Session expired");
        router.push('/signin');
      }
    } else {
      console.error("Unhandled error occurred:", error);
      toast.error("An unexpected error occurred");
      router.push('/signin');
    }
  };

  return isAuthenticated;
}