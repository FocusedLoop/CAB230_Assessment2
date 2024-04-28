import React, { useState } from "react";
import { Alert } from 'reactstrap';
import errorCases from '../components/ErrorHandling';
import API_Urls from "../components/APIConfig";

function UserRegistration() {
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const register = (email, password) => {
        return fetch(`${API_Urls.registerAPI}`, {
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
                console.log('Registration successful:', res);
            })
            .catch((error) => {
                console.error('Error during registration:', error.message);
                setErrorMessage('An error occurred during registration');
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email || !password) {
            setErrorMessage('Please enter both email and password');
            return;
        }

        register(email, password);
    };

    return (
        <div>
            <h1>Registration</h1>
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
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default UserRegistration;