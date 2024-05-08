import React from "react";
import { useState } from 'react';
import { Alert, Button } from 'reactstrap';
import errorCases from '../components/ErrorHandling';
import API_Urls from "../components/APIConfig";
import { useNavigate, useParams } from "react-router-dom";

function UserLogin() {
    const [result, setResult] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	// Fetech login details from API check if the email and password matches a user in the system
    const login = (email, password) => {
        return fetch(`${API_Urls.loginAPI}`, {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email, password: password }),
        })
			.then(errorCases)
			.then((res) => {
				if (res.error) {
					setErrorMessage(res.message);
					return;
				}
				setErrorMessage(null);
				localStorage.setItem('token', res.token);
				setResult(JSON.stringify(res));
				console.log('Login successful: 200');
				navigate(`/`);
				window.location.reload();
			})
            .catch((error) => {
				console.error('Error during login:', error.message);
				if (error.message == 'Unauthorized - 401') {
					setErrorMessage('Inncorrect email or password');
				} else {
					setErrorMessage('An error occurred during login');
				}
				
			});
    };

	// Check if the fields are valued and assign the inputted values to email and password
    const onSubmit = (e) => {
        e.preventDefault();
		const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email || !password) {
			console.error('Invalid data missing: 400');
            setErrorMessage('Please enter both email and password');
            return;
        }
        login(email, password);
    };

	// Display a input field so user can input a email and password. Allow the user to submit this information
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

export default UserLogin;