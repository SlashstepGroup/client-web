import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./compoents/WorkspaceListPage/WorkspaceListPage";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/workspaces" />} />
      <Route path="/workspaces" element={<WorkspaceListPage />} />
    </Routes>
  );

}