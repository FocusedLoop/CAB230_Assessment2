// API URL's
const SwaggerAPI = `http://4.237.58.241:3000`;

const API_Urls = {
    listCountriesAPI: `${SwaggerAPI}/countries`,
    selectCountiresAPI: `${SwaggerAPI}/volcanoes?country=`,
    volcanoAPI: `${SwaggerAPI}/volcano/`,
    loginAPI: `${SwaggerAPI}/user/login`,
    registerAPI: `${SwaggerAPI}/user/register`
};

export default API_Urls;