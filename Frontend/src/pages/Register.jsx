import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

const toastOptions ={     
position: "bottom-right",
autoClose: 8000,
pauseOnHover: true,
draggable: true,
theme: "dark",
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   localStorage.setItem(
      //     process.env.REACT_APP_LOCALHOST_KEY,
      //     JSON.stringify(data.user)
      //   );
      //   navigate("/");
      // }
    };
  };

  const handleValidation = () => {
    const { password, confirmpassword, username, email } = values;

    if (password !== confirmpassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false
    } 
    else if(username.length<3){
      toast.error("username should be greater than 3 character", toastOptions)
      return false
    }else if (/\d/.test(username)) {
      toast.error("Username should not contain numbers", toastOptions);
      return false
    }
    else if(email===""){
      toast.error("password should be greater or equal  than 8 character", toastOptions)
      return false
    }
    else if(password.length<8){
      toast.error("Email is required", toastOptions)
      return false
    }

    return true;
  };

  const handleChange = (e) => {
    // e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer className="FormContainer">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>chatyfy</h1>
          </div>
          <input
            type="text"
            name="username"
            id=""
            placeholder="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            id=""
            placeholder="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmpassword"
            id=""
            placeholder="confirm password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: linear-gradient(135deg, #02aab0 0%, #00cdac 100%);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #00cdac;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f5f6fa;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: white;
    padding: 1rem;
    border: none !important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 6px 0px;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #00cdac;
    }
  }
  span {
    color: #00cdac;
    text-transform: uppercase;
    a {
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
