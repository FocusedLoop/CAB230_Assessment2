import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import errorCases from "./ErrorHandling";
import API_Urls from "./APIConfig";

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
    return (
        <div className="container">
            {volcanoDetails && (
                <div>
                    <h2>{volcanoDetails.name} | ID: {id}</h2>
                    <ul>
                        <li>Country: {volcanoDetails.country}</li>
                        <li>Region: {volcanoDetails.region}</li>
                        <li>Subregion: {volcanoDetails.subregion}</li>
                        <li>Last Eruption: {volcanoDetails.last_eruption}</li>
                        <li>Summit: {volcanoDetails.summit}</li>
                        <li>Elevation: {volcanoDetails.elevation}</li>
                        <li>Latitude: {volcanoDetails.latitude}</li>
                        <li>Longitude: {volcanoDetails.longitude}</li>
                        {volcanoTokenDetails && (
                            <>
                                <li>Population within 5km: {volcanoDetails.population_5km}</li>
                                <li>Population within 10km: {volcanoDetails.population_10km}</li>
                                <li>Population within 30km: {volcanoDetails.population_30km}</li>
                                <li>Population within 100km: {volcanoDetails.population_100km}</li>
                            </>
                        )}
                    </ul>
                </div>
            )}
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
    );
}