'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, useTransition } from "react"
import { signUpUser } from "@/lib/database/users/actions"

export default function SignUp() {
  const [isPending, startTransition] = useTransition();


  const handleSignUp = (formData: FormData) => {

    startTransition(async () => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const {success, message} = await signUpUser({email, password})
      console.log(message);
      
    })

  }
  return (
    <div className="flex h-full items-center justify-center">
      <form action={handleSignUp}>
        <Card className="w-full max-w-sm bg-white/60 backdrop-blur-xl">
          <CardHeader >
            <CardTitle className="flex justify-between"><span>Sign Up</span></CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="you@example.com"/>
            </div>

            <div>
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="••••••••"/>
            </div>

            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <Link href={'/sign-in'}><span className="px-4 py-2 border rounded-xl bg-white/60 hover:bg-gray-100 transition-all duration-300">Sign In</span></Link>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
