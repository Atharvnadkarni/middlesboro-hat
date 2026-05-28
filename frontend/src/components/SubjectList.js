import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const SubjectList = ({ class: classe }) => {
  const [profile, setProfile] = useState([]);
  const allCols = [
    { field: "roll_no", headerName: "Roll No", width: 20 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "math", headerName: "Math", width: 90, editable: true },
    { field: "english", headerName: "English", width: 90, editable: true },
    { field: "hindi", headerName: "Hindi", width: 90, editable: true },
    { field: "science", headerName: "Science", width: 90, editable: true },
    { field: "ss", headerName: "SS", width: 90, editable: true },
    { field: "hs", headerName: "Home Sci", width: 90, editable: true },
    { field: "it", headerName: "Info Tech", width: 90, editable: true },
    { field: "hc", headerName: "Healthcare", width: 90, editable: true },
    { field: "pt", headerName: "Painting", width: 90, editable: true },
    { field: "ai", headerName: "AI", width: 90, editable: true },
  ];
  const [columns, setColumns] = useState([
    { field: "roll_no", headerName: "Roll No", width: 20 },
    { field: "name", headerName: "Name", width: 200, editable: true },
  ]);
  const rows = [
    {
      id: 1,
      roll_no: 1,
      name: "Mehr Kahlon",
      math: 97.5,
      english: 91.875,
      hindi: 100,
      science: 100,
      ss: 91.8,
    },
  ];
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    // Guard clause in case profile or subjects don't exist yet
    if (!profile || !profile.subjects) return;

    const subjects = profile.subjects;
    const mapsubs = subjects.map((sub) => sub.subject.sub);

    // 1. Filter the dynamic columns that match the subjects
    const matchedCols = allCols.filter((col) =>
      mapsubs.includes(col.headerName),
    );

    // 2. Set the state ONCE with the initial column + the matched ones
    setColumns([
      { field: "roll_no", headerName: "Roll No", width: 50 },
      { field: "name", headerName: "Name", width: 200, editable: true },
      ...matchedCols,
    ]);
  }, []);

  // const columns = {}
  return (
    <DataGrid columns={columns} rows={rows}>
      {console.log(columns, rows)}
    </DataGrid>
  );
};
export default SubjectList;
