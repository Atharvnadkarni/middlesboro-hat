import { Container } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";
import { useState } from "react";

const App = () => {
  const [classe, setClass] = useState()
  return (
    <div>
      <Header />
      <Dropdown setClass={setClass} />
      <Container sx={{ marginTop: 3 }}>
        <SubjectList class={classe} />
      </Container>
    </div>
  );
};

export default App;
