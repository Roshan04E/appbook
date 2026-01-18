"use client";

import { OpenAiLogoIcon } from "@phosphor-icons/react";
import {
  Wifi,
  Battery,
  Volume2,
  Search,
  Fullscreen,
  Minimize,
  Maximize,
} from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserBadge from "./chunks/user-badge";

const date = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const MacHeader = ({ user }: { user?: User }) => {
  const [time, setTime] = useState("");
  const [mobile, setMobile] = useState(false);
  const [fs, setFs] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setMobile(window.innerWidth < 640);
    };

    update();
    window.addEventListener("resize", update);
    const timer = setInterval(update, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFs(true);
    } else {
      document.exitFullscreen();
      setFs(false);
    }
  };

  return (
    <header
      className="
      w-full h-6 px-3 text-sm
      bg-white/30 backdrop-blur-sm
      flex items-center justify-between
      text-white
    "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {mobile ? (
          <OpenAiLogoIcon size={20} weight="fill" />
        ) : (
          <>
            <span>
              <Link href={"/"}>
                <OpenAiLogoIcon size={20} weight="fill" />
              </Link>
            </span>
            <span className="font-semibold">Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {!mobile && <Search size={16} />}
        <Wifi size={16} />
        {!mobile && <Volume2 size={16} />}
        <Battery size={16} />

        {/* Fullscreen button */}
        <button onClick={toggleFullscreen} className="text-xs hover:opacity-70">
          {fs ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>

        <div className="whitespace-nowrap">
          {mobile ? time : `${date} ${time}`}
        </div>

        {!!user && <UserBadge user={user} />}
      </div>
    </header>
  );
};

export default MacHeader;
