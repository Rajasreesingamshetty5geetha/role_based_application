'use client'
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { FaArrowLeft} from "react-icons/fa";


const TeamMembers = ({ id }) => {  // Accept id as a prop
  const { teams, members } = useContext(AppContext);
  const router = useRouter(); 

  const team = teams.find((team) => team.id === parseInt(id));
  const teamMembers = members.filter((member) => member.teamId === parseInt(id));

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex justify-evenly gap-4 ">
          <button><FaArrowLeft onClick={() => router.push("/dashboard")} className="text-white"/></button>
          <h1 className="text-2xl font-bold">{team?.name}</h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </header>
      <div className="mb-4">
        <button
          onClick={() => router.push(`/teams/${id}/add-member`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Member
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td className="border px-4 py-2">{member.name}</td>
              <td className="border px-4 py-2">{member.email}</td>
              <td className="border px-4 py-2">{member.role}</td>
              <td className="border px-4 py-2">{member.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembers;
