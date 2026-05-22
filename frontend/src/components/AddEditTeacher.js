import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";

const AddEditTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    selectValue: "English",
    classValue: "10A",
  });
  return (
    <Dialog open={true}>
      <DialogTitle>Add Teacher</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid size={{ xs: 6 }}>
            <TextField fullWidth label="First Name" />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField fullWidth label="Surname" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2, alignItems: "center" }}>
          <Grid size={{ xs: 6 }}>
            <Select
              fullWidth
              value={formData.selectValue || "English"}
              onChange={(e) => {
                setFormData((ofd) => ({ ...ofd, selectValue: e.target.value }));
              }}
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Math"}>Math</MenuItem>
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"Social Science"}>Social Science</MenuItem>
              <MenuItem value={"Hindi"}>Hindi</MenuItem>
              <MenuItem value={"French"}>French</MenuItem>
              <MenuItem value={"Home Science"}>Home Science</MenuItem>
              <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
              <MenuItem value={"Painting"}>Painting</MenuItem>
              <MenuItem value={"Information Technology"}>IT</MenuItem>
              <MenuItem value={"Artificial Intelligence"}>
                Artificial Intelligence
              </MenuItem>
              <MenuItem value={"Computer"}>Computer Education</MenuItem>
              <MenuItem value={"PE"}>Physical Education</MenuItem>
              <MenuItem value={"Yoga"}>Yoga</MenuItem>
              <MenuItem value={"MA"}>MA</MenuItem>
              <MenuItem value={"NSS"}>NSS</MenuItem>
              <MenuItem value={"ATL"}>ATL</MenuItem>
              <MenuItem value={"WE"}>WE</MenuItem>
              <MenuItem value={"Art"}>Art</MenuItem>
              <MenuItem value={"Music"}>Music</MenuItem>
              <MenuItem value={"SD"}>SD</MenuItem>
              {/* <MenuItem value={"Dance"}>Dance</MenuItem> */}
            </Select>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Select
              fullWidth
              value={formData.classValue || "10A"}
              onChange={(e) => {
                setFormData((ofd) => ({ ...ofd, classValue: e.target.value }));
              }}
            >
              <MenuItem value={"10A"}>10A</MenuItem>
              <MenuItem value={"10B"}>10B</MenuItem>
              <MenuItem value={"10C"}>10C</MenuItem>
              <MenuItem value={"10AB"}>10AB</MenuItem>
              <MenuItem value={"10AC"}>10AC</MenuItem>
              <MenuItem value={"10BC"}>10BC</MenuItem>
              <MenuItem value={"10ABC"}>10ABC</MenuItem>
              {/* <MenuItem value={"Dance"}>Dance</MenuItem> */}
            </Select>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <IconButton
              onClick={() => {
                if (
                  !subjects.includes({
                    subject: formData.selectValue,
                    classes: formData.classValue,
                  })
                )
                  setSubjects((old) => [
                    ...old,
                    {
                      subject: formData.selectValue,
                      classes: formData.classValue,
                    },
                  ]);
              }}
            >
              <Add />
            </IconButton>
          </Grid>
        </Grid>
        {subjects.map((sub) => (
          <Grid
            container
            spacing={2}
            sx={{ paddingInline: 2, alignItems: "center" }}
          >
            <Grid size={{ xs: 6 }}>
              <Typography variant="body1">{sub.subject}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body1">{sub.classes}</Typography>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
    </Dialog>
  );
};
export default AddEditTeacher;
