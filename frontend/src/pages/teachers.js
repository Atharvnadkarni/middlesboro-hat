import { Button, Grid, Tabs } from "@mui/material";
import TeacherCard from "../components/TeacherCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { PersonAdd } from "@mui/icons-material";
import AddEditTeacher from "../components/AddEditTeacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState({});
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/teacher");
      const data = await res.data;
      setTeachers(data);
    })();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Tabs />
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
          <TeacherCard key={teacher.id} teacher={teacher} onSetEdit={setEditingTeacher} />
        ))}
      </Grid>
      <AddEditTeacher
        open={modalOpen}
        setOpen={setModalOpen}
        mode={{ mode: "add" }}
      />
      <DeleteModal
        teacher={editingTeacher}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      />
      {console.log(editingTeacher)}
      <AddEditTeacher
        open={editModalOpen}
        setOpen={setEditModalOpen}
        mode={{ mode: "edit", editingTeacher }}
      />
    </>
  );
};
export default Teachers;
