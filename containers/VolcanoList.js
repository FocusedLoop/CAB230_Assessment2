import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "bootstrap/dist/css/bootstrap.min.css";
import getVolcanoByCountry from '../components/VolcanoSearch';
import SearchBar from '../components/SearchBar';

// Load a list of volcanoes by a desired searched country
// Allow users to click on a desired volcano and view more details about it
// Allow users to sort by searching and filter it by population distance
// Reference - (AG Grid, 2015) and (CAB230 Practical 6, 2024)
function ListedVolcanoes() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
  
  // Create the columns and fields for the volcanoes
  // Allow users to filter each column by name or search a term that a column contains
  const columns = [
    { headerName: "Name", field:  "name", 
      filter: "agTextColumnFilter",
      filterParams: {defaultOption: "equals"} },
    { headerName: "Region", field: "region",
      filter: "agTextColumnFilter",
      filterParams: {defaultOption: "contains"} },
    { headerName: "Subregion", field: "subregion" , 
      filter: "agTextColumnFilter", 
      filterParams: {defaultOption: "contains"} }
  ]

  // User can search for volcano's by country
  // Fetch the data produce from getVolcanoByCountry selected by the search value
  // Set the data to row data
  useEffect(() => {
    if (search !== '') {
      getVolcanoByCountry(search, populationFilter)
        // Update the value of rowData
        .then(volcanoes => setRowData(volcanoes))
        // Catch, log to the console and set the error message to any found error when using the API with the inputted variables
        .catch(error => {
          console.error('Error fetching Volcano API data:', error.message);
          setErrorMessage('An error occurred fetching the Volcano API data');
        });
    }
  }, [search, populationFilter]);

  // Updates the population filter value when a change occurs
  const handlePopulationFilterChange = (filter) => {
    setPopulationFilter(filter);
  };

  // Display the row data
  // All the user to search for a country or filter population distance with a select drop down that will add to the API url with a filter query
  // AgGridReact - set the columns to the set const columns values, set the data in the table to rowData
  // If an error occurs display the corresponding error message
  // Assign App.css to stylize the table, use App.css to put the search bar to the left and the select filter to the right
  return (
    <div
      className="ag-theme-quartz"
      style={{
        height:"465px",
        width:"620px",
      }}
    >
      <div className="right">
        <SearchBar onSubmit={setSearch} />
        <span className="right">Population Within:</span>&nbsp;
        <select id="dropdown" onChange={(e) => handlePopulationFilterChange(e.target.value)}>
          <option value="">Select</option>
          <option value="&populatedWithin=5km">5km</option>
          <option value="&populatedWithin=10km">10km</option>
          <option value="&populatedWithin=30km">30km</option>
          <option value="&populatedWithin=100km">100km</option>
        </select>
      </div>
      <AgGridReact
        columnDefs={columns}
        rowData={rowData} 
        pagination={true}
        paginationPageSize={20}
        onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}`)}
      />
      <Alert color='warning' hidden={!errorMessage}>
						{errorMessage}
			</Alert>
    </div>
    
  );
}

// Allow the function to be imported by other files
export default ListedVolcanoes;