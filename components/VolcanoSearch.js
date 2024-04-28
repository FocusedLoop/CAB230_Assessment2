import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";

// fetch volcano data from a desired country
// Return the set desired values in an object
export default function getVolcanoByCountry(country) {
  return fetch(`${API_Urls.selectCountiresAPI}${country}`)
    .then(response => errorCases(response))
    .then(data => {
      if (typeof data === 'string') {
        throw new Error(data);
      }
      return data.map(volcano => ({
        id: volcano.id,
        name: volcano.name,
        country: volcano.country,
        region: volcano.region,
        subregion: volcano.subregion
      }));
    })
    .catch(error => {
      console.error('Error fetching volcano data:', error.message);
      throw error;
    });
}
// Add catch error
