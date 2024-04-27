import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'; // Import Paper component
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import config from '../config';

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedTerms: false, 
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.agreedTerms) {
      toast.error('Please agree to the terms and conditions.');
      return;
    }
    
    if (user.password !== user.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${config.url}/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const res_data=await response.json();
      console.log("Response from server",res_data.extraDetails);
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          agreedTerms: false, 
        });
        toast.success("Registration Successfull!");  
        navigate('/');
      }else{
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
      }
      
    } catch (error) {
      console.log("Registration Error", error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" color="#fff">
            Sign Up
          </Typography>
          <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 5, backgroundColor: '#fff' }}>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="off"
                value={user.phone}
                onChange={handleInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Re-enter Password"
                type="password"
                id="confirmPassword"
                autoComplete="off"
                value={user.confirmPassword}
                onChange={handleInput}
              />
              <FormControlLabel
                control={<Checkbox 
                           value={user.agreedTerms} 
                           color="primary" 
                           onChange={(e) => setUser({ ...user, agreedTerms: e.target.checked })} 
                        />}
                label={<Typography color="#0b0b0b">I agree to the <a href='/terms&conditions' style={{ color: 'green' }}>terms and conditions.</a></Typography>}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: 'black',
                  },
                }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signin" variant="body2" color="#0b0b0b">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
