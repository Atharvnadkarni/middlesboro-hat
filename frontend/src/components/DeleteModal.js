import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
} from "@mui/material";
import { useRequest } from "../hooks/useRequest";

const DeleteModal = ({ teacher, open, setOpen }) => {
  const { request, isLoading, error } = useRequest();
  const handleDelete = async () => {
    const res = await request("delete", `/api/teacher/${teacher.id}`);
  };
  return (
    <Dialog
      keepMounted
      slots={{ transition: Grow }}
      open={!!teacher}
      onClose={() => setOpen(false)}
    >
      <Box sx={{ justifyContent: "space-between" }}>
        <DialogTitle>Delete Teacher?</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <b>
            {teacher.first_name} {teacher.surname}
          </b>
          ? This action is <b>irreversible</b> and you will have to re-add the
          teacher.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="standard" onClick={handleDelete}>
          Delete Teacher
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteModal;
