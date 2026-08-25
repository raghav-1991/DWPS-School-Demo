import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Home from "./pages/Home.jsx";
import InteriorPage from "./pages/InteriorPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { CONTENT } from "./data/content.js";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {Object.keys(CONTENT).map((key) => (
          <Route key={key} path={"/" + key} element={<InteriorPage slug={key} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
