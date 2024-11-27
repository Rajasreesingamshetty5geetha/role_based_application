"use client";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setUser, users } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setView] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  

  const handleLogin = () => {
    const existingUser = users.find((user) => user.email === email && user.password === password);
    if (!existingUser) {
      setError("Invalid email or password.");
    } else {
      setUser(existingUser);
      router.push("/dashboard");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };
  const handleView = () => {
    setView(!viewPass)
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-[#0d1321]">
      <div className="p-6 bg-[#1d2d44] shadow-md rounded-md">
        <h2 className="mb-4 text-2xl font-bold justify-center flex">Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 px-3 py-2 border rounded-md text-black font-sans"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={viewPass ? "text" : "password"}
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded-md text-black "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={handleView}
          className="absolute -mx-12 top-[51%] transform -translate-y-1/2 text-gray-700 hover:text-gray-700"
        >
          {viewPass ? (
            <FaEyeSlash className="text-xl" />
          ) : (
            <FaEye className="text-xl" />
          )}
        </button>
        <button
          onClick={handleLogin}
          className="w-full py-2 text-white bg-[#3e5c76] hover:bg-[#0b1126] rounded-md"
        >
          Login
        </button>
        <p className="mt-2 text-sm">
          Don't have an account?{" "}
          <span
            onClick={handleRegister}
            className="text-blue-500 cursor-pointer underline underline-offset-2"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
