import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import UploadModal from "./components/UploadModal";
import Tabs from "./components/Tabs";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Home from "./pages/home";
import Teachers from "./pages/teachers";
import LoginPage from "./pages/login";
import MarksheetTemplate from "./components/MarksheetTemplate";
import { setProfileValue } from "./context/slices/profileSlice";
import { useDispatch } from "react-redux";
import { setStudentsValue } from "./context/slices/studentSlice";
import { useRequest } from "./hooks/useRequest";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useRequest();

  useEffect(() => {
    if (!localStorage.getItem("profile")) navigate("/login");
    else dispatch(setProfileValue(JSON.parse(localStorage.getItem("profile"))));

    (async () => {
      const studentres = await request("get", "/api/student");
      dispatch(setStudentsValue(studentres.data));
    })();
  }, []);

  const location = useLocation();
  console.log(location, "sofi");

  return (
    <>
      {location.pathname != "/mk-ta" && <Header />}
      <Container sx={{ marginTop: 3, position: "relative" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mk-ta" element={<MarksheetTemplate />} />
        </Routes>
      </Container>
      <Box
        component="footer"
        sx={{ py: 2, mt: 4, position: "absolute", bottom: 0, textAlign: "center", bgcolor: "#f5f5f5" }}
      >
        {new Date().getFullYear()} Atharv Nadkarni.
      </Box>
    </>
  );
};

export default App;
