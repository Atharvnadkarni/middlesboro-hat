import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import AddEditTeacher from "./AddEditTeacher";
import DeleteModal from "./DeleteModal";

const TeacherCard = ({ teacher, setEdit, setEditModalOpen, setDeleteModalOpen }) => {
  return (
    <>
      <Grid size={{ md: 3, sm: 6, xs: 12 }}>
        <Card sx={{ position: "relative", padding: 0 }}>
          <CardActions sx={{ position: "absolute", right: 0 }}>
            <IconButton onClick={() => {
                setEditModalOpen(true);
                setEdit(teacher);
              }}>
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                setDeleteModalOpen(true);
                setEdit(teacher);
              }}
            >
              <Delete />
            </IconButton>
          </CardActions>
          <CardContent sx={{ marginTop: "30px", paddingBottom: 16 }}>
            <Typography variant="h5" color="body1">
              {teacher.first_name} {teacher.surname}
            </Typography>
            {teacher.role.id == 2 ? (
              teacher.subject_classes.map((sub) => (
                <Typography variant="body1">
                  Teaches {sub.subject.sub} in 10
                  {sub.classes.map((cl) => cl.division)}
                </Typography>
              ))
            ) : (
              <Typography variant="body1">{teacher.role.role}</Typography>
            )}

            <Typography variant="body1" color="textSecondary"></Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
export default memo(TeacherCard);
