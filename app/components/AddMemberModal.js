'use client'
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter, useParams } from 'next/navigation'; 

const AddMemberModal = () => {  
  const { members, setMembers } = useContext(AppContext);
  const router = useRouter();
  const params = useParams(); 
  const id = params.id; 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");

  const handleAddMember = () => {
    // Validate inputs
    if (!name || !email) {
      alert("Please fill in all required fields");
      return;
    }

    const newMember = {
      id: members.length + 1,
      name,
      email,
      role,
      status,
      teamId: parseInt(id),
    };
    setMembers([...members, newMember]);
    router.push(`/teams/${id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddMember();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <h2 className="mb-4 text-xl font-bold">Add New Member</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="w-full mb-2 px-3 py-2 border rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={!hasPermission(['CRUD'])}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            className="w-full mb-4 px-3 py-2 border rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push(`/teams/${id}`)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
