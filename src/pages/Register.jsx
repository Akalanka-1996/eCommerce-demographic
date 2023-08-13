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
      localStorage.setItem('token', token)
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Register
        </h1>
        <p>Login and Request Documents!</p>
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

          <div className="form-group">
            <button type="submit" className="btn-login btn-block">
              Submit
            </button>
          </div>
        </form>
      </secton>
    </>
  );
};

export default Register;
