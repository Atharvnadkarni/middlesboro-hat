import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRequest } from "../hooks/useRequest";
import NumberField from "./NumberField";
import { Edit } from "@mui/icons-material";

const StudentListViewing = ({ students, exam, profile, class: classe }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">R No</TableCell>
            <TableCell align="left">Surname</TableCell>
            <TableCell align="left">First Name</TableCell>
            {profile.role == "Administrator" || (
              <TableCell align="left">Marks</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(
            profile.role,
            exam,
            classe,
            students.filter((student) => student.class_div.division == classe),
          )}

          {(profile.role == "Administrator"
            ? students.filter((st) => st.class_div.division == classe)
            : (exam == "INT"
                ? students.filter(
                    (student) => student.class_div.division == classe,
                  )
                : students.filter(
                    (student) =>
                      student.class_div.division == classe &&
                      student.marks.filter(
                        (mark) =>
                          mark.exam.abbreviation == exam &&
                          mark.subject.sub == profile.subjects[0].subject.sub,
                      )[0].score != -1000,
                  )) &&
              (exam == "INT"
                ? students.filter(
                    (student) => student.class_div.division == classe,
                  )
                : students.filter(
                    (student) =>
                      student.class_div.division == classe &&
                      student.marks.filter(
                        (mark) =>
                          mark.exam.abbreviation == exam &&
                          mark.subject.sub == profile.subjects[0].subject.sub,
                      )[0].score != -1000,
                  ))
          ).map((student) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{student.roll_no}</TableCell>
              <TableCell align="left">{student.first_name}</TableCell>
              <TableCell align="left">{student.surname}</TableCell>
              {profile.role == "Administrator" || (
                <TableCell align="left">
                  {/* {console.log("Shacri", exam)}0 */}
                  {exam == "INT"
                    ? 0
                    : student.marks.filter(
                        (mark) =>
                          mark.exam.abbreviation == exam &&
                          mark.subject.sub == profile.subjects[0].subject.sub,
                      )[0].score}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StudentListEditing = ({
  students,
  exam,
  profile,
  class: classe,
  handleSubmit,
}) => {
  const { request } = useRequest();

  const [editedMarks, setEditedMarks] = useState({});

  useEffect(() => {
    const data = {};

    students.forEach((student) => {
      const mark = student.marks.find(
        (m) =>
          m.exam.abbreviation === exam &&
          m.subject.sub === profile.subjects[0].subject.sub,
      );

      if (mark) {
        data[student.id] = {
          markId: mark.id,
          score: mark.score,
          originalScore: mark.score,
        };
      }
    });

    setEditedMarks(data);
  }, [students, exam, profile]);

  const filteredStudents =
    profile.role === "Administrator"
      ? students.filter((st) => st.class_div.division === classe)
      : exam === "INT"
        ? students.filter((st) => st.class_div.division === classe)
        : students.filter((student) => {
            const mark = student.marks.find(
              (m) =>
                m.exam.abbreviation === exam &&
                m.subject.sub === profile.subjects[0].subject.sub,
            );

            return (
              student.class_div.division === classe &&
              mark &&
              mark.score !== -1000
            );
          });

  const handleAbsentChange = (studentId, checked) => {
    setEditedMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        score: checked
          ? 500
          : prev[studentId].originalScore === 500
            ? 0
            : prev[studentId].originalScore,
      },
    }));
  };

  const handleMarkChange = (studentId, value) => {
    setEditedMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        score: Number(value),
      },
    }));
  };

  const saveChanges = async () => {
    const changed = Object.entries(editedMarks)
      .filter(([_, m]) => m.score !== m.originalScore)
      .map(([studentId, m]) => ({
        studentId: Number(studentId),
        id: m.markId,
        score: m.score,
      }));

    if (!changed.length) return;

    await request("post", "/api/mark/update", {
      marks: changed,
      exam,
      subject: profile.subjects[0].subject,
    });

    if (handleSubmit) handleSubmit();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">R No</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Absent</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredStudents.map((student) => {
              const current = editedMarks[student.id];

              if (!current) return null;

              return (
                <TableRow key={student.id}>
                  <TableCell align="center">{student.roll_no}</TableCell>

                  <TableCell>{student.first_name}</TableCell>

                  <TableCell>{student.surname}</TableCell>

                  <TableCell>
                    <Checkbox
                      checked={current.score === 500}
                      onChange={(e) =>
                        handleAbsentChange(student.id, e.target.checked)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      max={20}
                      placeholder={
                        current.score == 1000
                          ? "Enter"
                          : current.score == 500
                            ? "Absent"
                            : ""
                      }
                      value={
                        current.score === 500
                          ? "Absent"
                          : current.score == 1000
                            ? ""
                            : current.score
                      }
                      error={
                        current.score > 20 &&
                        ![500, 1000].includes(current.score)
                      }
                      sx={
                        current.score > 20 &&
                        ![500, 1000].includes(current.score)
                          ? { color: "red" }
                          : {}
                      }
                      inputMode="numeric"
                      disabled={current.score === 500}
                      onChange={(e) =>
                        handleMarkChange(student.id, e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" sx={{ mt: 2 }} onClick={saveChanges}>
        Save Changes
      </Button>
    </>
  );
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const { request, isLoading, error } = useRequest();
  const exam = useSelector((state) => state.exam.exam);
  const profile = useSelector((state) => state.profile);
  const classe = useSelector((state) => state.class);
  useEffect(() => {
    (async () => {
      const studentData = (await request("get", "/api/student")).data;
      let filteredStudentData = [];
      // if (profile?.subjects[0]?.subjects?.sub != "Hi") {
      //   console.log(exam, profile,
      //     studentData.map(
      //       (student) =>
      //         student.marks.filter(
      //           (mark) =>
      //             mark.exam.abbreviation == exam
      //         )
      //     ),
      //   );
      // filteredStudentData = studentData.filter(
      //   (student) =>
      //     student.marks.filter(
      //       (mark) =>
      //         mark.exam.abbreviation == exam &&
      //         mark.subject.sub == profile.subjects[0].subject.sub,
      //     )[0].score != -1000,
      // );
      // }
      setStudents(studentData);
    })();
  }, [exam, profile]);

  const [editing, setEditing] = useState(false);

  return (
    <div>
      <Button
        startIcon={<Edit />}
        variant="contained"
        color="secondary"
        onClick={() => setEditing((oe) => !oe)}
      >
        Edit
      </Button>
      {editing ? (
        <StudentListEditing {...{ students, exam, profile, class: classe }} />
      ) : (
        <StudentListViewing {...{ students, exam, profile, class: classe }} />
      )}
    </div>
  );
  // if (profile?.role && profile.role == "Administrator")
  //   return (
  //     <StudentListViewing {...{ students, exam, profile, class: classe }} />
  //   );
  // else
  //   return (
  //     <StudentListEditing {...{ students, exam, profile, class: classe }} />
  //   );
};
export default StudentList;
