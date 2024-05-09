// Handles all API URL's
// Allows for easy use Swagger API url and allows the url to be dynamically changed when needed
const SwaggerAPI = `http://4.237.58.241:3000`;

const API_Urls = {
    listCountriesAPI: `${SwaggerAPI}/countries`,
    selectCountiresAPI: `${SwaggerAPI}/volcanoes?country=`,
    volcanoAPI: `${SwaggerAPI}/volcano/`,
    loginAPI: `${SwaggerAPI}/user/login`,
    registerAPI: `${SwaggerAPI}/user/register`
};

// Allow the function to be imported by other files
export default API_Urls;