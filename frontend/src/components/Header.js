import { AppBar, Toolbar, Typography } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <CalendarMonth />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
