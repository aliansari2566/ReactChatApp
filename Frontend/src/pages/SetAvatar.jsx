
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

  const setProfilePicture = async () => {};

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
<>

<Container>
<div className="tittle-container">
  <h1>Pick an avatar as your profile</h1>
  
</div>
<div className="avatar">
{
   avatars.map((avatar,index))
}
</div>
  
</Container>

<ToastContainer/>

</>
  )
}

const Container = styled.div`


`;