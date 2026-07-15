import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import Nav from "./Nav";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <>
      <Nav />
      <div className="page">
        <div className="box">

   <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

 <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="btn" onClick={login}>
          Login
        </button>

          <p className="link-text">
            Don't have an account? <Link to="/">Register</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;