"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {
      email: "john@gmail.com",
      password: "password123",
      role: "Admin"
    },
    {
      email: "virat@gmail.com",
      password: "User@123",
      role: "User"
    }
  ]);

  const [teams, setTeams] = useState([
    { id: "1", name: "Development Team", description: "Frontend and Backend Development" },
    { id: "2", name: "Design Team", description: "UI/UX Design" },
    { id: "3", name: "Marketing Team", description: "Digital Marketing" },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com",
      teamId: "1", 
      role: "Admin", 
      isActive: true,
      status: "active" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com",
      teamId: "1", 
      role: "User", 
      isActive: true,
      status: "active"
    },
  ]);

  const updateMemberStatus = (memberId, isActive) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId
          ? { 
              ...member, 
              isActive,
              status: isActive ? "active" : "inactive"
            }
          : member
      )
    );
  };

  const addTeamMember = (newMember) => {
    setTeamMembers(prevMembers => [...prevMembers, {
      ...newMember,
      id: Date.now(),
      status: "active",
      isActive: true
    }]);
  };

  const updateTeamMember = (memberId, updatedData) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId
          ? { ...member, ...updatedData }
          : member
      )
    );
  };

  const deleteTeamMember = (memberId) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId
          ? { ...member, status: "deleted", isActive: false }
          : member
      )
    );
  };

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        setUser, 
        users, 
        setUsers,
        teams,
        setTeams,
        teamMembers,
        updateMemberStatus,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
