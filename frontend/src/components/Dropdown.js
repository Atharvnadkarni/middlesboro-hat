const Dropdown = ({setClass}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Class</InputLabel>
      <Select
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
  );
};
export default Dropdown;
