// SubjectSelectModal.jsx

import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubjectData } from "../context/slices/studentSlice";
import {
  setFormatClass,
  setFormatSubject,
} from "../context/slices/formatSlice";

import {useNavigate} from "react-router"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function SubjectSelectModal({ open, onClose, profileSubjects }) {
  const dispatch = useDispatch();

  const format = useSelector((state) => state.format.format);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const selectedSubjectObj = profileSubjects?.find(
    (s) => s.subject.sub === selectedSubject,
  );
  const navigate = useNavigate()
  const handleGenerate = () => {
    console.log(999, selectedSubject, selectedClass);
    if (!selectedSubject || !selectedClass) return;
    console.log(
      "dispatched format subject",
      selectedSubject,
      "format clas",
      selectedClass,
    );
    dispatch(setFormatSubject(selectedSubject));
    dispatch(setFormatClass(selectedClass));
    navigate("/mk-ta")
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Select Subject and Class
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>

          <Select
            value={selectedSubject}
            label="Subject"
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedClass("");
            }}
          >
            {profileSubjects?.map((subject) => (
              <MenuItem key={subject.id} value={subject.subject.sub}>
                {subject.subject.sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Class</InputLabel>

          <Select
            value={selectedClass}
            label="Class"
            disabled={!selectedSubjectObj}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {selectedSubjectObj?.classes?.map((cls) => (
              <MenuItem key={cls.id} value={`${cls.grade}${cls.division}`}>
                {cls.grade}-{cls.division}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ mt: 3 }}
          fullWidth
          variant="contained"
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </Box>
    </Modal>
  );
}
