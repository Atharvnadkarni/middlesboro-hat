import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ setClass }) => {
  return (
    <div style={{width: "100vw"}}>
      <div className="spacer flex-1"></div>
      <FormControl fullWidth sx={{ right: 0 }}>
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
    </div>
  );
};
export default Dropdown;
