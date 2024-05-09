// Check for error cases and produce an appropriate error code based on the error number
// If the error is unknown display the error as an unknown error with the code (to ensure all error types can be handled)
// Note: Due to time constraints this was not fully implemented and is only used in specific areas of the code
function errorCases(response) {
    if (!response.ok) {
        switch (response.status) {
            case 400:
                throw new Error('Bad request - 400');
            case 401:
                throw new Error('Unauthorized - 401');
            case 404:
                throw new Error('Page not found - 404');
            case 409:
                throw new Error('Conflict - 409');
            default:
                throw new Error(`Unknown error - ${response.status}`);
        }
    }
    return response.json();
}

// Allow the function to be imported by other files
export default errorCases;