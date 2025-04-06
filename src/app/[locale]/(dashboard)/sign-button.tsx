'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export function SignButton() {
  return (
    <Button onClick={() => signIn()}>login</Button>
  )
}
