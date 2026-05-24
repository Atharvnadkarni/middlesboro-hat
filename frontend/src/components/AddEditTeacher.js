import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useId, useState } from "react";
import axios from "axios";
import { useRequest } from "../hooks/useRequest";

const AddEditTeacher = () => {
  const subjectList = [
    "Math",
    "English",
    "Hindi",
    "Sci",
    "French",
    "SS",
    "HS",
    "Painting",
    "HC",
    "AI",
    "IT",
    "PE",
    "Yoga",
    "NSS",
    "MA",
    "Comp",
    "WE",
    "ATL",
    "Art",
    "Music",
    "SD",
  ];

  const classId = useId();
  const roleId = useId();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [classTr, setClassTr] = useState("No");
  const [role, setRole] = useState("Teacher");
  const [subjects, setSubjects] = useState([]);
  const {request, isLoading, error} = useRequest()

  const [formData, setFormData] = useState({
    selectValue: subjectList[0],
    classValue: "10ABC",
  });

  const handleSubmit = async () => {
    const res = await request("post", "/api/teachers", {firstName, surname, classTr, subjects, role})
  
    location.reload();

  };
  return (
    <Dialog open={true}>
      <DialogTitle>Add Teacher</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
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
              {subjectList.map((sub) => (
                <MenuItem value={sub}>{sub}</MenuItem>
              ))}
              {/* <MenuItem value={"Dance"}>Dance</MenuItem> */}
            </Select>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Select
              fullWidth
              value={formData.classValue || "10ABC"}
              onChange={(e) => {
                setFormData((ofd) => ({ ...ofd, classValue: e.target.value }));
              }}
            >
              <MenuItem value={"10ABC"}>10ABC</MenuItem>
              <MenuItem value={"10AB"}>10AB</MenuItem>
              <MenuItem value={"10AC"}>10AC</MenuItem>
              <MenuItem value={"10BC"}>10BC</MenuItem>
              <MenuItem value={"10A"}>10A</MenuItem>
              <MenuItem value={"10B"}>10B</MenuItem>
              <MenuItem value={"10C"}>10C</MenuItem>
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
                setFormData({
                  selectValue: subjectList[0],
                  classValue: "10ABC",
                });
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
        <Grid container spacing={2} sx={{ padding: 2, alignItems: "center" }}>
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                fullWidth
                // labelId={`${roleId}-label`}
                // id={roleId}
                label="Role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (e.target.value == "Administrator") setClassTr("No");
                }}
              >
                <MenuItem value="Administrator">Administrator</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
              </Select>
              <FormHelperText>Teacher Role</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth disabled={role == "Administrator"}>
              <InputLabel>Class</InputLabel>
              <Select
                fullWidth
                label="Class"
                value={classTr}
                onChange={(e) => {
                  setClassTr(e.target.value);
                }}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="10A">10A</MenuItem>
                <MenuItem value="10B">10B</MenuItem>
                <MenuItem value="10C">10C</MenuItem>
              </Select>
              <FormHelperText>Class teacher?</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Add Teacher
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddEditTeacher;
