import { useState, useEffect } from "react";

export const useMediaQuery = (size: number) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    // This code only runs in the browser
    const query = `(max-width: ${size}px)`;
    const media = window.matchMedia(query);

    const listener = () => setIsMatch(media.matches);

    // Set initial value
    setIsMatch(media.matches);

    // Watch for changes
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [size]);

  return isMatch;
};

// import { useSyncExternalStore } from "react";

// export const useMediaQuery = (size: number) => {
//   const query = `(max-width: ${size}px)`;

//   // 1. Subscribe function: tells React how to listen for changes
//   const subscribe = (callback: () => void) => {
//     const media = window.matchMedia(query);
//     media.addEventListener("change", callback);
//     return () => media.removeEventListener("change", callback);
//   };

//   // 2. Snapshot function: tells React how to get the current value
//   const getSnapshot = () => {
//     return window.matchMedia(query).matches;
//   };

//   // 3. Server snapshot: what value to use during SSR (Server Side Rendering)
//   // Usually 'false' for mobile-first or a sensible default.
//   const getServerSnapshot = () => false;

//   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
// };
