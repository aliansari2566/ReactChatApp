
import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const SetAvatar = () => {

  const api ="https://api.multiavatar.com/45678944"
  const navigate = useNavigate()
  const [avatars , setAvatar] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [selectedAvatar , setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  return (
<>

<Container>
<div className="tittle-container">
  <h1>Pick an avatar as your profile</h1>
  
</div>
<div className="avatar">
{
   
}
</div>
  
</Container>

<ToastContainer/>

</>
  )
}

const Container = styled.div`


`;