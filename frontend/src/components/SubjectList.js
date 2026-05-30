import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "../hooks/useRequest";

const SubjectList = ({ class: classe, exam }) => {
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
    { field: "roll_no", headerName: "Roll No", width: 50 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 100,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 100,
      editable: true,
    },
    { field: "math", headerName: "Math", width: 90, editable: true },
    { field: "english", headerName: "English", width: 90, editable: true },
    { field: "hindi", headerName: "Hindi", width: 90, editable: true },
    { field: "sci", headerName: "Sci", width: 90, editable: true },
    { field: "ss", headerName: "SS", width: 90, editable: true },
    { field: "hs", headerName: "Home Sci", width: 90, editable: true },
    { field: "it", headerName: "Info Tech", width: 90, editable: true },
    { field: "hc", headerName: "Healthcare", width: 90, editable: true },
    { field: "pt", headerName: "Painting", width: 90, editable: true },
    { field: "ai", headerName: "AI", width: 90, editable: true },
  ];

  const [columns, setColumns] = useState([
    { field: "roll_no", headerName: "Roll No", width: 50 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 100,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 100,
      editable: true,
    },
  ]);

  const [students, setStudents] = useState([]);
  const [editedRows, setEditedRows] = useState({});

  const originalStudents = useRef([]);

  const { request } = useRequest();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile?.subjects) return;

    const mapsubs = profile.subjects.map((sub) => sub.subject.sub);

    const matchedCols = allCols.filter((col) =>
      mapsubs.includes(col.headerName),
    );

    setColumns([
      { field: "roll_no", headerName: "Roll No", width: 50 },
      {
        field: "first_name",
        headerName: "First Name",
        width: 100,
        editable: true,
      },
      {
        field: "surname",
        headerName: "Surname",
        width: 100,
        editable: true,
      },
      ...matchedCols,
    ]);
  }, []);

  useEffect(() => {
    (async () => {
      const studentres = await request("get", "/api/student");
      const studentData = studentres.data;

      const finalStudentData = [];

      studentData.forEach((student, id) => {
        const row = {
          id,
          student_id: student.id,
          roll_no: student.roll_no,
          first_name: student.first_name,
          surname: student.surname,
        };

        subjectList.forEach((sub) => {
          const filterMarks = student.marks.filter(
            (a) => a.subject.sub === sub && a.exam.abbreviation === exam,
          );

          const scoreObj = filterMarks?.[0] ?? { score: "" };
          let score = scoreObj.score;

          if (score === -1000) score = "N/A";
          if (score === 1000) score = "✅";

          row[sub.toLowerCase()] = score ?? "";
        });

        finalStudentData.push(row);
      });

      setStudents(finalStudentData);
      originalStudents.current = finalStudentData;
    })();
  }, [exam]);

  const processRowUpdate = (newRow, oldRow) => {
    const changes = {};

    Object.keys(newRow).forEach((key) => {
      if (newRow[key] !== oldRow[key]) {
        changes[key] = newRow[key];
      }
    });

    if (Object.keys(changes).length > 0) {
      setEditedRows((prev) => ({
        ...prev,
        [newRow.student_id]: {
          exam: exam,
          student_id: newRow.student_id,
          ...changes,
        },
      }));
    }

    setStudents((prev) =>
      prev.map((row) => (row.id === newRow.id ? newRow : row)),
    );

    return newRow;
  };

  const handleSubmit = async () => {
    const changedRows = Object.values(editedRows);

    if (changedRows.length === 0) {
      alert("No changes detected");
      return;
    }

    try {
      console.log("Submitting:", changedRows);

      await request(
        "patch",
        "/api/student/update",
        changedRows,
      );

      setEditedRows({});
      originalStudents.current = students;

      alert("Changes saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mb: 2 }}
      >
        Submit Changes
      </Button>

      <DataGrid
        rows={students}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
      />
    </>
  );
};

export default SubjectList;