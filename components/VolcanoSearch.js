// fetch volcano data from a desired country
// Return the set desired values in an object
export default function getVolcanoByCountry(country) {
  return fetch(`http://4.237.58.241:3000/volcanoes?country=${country}`)
    .then(res => res.json())
    .then(data => 
      data.map(volcaneo => {
        return {
          id: volcaneo.id,
          name: volcaneo.name,
          country: volcaneo.country,
          region: volcaneo.region,
          subregion: volcaneo.subregion
        };
      })
    )
}
// Add catch error
