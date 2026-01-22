"use client";

import DocPage from "../../_Document/document";
import { useSynapse } from "../../store/useSynapse";
import DocumentsPage from "./Documents/index-documents-synapse";

const MainRouter = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { subRoute, docId } = useSynapse();

  return (
    <div className="flex-1">
      {subRoute === "documents" && <DocumentsPage />}
      {subRoute === "tasks" && <div>Tasks Page</div>}
      {subRoute === "settings" && <div>Settings Page</div>}
      {subRoute === "document" && (
        <DocPage id={docId} isCollapsed={isCollapsed} />
      )}
    </div>
  );
};

export default MainRouter;
