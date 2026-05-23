import { Button, Grid } from "@mui/material";
import TeacherCard from "../components/TeacherCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { PersonAdd } from "@mui/icons-material";
import AddEditTeacher from "../components/AddEditTeacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/teacher");
      const data = await res.data;
      setTeachers(data);
    })();
  }, []);
  return (
    <>
      <div style={{ display: "flex", marginBottom:20 }}>
        <div className="spacer" style={{ flex: 1 }} />
        <Button variant="contained" startIcon={<PersonAdd />}>Add Teacher</Button>
      </div>
      <Grid container spacing={2}>
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} />
        ))}
      </Grid>
      {/* <AddEditTeacher /> */}
    </>
  );
};
export default Teachers;
