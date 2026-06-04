import { Container } from "@mui/material";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import SubjectList from "../components/SubjectList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const classe = useSelector(state => state.class)
  useEffect(() => {
    localStorage.setItem("class", classe);
  }, [classe]);
  return (
    <>
      <Tabs value="marktable" />
    
      <Dropdown />
      <SubjectList/>
    </>
  );
};
export default Home;
