import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";
import { Map, Marker } from "pigeon-maps";
import BarGraph from "./PopulationGraph";

export default function VolcanoByID() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [volcanoDetails, setVolcanoDetails] = useState(null);
    const [volcanoTokenDetails, setVolcanoTokenDetails] = useState(false);
    const token = localStorage.getItem('token');

    // Fetch data from API selected by ID
    useEffect(() => {
        const fetchData = () => {
            const url = `${API_Urls.volcanoAPI}${id}`;
            return fetch(url, {
                method: 'GET',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
                .then(response => errorCases(response))
                .then(data => {
                    setVolcanoDetails(data);
                })
                .catch(error => {
                    console.error('Failed to fetch volcano details:', error.message);
                });
        };

        fetchData();

        // If a token is present grab additional details
        setVolcanoTokenDetails(!!token);
    }, [id, token]);

    // Display volcano details and display extra volcano details if a token is present
    // react dropdown
    return (
        <div className="container">
            <div style={{ display: 'flex' }}>
                {volcanoDetails && (
                    <div style={{ flex: 1 }}>
                        <h2>Volcano {id}: {volcanoDetails.name}</h2>
                        <h5 style={{ lineHeight: '2.5', fontSize: '12.5px' }}>
                            Country: {volcanoDetails.country}<br/>
                            Region: {volcanoDetails.region}<br/>
                            Subregion: {volcanoDetails.subregion}<br/>
                            Last Eruption: {volcanoDetails.last_eruption}<br/>
                            Summit: {volcanoDetails.summit}<br/>
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
                    <div style={{ flex: 3 }}>
                        <Map 
                            height={620}
                            defaultCenter={[0, 0]}
                            defaultZoom={2}
                            mouseEvents={false}>
                            <Marker width={50} anchor={[parseFloat(volcanoDetails.latitude), parseFloat(volcanoDetails.longitude)]} />
                        </Map>
                    </div>
                )}
            </div>
        </div>
    );
}
