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

export default errorCases;