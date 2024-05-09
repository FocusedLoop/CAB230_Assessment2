// Checks if the email and password meet the set requirments
function ValidateField(email, password) {
    let errorMessage = null;
    // Check if the inputted values are an accepted email adress, if not return an error message
    if (!email.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.+-]+\.[a-zA-Z]{2,}$/)) {
        errorMessage = ('Invalid email');
        return errorMessage;
    }
    // Check if the password length is less than 16 and more than 8, if not return an error message
    if (password.length > 16 || password.length < 8) {
        errorMessage = ('Password must be more than 8 or less than 16 characters');
        return errorMessage;
    }
};

// Allow the function to be imported by other files
export default ValidateField