'use client'
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const { users, setUsers } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
    if (!emailPattern.test(email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }
    
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setError("Email is already registered. Please log in.");
    } else if (!name || !email || !password) {
      setError("Please fill in all fields.");
    } else {
      
    
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role: "User",
      };
      setUsers([...users, newUser]);
      alert("Registration successful! Please go to Login page.");
      router.push("/login"); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2d3a4d]">
      <div className="bg-[#1d2d44] p-6 shadow-lg rounded-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4 text-black"
        />
        <input
          type="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-[#2d3a4d] text-white px-4 py-2 rounded-md hover:bg-[#0b1118]"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-300   font-bold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
