import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";

// Fetch volcano data from a desired country
// Return the set desired values in an object
function getVolcanoByCountry(country, filter) {
  // Add the country and filter to the API url to return a specfic repsonce determined by a specific country and selected filter
  return fetch(`${API_Urls.selectCountiresAPI}${country}${filter}`)
    .then(response => errorCases(response))
    .then(data => {
      // Determines if the returned data is a string in case there is an issue with the API, throws and error if there is
      if (typeof data === 'string') {
        throw new Error(data);
      }
      // From the API data grab the volcano ID, Name, Country, Region and Subregion
      return data.map(volcano => ({
        id: volcano.id,
        name: volcano.name,
        country: volcano.country,
        region: volcano.region,
        subregion: volcano.subregion
      }));
      // Most of the error handling is done in Volcano List
    })
}

// Allow the function to be imported by other files
export default getVolcanoByCountry;
