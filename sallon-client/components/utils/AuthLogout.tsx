import axios from "axios";
import { toast } from "react-toastify";

const handleLogout = async (router: any) => {
  const accessToken = localStorage.getItem("accessToken") as string;
  if (!accessToken) {
    router.push("/");
    return;
  }

  const parsedAccessToken = JSON.parse(accessToken);
  const headers = { Authorization: `Bearer ${parsedAccessToken}` };

  // TODO: use env variable
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

export default handleLogout;
