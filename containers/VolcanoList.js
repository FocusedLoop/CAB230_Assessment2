import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import getVolcanoByCountry from '../components/VolcanoSearch';
import SearchBar from '../components/SearchBar';
import volcanoTable from '../App.css'

// Current base website (displays the list of volcanoes and functionality)
function ListedVolcanoes() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

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
        .then(volcanoes => setRowData(volcanoes))
        .catch(error => {
          console.error('Error fetching Volcano API data:', error.message);
          setErrorMessage('An error occurred fetching the Volcano API data');
        });
    }
  }, [search, populationFilter]);

  const handlePopulationFilterChange = (filter) => {
    setPopulationFilter(filter);
  };

  // Display the row data
  // put stuff in css file
  return (
    <div
      className="ag-theme-balham"
      style={{
        height:"520px",
        width:"620px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>Country:</span>
        <SearchBar onSubmit={setSearch} />
      </div>
      <div>
        <span>Population Within:</span>
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

        onRowClicked={(row) => navigate(`/volcaneo?id=${row.data.id}`)}
      />
      <Alert color='warning' hidden={!errorMessage}>
						{errorMessage}
			</Alert>
    </div>
    
  );
}

export default ListedVolcanoes;