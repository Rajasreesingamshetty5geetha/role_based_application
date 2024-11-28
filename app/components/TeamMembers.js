"use client";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const TeamMembers = ({ teamId }) => {
  const router = useRouter();
  const {
    user,
    teams,
    teamMembers,
    updateMemberStatus,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
  } = useContext(AppContext);

  const [team, setTeam] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    teamId: "",
    role: "User",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (!user && !storedUser) {
      router.push("/login");
      return;
    }

    const currentTeam = teams.find(t => t.id === teamId);
    if (currentTeam) {
      setTeam(currentTeam);
    }
  }, [teamId, user, router, teams]);

  const handleAddMember = () => {
    if (!user?.isAdmin || !team) return;
    addTeamMember({
      ...newMember,
      teamId: team.id,
    });
    setShowAddMemberModal(false);
    setNewMember({
      name: "",
      email: "",
      teamId: "",
      role: "User",
    });
  };

  const handleUpdateMember = (memberId) => {
    if (!user?.isAdmin) return;
    updateTeamMember(memberId, editingMember);
    setShowEditMemberModal(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId) => {
    if (!user?.isAdmin) return;
    if (window.confirm("Are you sure you want to delete this member?")) {
      deleteTeamMember(memberId);
    }
  };

  const handleToggleStatus = (member) => {
    if (!user?.isAdmin) return;
    updateMemberStatus(member.id, !member.isActive);
  };

  const filteredMembers = teamMembers
    .filter(member => member.teamId === teamId && member.status !== "deleted")
    .sort((a, b) => {
      if (a.status === "active" && b.status !== "active") return -1;
      if (a.status !== "active" && b.status === "active") return 1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#0d1321]">
      <header className="bg-[#1d2d44] text-white p-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className=" px-4 py-2  mr-4"
          >
            <FaArrowLeft/>
          </button>
          <h1 className="text-xl font-bold inline-block">{team?.name}</h1>
        </div>
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
          <div className="bg-[#1d2d44] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Team Members</h2>
              {user?.isAdmin && (
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Member
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#1d2d44] border-2  border-gray-400">
                <thead className="bg-[#1d2d44] border-b-2 border-gray-400">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    {user?.isAdmin && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className={`${member.status === "inactive" ? "bg-[#1d2d44]" : ""
                        }`}
                    >
                      <td className="px-6 py-2">
                        {member.name}
                        {member.status === "inactive" && (
                          <span className="ml-2 text-sm text-red-500">(Inactive)</span>
                        )}
                      </td>
                      <td className="px-6 py-2">{member.email}</td>
                      <td className="px-6 py-2">{member.role}</td>
                      <td className="px-6 py-2">
                        {user?.isAdmin ? (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={member.isActive}
                              onChange={() => handleToggleStatus(member)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        ) : (
                          <span className={member.isActive ? "text-green-600" : "text-red-600"}>
                            {member.status === "deleted" ? "Removed" : member.isActive ? "Active" : "Inactive"}
                          </span>
                        )}
                      </td>
                      {user?.isAdmin && (
                        <td className="px-6 py-2">
                          <button
                            onClick={() => {
                              setEditingMember(member);
                              setShowEditMemberModal(true);
                            }}
                            className="bg-[#1d2d44] hover:text-white mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </main>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-[#2d3a4d] bg-opacity-50 flex items-center justify-center shadow-lg shadow-white ">
          <div className="bg-[#1d2d44] p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New Member</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded text-black"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded text-black"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
            />
            <select
              className="w-full mb-3 p-2 border rounded text-black"
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
            >
              <option value="User" className="hover:bg-[#1d2d44] hover:text-white">User</option>
              <option value="Admin" className="hover:bg-[#1d2d44] hover:text-white">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="px-4 py-2 bg-[#0d1321] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-[#0d1321] text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditMemberModal && editingMember && (
        <div className="fixed inset-0 bg-[#2d3a4d] bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1d2d44] p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Member</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded text-black"
              value={editingMember.name}
              onChange={(e) =>
                setEditingMember({ ...editingMember, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded text-black"
              value={editingMember.email}
              onChange={(e) =>
                setEditingMember({ ...editingMember, email: e.target.value })
              }
            />
            <select
              className="w-full mb-3 p-2 border rounded text-black"
              value={editingMember.role}
              onChange={(e) =>
                setEditingMember({ ...editingMember, role: e.target.value })
              }
            >
              <option value="User" className="hover:bg-[#1d2d44] hover:text-white">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowEditMemberModal(false);
                  setEditingMember(null);
                }}
                className="px-4 py-2 bg-[#0d1321] rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateMember(editingMember.id)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
