import { Container } from "@mui/material";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import SubjectList from "../components/SubjectList";
import { useEffect, useState } from "react";

const Home = () => {
    const [classe, setClass] = useState();
  useEffect(() => {
    localStorage.setItem("class", classe);
  }, [classe]);
  return (
    <Container sx={{ marginTop: 3, position: "relative" }}>
      <Tabs />
      <Dropdown setClass={setClass} />
      <SubjectList class={classe} />
    </Container>
  );
};
export default Home;
