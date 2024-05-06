function validateField(email, password) {
    const [errorMessage, setErrorMessage] = useState(null);

    const validateForm = (email, password) => {
        // test *regex* rule, just my example ok? you may need to adjust this for the assignment
        // CHANGE THIS
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            setErrorMessage('Invalid email');
            return false;
        }
        if (password.length > 16) {
            setErrorMessage('Password must be less than 16 characters');
            return false;
        }
        setErrorMessage(null);
        return true;
    };

    return { errorMessage, validateForm };
}

export default validateField