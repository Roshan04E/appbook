import { Wifi, WifiOff, RefreshCw, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TEST_URL = "https://speed.cloudflare.com/__down?bytes=200000"; // 0.2 MB

const WifiStatus = () => {
  const [online, setOnline] = useState(true);
  const [speed, setSpeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testSpeed = async () => {
    if (!navigator.onLine) return;

    setLoading(true);
    const start = performance.now();
    await fetch(TEST_URL, { cache: "no-store" });
    const end = performance.now();

    const time = (end - start) / 1000;
    const mbps = (0.2 * 8) / time;

    setSpeed(mbps.toFixed(2));
    setLoading(false);
  };

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {online ? <Wifi size={18} /> : <WifiOff size={18} />}
        </TooltipTrigger>

        <TooltipContent>
          <div className="text-xs space-y-1">
            <p>Status: {online ? "Connected" : "Offline"}</p>

            {speed && <p>Speed: {speed} Mbps</p>}

            <button
              onClick={testSpeed}
              className="flex items-center gap-1 text-xs hover:underline"
            >
              {loading ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Testing...
                </>
              ) : (
                <>
                  <RefreshCw size={12} />
                  Test speed
                </>
              )}
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WifiStatus;
