'use client'

import { Button } from "@/components/ui/button"
import { useWindows } from "@/context/windowContext"
import { Smile, User } from "lucide-react"
import SignIn from "./sign-in-form"

const SignInPage = () => {
    const { windows, open, restore } = useWindows()

    const win = windows.find(w => w.app === 'signIn')

    return (
        <div className="flex justify-center items-center flex-col h-200 gap-2 ">
            <div className="w-lg">
                <SignIn />
            </div>

        </div>
    )
}

export default SignInPage
