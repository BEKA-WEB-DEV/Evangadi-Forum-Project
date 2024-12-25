import { createContext, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./utility/axios";
import AppRouter from "./routes/AppRouter.jsx";

// Create a context for the user data
export const UserState = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Fetch user data
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("Evandadi-Forum-token-JUN2024"); // Get the token from local storage
      if (!token) {
        navigate("/auth"); // Redirect to auth if no token is found
        return;
      }

      const response = await axiosInstance.get("/user/check", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data); // Store user data in state
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/auth"); // Redirect to auth on error
    }
  };

  useEffect(() => {
    getUserData(); // Fetch user data when the component mounts
  }, []);

  return (
    // Provide user data and setter to the entire app
    <UserState.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserState.Provider>
  );
}

export default App;
