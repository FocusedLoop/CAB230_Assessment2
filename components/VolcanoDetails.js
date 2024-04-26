import React from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function VolcaneoByID() {
    const navigate = useNavigate();
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    const [volcanoDetails, setVolcanoDetails] = useState(null);
    const [VolcanoTokenDetails, setVolcanoTokenDetails] = useState(false);
    const token = localStorage.getItem('token');

    // Fecth data from API selected by ID
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://4.237.58.241:3000/volcano/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch volcano details');
                }
                const data = await response.json();
                console.log(token);
                setVolcanoDetails(data);
            } catch (error) {
                console.error(error);
            }
        }

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
                        {VolcanoTokenDetails && (
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
                    navigate("/"); 
                    localStorage.removeItem('token'); // move to logout button
                }}
            >
                Back
            </Button>
        </div>
    );
}