import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";
import { Map, Marker } from "pigeon-maps";
import BarGraph from "./PopulationGraph";

// Grab the data of a volcano determined by a selected volcano and return a page displaying all the data
// Display a map of the volcano's location
// Display population information and a bar graph if the user is logged in (has a token)
function VolcanoByID() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [volcanoDetails, setVolcanoDetails] = useState(null);
    const [volcanoTokenDetails, setVolcanoTokenDetails] = useState(false);
    const token = localStorage.getItem('token');

    // Fetch data from API selected by ID
    // ID is determined by the volcano you choose in VolcanoList
    useEffect(() => {
        const fetchData = () => {
            const url = `${API_Urls.volcanoAPI}${id}`;
            // From the API grab all the volcano details data
            // If there is a token grab the additional data that requires authenication
            return fetch(url, {
                method: 'GET',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
                // Handle any unknown errors
                // assign the data to volcanoDetails to be used in the html
                .then(response => errorCases(response))
                .then(data => {
                    setVolcanoDetails(data);
                })
                // Catch and log any errors when loading the data
                .catch(error => {
                    console.error('Failed to fetch volcano details:', error.message);
                });
        };
        fetchData();

        // If a token is present grab additional details
        setVolcanoTokenDetails(!!token);
    }, [id, token]);

    // Display volcano details and display extra volcano details if a token is present
    // Display a bar graph of the population denisty using a developed bar graph function if the token is present 
    // Use App.css to set the majority of styling of the page, text and div placement is done in the html code
    // Display a map to the right of the page show where the volcano is located with a marker that is set by the volcanoDetails latitude and longitude data
    // The map is created and loaded through pigeon maps
    return (
        <div className="container">
            <div className='details'>
                {volcanoDetails && (
                    <div style={{ flex: 1 }}>
                        <h2>Volcano {id}: {volcanoDetails.name}</h2>
                        <h5 style={{ lineHeight: '2.5', fontSize: '12.5px' }}>
                            Country: {volcanoDetails.country}<br/>
                            Region: {volcanoDetails.region}<br/>
                            Subregion: {volcanoDetails.subregion}<br/>
                            Last Eruption: {volcanoDetails.last_eruption}<br/>
                            Summit: {volcanoDetails.summit} ft<br/>
                            Elevation: {volcanoDetails.elevation}<br/>
                            {volcanoTokenDetails && (
                                <>
                                    Population within 5km: {volcanoDetails.population_5km}<br/>
                                    Population within 10km: {volcanoDetails.population_10km}<br/>
                                    Population within 30km: {volcanoDetails.population_30km}<br/>
                                    Population within 100km: {volcanoDetails.population_100km}<br/>
                                    Population Density
                                    <BarGraph volcanoDetails={volcanoDetails} />
                                </>
                            )}
                        </h5>
                        <Button
                            color="info"
                            size="sm"
                            className="mt-3"
                            onClick={() => {
                                navigate("/volcanoes"); 
                            }}
                        >
                            Back
                        </Button>
                    </div>
                )}
                {volcanoDetails && (
                    <div style={{ flex: 2 }}>
                        <Map 
                            height={615}
                            width={735}
                            defaultCenter={[0, 0]}
                            defaultZoom={1.525}
                            mouseEvents={false}>
                            <Marker width={50} anchor={[parseFloat(volcanoDetails.latitude), parseFloat(volcanoDetails.longitude)]} />
                        </Map>
                    </div>
                )}
            </div>
        </div>
    );
}

// Allow the function to be imported by other files
export default VolcanoByID;