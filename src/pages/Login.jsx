import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password
      });

      const token = response.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      console.log("DECODED:", decoded);

      // ✅ STORE EVERYTHING
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("userId", decoded.userId);   // 🔥 VERY IMPORTANT

      // ✅ REDIRECT
      if (decoded.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    
    <form onSubmit={login}>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;