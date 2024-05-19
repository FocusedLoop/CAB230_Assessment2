import React, { useEffect, useRef  } from "react";
import Chart from "chart.js/auto";

// Create and load a bargraph using chart.js
// The bargraph displays the population density 5km, 10km, 30km, 100km
// Reference - (Chart.js, 2024)
const BarGraph = ({ volcanoDetails }) => {
    const chartRef = useRef(null);

    // Remove the bargraph if one if present, then create a new one using the volcationDetails
    useEffect(() => {
        if (volcanoDetails) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            drawPopulationChart();
        }
    }, [volcanoDetails]);

    // Use the population density details data to populationData
    const drawPopulationChart = () => {
        const populationData = [
            volcanoDetails.population_5km,
            volcanoDetails.population_10km,
            volcanoDetails.population_30km,
            volcanoDetails.population_100km
        ];

        // Using chart.js create a bar graph
        // Set the X axis label to the population distance
        // Set the Y axis to the population amount
        // Set the data on the bar graph to populationData
        const ctx = document.getElementById('populationChart').getContext('2d');

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['5km', '10km', '30km', '100km'],
                datasets: [{
                    label: '',
                    data: populationData,
                    borderColor: 'rgba(0, 0, 0, 3)',
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5000000,
                        
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            },
                            stepSize: 1000000
                        }
                    },
                    x: {
                        type: 'category',
                        position: 'bottom'
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    };

    return (
        <canvas id="populationChart" width="380" height="250"></canvas>
    );
}

// Allow the function to be imported by other files
export default BarGraph;