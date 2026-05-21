import { Grid } from "@mui/material";
import TeacherCard from "../components/TeacherCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/teacher");
      const data = await res.data;
      setTeachers(data)
    })();
  }, []);
  return (
    <Grid container spacing={2}>
      {teachers.map(teacher => <TeacherCard teacher={teacher} />)}
    </Grid>
  );
};
export default Teachers;
