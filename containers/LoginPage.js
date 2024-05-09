import React from "react";
import { useState } from 'react';
import { Alert, Button } from 'reactstrap';
import errorCases from '../components/ErrorHandling';
import API_Urls from "../components/APIConfig";
import { useNavigate } from "react-router-dom";
import ValidateField from "../components/formValidation";

// Load the user login page for the app
// Allow the user to input data into the fields, sumbit it and login to the app creating a token
// Once a token is created the user will be able to have acsess to the full site
function UserLogin() {
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	// Fetech login details from API check if the email and password matches a user in the system
	// If it matches a user in the system the user will log into the site and a token will be created
    const login = (email, password) => {
		// Submit the user infromation to the login API
        return fetch(`${API_Urls.loginAPI}`, {
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
				// If there is no found error give the user a token and set the error message to empty
				// If succsesfully logged in send the user to the homepage and reload the site so it can detect there has been a token change
				setErrorMessage(null);
				localStorage.setItem('token', res.token);
				console.log('Login successful: 200');
				navigate(`/`);
				window.location.reload();
			})
			// Catch any errors and logs it in the console and changes the error message displayed depedning on the type of error
            .catch((error) => {
				console.error('Error during login:', error.message);
				if (error.message == 'Unauthorized - 401') {
					setErrorMessage('Inncorrect email or password');
				} else {
					setErrorMessage('An error occurred during login');
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
        if (!email || !password) {
			console.error('Invalid authentication data: 400');
            setErrorMessage('Please enter both email and password');
            return;
        }
		if (ValidateField(email, password) != null) {
			console.error('Invalid authentication data: 400');
            setErrorMessage(ValidateField(email, password));
            return;
        }
		// Attempt to log the user in if none of the if statements are met
        login(email, password);
    };

	// Display a input field so user can input a email and password. Allow the user to submit this information
	// Display an error message of and error is present. The error is set depending on the value of error message
    return (
        <div className="auth-form">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
            	<label htmlFor='email'>email</label><br/>
				<input type='email' id='email' placeholder='example@email.com' /><br/>
				<label htmlFor='password'>password</label><br/>
				<input type='password' id='password' placeholder='******' /><br/>
				<Button color="info" type='submit'>Login</Button>
            </form><br/>
			<Alert color='warning' hidden={!errorMessage}>
				{errorMessage}
			</Alert>
        </div>
    )
}

// Allow the function to be imported by other files
export default UserLogin;