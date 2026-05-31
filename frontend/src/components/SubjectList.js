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
    { field: "roll_no", headerName: "Roll No", width: 50, align: "center", headerAlign: "center" },
    {
      field: "first_name",
      headerName: "First Name",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "math", headerName: "Math/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "math_mo_100", headerName: "Math/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "math_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "english", headerName: "English/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "english_mo_100",
      headerName: "English/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "english_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "hindi", headerName: "Hindi/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "hindi_mo_100",
      headerName: "Hindi/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "hindi_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sci", headerName: "Sci/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sci_mo_100", headerName: "Sci/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sci_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "french", headerName: "French/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "french_mo_100",
      headerName: "French/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "french_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ss", headerName: "SS/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ss_mo_100", headerName: "SS/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ss_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "hs", headerName: "Home Sci/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "hs_mo_100",
      headerName: "Home Sci/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "hs_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "painting", headerName: "Painting/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "painting_mo_100",
      headerName: "Painting/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "painting_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "hc", headerName: "Healthcare/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "hc_mo_100",
      headerName: "Healthcare/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "hc_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ai", headerName: "AI/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ai_mo_100", headerName: "AI/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ai_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "it", headerName: "Info Tech/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "it_mo_100",
      headerName: "Info Tech/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "it_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "pe", headerName: "PE/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "pe_mo_100", headerName: "PE/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "pe_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "yoga", headerName: "Yoga/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "yoga_mo_100", headerName: "Yoga/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "yoga_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "nss", headerName: "NSS/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "nss_mo_100", headerName: "NSS/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "nss_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ma", headerName: "MA/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ma_mo_100", headerName: "MA/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ma_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "comp", headerName: "Comp/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "comp_mo_100", headerName: "Comp/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "comp_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "we", headerName: "WE/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "we_mo_100", headerName: "WE/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "we_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "atl", headerName: "ATL/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "atl_mo_100", headerName: "ATL/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "atl_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "art", headerName: "Art/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "art_mo_100", headerName: "Art/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "art_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "music", headerName: "Music/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    {
      field: "music_mo_100",
      headerName: "Music/100",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "music_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sd", headerName: "SD/80", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sd_mo_100", headerName: "SD/100", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sd_grade", headerName: "Grade", width: 90, editable: true, align: "center", headerAlign: "center" },
  ];

  const [columns, setColumns] = useState([
    { field: "roll_no", headerName: "Roll No", width: 50, align: "center", headerAlign: "center" },
    {
      field: "first_name",
      headerName: "First Name",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
  ]);

  const [students, setStudents] = useState([]);
  const groupingModel = useRef([]);
  const [editedRows, setEditedRows] = useState({});

  const originalStudents = useRef([]);

  const { request } = useRequest();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile?.subjects) return;

    const mapsubs = profile.subjects.map((sub) => sub.subject.sub);
    let matchedCols = [];
    let groupings = [];

    for (const sub of mapsubs) {
      const cols = allCols.filter((a) => a.field.includes(sub.toLowerCase()));
      const colFields = cols.map((col) => ({ field: col.field }));
      matchedCols.push(...cols);
      const grouping = { groupId: sub, children: colFields, align: "center", headerAlign: "center" };
      groupings.push(grouping);
    }

    groupingModel.current = groupings;
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
          else if (score === 1000) score = "✅";
          else {
            row[`${sub.toLowerCase()}_mo_100`] = Number((score * 5 / 4).toFixed(1));
          }

          row[sub.toLowerCase()] = score ?? "";
        });

        finalStudentData.push(row);
      });
      console.log(finalStudentData);

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
      return;
    }

    try {
      console.log("Submitting:", changedRows);

      await request("patch", "/api/student/update", changedRows);

      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>
        Submit Changes
      </Button>

      <DataGrid
        rows={students}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        columnGroupingModel={groupingModel.current}
        getCellClassName={(params) => {
          console.log(params);
          if (params.field === "first_name" || params.field === "surname") {
            console.log("1860 munchen");
            return "";
          }
          console.log("centerre");
          return "center";
        }}
      />
    </>
  );
};

export default SubjectList;
