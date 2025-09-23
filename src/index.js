import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import LeadForm from "./components/LeadForm";
import "./index.css";
import Agents from "./pages/Agents";
import LeadDetails from "./pages/LeadDetail";
import Leads from "./pages/Leads";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Leads />} />
          <Route path="/lead/:id" element={<LeadDetails />} />
          <Route path="/lead-form" element={<LeadForm />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
