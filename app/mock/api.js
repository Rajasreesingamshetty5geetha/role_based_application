'use client';
const mockTeams = [
  { id: 1, name: "Frontend Developers" },
  { id: 2, name: "Backend Developers" },
];

const mockMembers = [
  { id: 1, name: "Joe", email: "joe@gmail.com", role: "Admin", teamId: 1 , status: "Active"},
  { id: 2, name: "Virat", email: "virat@gmail.com", role: "User", teamId: 1, status: "Active" },
];

let currentMembers = [...mockMembers];

export const mockApi = {
  get: (url) => {
    if (url === "/api/teams") return Promise.resolve({ data: mockTeams });
    if (url === "/api/members") return Promise.resolve({ data: currentMembers });
    return Promise.reject(new Error("Not Found"));
  },

  post: (url, data) => {
    if (url === "/api/members") {
      const newMember = { id: currentMembers.length + 1, ...data };
      currentMembers.push(newMember);
      return Promise.resolve({ data: newMember });
    }
    return Promise.reject(new Error("Not Found"));
  },

  delete: (url) => {
    const idMatch = url.match(/\/api\/members\/(\d+)/);
    if (idMatch) {
      const memberId = parseInt(idMatch[1], 10);
      currentMembers = currentMembers.filter((member) => member.id !== memberId);
      return Promise.resolve({ data: { success: true } });
    }
    return Promise.reject(new Error("Not Found"));
  },

  put: (url, data) => {
    const idMatch = url.match(/\/api\/members\/(\d+)/);
    if (idMatch) {
      const memberId = parseInt(idMatch[1], 10);
      const memberIndex = currentMembers.findIndex((member) => member.id === memberId);
      if (memberIndex !== -1) {
        currentMembers[memberIndex] = { ...currentMembers[memberIndex], ...data };
        return Promise.resolve({ data: currentMembers[memberIndex] });
      }
    }
    return Promise.reject(new Error("Not Found"));
  },
};
