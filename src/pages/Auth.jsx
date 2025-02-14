import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuth } from "../utils/AuthContext";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [signUpAlert, setSignUpAlert] = useState(false);

  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, []);
  const signUpFormik = useFormik({
    initialValues: {
      signUpEmail: "",
      signUpPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      signUpEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      signUpPassword: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("signUpPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      createUserWithEmailAndPassword(
        auth,
        values.signUpEmail,
        values.signUpPassword
      )
        .then(() => {
          console.log("Signed up:", auth.currentUser);
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setError("Email is already in use");
          } else if (error.code === "auth/invalid-email") {
            setError("Email is invalid");
          } else if (error.code === "auth/weak-password") {
            setError("Password is too weak");
          } else {
            console.log(error);
            setError("Something went wrong");
          }
          setSignUpAlert(true);
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    },
  });
  const signInFormik = useFormik({
    initialValues: {
      signInEmail: "",
      signInPassword: "",
    },
    validationSchema: Yup.object({
      signInEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      signInPassword: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      signInWithEmailAndPassword(
        auth,
        values.signInEmail,
        values.signInPassword
      )
        .then(() => {
          console.log("Signed in:", auth.currentUser);
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            setError("Invalid login credentials.");
          } else {
            console.log(error);
          }
          setAlert(true);
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    },
  });

  return (
    <div className="bg-primary w-full min-h-[100dvh] flex flex-col justify-center items-center z-10">
      {/* Logo */}
      <div className="border-b-[1px] border-offWhite border-solid  flex-col justify-center items-center w-full pt-32 pb-20 sm:flex hidden">
        <img
          src="./images/htn.svg"
          alt="Hack the North Logo"
          className="w-[10%] object-cover"
        />
        <div className="font-SatoshiMedium text-[48px] mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#F2A64A] via-[#FD2DF8] to-[#1AF8FE] from-[20%] via-[50%] to-[90%]">
          Hackathon Global Inc.
        </div>
      </div>
      {/* Sign up / Log in Forms */}
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 h-full">
        <div className="flex flex-col justify-start items-center lg:px-[12%] md:px-[16%] px-12 lg:border-r-[1px] lg:border-b-0 border-b-[1px] border-offWhite border-solid py-24">
          <h2 className="text-offWhite font-Satoshi text-[48px]">Log In</h2>
          {/* Log In form */}
          {alert && (
            <div
              className="w-full bg-red-500 text-white text-center py-3 cursor-pointer z-[100] font-Satoshi my-2 px-10"
              onClick={() => setAlert(false)}
            >
              {error}
              <span className="float-end font-Satoshibold">x</span>
            </div>
          )}
          <form
            className="w-full flex flex-col justify-center items-center gap-2 z-[100] mt-8"
            onSubmit={signInFormik.handleSubmit}
          >
            <input
              placeholder="Email"
              type="email"
              name="signInEmail"
              id="signInEmail"
              value={signInFormik.values.signInEmail}
              onChange={signInFormik.handleChange}
              className="border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[24px] md:text-[22px] text-[20px] font-Satoshilight mb-2"
            />
            <div className="w-full float-start text-red-400 font-Satoshilight text-[20px]">
              {signInFormik.touched.signInEmail &&
              signInFormik.errors.signInEmail ? (
                <div>{signInFormik.errors.signInEmail}</div>
              ) : null}
            </div>
            <input
              placeholder="Password"
              type="password"
              name="signInPassword"
              id="signInPassword"
              value={signInFormik.values.signInPassword}
              onChange={signInFormik.handleChange}
              className="mt-4 border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[24px] md:text-[22px] text-[20px] font-Satoshilight mb-1"
            />
            <div className="w-full float-start text-red-400 font-Satoshilight text-[20px]">
              {signInFormik.touched.signInPassword &&
              signInFormik.errors.signInPassword ? (
                <div>{signInFormik.errors.signInPassword}</div>
              ) : null}
            </div>
            <button
              className="mt-6 w-full border-offWhite border-[1px] border-solid text-offWhite font-Satoshilight text-[20px] py-4 transition-all duration-300 ease-in hover:bg-offWhite hover:text-primary"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
        {/* Sign Up Form */}
        <div className="flex flex-col justify-start items-center lg:px-[12%] md:px-[16%] px-12  py-24">
          <h2 className="text-offWhite font-Satoshi text-[48px]">Sign Up</h2>
          {signUpAlert && (
            <div
              className="w-full bg-red-500 text-white text-center py-3 cursor-pointer z-[100] font-Satoshi my-2 px-10"
              onClick={() => setSignUpAlert(false)}
            >
              {error}
              <span className="float-end font-Satoshibold">x</span>
            </div>
          )}
          <form
            className="w-full flex flex-col justify-center items-center gap-2 z-[100]"
            onSubmit={signUpFormik.handleSubmit}
          >
            <input
              placeholder="Email"
              type="email"
              name="signUpEmail"
              id="signUpEmail"
              value={signUpFormik.values.signUpEmail}
              onChange={signUpFormik.handleChange}
              className="mt-4 border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[24px] md:text-[22px] text-[20px] font-Satoshilight mb-1"
            />
            <div className="w-full float-start text-red-400 font-Satoshilight text-[20px]">
              {signUpFormik.touched.signUpEmail &&
                signUpFormik.errors.signUpEmail && (
                  <div>{signUpFormik.errors.signUpEmail}</div>
                )}
            </div>
            <input
              placeholder="Password"
              type="password"
              name="signUpPassword"
              id="signUpPassword"
              value={signUpFormik.values.signUpPassword}
              onChange={signUpFormik.handleChange}
              className="mt-4 border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[24px] md:text-[22px] text-[20px] font-Satoshilight mb-1"
            />
            <div className="w-full float-start text-red-400 font-Satoshilight text-[20px]">
              {signUpFormik.touched.signUpPassword &&
                signUpFormik.errors.signUpPassword && (
                  <div>{signUpFormik.errors.signUpPassword}</div>
                )}
            </div>
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={signUpFormik.values.confirmPassword}
              onChange={signUpFormik.handleChange}
              className="mt-4 border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[24px] md:text-[22px] text-[20px] font-Satoshilight mb-1"
            />
            <div className="w-full float-start text-red-400 font-Satoshilight text-[20px]">
              {signUpFormik.touched.confirmPassword &&
                signUpFormik.errors.confirmPassword && (
                  <div>{signUpFormik.errors.confirmPassword}</div>
                )}
            </div>
            <button
              className="mt-6 w-full border-offWhite border-[1px] border-solid text-offWhite font-Satoshilight text-[20px] py-4 transition-all duration-300 ease-in hover:bg-offWhite hover:text-primary"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {/* <div className="w-1/2 flex flex-col justify-center items-center">
          <img src="./images/htn.svg" alt="Hack the North Logo" />
          <div className="text-offWhite font-SatoshiMedium text-[48px]">
            Hack the North Events
          </div>
        </div> */}
      {/* <div className="w-1/2 relative flex flex-col justify-center items-center px-12 py-24 border-l-[2px] border-offWhite border-solid">
          <div className="backdrop-blur-3xl  border-offWhite border-[2px] px-2 py-2 border-solid absolute rounded-3xl top-0 translate-y-1/2  flex justify-center items-center z-[30]">
            <div className="font-Satoshi text-offWhite text-[24px] relative  px-6 py-1">
              Sign Up
              <div className="bg-offWhite absolute top-0 right-0 h-full w-full mix-blend-difference rounded-2xl "></div>
            </div>
            <div className="font-Satoshi text-offWhite text-[24px] px-6 py-1">
              Log In
            </div>
          </div>
          {alert && (
            <div
              className="w-full bg-red-500 text-white text-center py-2 cursor-pointer z-[100]"
              onClick={() => setAlert(false)}
            >
              {error}
            </div>
          )}
          <form
            className="w-full flex flex-col justify-center items-center gap-2 z-[100]"
            onSubmit={signInFormik.handleSubmit}
          >
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={signInFormik.values.email}
              onChange={signInFormik.handleChange}
              className="border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[30px] md:text-[26px] text-[20px] font-Satoshilight mb-4"
            />
            <div>
              {signInFormik.touched.email && signInFormik.errors.email ? (
                <div>{signInFormik.errors.email}</div>
              ) : null}
            </div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={signInFormik.values.password}
              onChange={signInFormik.handleChange}
              className="border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[30px] md:text-[26px] text-[20px] font-Satoshilight mb-4"
            />
            <div>
              {signInFormik.touched.password && signInFormik.errors.password ? (
                <div>{signInFormik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div> */}
      {/* Sign in Form */}
      {/* <div className="flex flex-col w-[50%] justify-center items-center"> */}
      {/* {alert && (
            <div
              className="w-full bg-red-500 text-white text-center py-2 cursor-pointer z-[100]"
              onClick={() => setAlert(false)}
            >
              {error}
            </div>
          )}
          <form
            className="w-full flex flex-col justify-center items-center gap-2 z-[100]"
            onSubmit={signInFormik.handleSubmit}
          >
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={signInFormik.values.email}
              onChange={signInFormik.handleChange}
            />
            <div>
              {signInFormik.touched.email && signInFormik.errors.email ? (
                <div>{signInFormik.errors.email}</div>
              ) : null}
            </div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={signInFormik.values.password}
              onChange={signInFormik.handleChange}
            />
            <div>
              {signInFormik.touched.password && signInFormik.errors.password ? (
                <div>{signInFormik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit">Sign In</button>
          </form> */}
      {/* </div> */}
      {/* Register Form */}
      {/* <div className="flex flex-col w-[50%] justify-center items-center"> */}
      {/* </div> */}
    </div>
  );
};

export default Auth;
