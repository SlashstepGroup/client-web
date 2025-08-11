import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./routes/workspaces/WorkspaceListPage";
import PopupContainer from "./components/PopupContainer/PopupContainer";
import WorkspacePage from "./routes/workspaces/[workspace-id]/WorkspacePage";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export default function App() {

  return (
    <>
      <PopupContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/workspaces" />} />
        <Route path="/workspaces" element={<WorkspaceListPage />} />
        <Route path="/workspaces/:workspaceID" element={<WorkspacePage />} />
      </Routes>
    </>
  );

}