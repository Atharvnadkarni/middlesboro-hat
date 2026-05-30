import { Container } from "@mui/material";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import SubjectList from "../components/SubjectList";
import { useEffect, useState } from "react";

const Home = () => {
  const [classe, setClass] = useState();
  const [exam, setExam] = useState("PT1");
  useEffect(() => {
    localStorage.setItem("class", classe);
  }, [classe]);
  return (
    <>
            <Tabs />
    
      <Dropdown setClass={setClass} setExam={setExam} />
      <SubjectList class={classe} exam={exam} />
    </>
  );
};
export default Home;
