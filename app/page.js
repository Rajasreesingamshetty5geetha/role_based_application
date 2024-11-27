'use client'
import React, { useContext, useEffect } from "react";
import Login from "../app/login/page";
import Dashboard from "../app/dashboard/page";
import TeamList from "../app/components/TeamList";
import TeamMembers from "../app/components/TeamMembers";
import AddMemberModal from "../app/components/AddMemberModal";
import { AppContext, AppProvider } from "../app/context/AppContext";
import Register from "../app/register/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {user} = useContext(AppContext);
  useEffect(() =>{
    if(user){
      router.push('/dashboard')
    }else{
      router.push('/login')
    }
  }, [user,router])
  return (
    <AppProvider>
      <Login />
      <Register />
      <Dashboard />
      <TeamList />
      <TeamMembers />
      <AddMemberModal />
    </AppProvider>
    
  );
}
