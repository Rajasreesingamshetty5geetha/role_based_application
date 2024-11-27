'use client'
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

const TeamList = () => {
  const { teams } = useContext(AppContext);
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => router.push(`/teams/${team.id}`)}
            className="p-4 bg-gray-100 rounded-md shadow hover:shadow-lg cursor-pointer"
          >
            {team.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
