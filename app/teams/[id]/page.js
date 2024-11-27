'use client'
import TeamMembers from '@/app/components/TeamMembers'
import { useParams } from 'next/navigation'

export default function TeamPage() {
  const params = useParams()
  return <TeamMembers id={params.id} />
}
