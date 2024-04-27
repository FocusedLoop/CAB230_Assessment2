import { useState } from 'react';
import { Alert } from 'reactstrap';
import errorCases from './ErrorHandling';

function UserInterface() {
    const [result, setResult] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	// Fetech login details from API check if the email and password matches a user in the system
    const login = (email, password) => {
        return fetch('http://4.237.58.241:3000/user/login', {
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
        // test *regex* rule, just my example ok? you may need to adjust this for the assignment
		if (!e.target.email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
			setErrorMessage('Invalid email');
			return;
		}
		if (e.target.password.value.length > 16) {
			setErrorMessage('Password must be less than 16 characters');
			return;
		}

		setErrorMessage(null);
		login(e.target.email.value, e.target.password.value);
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

export default UserInterface;