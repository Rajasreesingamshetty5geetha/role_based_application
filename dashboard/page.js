"use client";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [teams, setTeams] = useState([
    { id: 1, name: "Development Team", description: "Frontend and Backend Development" },
    { id: 2, name: "Design Team", description: "UI/UX Design" },
    { id: 3, name: "Marketing Team", description: "Digital Marketing" },
  ]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#0d1321]">
      <header className="bg-[#1d2d44] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome, {user?.email}</h1>
        <div className="flex items-center gap-4">
          <span>{user?.isAdmin ? "Admin" : "User"}</span>
          <button
            onClick={() => router.push("/login")}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Teams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Link href={`/teams/${team.id}`} key={team.id}>
                <div className="bg-[#1d2d44] rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                  <p className="text-gray-400">{team.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
