import React, { useState } from "react";
import { Alert, Button } from 'reactstrap';
import errorCases from '../components/ErrorHandling';
import API_Urls from "../components/APIConfig";
import { useNavigate } from "react-router-dom";
import ValidateField from "../components/formValidation";

// Load the user register page for the app
// Allow the user to input data into the fields, sumbit it and create a new user 
// Once a user is created the user will be sent to the login so they can sign into that acount
function UserRegistration() {
    //const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    // Fetech register details from the API to check if there is an existing user with the same email and password
	// If it matches a user in the system the user will be notified that there details are invalid and to put something else in
    const register = (email, password) => {
        // Submit the user infromation to the register API
        return fetch(`${API_Urls.registerAPI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            // Display an error message in case unknown error apears
            .then(errorCases)
            .then((res) => {
                if (res.error) {
                    setErrorMessage(res.message);
                    return;
                }
                // If there is no found error and sucessfully registered send the user to the login page and set the error message to empty
                setErrorMessage(null);
                console.log('Registration successful: 201');
                navigate(`/login`);
            })
            // Catch any errors and logs it in the console and changes the error message displayed depedning on the type of error
            .catch((error) => {
                if (error.message == 'Failed to fetch') {
                    console.error('An error occurred during registration:', error.message);
                    setErrorMessage('An error occurred during registration');
				} else {
					console.error('Error User already exists:', error.message);
                    setErrorMessage('This User already exists');
				}
            });
    };
    
	// Check if the fields have values and assign the inputted values to email and password
	// If the email and password are empty display and error in the console and display it in the app
	// Use ValidateField to check if the email and password meet the set requirements
    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (!email || !password) {
            console.error('Invalid authentication data: 400');
            setErrorMessage('Please enter both email and password');
            return;
        }
        if (password != confirmPassword) {
            console.error('Invalid authentication data: 400');
            setErrorMessage('Passwords do not match');
            return;
        }
        if (ValidateField(email, password) != null) {
            console.error('Invalid authentication data: 400');
            setErrorMessage(ValidateField(email, password));
            return;
        }
        // Attempt to register the user if none of the if statements are met
        register(email, password);
    };

    // Display a input field so user can input a email and password. Allow the user to submit this information
	// Display an error message of and error is present. The error is set depending on the value of error message
    return (
        <div className="auth-form">
            <h1>Registration</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='email'>email</label><br/>
                <input type='email' id='email' placeholder='example@email.com' /><br/>
                <label htmlFor='password'>password</label><br/>
                <input type='password' id='password' placeholder='******' /><br/>
                <label htmlFor='confirmPassword'>confirm password</label><br/>
                <input type='password' id='confirmPassword' placeholder='******' /><br/>
                <Button color="info" type='submit'>Register</Button>
            </form><br/>
            <Alert color='warning' hidden={!errorMessage}>
                {errorMessage}
            </Alert>
        </div>
    );
}

// Allow the function to be imported by other files
export default UserRegistration;