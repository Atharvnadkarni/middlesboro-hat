import { Container } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import UploadModal from "./components/UploadModal";

const App = () => {
  const [classe, setClass] = useState();
  useEffect(() => {localStorage.setItem("class", classe)}, [classe])
  return (
    <div>
      <Header />
      <Container sx={{ marginTop: 3, position: "relative" }}>
        <Dropdown setClass={setClass} />
        <SubjectList class={classe} />
      </Container>
      {/* <UploadModal visibility={true} /> */}
    </div>
  );
};

export default App;
