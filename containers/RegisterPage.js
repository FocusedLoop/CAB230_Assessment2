import React, { useState } from "react";
import { Alert, Button } from 'reactstrap';
import errorCases from '../components/ErrorHandling';
import API_Urls from "../components/APIConfig";
import { useNavigate, useParams } from "react-router-dom";

function UserRegistration() {
    //const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

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
                console.log('Registration successful: 201');
                navigate(`/login`);
            })
            .catch((error) => {
                console.error('Error User already exists:', error.message);
                setErrorMessage('This User already exists');
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (!email || !password) {
            console.error('Invalid data missing: 400');
            setErrorMessage('Please enter both email and password');
            return;
        }
        if (password != confirmPassword) {
            console.error('Invalid data missing: 400');
            setErrorMessage('Passwords do not match');
            return;
        }
        register(email, password);
    };

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

export default UserRegistration;