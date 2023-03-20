//Login.js
import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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
        <div className="entryform">
            { screen !=='auth' ? (
                <View screen={screen} setScreen={setScreen} /> ) : (

                <Form onSubmit={handleLogin}>
                    
                    <Form.Group>
                        <Form.Label> Email:</Form.Label>
                        <Form.Control id="email" type="email"  onChange={(event) => setEmail(event.target.value)} 
                            placeholder="Email:" />
                    </Form.Group>                    
                    
                    <Form.Group>
                        <Form.Label> Password:</Form.Label>
                        <Form.Control id="password" type="password"  onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password:" />
                    </Form.Group>  
            
                    <Button size = "lg" variant="primary" type="submit" >
                        Login
                    </Button>
                  
                </Form>
            )}            
            
        </div>
    );
}
//
export default Login;