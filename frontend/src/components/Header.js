import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <CalendarMonth />
          <Typography variant="h6">Marksheet</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
