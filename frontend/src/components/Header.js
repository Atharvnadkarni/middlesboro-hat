import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import HelloTr from "./HelloTr";
const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box>
            <CalendarMonth />
            <Typography variant="h6">Marksheet</Typography>
          </Box>
          <Box>
            <HelloTr />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
