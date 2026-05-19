import { Container } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";
import { useState } from "react";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [classe, setClass] = useState();
  return (
    <div>
      <Header />
      <Container sx={{ marginTop: 3, position: "relative" }}>
        <Dropdown setClass={setClass} />
        <SubjectList class={classe} />
      </Container>
    </div>
  );
};

export default App;
