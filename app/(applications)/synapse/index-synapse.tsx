"use client";

import Dashboard from "./_components/dashboard/dashboard-synapse";
import Heroes from "./_components/sections/heros";
import { useSynapse } from "./store/useSynapse";

const Synapse = () => {
  const { route } = useSynapse();

  return (
    <>
      {route === "home" && <Heroes />}
      {route === "dashboard" && <Dashboard />}
    </>
  );
};

export default Synapse;
