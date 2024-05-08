function ValidateField(email, password) {
    let errorMessage = null;
    // test *regex* rule, just my example ok? you may need to adjust this for the assignment
    // CHANGE THIS
    if (!email.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.+-]+\.[a-zA-Z]{2,}$/)) {
        errorMessage = ('Invalid email');
        return errorMessage;
    }
    if (password.length > 16 || password.length < 8) {
        errorMessage = ('Password must be more than 8 or less than 16 characters');
        return errorMessage;
    }
};

export default ValidateField