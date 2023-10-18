import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { loginRoute} from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
   
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const {  username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
      
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("Chat-app-user", JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;

    if (password ==="") {
      toast.error("password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (/\d/.test(username)) {
      toast.error("Username should not contain numbers", toastOptions);
      return false;
    } 
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer className="FormContainer">
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>chatyfy</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            min="3"
          />
        
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
      

          <button type="submit">Login</button>
          <span>
           Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
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
    border: none;
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
