import { Container } from "@mui/material";
import Header from "./components/Header";
import SubjectList from "./components/SubjectList";

const App = () => {
  return (
    <div>
      <Header />
      <Container sx={{marginTop: 3}}>
        <SubjectList />
      </Container>
    </div>
  );
};

export default App;
