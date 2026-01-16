'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, useTransition } from "react"
import { signInUser } from "@/lib/database/users/actions"

export default function SignIn() {
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    startTransition(async () => {

      if (!email && !password) return;
      

      const {success, message} = await signInUser({email, password})
      console.log(message);
      
    })

  }
  return (
    <div className="flex h-full items-center justify-center">
      <form action={handleSignIn}>
      <Card className="w-full max-w-sm bg-white/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>

          <Button className="w-full" type="submit">
            Login
          </Button>
          <Link href={'/sign-up'}><span className="px-4 py-2 border rounded-xl bg-white/60 hover:bg-gray-100 transition-all duration-300">Sign Up</span></Link>

        </CardContent>
      </Card>
      </form>
    </div>
  )
}
