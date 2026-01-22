"use client";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMediaQuery = (ref: any, size: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(window.innerWidth < size);

    if (!ref?.current) return;

    const obs = new ResizeObserver(([e]) => {
      setIsMobile(e.contentRect.width < size);
    });

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [size, ref]);

  return isMobile;
};
