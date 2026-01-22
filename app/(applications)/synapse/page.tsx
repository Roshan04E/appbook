"use client";
import { WindowProvider } from "@/context/windowContext";
import Synapse from "./index-synapse";

const SynapsePage = () => {
  return (
    <div className="h-full">
      <WindowProvider>
        <Synapse />
      </WindowProvider>
    </div>
  );
};

export default SynapsePage;
