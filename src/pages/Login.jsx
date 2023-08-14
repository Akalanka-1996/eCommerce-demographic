import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config/config";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password };
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('abcd')
      console.log('response', response.data)
      const { token, user} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("username", user.username);
      // toast.success(response.data.message, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      window.location.href = "/dashboard";
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
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
            <button type="submit" className="btn-login btn-block">
              Login
            </button>
          </div>
        </form>
      </secton>
    </>
  );
};

export default Login;
