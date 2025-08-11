import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./global.css";
import WorkspaceListPage from "./pages/WorkspaceListPage/WorkspaceListPage";
import PopupContainer from "./components/PopupContainer/PopupContainer";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export default function App() {

  return (
    <>
      <PopupContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/workspaces" />} />
        <Route path="/workspaces" element={<WorkspaceListPage />} />
      </Routes>
    </>
  );

}