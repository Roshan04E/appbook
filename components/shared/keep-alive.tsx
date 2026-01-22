"use client";

import { useEffect, useState } from "react";

// Hook to detect when tab becomes inactive and handle accordingly
export function useTabVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

// Component to prevent tab from sleeping
export function KeepAlive() {
  useEffect(() => {
    let wakeLock: any = null;
    let audioContext: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const acquireWakeLock = async () => {
      // Method 1: Wake Lock API (prevents screen sleep on mobile/tablet)
      if ("wakeLock" in navigator) {
        try {
          wakeLock = await (navigator as any).wakeLock.request("screen");
          console.log("Wake Lock acquired");
        } catch (err) {
          console.log("Wake Lock not supported or denied");
        }
      }

      // Method 2: Silent audio to prevent throttling (works across browsers)
      try {
        audioContext = new AudioContext();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        // Set volume to 0 (silent)
        gainNode.gain.value = 0;

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();

        console.log("Silent audio running to prevent throttling");
      } catch (err) {
        console.log("Audio context setup failed");
      }
    };

    const releaseWakeLock = () => {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
      }
      if (oscillator) {
        oscillator.stop();
        oscillator = null;
      }
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
    };

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Tab hidden - keeping alive");
      } else {
        console.log("Tab visible");
        // Reacquire wake lock when tab becomes visible again
        if (!wakeLock && "wakeLock" in navigator) {
          acquireWakeLock();
        }
      }
    };

    acquireWakeLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      releaseWakeLock();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}

// Hook for apps that need continuous execution
export function useKeepAlive(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let intervalId: number;
    let audioContext: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const setup = async () => {
      // Create silent audio
      try {
        audioContext = new AudioContext();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
      } catch (err) {
        console.warn("Audio setup failed:", err);
      }

      // Heartbeat to prevent GC and maintain execution
      intervalId = window.setInterval(() => {
        // Perform a tiny operation to keep the event loop active
        const timestamp = Date.now();
        performance.mark(`keep-alive-${timestamp}`);
      }, 1000);
    };

    setup();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (oscillator) oscillator.stop();
      if (audioContext) audioContext.close();
    };
  }, [enabled]);
}
