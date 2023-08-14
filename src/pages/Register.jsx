import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config/config";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    user_type: "",
  });

  const { username, password, user_type } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password, user_type };
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="heading"  style={{ marginTop: "20px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          <FaSignInAlt /> Register
        </h1>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
          Join as an admin to manage your ecommerce site. Register now!
        </p>
      </section>
      <secton className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <br></br>
          <div className="form-group">
            <select
              className="form-control"
              id="user_type"
              name="user_type"
              value={user_type}
              onChange={onChange}
            >
              <option value="">Select User Type</option>
              <option value="vendor">Vendor</option>
              <option value="designer">Designer</option>
            </select>
          </div>
          <br></br>
          <div className="form-group">
            <button
              type="submit"
              className="btn-login btn-block"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </secton>
    </>
  );
};

export default Register;
