'use client'
import { Button } from '@/components/ui/button'
// import { signOut } from '@/server/lib/auth'
import { signIn, signOut } from 'next-auth/react'

export function SignButton() {
  return (
    <>
      <Button onClick={() => signIn()}>login</Button>
      <Button onClick={() => signOut()}>logout</Button>
    </>
  )
}
