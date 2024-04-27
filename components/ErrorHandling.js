function errorCases(response) {
    if (!response.ok) {
        switch (response.status) {
            case 400:
                throw new Error('400');
            case 401:
                throw new Error('401');
            case 409:
                throw new Error('409');
        }
    }
    return response.json();
}

export default errorCases;