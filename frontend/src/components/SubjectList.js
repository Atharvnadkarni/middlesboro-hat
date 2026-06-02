import { DataGrid } from "@mui/x-data-grid";
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "../hooks/useRequest";
const getActivityGrade = (avg) => {
  if (avg > 4) return "A";
  if (avg > 3) return "B";
  if (avg > 2) return "C";
  if (avg > 1) return "D";
  return "";
};
const SubjectList = ({ class: classe, exam }) => {
  const subjectMarksMax = {
    Math: 80,
    English: 80,
    Hindi: 80,
    Sci: 80,
    French: 80,
    SS: 80,
    HS: 70,
    Painting: 30,
    HC: 50,
    AI: 50,
    IT: 50,
  };
  const mainSubjects = ["Math", "English", "Hindi", "Sci", "French", "SS"];

  const coScholasticGroups = {
    activity: ["PE", "Yoga", "NSS", "MA"],
    skill: ["WE", "ATL", "Comp"],
  };
  const scholasticSubjectList = [
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
  ];

  const scholasticCols = [
    {
      field: "surname",
      headerName: "Surname",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "math",
      headerName: `Math-${subjectMarksMax["Math"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "math_mo_100",
      headerName: "Math/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "math_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "english",
      headerName: `English-${subjectMarksMax["English"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "english_mo_100",
      headerName: "English/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "english_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hindi",
      headerName: `Hindi-${subjectMarksMax["Hindi"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hindi_mo_100",
      headerName: "Hindi/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hindi_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sci",
      headerName: `Sci-${subjectMarksMax["Sci"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sci_mo_100",
      headerName: "Sci/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sci_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "french",
      headerName: `French-${subjectMarksMax["French"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "french_mo_100",
      headerName: "French/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "french_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ss",
      headerName: `SS-${subjectMarksMax["SS"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ss_mo_100",
      headerName: "SS/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ss_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hs",
      headerName: `Home Sci/${subjectMarksMax["HS"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hs_mo_100",
      headerName: "Home Sci/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hs_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "painting",
      headerName: `Painting-${subjectMarksMax["Painting"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "painting_mo_100",
      headerName: "Painting/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "painting_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hc",
      headerName: `Healthcare-${subjectMarksMax["HC"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hc_mo_100",
      headerName: "Healthcare/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hc_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ai",
      headerName: `AI-${subjectMarksMax["AI"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ai_mo_100",
      headerName: "AI/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ai_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "it",
      headerName: `IT/${subjectMarksMax["IT"]}`,
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "it_mo_100",
      headerName: "Info Tech/100",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "it_grade",
      headerName: "Grade",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
  ];
  const coScholasticCols = [
    {
      field: "pe",
      headerName: "PE",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "yoga",
      headerName: "Yoga",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nss",
      headerName: "NSS",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ma",
      headerName: "MA",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "activity_average",
      headerName: "Average",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "activity_grade",
      headerName: "Grade",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "we",
      headerName: "WE",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "atl",
      headerName: "ATL",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "comp",
      headerName: "Comp",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "skill_average",
      headerName: "Average",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "skill_grade",
      headerName: "Grade",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  const [columns, setColumns] = useState([
    {
      field: "roll_no",
      headerName: "Roll No",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
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

    const mapsubs = profile.subjects.map((s) => s.subject.sub);

    const hasCoScholastic = mapsubs.some((s) =>
      [...coScholasticGroups.activity, ...coScholasticGroups.skill].includes(s),
    );

    if (hasCoScholastic) {
      buildColumnsPE(false);
    } else {
      buildColumns(false);
    }
  }, []);
  const [showAllColumns, setShowAllColumns] = useState(false);
  const buildColumns = (showAll = false) => {
    const baseCols = [
      {
        field: "roll_no",
        headerName: "Roll No",
        width: 50,
        align: "center",
        headerAlign: "center",
      },
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
    ];

    const getSubjectColumns = (subject, cols) => {
      const prefix = subject.toLowerCase();

      return cols.filter(
        (col) => col.field === prefix || col.field.startsWith(`${prefix}_`),
      );
    };
    if (showAll) {
      const groupings = scholasticSubjectList.map((sub) => ({
        groupId: sub,
        children: getSubjectColumns(sub, scholasticCols).map((col) => ({
          field: col.field,
        })),
      }));
      console.log(767, showAll, groupings);

      groupingModel.current = groupings;
      let endCols = [];

      endCols = [
        { field: "total", headerName: "Total" },
        { field: "percentage", headerName: "Percentage" },
      ];
      setColumns([
        ...baseCols,
        ...scholasticCols.filter(
          (col) => !["roll_no", "first_name", "surname"].includes(col.field),
        ),
        ...endCols,
      ]);

      return;
    }

    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile?.subjects) return;

    const mapsubs = profile.subjects.map((sub) => sub.subject.sub);

    let matchedCols = [];
    let groupings = [];

    mapsubs.forEach((sub) => {
      const scholCols = getSubjectColumns(sub, scholasticCols);
      const coScholCols = getSubjectColumns(sub, coScholasticCols);
      const cols = [...scholCols, ...coScholCols];

      matchedCols.push(...cols);
      console.log(matchedCols);

      groupings.push({
        groupId: sub,
        children: cols.map((col) => ({
          field: col.field,
        })),
      });
    });
    console.log("hakd", mapsubs);

    groupingModel.current = groupings;

    setColumns([...baseCols, ...matchedCols]);
  };
  const buildColumnsPE = (showAll = false) => {
    const baseCols = [
      {
        field: "roll_no",
        headerName: "Roll No",
        width: 50,
        align: "center",
        headerAlign: "center",
      },
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
    ];

    const getSubjectColumns = (subject) => {
      const prefix = subject.toLowerCase();

      return coScholasticCols.filter(
        (col) => col.field === prefix || col.field.startsWith(`${prefix}_`),
      );
    };

    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile?.subjects) return;

    const mapsubs = profile.subjects.map((sub) => sub.subject.sub);

    if (!showAll) {
      let matchedCols = [];

      mapsubs.forEach((sub) => {
        matchedCols.push(...getSubjectColumns(sub));
      });

      const hasAllActivitySubjects = coScholasticGroups.activity.every((s) =>
        mapsubs.includes(s),
      );

      if (hasAllActivitySubjects) {
        matchedCols.push(
          coScholasticCols.find((c) => c.field === "activity_average"),
        );

        matchedCols.push(
          coScholasticCols.find((c) => c.field === "activity_grade"),
        );
      }
      const hasAllSkillSubjects = coScholasticGroups.skill.every((s) =>
        mapsubs.includes(s),
      );
      
      if (hasAllSkillSubjects) {
        matchedCols.push(
          coScholasticCols.find((c) => c.field === "skill_average"),
        );
      
        matchedCols.push(
          coScholasticCols.find((c) => c.field === "skill_grade"),
        );
      }
      groupingModel.current = null;

      setColumns([...baseCols, ...matchedCols]);

      return;
    }

    const allSubjectsToShow = [];

    if (mapsubs.some((s) => coScholasticGroups.activity.includes(s))) {
      allSubjectsToShow.push(...coScholasticGroups.activity);
    }

    if (mapsubs.some((s) => coScholasticGroups.skill.includes(s))) {
      allSubjectsToShow.push(...coScholasticGroups.skill);
    }

    let matchedCols = [];
    allSubjectsToShow.forEach((sub) => {
      matchedCols.push(...getSubjectColumns(sub));
    });
    const hasActivity = mapsubs.some((s) =>
      coScholasticGroups.activity.includes(s),
    );

    if (hasActivity) {
      matchedCols.push(
        coScholasticCols.find((c) => c.field === "activity_average"),
      );

      matchedCols.push(
        coScholasticCols.find((c) => c.field === "activity_grade"),
      );
    }
    const hasSkill = mapsubs.some((s) =>
      coScholasticGroups.skill.includes(s),
    );
    
    if (hasSkill) {
      matchedCols.push(
        coScholasticCols.find((c) => c.field === "skill_average"),
      );
    
      matchedCols.push(
        coScholasticCols.find((c) => c.field === "skill_grade"),
      );
    }

    groupingModel.current = null;

    setColumns([...baseCols, ...matchedCols]);
  };

  const [allStudents, setAllStudents] = useState([]);
  const [rawStudents, setRawStudents] = useState([]);

  useEffect(() => {
    (async () => {
      const studentres = await request("get", "/api/student");

      setAllStudents(studentres.data);
    })();
  }, []);
  useEffect(() => {
    console.log(776, allStudents, classe);
    setRawStudents(allStudents.filter((a) => a.class_div.division == classe));
  }, [classe, allStudents]);

  useEffect(() => {
    const finalStudentData = [];

    rawStudents.forEach((student, id) => {
      const row = {
        id,
        student_id: student.id,
        roll_no: student.roll_no,
        first_name: student.first_name,
        surname: student.surname,
      };

      let sum = 0;

      scholasticSubjectList.forEach((sub) => {
        const filterMarks = student.marks.filter(
          (a) => a.subject.sub === sub && a.exam.abbreviation === exam,
        );

        const scoreObj = filterMarks?.[0] ?? { score: "" };
        let score = scoreObj.score;
        let sumScore = scoreObj.score;

        if (score === -1000) {
          score = "N/A";
          sumScore = 0;
        } else if (score === 1000) {
          score = "✅";
          sumScore = 0;
        } else {
          console.log(740, subjectMarksMax[sub], sub, subjectMarksMax);
          row[`${sub.toLowerCase()}_mo_100`] = Number(
            ((score * 100) / subjectMarksMax[sub]).toFixed(1),
          );
        }
        console.log(
          "748",
          sub,
          subjectMarksMax[sub],
          sumScore,
          (sumScore * 100) / subjectMarksMax[sub],
        );
        if (sub != "AI" && subjectMarksMax[sub])
          sum += (sumScore * 100) / subjectMarksMax[sub];
        row[sub.toLowerCase()] = score ?? "";
      });
      let activityTotal = 0;
      let activityCount = 0;
      coScholasticGroups.activity.forEach((sub) => {
        const filterMarks = student.marks.filter(
          (a) => a.subject.sub === sub && a.exam.abbreviation === "SP",
        );

        const scoreObj = filterMarks?.[0] ?? { score: "" };

        let score = scoreObj.score;
        let sumScore = scoreObj.score;

        if (score === -1000) {
          score = "N/A";
          sumScore = 0;
        } else if (score === 1000) {
          score = "✅";
          sumScore = 0;
        } else if (typeof score === "number") {
          activityTotal += score / 10;
          activityCount += 1;
        }

        row[sub.toLowerCase()] = typeof score === "number" ? score / 10 : score;
      });
      let skillTotal = 0;
      let skillCount = 0;
      
      coScholasticGroups.skill.forEach((sub) => {
        const filterMarks = student.marks.filter(
          (a) => a.subject.sub === sub && a.exam.abbreviation === "SP",
        );
      
        const scoreObj = filterMarks?.[0] ?? { score: "" };
      
        let score = scoreObj.score;
      
        if (score === -1000) {
          score = "N/A";
        } else if (score === 1000) {
          score = "✅";
        } else if (typeof score === "number") {
          skillTotal += score / 10;
          skillCount += 1;
        }
      
        row[sub.toLowerCase()] =
          typeof score === "number" ? score / 10 : score;
      });
      const activityAverage =
        activityCount > 0
          ? Number((activityTotal / activityCount).toFixed(2))
          : "";

      row.activity_average = activityAverage;

      row.activity_grade =
        activityAverage !== "" ? getActivityGrade(activityAverage) : "";
      const skillAverage =
        skillCount > 0
          ? Number((skillTotal / skillCount).toFixed(2))
          : "";
      
      row.skill_average = skillAverage;
      
      row.skill_grade =
        skillAverage !== ""
          ? getActivityGrade(skillAverage)
          : "";
      console.log(sum);
      const total = sum;
      const average = total / 5;
      row.total = total;
      row.percentage = average;
      finalStudentData.push(row);
    });

    setStudents(finalStudentData);
  }, [rawStudents, exam]);
  const coScholasticFields = new Set(
    [...coScholasticGroups.activity, ...coScholasticGroups.skill].map((s) =>
      s.toLowerCase(),
    ),
  );

  const processRowUpdate = (newRow, oldRow) => {
    const changes = {};
    console.log(23, newRow, oldRow);

    Object.keys(newRow).forEach((key) => {
      if (newRow[key] !== oldRow[key]) {
        changes[key] = newRow[key];
      }
    });

    if (Object.keys(changes).length > 0) {
      console.log(23, changes);
      const editedField = Object.keys(changes)[0];
      console.log(23, editedField, coScholasticFields, changes[editedField]);

      const isCoScholastic = coScholasticFields.has(editedField);
      console.log(23, 46, isCoScholastic, typeof changes[editedField]);
      if (isCoScholastic && typeof changes[editedField] === "string") {
        changes[editedField] = (Number(changes[editedField]) * 10).toString();
        console.log(23, 23 * 4, changes, editedField);
      }

      setEditedRows((prev) => ({
        ...prev,
        [newRow.student_id]: {
          exam: isCoScholastic ? "SP" : exam,
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
      <ButtonGroup>
        <Button variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>
          Submit Changes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mb: 2, ml: 2 }}
          onClick={() => {
            const next = !showAllColumns;

            setShowAllColumns(next);

            const profile = JSON.parse(localStorage.getItem("profile"));

            const mapsubs = profile?.subjects?.map((s) => s.subject.sub) || [];

            const hasCoScholastic = mapsubs.some((s) =>
              [
                ...coScholasticGroups.activity,
                ...coScholasticGroups.skill,
              ].includes(s),
            );
            console.log(mapsubs, hasCoScholastic, 767);
            if (hasCoScholastic) {
              buildColumnsPE(next);
            } else {
              buildColumns(next);
            }
          }}
        >
          {showAllColumns ? "Show Profile Subjects" : "Show All Subjects"}
        </Button>
      </ButtonGroup>
      {console.log(748, students)}
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
