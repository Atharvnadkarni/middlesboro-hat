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
import LoginPage from "./pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container sx={{ marginTop: 3, position: "relative" }}>
        <Tabs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
