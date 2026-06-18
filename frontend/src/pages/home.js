import { Container } from "@mui/material";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import SubjectList from "../components/SubjectList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router";

const Home = () => {
  const classe = useSelector((state) => state.class);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(params, 999);
    if (params.get("reload") == "true") {
      navigate("/");
      location.reload();
    }
  }, [params]);
  useEffect(() => {
    localStorage.setItem("class", classe);
  }, [classe]);
  return (
    <>
      <Tabs value="marktable" />

      <Dropdown />
      <SubjectList />
    </>
  );
};
export default Home;
