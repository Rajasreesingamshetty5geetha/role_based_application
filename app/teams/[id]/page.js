"use client";
import { use } from 'react';
import TeamMembers from "../../components/TeamMembers";

const TeamPage = ({ params }) => {
  const resolvedParams = use(params);
  return <TeamMembers teamId={resolvedParams.id} />;
};

export default TeamPage;
