import React from "react";
import { Routes, Route } from "react-router-dom";

import { RecipesPage } from "pages/Recipes";
import { Layout } from "components/Layout/Layout";
import { IRouter } from "./types";

export const Router: IRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/shopping-list" element={<span>TEST</span>} />
      </Route>
    </Routes>
  );
};
