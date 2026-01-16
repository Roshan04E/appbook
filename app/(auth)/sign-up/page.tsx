'use client'

import { Button } from "@/components/ui/button"
import { useWindows } from "@/context/windowContext"
import { User } from "lucide-react"
import SignUp from "./sign-up-form"

const SignInPage = () => {
    const { windows, open, restore } = useWindows()

    const win = windows.find(w => w.app === 'signIn')

    return (
        <div className="flex justify-center items-center flex-col h-200 gap-2 w-full ">
            <div className="w-lg mx-auto">
                <SignUp />
            </div>
        </div>
    )
}

export default SignInPage
