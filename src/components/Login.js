import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [erroMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const dispatch = useDispatch();

  const signInHandler = () => {
    setIsSignInForm(!isSignInForm);
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if(!isSignInForm){
      if (password.current.value !== confirmPassword.current.value) {
        setErrorMessage("Password does not match");
        return;
      }
     }
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute h-screen">
        <img
          className="h-screen w-screen object-cover sm:h-auto sm:w-auto"
          src={BG_URL}
          alt="logo"
        />
      </div>

      <form className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
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
              ref={confirmPassword}
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
