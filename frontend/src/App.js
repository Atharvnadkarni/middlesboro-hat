import { Container } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import UploadModal from "./components/UploadModal";
import Tabs from "./components/Tabs";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import Teachers from "./pages/teachers";

const App = () => {
  
  return (
    <div>
      <Header />
      <Tabs />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
