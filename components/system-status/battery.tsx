"use client";
import {
  Battery,
  BatteryCharging,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BatteryStatus = () => {
  const [charging, setCharging] = useState<boolean | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Check support on mount (client-side only)
  useEffect(() => {
    // Only mount if Battery API is supported
    if ("getBattery" in navigator) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    // Don't run if not mounted (API not supported)
    if (!isMounted) return;

    const updateBatteryStatus = async () => {
      try {
        const battery: any = await (navigator as any).getBattery();

        const updateCharging = () => setCharging(battery.charging);
        const updateLevel = () => setLevel(battery.level);

        // Initial updates
        updateCharging();
        updateLevel();

        // Set up event listeners
        battery.onchargingchange = updateCharging;
        battery.onlevelchange = updateLevel;

        // Cleanup function
        return () => {
          battery.onchargingchange = null;
          battery.onlevelchange = null;
        };
      } catch (error) {
        console.error("Battery API error:", error);
        setIsMounted(false); // Unmount on error
      }
    };

    const cleanup = updateBatteryStatus();

    return () => {
      cleanup?.then((cleanupFn) => cleanupFn?.());
    };
  }, [isMounted]);

  // Don't render at all if API is not supported
  if (!isMounted || charging === null) return null;

  // Function to get the appropriate battery icon based on level
  const getBatteryIcon = () => {
    if (charging) {
      return <BatteryCharging size={18} className="text-green-600" />;
    }

    if (level === null) {
      return <Battery size={18} />;
    }

    if (level <= 0.2) {
      return <BatteryLow size={18} className="text-red-600" />;
    } else if (level <= 0.5) {
      return <BatteryMedium size={18} className="text-yellow-600" />;
    } else if (level <= 0.8) {
      return <Battery size={18} className="text-blue-600" />;
    } else {
      return <BatteryFull size={18} className="text-green-600" />;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            aria-label={`Battery ${charging ? "charging" : "on battery"}${level !== null ? ` at ${Math.round(level * 100)}%` : ""}`}
          >
            {getBatteryIcon()}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {charging ? "Charging" : "On Battery"}
            {level !== null && ` - ${Math.round(level * 100)}%`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BatteryStatus;
