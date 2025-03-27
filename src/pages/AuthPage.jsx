import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../services/userServices";
import { loginUser } from "../services/reduxServices";
import { ToastContainer, toast, Slide } from "react-toastify";
import { selectIsLoggedIn } from "../redux/selectors";
import { redirect } from "react-router-dom";

export default function RegistrationPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
      console.log(isLoggedIn);
  }, [isLoggedIn]);

  const authUser = async (data) => {
    switch (isRegister) {
      case true: {
        const response = await registerUser(data);
        if (response === 201) {
          setIsRegister(false);
          toast.success("Registration successful!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        }
        reset();
        break;
      }
      default:
        {
          const { email, password } = data;
          dispatch(loginUser({ email, password }));
          reset();
        }
        break;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F6F6F7] to-[#BEDBB0] p-4">
      <div
        className="bg-[#151515] text-white rounded-lg p-6 shadow-lg"
        style={{ width: "424px", height: "395px", borderRadius: "8px" }}
      >
        {/* Tab-uri Registration & Log In */}
        <div className="flex gap-4 justify-start mb-[40px]">
          <button
            className={` text-[18px] transition-colors duration-200 cursor-pointer ${
              isRegister ? "text-white" : "text-white/30 hover:text-white/30"
            }`}
            style={{ width: "106px", height: "27px" }}
            onClick={() => setIsRegister(true)}
          >
            Registration
          </button>
          <button
            className={`text-[18px] transition-transparent duration-200 cursor-pointer ${
              isRegister
                ? "text-white/30 bg-transparent/30 hover:text-white"
                : "text-white"
            }`}
            style={{ width: "51px", height: "27px" }}
            onClick={() => setIsRegister(false)}
          >
            Log In
          </button>
        </div>

        {/* Formular */}
        <form className="space-y-[15px]" onSubmit={handleSubmit(authUser)}>
          {isRegister && (
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="w-full p-[14px] pl-[18px] bg-[#1F1F1F] text-white rounded-md border border-[#BEDBB0] focus:outline-none"
              />
            </div>
          )}

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full p-[14px] pl-[18px] bg-[#1F1F1F] text-white rounded-md border border-[#BEDBB0] focus:outline-none"
            />
          </div>

          {/* Input parolă cu icon */}
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full p-[14px] pl-[18px] pr-[40px] bg-[#1F1F1F] text-white rounded-md border border-[#BEDBB0] focus:outline-none"
            />
            <img
              src="/svg/eye.svg"
              alt="Show Password"
              className="absolute top-[16px] right-[18px] w-[16.5px] h-[12px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Buton */}
          <Button variant="auth" type="submit">
            {isRegister ? "Register Now" : "Log In Now"}
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
