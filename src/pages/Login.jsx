import React from "react";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { FaSignInAlt } from "react-icons/fa";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //     alert("Invalid username or password!")
  //   }

  //   if (isSuccess || user) {
  //     navigate('/')
  //   }

  //   dispatch(reset())
  // }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {email, password}

    // dispatch(login(userData))
  };

  return (
    <>
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
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
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
              Submit
            </button>
          </div>
        </form>
      </secton>

      {/* <Footer /> */}
    </>
  );
};

export default Login;
