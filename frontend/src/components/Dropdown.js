import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UploadModal from "./UploadModal";
import * as XLSX from "xlsx"
import {useRequest} from "../hooks/useRequest"

const Dropdown = ({ setClass }) => {
  const [profile, setProfile] = useState();
  const [data, setData] = useState([]);
  const inputref = useRef();
  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage]);
  const {request, isLoading, error} = useRequest
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file); // Reads the file safely as an ArrayBuffer

    reader.onload = (event) => {
      const buffer = event.target.result;
      const workbook = XLSX.read(buffer, { type: "buffer" });

      const sheetData = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        return {
          sheetName,
          data: XLSX.utils.sheet_to_json(worksheet),
        };
      });
      console.log(sheetData);
      setData(sheetData);
    };

  };
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
        <Button variant="contained" onClick={() => inputref.current.click()}>
          Submit XLSX Data
        </Button>
      )}
      <input type="file" style={{display: "none"}} ref={inputref} onChange={handleFileUpload} />
    </div>
  );
};
export default Dropdown;
