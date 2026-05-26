import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((ofd) => ({
      ...ofd,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* Left Side */}
      

      {/* Right Side */}
      <Grid
        size={{ xs: 12, md: 12 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            Login
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Enter your credentials below
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Sign In
            </Button>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link href="#" underline="hover">
                Forgot Password?
              </Link>

              <Link href="#" underline="hover">
                Create Account
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}