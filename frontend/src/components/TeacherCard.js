import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const TeacherCard = ({ teacher }) => {
  return (
    <Grid size={{ md: 3, sm: 6, xs: 12 }}>
      <Card sx={{ position: "relative", padding: 0 }}>
        <CardActions sx={{ position: "absolute", right: 0 }}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </CardActions>
        <CardContent sx={{ marginTop: "30px", paddingBottom: 16 }}>
          <Typography variant="h5" color="body1">
            {teacher.first_name} {teacher.surname}
          </Typography>
          {teacher.role.role == "Teacher" ? (
            <>
              <Typography variant="body1" color="textSecondary">
                {teacher.subject.length
                  ? `Teaches ${teacher.subject.map((sub) => sub.sub).join(", ")}`
                  : ""}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {teacher.class_tr
                  ? `Class Teacher of ${teacher.class_tr.grade}${teacher.class_tr.division}`
                  : ""}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="textSecondary">
              {teacher.role.role}
            </Typography>
          )}

          <Typography variant="body1" color="textSecondary"></Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default TeacherCard;
