//Login.js
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Grid,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import "./entryform.css"
//
import View from './View'
//
// mutation for user login
const LOGIN_USER = gql`
    mutation LoginUser( $email: String!, $password: String! ) {
        loginUser( email: $email, password: $password  )         

    }
`;
// query for checking if user is logged in
const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;
// Login function component
function Login() {
    //
    let navigate = useNavigate()
    // loginUser is a function that can be called to execute
    // the LOGIN_USER mutation, and { data, loading, error } 
    // is an object that contains information about the state of the mutation.
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
    //
    //state variable for the screen, admin or user
    const [screen, setScreen] = useState('auth');
    //store input field data, user name and password
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    //
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const { data } = await loginUser({
            variables: { email, password },
            refetchQueries: [{ query: LOGGED_IN_USER }],
          });
          console.log('Logged in as:', data.loginUser);
          setScreen(data.loginUser);
        } catch (error) {
          console.error('Login error:', error);
        }
      };
      // a destructuring assignment that uses the useQuery hook from
      //  the @apollo/client library to fetch data from a GraphQL server.
      const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError } = useQuery(LOGGED_IN_USER);
      console.log('isLoggedInData: ',isLoggedInData)
    // Show loading indicator if data is still being fetched
    if (isLoggedInLoading) return <p>Loading...</p>;

    // Show error message if there was an error fetching the data
    if (isLoggedInError) return <p>Error: {isLoggedInError.message}</p>;

    // Render the login form or the welcome message based on the value of 'screen'
    return (
      <Grid container justifyContent="center" alignItems="center" height="85vh">
      {screen !== 'auth' ? (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Welcome {screen}</Typography>
          <br/>
          <br/>
          <View screen={screen}/>
        </Box>
      ) : (
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: 1,
              boxShadow: 9,
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" align="center">
                Login
              </Typography>
            </Box>

                <Form onSubmit={handleLogin}>
                    
                    <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />                    
                    
                    <TextField
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          /> 
            
            <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
            >
              Login
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
                        Don't have an account?
                    </Typography>
                    <Button
                        variant="text"
                        component="a"
                        href="/createuser"
                        sx={{ textTransform: 'none' }}
                    >
                        Sign Up
                    </Button>
                </Box>
        </Form>
      </Box>
    </Grid>
  )}
</Grid>
    );
}
//
export default Login;