import { Button, Grid, Skeleton } from "@mui/material";
import TeacherCard from "../components/TeacherCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { PersonAdd } from "@mui/icons-material";
import AddEditTeacher from "../components/AddEditTeacher";
import Tabs from "../components/Tabs";
import { useRequest } from "../hooks/useRequest";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState({});
  const { request, isLoading, error } = useRequest();
  useEffect(() => {
    (async () => {
      const res = await request("get", "/api/teacher");
      const data = await res.data;
      setTeachers(data);
    })();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Tabs value="teachers" />
      <div style={{ display: "flex", marginBottom: 20 }}>
        <div className="spacer" style={{ flex: 1 }} />
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Teacher
        </Button>
      </div>

      <Grid container spacing={2}>
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            onSetEdit={setEditingTeacher}
          />
        ))}
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8,9,10].map((a) => (
            <Grid item size={{ xs: 3 }}>
              <Skeleton variant="rectangular" height={130} animation="wave" />
            </Grid>
          ))}
      </Grid>
      <AddEditTeacher
        open={modalOpen}
        setOpen={setModalOpen}
        mode={{ mode: "add" }}
      />
    </>
  );
};
export default Teachers;
