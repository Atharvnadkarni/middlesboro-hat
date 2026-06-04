import { Container } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import UploadModal from "./components/UploadModal";
import Tabs from "./components/Tabs";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Home from "./pages/home";
import Teachers from "./pages/teachers";
import LoginPage from "./pages/login";
import MarksheetTemplate from "./components/MarksheetTemplate";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("profile")) navigate("/login");
  }, []);
  return (
    <>
      <Header />
      <Container sx={{ marginTop: 3, position: "relative" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mk-ta" element={<MarksheetTemplate />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
