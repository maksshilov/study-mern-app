import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";

export default function useRoutes(isAuthed) {
  if (isAuthed) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} exact index />
        <Route path="/create" element={<CreatePage />} exact />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/create" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} exact />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
