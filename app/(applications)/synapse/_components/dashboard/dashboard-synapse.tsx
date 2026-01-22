import { useEffect, useState } from "react";
import MainRouter from "./main-router-synapse";
import Sidebar from "./sidebar-synapse";
import { useMediaQuery } from "../../hooks/use-media-query";
import { useWindows } from "@/context/windowContext";

const Dashboard = () => {
  const { appWindowRef } = useWindows();
  const isMobile = useMediaQuery(appWindowRef, 768);

  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  return (
    <div className="h-full flex">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobile={isMobile}
      />
      <MainRouter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Dashboard;
