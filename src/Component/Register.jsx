import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import Nav from "./Nav";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if(form.password.length<8){
      alert("Password must be at least 8 characters")
      return
    }
    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        form
      );
      if (res.status === 201) {
        alert("User Registered Successfully");
       
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <>
      <Nav />
      <div className="page">
        <div className="box">

        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start managing your tasks today</p>

   <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

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

        <button className="btn" onClick={register}>
          Register
        </button>

     <p className="link-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;