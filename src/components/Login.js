import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const signInHandler = () => {
    setIsSignInForm(!isSignInForm);
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
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-700"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email or phone number"
          className="my-4 p-4 w-full bg-gray-700"
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="my-4 p-4 w-full bg-gray-700"
        />
        {!isSignInForm && (
          <input
            required
            type="password"
            placeholder="Confirm Password"
            className="my-4 p-4 w-full bg-gray-700"
          />
        )}

        <button className="bg-red-700 p-4 my-6 w-full rounded-lg">
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
