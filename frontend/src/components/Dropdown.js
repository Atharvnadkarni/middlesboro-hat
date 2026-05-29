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
  reader.readAsArrayBuffer(file);

  reader.onload = (event) => {
    const buffer = event.target.result;
    const workbook = XLSX.read(buffer, { type: "buffer" });

    const parsedData = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      // Get rows as arrays instead of objects
      const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      const data = []

      rows.forEach((row) => {
        // Skip empty rows
        if (!row || row.length < 3) return;

        const obj = {
          no: row[0],
          first_name: row[1],
          surname: row[2],
          subjects: row.slice(3).filter(Boolean), // Remaining columns
        };

        data.push(obj);
      });
      // console.log(data)
      parsedData.push({excel_data: data, class_name: sheetName})
    });

    console.log(parsedData);
    setData(parsedData);
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
