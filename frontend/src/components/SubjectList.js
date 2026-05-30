import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRequest } from "../hooks/useRequest";
const SubjectList = ({ class: classe }) => {
  const [profile, setProfile] = useState([]);
  const subjectList = [
    "Math",
    "English",
    "Hindi",
    "Sci",
    "French",
    "SS",
    "HS",
    "Painting",
    "HC",
    "AI",
    "IT",
    "PE",
    "Yoga",
    "NSS",
    "MA",
    "Comp",
    "WE",
    "ATL",
    "Art",
    "Music",
    "SD",
  ];
  const allCols = [
    { field: "roll_no", headerName: "Roll No", width: 20 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 100,
      editable: true,
    },
    { field: "surname", headerName: "Surname", width: 100, editable: true },
    { field: "math", headerName: "Math", width: 90, editable: true },
    { field: "english", headerName: "English", width: 90, editable: true },
    { field: "hindi", headerName: "Hindi", width: 90, editable: true },
    { field: "sci", headerName: "Science", width: 90, editable: true },
    { field: "ss", headerName: "SS", width: 90, editable: true },
    { field: "hs", headerName: "Home Sci", width: 90, editable: true },
    { field: "it", headerName: "Info Tech", width: 90, editable: true },
    { field: "hc", headerName: "Healthcare", width: 90, editable: true },
    { field: "pt", headerName: "Painting", width: 90, editable: true },
    { field: "ai", headerName: "AI", width: 90, editable: true },
  ];
  const [columns, setColumns] = useState([
    { field: "roll_no", headerName: "Roll No", width: 20 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 100,
      editable: true,
    },
    { field: "surname", headerName: "Surname", width: 100, editable: true },
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
      {
        field: "first_name",
        headerName: "First Name",
        width: 100,
        editable: true,
      },
      { field: "surname", headerName: "Surname", width: 100, editable: true },
      ...matchedCols,
    ]);
  }, []);
  const [students, setStudents] = useState([]);
  const { request, isLoading, error } = useRequest();
  useEffect(() => {
    (async () => {
      const studentres = await request("get", "/api/student");
      const studentData = studentres.data;
      const finalStudentData = [];
      studentData.forEach((student, id) => {
        const newStudentValue = { id };
        newStudentValue["roll_no"] = student["roll_no"];
        newStudentValue["first_name"] = student["first_name"];
        newStudentValue["surname"] = student["surname"];
        subjectList.forEach((sub) => {
          const fliterMarks = student.marks.filter((a) => a.subject.sub == sub);
          const scorea = fliterMarks?.[0] ?? { score: "" };
          let score = scorea.score;
          console.log(
            "stu",
            student,
            sub,
            fliterMarks,
            fliterMarks?.[0],
            score,
          );
          if (score == -1000) score = "N/A"
          if (score == 1000) score = "✅"
          newStudentValue[sub.toLowerCase()] = score ?? "";
        });
        finalStudentData.push(newStudentValue);
      });
      setStudents(finalStudentData);
      console.log("bata", studentData, finalStudentData);
    })();
  }, []);
  // const columns = {}
  return (
    <DataGrid columns={columns} rows={students}>
      {console.log(columns, rows)}
    </DataGrid>
  );
};
export default SubjectList;
