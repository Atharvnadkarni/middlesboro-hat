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
  const isPeriodicTest = ["PT1", "PT2", "PT3"].includes(exam);
  const isInternal = exam === "INT";

  const subjectMarksMax = {
    Math: 80, English: 80, Hindi: 80, Sci: 80, French: 80,
    SS: 80, HS: 70, Painting: 30, HC: 50, AI: 50, IT: 50,
  };
  const mainSubjects = ["Math", "English", "Hindi", "Sci", "French", "SS"];

  const coScholasticGroups = {
    activity: ["PE", "Yoga", "NSS", "MA"],
    skill: ["WE", "ATL", "Comp"],
  };
  const scholasticSubjectList = [
    "Math", "English", "Hindi", "Sci", "French", "SS",
    "HS", "Painting", "HC", "AI", "IT",
  ];

  const scholasticCols = [
    { field: "surname", headerName: "Surname", width: 100, editable: true, align: "center", headerAlign: "center" },
    { field: "math", headerName: `Math/${isPeriodicTest ? 20 : subjectMarksMax["Math"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "math_mo_100", headerName: "Math/100", width: 90, align: "center", headerAlign: "center" },
    { field: "math_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "english", headerName: `English/${isPeriodicTest ? 20 : subjectMarksMax["English"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "english_mo_100", headerName: "English/100", width: 90, align: "center", headerAlign: "center" },
    { field: "english_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "hindi", headerName: `Hindi/${isPeriodicTest ? 20 : subjectMarksMax["Hindi"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "hindi_mo_100", headerName: "Hindi/100", width: 90, align: "center", headerAlign: "center" },
    { field: "hindi_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "sci", headerName: `Sci/${isPeriodicTest ? 20 : subjectMarksMax["Sci"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "sci_mo_100", headerName: "Sci/100", width: 90, align: "center", headerAlign: "center" },
    { field: "sci_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "french", headerName: `French/${isPeriodicTest ? 20 : subjectMarksMax["French"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "french_mo_100", headerName: "French/100", width: 90, align: "center", headerAlign: "center" },
    { field: "french_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "ss", headerName: `SS/${isPeriodicTest ? 20 : subjectMarksMax["SS"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ss_mo_100", headerName: "SS/100", width: 90, align: "center", headerAlign: "center" },
    { field: "ss_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "hs", headerName: `Home Sci/${isPeriodicTest ? 20 : subjectMarksMax["HS"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "hs_mo_100", headerName: "Home Sci/100", width: 90, align: "center", headerAlign: "center" },
    { field: "hs_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "painting", headerName: `Painting/${isPeriodicTest ? 20 : subjectMarksMax["Painting"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "painting_mo_100", headerName: "Painting/100", width: 90, align: "center", headerAlign: "center" },
    { field: "painting_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "hc", headerName: `Healthcare/${isPeriodicTest ? 20 : subjectMarksMax["HC"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "hc_mo_100", headerName: "Healthcare/100", width: 90, align: "center", headerAlign: "center" },
    { field: "hc_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "ai", headerName: `AI/${isPeriodicTest ? 20 : subjectMarksMax["AI"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ai_mo_100", headerName: "AI/100", width: 90, align: "center", headerAlign: "center" },
    { field: "ai_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
    { field: "it", headerName: `IT/${isPeriodicTest ? 20 : subjectMarksMax["IT"]}`, width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "it_mo_100", headerName: "Info Tech/100", width: 90, align: "center", headerAlign: "center" },
    { field: "it_grade", headerName: "Grade", width: 90, align: "center", headerAlign: "center" },
  ];

  const coScholasticCols = [
    { field: "pe", headerName: "PE", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "yoga", headerName: "Yoga", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "nss", headerName: "NSS", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "ma", headerName: "MA", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "activity_average", headerName: "Average", width: 100, align: "center", headerAlign: "center" },
    { field: "activity_grade", headerName: "Grade", width: 100, align: "center", headerAlign: "center" },
    { field: "we", headerName: "WE", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "atl", headerName: "ATL", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "comp", headerName: "Comp", width: 90, editable: true, align: "center", headerAlign: "center" },
    { field: "skill_average", headerName: "Average", width: 100, align: "center", headerAlign: "center" },
    { field: "skill_grade", headerName: "Grade", width: 100, align: "center", headerAlign: "center" },
  ];

  // ─── Build INT columns per subject ────────────────────────────────────────
  const buildInternalColsForSubject = (sub) => {
    const prefix = sub.toLowerCase();
    return [
      { field: `${prefix}_pt1`,        headerName: "PT1",                  width: 70,  editable: false, align: "center", headerAlign: "center" },
      { field: `${prefix}_pt2`,        headerName: "PT2",                  width: 70,  editable: false, align: "center", headerAlign: "center" },
      { field: `${prefix}_pt3`,        headerName: "PT3",                  width: 70,  editable: false, align: "center", headerAlign: "center" },
      { field: `${prefix}_best_pt`,    headerName: "Best PT",              width: 80,  editable: false, align: "center", headerAlign: "center" },
      { field: `${prefix}_pt`,         headerName: "PT",                   width: 60,  editable: false, align: "center", headerAlign: "center" },
      { field: `${prefix}_mul_assess`, headerName: "Multiple Assessment",  width: 140, editable: true,  align: "center", headerAlign: "center" },
      { field: `${prefix}_portfolio`,  headerName: "Portfolio",            width: 100, editable: true,  align: "center", headerAlign: "center" },
      { field: `${prefix}_sub_enrich`, headerName: "Subject Enrichment",   width: 140, editable: true,  align: "center", headerAlign: "center" },
      { field: `${prefix}_total_int`,  headerName: "Total Internal Marks", width: 140, editable: false, align: "center", headerAlign: "center" },
    ];
  };

  const [columns, setColumns] = useState([
    { field: "roll_no",     headerName: "Roll No",    width: 50,  align: "center", headerAlign: "center" },
    { field: "first_name",  headerName: "First Name", width: 100, editable: true,  align: "center", headerAlign: "center" },
    { field: "surname",     headerName: "Surname",    width: 100, editable: true,  align: "center", headerAlign: "center" },
  ]);

  const [students, setStudents] = useState([]);
  const groupingModel = useRef([]);
  const [editedRows, setEditedRows] = useState({});
  const originalStudents = useRef([]);
  const { request } = useRequest();

  // ─── Track which fields are INT-editable ──────────────────────────────────
  const internalEditableFields = useRef(new Set());

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile?.subjects) return;

    if (exam === "SP" || exam === "SE") {
      buildColumnsPE(false);
    } else if (exam === "INT") {
      buildColumnsINT();
    } else {
      buildColumns(false);
    }
  }, [exam]);

  const [showAllColumns, setShowAllColumns] = useState(false);

  // ─── Build INT columns ────────────────────────────────────────────────────
  const buildColumnsINT = () => {
    const baseCols = [
      { field: "roll_no",    headerName: "Roll No",    width: 50,  align: "center", headerAlign: "center" },
      { field: "first_name", headerName: "First Name", width: 100, editable: false, align: "center", headerAlign: "center" },
      { field: "surname",    headerName: "Surname",    width: 100, editable: false, align: "center", headerAlign: "center" },
    ];

    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile?.subjects) return;

    const mapsubs = profile.subjects.map((s) => s.subject.sub);
    const editableFields = new Set();
    const groupings = [];
    let allSubjectCols = [];

    mapsubs.forEach((sub) => {
      const cols = buildInternalColsForSubject(sub);
      allSubjectCols.push(...cols);

      // track editable field names
      cols.forEach((c) => { if (c.editable) editableFields.add(c.field); });

      groupings.push({
        groupId: sub,
        children: cols.map((col) => ({ field: col.field })),
      });
    });

    internalEditableFields.current = editableFields;
    groupingModel.current = groupings;
    setColumns([...baseCols, ...allSubjectCols]);
  };

  const buildColumns = (showAll = false) => {
    const baseCols = [
      { field: "roll_no",    headerName: "Roll No",    width: 50,  align: "center", headerAlign: "center" },
      { field: "first_name", headerName: "First Name", width: 100, editable: true,  align: "center", headerAlign: "center" },
      { field: "surname",    headerName: "Surname",    width: 100, editable: true,  align: "center", headerAlign: "center" },
    ];

    const getSubjectColumns = (subject, cols) => {
      const prefix = subject.toLowerCase();
      if (isPeriodicTest) return cols.filter((col) => col.field === prefix);
      return cols.filter((col) => col.field === prefix || col.field.startsWith(`${prefix}_`));
    };

    if (showAll) {
      const groupings = isPeriodicTest
        ? []
        : scholasticSubjectList.map((sub) => ({
            groupId: sub,
            children: getSubjectColumns(sub, scholasticCols).map((col) => ({ field: col.field })),
          }));

      groupingModel.current = isPeriodicTest ? [] : groupings;
      const endCols = [
        { field: "total",      headerName: "Total" },
        { field: "percentage", headerName: "Percentage" },
      ];
      setColumns([
        ...baseCols,
        ...scholasticCols.filter((col) => {
          if (["roll_no", "first_name", "surname"].includes(col.field)) return false;
          if (isPeriodicTest) return !col.field.includes("_");
          return true;
        }),
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
      groupings.push({ groupId: sub, children: cols.map((col) => ({ field: col.field })) });
    });

    groupingModel.current = isPeriodicTest ? [] : groupings;
    setColumns([...baseCols, ...matchedCols]);
  };

  const buildColumnsPE = (showAll = false) => {
    const baseCols = [
      { field: "roll_no",    headerName: "Roll No",    width: 50,  align: "center", headerAlign: "center" },
      { field: "first_name", headerName: "First Name", width: 100, editable: true,  align: "center", headerAlign: "center" },
      { field: "surname",    headerName: "Surname",    width: 100, editable: true,  align: "center", headerAlign: "center" },
    ];

    const getSubjectColumns = (subject) => {
      const prefix = subject.toLowerCase();
      return coScholasticCols.filter(
        (col) => col.field === prefix || col.field.startsWith(`${prefix}_`)
      );
    };

    const subjectsToShow =
      exam === "SP" ? coScholasticGroups.activity :
      exam === "SE" ? coScholasticGroups.skill : [];

    let matchedCols = [];
    subjectsToShow.forEach((sub) => { matchedCols.push(...getSubjectColumns(sub)); });

    if (exam === "SP") {
      matchedCols.push(coScholasticCols.find((c) => c.field === "activity_average"));
      matchedCols.push(coScholasticCols.find((c) => c.field === "activity_grade"));
    }
    if (exam === "SE") {
      matchedCols.push(coScholasticCols.find((c) => c.field === "skill_average"));
      matchedCols.push(coScholasticCols.find((c) => c.field === "skill_grade"));
    }

    groupingModel.current = null;
    setColumns([...baseCols, ...matchedCols.filter(Boolean)]);
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
    setRawStudents(allStudents.filter((a) => a.class_div.division == classe));
  }, [classe, allStudents]);

  // ─── Row building ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isInternal) {
      buildInternalRows();
    } else {
      buildStandardRows();
    }
  }, [rawStudents, exam]);

  const buildInternalRows = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const mapsubs = profile?.subjects?.map((s) => s.subject.sub) ?? [];
    const finalStudentData = [];

    rawStudents.forEach((student, id) => {
      const row = {
        id,
        student_id: student.id,
        roll_no: student.roll_no,
        first_name: student.first_name,
        surname: student.surname,
      };

      mapsubs.forEach((sub) => {
        const prefix = sub.toLowerCase();

        // Pull PT1, PT2, PT3 scores from marks
        const getPTScore = (examAbbr) => {
          const mark = student.marks.find(
            (m) => m.subject.sub === sub && m.exam.abbreviation === examAbbr
          );
          if (!mark || mark.score === undefined || mark.score === null) return "";
          if (mark.score === -1000) return "N/A";
          if (mark.score === 1000) return "✅";
          return mark.score;
        };

        const pt1 = getPTScore("PT1");
        const pt2 = getPTScore("PT2");
        const pt3 = getPTScore("PT3");

        row[`${prefix}_pt1`] = pt1;
        row[`${prefix}_pt2`] = pt2;
        row[`${prefix}_pt3`] = pt3;

        // Best PT = sum of two highest numeric PT scores
        const numericPTs = [pt1, pt2, pt3].filter((v) => typeof v === "number");
        numericPTs.sort((a, b) => b - a);
        const bestPT = numericPTs.length >= 2
          ? numericPTs[0] + numericPTs[1]
          : numericPTs.length === 1
            ? numericPTs[0]
            : "";

        row[`${prefix}_best_pt`] = bestPT;
        row[`${prefix}_pt`] = bestPT !== "" ? Math.ceil(bestPT / 8) : "";

        // Editable internal fields — pull existing values if available
        const internalMark = student.internals?.find?.(
          (i) => i.subject?.sub === sub
        );

        const mulAssess = internalMark?.multiple_assessment ?? "";
        const portfolio = internalMark?.portfolio ?? "";
        const subEnrich = internalMark?.subject_enrichment ?? "";

        row[`${prefix}_mul_assess`] = mulAssess;
        row[`${prefix}_portfolio`]  = portfolio;
        row[`${prefix}_sub_enrich`] = subEnrich;

        // Total Internal Marks = PT + Multiple Assessment + Portfolio + Subject Enrichment
        const ptVal  = row[`${prefix}_pt`];
        const maVal  = typeof mulAssess === "number" ? mulAssess : Number(mulAssess) || 0;
        const pfVal  = typeof portfolio === "number" ? portfolio : Number(portfolio) || 0;
        const seVal  = typeof subEnrich === "number" ? subEnrich : Number(subEnrich) || 0;

        row[`${prefix}_total_int`] = ptVal !== "" ? ptVal + maVal + pfVal + seVal : "";
      });

      finalStudentData.push(row);
    });

    setStudents(finalStudentData);
  };

  const buildStandardRows = () => {
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
          (a) => a.subject.sub === sub && a.exam.abbreviation === exam
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
          row[`${sub.toLowerCase()}_mo_100`] = Number(
            ((score * 100) / subjectMarksMax[sub]).toFixed(1)
          );
        }

        if (sub !== "AI" && subjectMarksMax[sub])
          sum += (sumScore * 100) / subjectMarksMax[sub];

        row[sub.toLowerCase()] = score ?? "";
      });

      let activityTotal = 0, activityCount = 0;
      coScholasticGroups.activity.forEach((sub) => {
        const filterMarks = student.marks.filter(
          (a) => a.subject.sub === sub && a.exam.abbreviation === "SP"
        );
        const scoreObj = filterMarks?.[0] ?? { score: "" };
        let score = scoreObj.score;

        if (score === -1000) { score = "N/A"; }
        else if (score === 1000) { score = "✅"; }
        else if (typeof score === "number") { activityTotal += score / 10; activityCount += 1; }

        row[sub.toLowerCase()] = typeof score === "number" ? score / 10 : score;
      });

      let skillTotal = 0, skillCount = 0;
      coScholasticGroups.skill.forEach((sub) => {
        const filterMarks = student.marks.filter(
          (a) => a.subject.sub === sub && a.exam.abbreviation === "SP"
        );
        const scoreObj = filterMarks?.[0] ?? { score: "" };
        let score = scoreObj.score;

        if (score === -1000) { score = "N/A"; }
        else if (score === 1000) { score = "✅"; }
        else if (typeof score === "number") { skillTotal += score / 10; skillCount += 1; }

        row[sub.toLowerCase()] = typeof score === "number" ? score / 10 : score;
      });

      const activityAverage = activityCount > 0 ? Number((activityTotal / activityCount).toFixed(2)) : "";
      row.activity_average = activityAverage;
      row.activity_grade = activityAverage !== "" ? getActivityGrade(activityAverage) : "";

      const skillAverage = skillCount > 0 ? Number((skillTotal / skillCount).toFixed(2)) : "";
      row.skill_average = skillAverage;
      row.skill_grade = skillAverage !== "" ? getActivityGrade(skillAverage) : "";

      row.total = sum;
      row.percentage = sum / 5;
      finalStudentData.push(row);
    });

    setStudents(finalStudentData);
  };

  const coScholasticFields = new Set(
    [...coScholasticGroups.activity, ...coScholasticGroups.skill].map((s) => s.toLowerCase())
  );

  // ─── Row update handler ───────────────────────────────────────────────────
  const processRowUpdate = (newRow, oldRow) => {
    const changes = {};
    Object.keys(newRow).forEach((key) => {
      if (newRow[key] !== oldRow[key]) changes[key] = newRow[key];
    });

    if (Object.keys(changes).length === 0) return newRow;

    if (isInternal) {
      // Recalculate total_int for any subject whose editable field changed
      const profile = JSON.parse(localStorage.getItem("profile"));
      const mapsubs = profile?.subjects?.map((s) => s.subject.sub) ?? [];
      const updatedRow = { ...newRow };

      mapsubs.forEach((sub) => {
        const prefix = sub.toLowerCase();
        const ptVal  = updatedRow[`${prefix}_pt`];
        const maVal  = Number(updatedRow[`${prefix}_mul_assess`]) || 0;
        const pfVal  = Number(updatedRow[`${prefix}_portfolio`])  || 0;
        const seVal  = Number(updatedRow[`${prefix}_sub_enrich`]) || 0;
        updatedRow[`${prefix}_total_int`] = ptVal !== "" ? ptVal + maVal + pfVal + seVal : "";
      });

      // Accumulate editable changes per student keyed by subject
      setEditedRows((prev) => {
        const existing = prev[newRow.student_id] ?? { student_id: newRow.student_id, subjects: {} };
        const updatedSubjects = { ...existing.subjects };

        Object.keys(changes).forEach((field) => {
          if (!internalEditableFields.current.has(field)) return;

          // field format: `${prefix}_mul_assess` | `${prefix}_portfolio` | `${prefix}_sub_enrich`
          const matchedSub = mapsubs.find((sub) =>
            field.startsWith(sub.toLowerCase() + "_")
          );
          if (!matchedSub) return;
          const prefix = matchedSub.toLowerCase();

          if (!updatedSubjects[matchedSub]) updatedSubjects[matchedSub] = {};

          if (field === `${prefix}_mul_assess`) updatedSubjects[matchedSub].multiple_assessment = changes[field];
          if (field === `${prefix}_portfolio`)  updatedSubjects[matchedSub].portfolio           = changes[field];
          if (field === `${prefix}_sub_enrich`) updatedSubjects[matchedSub].subject_enrichment  = changes[field];
        });

        return { ...prev, [newRow.student_id]: { student_id: newRow.student_id, subjects: updatedSubjects } };
      });

      setStudents((prev) => prev.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
      return updatedRow;
    }

    // Standard (non-INT) path
    const editedField = Object.keys(changes)[0];
    const isCoScholastic = coScholasticFields.has(editedField);

    if (isCoScholastic && typeof changes[editedField] === "string") {
      changes[editedField] = (Number(changes[editedField]) * 10).toString();
    }

    setEditedRows((prev) => ({
      ...prev,
      [newRow.student_id]: {
        exam: isCoScholastic ? "SP" : exam,
        student_id: newRow.student_id,
        ...changes,
      },
    }));

    setStudents((prev) => prev.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const changedRows = Object.values(editedRows);
    if (changedRows.length === 0) return;

    try {
      if (isInternal) {
        // Shape: [{ student_id, subjects: { Math: { multiple_assessment, portfolio, subject_enrichment }, ... } }]
        await request("patch", "/api/student/internals", changedRows);
      } else {
        await request("patch", "/api/student/update", changedRows);
      }
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
        {!isInternal && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ mb: 2, ml: 2 }}
            onClick={() => {
              const next = !showAllColumns;
              setShowAllColumns(next);
              if (exam === "SP" || exam === "SE") {
                buildColumnsPE(next);
              } else {
                buildColumns(next);
              }
            }}
          >
            {showAllColumns ? "Show Profile Subjects" : "Show All Subjects"}
          </Button>
        )}
      </ButtonGroup>
      <DataGrid
        rows={students}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        columnGroupingModel={groupingModel.current}
        getCellClassName={(params) => {
          if (params.field === "first_name" || params.field === "surname") return "";
          return "center";
        }}
      />
    </>
  );
};

export default SubjectList;