import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const QuickTable = ({ subject, exam, class: classe, cols, row, children }) => {
  return (
    <table className="quickTable">
      <thead>
        <tr>
          <th colSpan={4}>Vidya Vikas Academy</th>
        </tr>
        <tr>
          <th colSpan={4}>
            {subject} {exam} Marklist Of Class {classe}
          </th>
        </tr>
      </thead>
      {children}
    </table>
  );
};

const MarksheetTemplate = () => {
  const {
    class: classe,
    exam,
    marksheet: { rows, columns },
    format: { format, subject: formatSubject, class: formatClass },
    student: students,
  } = useSelector((state) => state);
  console.log(exam, "ytqat")

  console.log(students, 9991);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    const profileStr = localStorage.getItem("profile");
    setProfile(JSON.parse(profileStr));
  }, []);

  const pt1IndividualSubject = () => {
    return (
      <QuickTable subject={formatSubject} exam={exam} class={formatClass}>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Surname</th>
            <th>First Name</th>
            <th>Marks/20</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <tr>
                <td>{student.roll_no}</td>
                <td>{student.surname}</td>
                <td>{student.first_name}</td>
                <td>
                  {
                    student.marks.filter(
                      (m) =>
                        m.exam.abbreviation == exam &&
                        m.subject.sub == formatSubject,
                    )[0].score
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </QuickTable>
    );
  };
  const midTermsPBIndividualSubject = () => {
    return (
      <QuickTable subject={formatSubject} exam={exam} class={formatClass}>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Surname</th>
            <th>First Name</th>
            <th colSpan={3}>{formatSubject}</th>
          </tr>
          <tr>
            <th colSpan={3}></th>
            <th>MO/80</th>
            <th>MO/100</th>
            <th>GRADE</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <tr>
                <td>{student.roll_no}</td>
                <td>{student.surname}</td>
                <td>{student.first_name}</td>
                <td>
                  {
                    student.marks.filter(
                      (m) =>
                        m.exam.abbreviation == exam &&
                        m.subject.sub == formatSubject,
                    )[0].score
                  }
                </td>
                <td>
                  {(student.marks.filter(
                    (m) =>
                      m.exam.abbreviation == exam &&
                      m.subject.sub == formatSubject,
                  )[0].score *
                    5) /
                    4}
                </td>
              </tr>
            ))}
        </tbody>
      </QuickTable>
    );
  };
  const formatTable = {
    individual: {
      PT1: pt1IndividualSubject,
      PT2: pt1IndividualSubject,
      PT3: pt1IndividualSubject,
      MT: midTermsPBIndividualSubject,
      PB1: midTermsPBIndividualSubject,
      PB2: midTermsPBIndividualSubject,
      PB3: midTermsPBIndividualSubject,
    },
    consolidated: {
      PT1: pt1IndividualSubject,
      PT2: pt1IndividualSubject,
      PT3: pt1IndividualSubject,
      MT: midTermsPBIndividualSubject,
      PB1: midTermsPBIndividualSubject,
      PB2: midTermsPBIndividualSubject,
      PB3: midTermsPBIndividualSubject,
    },
  };

  return formatTable[format][exam]();
};
export default MarksheetTemplate;
