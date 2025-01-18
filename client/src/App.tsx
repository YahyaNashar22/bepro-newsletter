import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  function isValidJWT(token: string) {
    const regex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    return regex.test(token);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isValidJWT(token)) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT

        // Check if the token is expired
        if (decodedToken) {
          setIsLoggedIn(true); // Set logged-in state if token is valid
        } else {
          localStorage.removeItem("token"); // Remove expired token
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    } else {
      console.error("Invalid token format");
      localStorage.removeItem("token"); // Remove incorrectly formatted token
    }
  }, []);

  return <>{isLoggedIn ? <Home /> : <Login />}</>;
}

export default App;
