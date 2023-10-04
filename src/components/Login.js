import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [erroMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
 

  const signInHandler = () => {
    setIsSignInForm(!isSignInForm);
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName } = auth.currentUser;
               dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <Header />

      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="Logo-Background"
        className="absolute"
      />

      <form className="  absolute bg-black w-3/12 p-12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
        <h1 className="text-3xl font-bold py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            required
            ref={name}
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-700"
          />
        )}
        <input
          required
          ref={email}
          type="email"
          placeholder="Email or phone number"
          className="my-4 p-4 w-full bg-gray-700"
        />

        <label className="flex relative">
          <input
            required
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="my-4 p-4 w-full bg-gray-700"
          />
          <span
            className="absolute right-3 top-[34px] cursor-pointer"
            onClick={showPasswordHandler}
          >
            {showPassword ? (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        {!isSignInForm && (
          <label className="flex relative">
            <input
              required
              type="password"
              placeholder="Confirm Password"
              className="my-4 p-4 w-full bg-gray-700"
            />
            <span
              className="absolute right-3 top-[34px] cursor-pointer"
              onClick={showPasswordHandler}
            >
              {showPassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        )}
        <p className="text-red-500 font-bold">{erroMessage}</p>
        <button
          className="bg-red-700 p-4 my-6 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={signInHandler}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registred? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
