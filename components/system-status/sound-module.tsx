import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SoundModule = () => {
  const [volume, setVolume] = useState(100);
  const muted = volume === 0;

  useEffect(() => {
    const audio = document.createElement("audio");

    const check = () => {
      setVolume(Math.round(audio.volume * 100));
    };

    check();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </TooltipTrigger>

        <TooltipContent>
          <div className="text-xs">
            <p>Status: {muted ? "Muted" : "Active"}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SoundModule;
