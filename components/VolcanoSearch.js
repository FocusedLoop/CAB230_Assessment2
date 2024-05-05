import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";

// fetch volcano data from a desired country
// Return the set desired values in an object
export default function getVolcanoByCountry(country, filter) {
  return fetch(`${API_Urls.selectCountiresAPI}${country}${filter}`)
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
}
// Add catch error
