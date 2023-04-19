import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Link,
  } from '@mui/material';
//
import { useNavigate } from 'react-router-dom';

import "./entryform.css"
//
//
const CREATE_USER = gql`
    mutation CreateUser( $userName: String!,  $email: String!, $password: String!,$userType:String! ) {
        createUser( userName: $userName, email: $email, password: $password,userType:$userType  ) {
            userName
            email
            password
            userType

        }

    }
`;
//function component to add a student
const CreateUser = () => {
    //
    let navigate = useNavigate()
    //
    let userName, email, password,userType ;
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
    const [type, setType] = useState("Operation/Compliance");


    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <Grid container justifyContent="center" alignItems="center" height="85vh">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 1,
              boxShadow: 9,
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" align="center">
                Create User
              </Typography>
            </Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createUser({
                    variables: {
                      userName: userName.value,
                      email: email.value,
                      password: password.value,
                      userType: userType.value,
                    },
                  });
                  userName.value = '';
                  email.value = '';
                  password.value = '';
                  userType.value = '';
                  alert("User Created Successfully");
                  navigate('/home');
                }}
              >
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  variant="outlined"
                  margin="normal"
                  inputRef={(node) => (userName = node)}
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  inputRef={(node) => (email = node)}
                />
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  inputRef={(node) => (password = node)}
                />
                 
                 <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">User Type</InputLabel>
  <Select
    value={type}
    label="User Type"
    name="userType"
    id="userType"
    inputRef={(node) => (userType = node)}
    onChange={e => {
      console.log("e.target.value", e.target.value);
      setType(e.target.value);
    }}
  >
    <MenuItem value={'OperationCompliance'}>Operation/Compliance</MenuItem>
    <MenuItem value={'HealthcareProfessional'}>Healthcare-Professional</MenuItem>
    <MenuItem value={'EmergencyPersonnel'}>Emergency Personnel</MenuItem>
  </Select>
</FormControl>
                <Box sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Register
                  </Button>
                </Box>
      
                {error && (
                  <Box sx={{ mt: 2 }}>
                    <Typography color="error">{error.message}</Typography>
                  </Box>
                )}
      
                <Box sx={{
                    display: 'flex',
                    
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 1
                    }}>
                    <Typography>
                        Already have an account?
                    </Typography>
                    <Button
                        variant="text"
                        component="a"
                        href="/login"
                        sx={{ textTransform: 'none' }}
                    >
                        Login
                    </Button>
                </Box>

              </form>
            </Box>
          </Grid>
        </Grid>
      );
      
}
//
export default CreateUser
