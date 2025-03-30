import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:9090/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store authentication details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.usertype);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("Email", data.email);
      localStorage.setItem("Username", data.username);
      localStorage.setItem("Userid", data.id);

      // Redirect based on user role
      navigate(data.usertype === "admin" ? "/admin-dashboardadmin" : "/user-dashboarduser");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <h1>Welcome Back!</h1>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign In</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input
            type="text"
            placeholder="Email address"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <div className="form-options">
            <label><a href="/reset-password">Forgot password?</a></label>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
