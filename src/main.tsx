import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PeoplePage } from './presentation/pages/PeoplePage';
import { VehiclePage } from "./presentation/pages/VehiclePage";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VehiclePage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );