'use client';
import React, { createContext, useState, useEffect } from "react";
import { mockApi } from "../mock/api";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", password: "password123", role: "Admin",permissions: ['CRUD'] },
    { id: 2, name: "Jane Smith", email: "jane@gmail.com", password: "password123", role: "User", permissions: ['VIEW_ROLE'] },
  ]);

  // Fetch initial data (teams and members)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const teamsRes = await mockApi.get("/api/teams");
        setTeams(teamsRes.data || []); // Fallback to empty array if no data
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
      try {
        const membersRes = await mockApi.get("/api/members");
        setMembers(membersRes.data || []); // Fallback to empty array if no data
      } catch (error) {
        console.error("Error fetching members data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Add a member to a specific team
  const addMemberToTeam = (teamId, member) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? { ...team, members: [...(team.members || []), member] } // Handle undefined `team.members`
          : team
      )
    );
  };
  const hasPermission = (permissions) => {
    return permissions.some(permission => user?.permissions.includes(permission));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        teams,
        setTeams,
        members,
        setMembers,
        users,
        setUsers,
        addMemberToTeam,
        hasPermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
