import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const TeacherCard = () => {
  return (
    <Grid size={{ md: 3, sm: 6, xs: 12 }}>
      <Card sx={{position: "relative", padding: 0}}>
        <CardActions sx={{position: "absolute", right: 0}}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </CardActions>
        <CardContent sx={{marginTop: "30px", paddingBottom: 16}}>
          <Typography variant="h5" color="body1">
            Agnelo DSouza
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Administrator
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default TeacherCard;
