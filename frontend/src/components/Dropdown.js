import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";

const Dropdown = ({ setClass }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <div className="spacer flex-1"></div> */}
      <FormControl sx={{ right: 0 }}>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          defaultValue={"A"}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Class"
          onChange={(e) => setClass(e.target.value)}
        >
          <MenuItem value={"A"}>10A</MenuItem>
          <MenuItem value={"B"}>10B</MenuItem>
          <MenuItem value={"C"}>10C</MenuItem>
        </Select>
      </FormControl>
      {profile?.role == "Administrator" && (
        <Button variant="contained">Submit XLSX Data</Button>
      )}
    </div>
  );
};
export default Dropdown;
