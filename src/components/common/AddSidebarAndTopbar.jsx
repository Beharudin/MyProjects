import React from "react";
import Sidebar from "../../admin/scenes/global/Sidebar";
import Topbar from "../../admin/scenes/global/Topbar";

function AddSidebarAndTopbar({ children }) {
  return (
    <div className="app">
      <Sidebar isSidebar={true} />
      <main className="content">
        <Topbar setIsSidebar={true} />
        {children}
      </main>
    </div>
  );
}

export default AddSidebarAndTopbar;
