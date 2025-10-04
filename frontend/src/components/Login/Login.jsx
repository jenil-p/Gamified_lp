import React, { useContext, useState } from "react";
import "./Login.css";
import { Appcontext } from "../../context/Appcontext"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("Sign Up");
  const [name, setName] = useState("");
  const [instituteMail, setInstituteMail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { setToken, backendurl } = useContext(Appcontext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (mode === "Sign Up") {
        response = await axios.post(`${backendurl}/api/user/register`, {
          name,
          instituteMail,
          password,
        });
      } else {
        response = await axios.post(`${backendurl}/api/user/login`, {
          instituteMail,
          password,
        });
      }

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/"); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Try again.";
      toast.error("Login/Register failed: " + message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{mode === "Sign Up" ? "Create Account" : "Login"}</h2>
        <p>
          Please {mode === "Sign Up" ? "sign up" : "login"} to continue booking
        </p>

        {mode === "Sign Up" && (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your name"
            />
          </div>
        )}

        <div className="form-group">
          <label>instituteMail</label>
          <input
            type="email"
            onChange={(e) => setInstituteMail(e.target.value)}
            value={instituteMail}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
        </div>

        <button type="submit" className="auth-btn">
          {mode === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="toggle-mode">
          {mode === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("Login")}>Login here</span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span onClick={() => setMode("Sign Up")}>Create one</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
