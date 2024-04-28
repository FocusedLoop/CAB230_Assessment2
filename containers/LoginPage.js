import React from "react";
import { useState } from 'react';
import { Alert } from 'reactstrap';
import errorCases from '../components/ErrorHandling';
import API_Urls from "../components/APIConfig";

function UserLogin() {
    const [result, setResult] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

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
            //.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					setErrorMessage(res.message);
					return;
				}
				setErrorMessage(null);
				localStorage.setItem('token', res.token);
				setResult(JSON.stringify(res));
				console.log(res);
			})
            .catch((error) => {
				console.error('Error during login:', error.message);
				setErrorMessage('An error occurred during login');
			});
    };

    // register (dont have yet)

	// Check if the fields are valued and assign the inputted values to email and password
    const onSubmit = (e) => {
        e.preventDefault();
		const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email || !password) {
            setErrorMessage('Please enter both email and password');
            return;
        }
        
        login(email, password);
    };

	// Display a input field so user can input a email and password. Allow the user to submit this information
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
            <label htmlFor='email'>Email:</label>
					<input type='email' id='email' placeholder='example@email.com' />
					<br />
					<label htmlFor='password'>Password:</label>
					<input type='password' id='password' placeholder='******' />
					<br />
					<Alert color='warning' hidden={!errorMessage}>
						{errorMessage}
					</Alert>
					<button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default UserLogin;