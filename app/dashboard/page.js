'use client';
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { mockApi } from "../mock/api";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login'); 
      return;
    }

    const fetchData = async () => {
      try {
        const teamsRes = await mockApi.get("/api/teams");
        setTeams(teamsRes.data);

        const membersRes = await mockApi.get("/api/members");
        setMembers(membersRes.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false); 
      }
    };

    fetchData();
  }, [user, router]);

  if (!user) {
    return null; 
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const handleLogout = () => {
    router.push("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        
        <h1 className="text-xl font-bold">Welcome, {user?.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        {/* Teams Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => router.push(`/teams/${team.id}`)}
                className="p-4 bg-white shadow-md rounded-md hover:shadow-lg cursor-pointer transition"
              >
                <h3 className="text-lg font-medium">{team.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
