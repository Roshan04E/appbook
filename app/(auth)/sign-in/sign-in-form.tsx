"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signInAction } from "@/lib/authentication/auth.action";
import {
  FingerprintIcon,
  FingerprintSimpleIcon,
  GoogleLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ShieldOff } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[320px] bg-black/40 backdrop-blur-xl border border-red-500/40 shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-medium text-red-400 tracking-widest">
            AUTH GATE
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form action={signInAction}>
            <Button
              type="submit"
              className="flex items-center justify-center gap-3 w-full
                         bg-red-400 text-white rounded-xl
                         shadow-[0_0_20px_rgba(255,0,0,0.5)]
                         transform transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.8)]"
            >
              <GoogleLogoIcon size={28} weight="bold" /> {/* Google icon */}
              Authorize with Google
            </Button>
          </form>

          {/* Separator */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-red-500/40" />
            <span className="mx-3 bg-black/60 p-1 rounded-full text-red-400 shadow-[0_0_10px_red]">
              <FingerprintSimpleIcon size={28} />
            </span>
            <div className="flex-grow border-t border-red-500/40" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
