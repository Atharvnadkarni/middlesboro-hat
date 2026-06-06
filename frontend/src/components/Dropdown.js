import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UploadModal from "./UploadModal";
import * as XLSX from "xlsx";
import { useRequest } from "../hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { setClassValue } from "../context/slices/classSlice";
import { setExamValue } from "../context/slices/examSlice";

const Dropdown = () => {
  const exam = useSelector((store) => store.exam.exam);
  const dispatch = useDispatch();
  const setClass = (newValue) => dispatch(setClassValue(newValue));
  const setExam = (newValue) => dispatch(setExamValue(newValue));
  const profile = useSelector((state) => state.profile);
  const { request, isLoading, error } = useRequest();
  const [data, setData] = useState([]);
  const inputref = useRef();
  useEffect(() => {
    if (!profile) return;
    const mapsubs = (profile?.subjects || [null]).map((sub) => sub.subject.sub);
    console.log(1211, 1, profile, profile.subjects, mapsubs);
    if (
      mapsubs.includes("PE") ||
      mapsubs.includes("Yoga") ||
      mapsubs.includes("NSS") ||
      mapsubs.includes("MA")
    ) {
      console.log(1211, 2, mapsubs);
      setExam("SP");
    } else if (
      mapsubs.includes("WE") ||
      mapsubs.includes("ATL") ||
      mapsubs.includes("Comp")
    ) {
      setExam("SE");
    }
  }, [profile]);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async (event) => {
      const buffer = event.target.result;
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const parsedData = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];

        // Get rows as arrays instead of objects
        const rows = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });
        const data = [];

        rows.forEach((row, i) => {
          // Skip empty rows
          if (!row || row.length < 3) return;
          if (i == 0) return;

          const obj = {
            no: row[0],
            first_name: row[1],
            surname: row[2],
            subjects: row.slice(3).filter(Boolean), // Remaining columns
          };

          data.push(obj);
        });
        // console.log(data)
        parsedData.push({ excel_data: data, class_name: sheetName });
      });
      // delete parsedData[0];
      console.log(parsedData);
      setData(parsedData);
      const res = await request("post", "/api/add-students", {
        sheets: parsedData,
      });
      console.log(res.data);
      location.reload();
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
      <div>
        <FormControl sx={{ right: 0 }}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            defaultValue={"A"}
            // value={age}
            label="Class"
            onChange={(e) => setClass(e.target.value)}
          >
            <MenuItem value={"A"}>10A</MenuItem>
            <MenuItem value={"B"}>10B</MenuItem>
            <MenuItem value={"C"}>10C</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ right: 0 }}>
          <InputLabel id="demo-simple-select-label">Exam</InputLabel>
          <Select
            value={exam}
            label="Exam"
            onChange={(e) => setExam(e.target.value)}
          >
            <MenuItem value={"PT1"}>Periodic Test 1</MenuItem>
            <MenuItem value={"PT2"}>Periodic Test 2</MenuItem>
            <MenuItem value={"PT3"}>Periodic Test 3</MenuItem>
            <MenuItem value={"INT"}>Internals</MenuItem>
            <MenuItem value={"MT"}>MidTerms</MenuItem>
            <MenuItem value={"PB1"}>Pre-Board 1</MenuItem>
            <MenuItem value={"PB2"}>Pre-Board 2</MenuItem>
            <MenuItem value={"SP"}>Sports Evaluation</MenuItem>
            <MenuItem value={"SE"}>Skill Evaluation</MenuItem>
          </Select>
        </FormControl>
      </div>
      <>
        {profile?.role == "Administrator" && (
          <Button variant="contained" onClick={() => inputref.current.click()}>
            Submit XLSX Data
          </Button>
        )}
      </>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputref}
        onChange={handleFileUpload}
      />
    </div>
  );
};
export default Dropdown;
