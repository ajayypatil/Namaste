import React from 'react';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch,useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import {useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { LOGO, USER_ICON } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse")
       
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
        
      }
    });
    // Unsubscribe when component unmounts
    return ()=> unsubscribe();
  }, []);
   
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
   <img
        className="w-44"
        src={LOGO}
        alt="Netflix-Logo"
      ></img>
    {user && (
      <div className="flex p-2 justify-between">
      <img
          alt="usericon"
          src={USER_ICON}
          className="w-10 h-10"
        ></img>
         <button className="text-white pb-4 ml-2" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    )}
  </div>
  )
}

export default Header