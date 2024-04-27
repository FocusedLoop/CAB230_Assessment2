import errorCases from "./ErrorHandling";

// fetch volcano data from a desired country
// Return the set desired values in an object
export default function getVolcanoByCountry(country) {
  return fetch(`http://4.237.58.241:3000/volcanoes?country=${country}`)
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
