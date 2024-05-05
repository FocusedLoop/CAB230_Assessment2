import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";

import { Map, Marker } from "pigeon-maps"

export default function VolcaneoByID() {
    const navigate = useNavigate();
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    const [volcanoDetails, setVolcanoDetails] = useState(null);
    const [volcanoTokenDetails, setVolcanoTokenDetails] = useState(false);
    const token = localStorage.getItem('token');

    // Fecth data from API selected by ID
    useEffect(() => {
        const fetchData = () => {
            fetch(`${API_Urls.volcanoAPI}${id}`)
                .then(response => errorCases(response))
                .then(data => {
                    setVolcanoDetails(data);
                })
                .catch(error => {
                    console.error('Failed to fetch volcano details:', error.message);
                });
        };
        fetchData();
    }, [id]);

    // Grab other details if a token is found
    useEffect(() => {
        setVolcanoTokenDetails(!!token);
    }, [token])

    // Display volcano details and display extra volcano details if a token is present
    // react dropdown
    return (
        <div className="container">
            <div style={{ display: 'flex' }}>
                {volcanoDetails && (
                    <div style={{ flex: 1 }}>
                        <h1>Volcano {id}: {volcanoDetails.name}</h1>
                        <h5 style={{ lineHeight: '2' }}>
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
                                    Population within 100km: {volcanoDetails.population_100km}
                                </>
                            )}
                            Population Density
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
                            height={600}
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