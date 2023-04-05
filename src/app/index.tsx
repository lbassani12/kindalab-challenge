import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Catalog from "../components/Catalog";
import ShowMoreCocktail from "../components/ShowMoreCocktail";

import "./styles.css";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cocktail/:id" element={<ShowMoreCocktail />} />
      </Routes>
    </Suspense>
  );
}

export default App;
