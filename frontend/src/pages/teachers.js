import { Grid } from "@mui/material";
import TeacherCard from "../components/TeacherCard";

const Teachers = () => {
  return (
    <Grid container spacing={2}>
      <TeacherCard />
      <TeacherCard />
      <TeacherCard />
      <TeacherCard />
      <TeacherCard />
      <TeacherCard />
      <TeacherCard />
      <TeacherCard />
    </Grid>
  );
};
export default Teachers;
