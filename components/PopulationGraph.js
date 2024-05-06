import React, { useEffect, useRef  } from "react";
import Chart from "chart.js/auto";
//import { CategoryScale, LinearScale, Chart, BarElement } from 'chart.js';
//Chart.register(CategoryScale, LinearScale, BarElement)

const BarGraph = ({ volcanoDetails }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (volcanoDetails) {

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            drawPopulationChart();
        }
    }, [volcanoDetails]);

    const drawPopulationChart = () => {
        const populationData = [
            volcanoDetails.population_5km,
            volcanoDetails.population_10km,
            volcanoDetails.population_30km,
            volcanoDetails.population_100km
        ];

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

export default BarGraph;