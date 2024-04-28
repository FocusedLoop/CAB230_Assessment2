import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import getVolcanoByCountry from '../components/VolcanoSearch';
import SearchBar from '../components/SearchBar';

// Current base website (displays the list of volcanoes and functionality)
function ListedVolcanoes() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState('Japan');
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { headerName: "Name", field:  "name" },
    { headerName: "Region", field:  "region" },
    { headerName: "Subregion", field:  "subregion" },
  ]

  // User can search for volcano's by country
  // Fetch the data produce from getVolcanoByCountry selected by the search value
  // Set the data to row data
  useEffect(() => {
    getVolcanoByCountry(search)
    .then(volcaneos => setRowData(volcaneos))
    .catch((error) => {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    });
  }, [search]);

  // Display the row data
  return (
    <div
      className="ag-theme-balham"
      style={{
        height:"420px",
        width:"620px"
      }}
    >
      Country: &nbsp;
      <SearchBar onSubmit={setSearch}/> &nbsp;
      Populated within: &nbsp;
      <select id="dropdown">
        <option value="">5km</option>
        <option value="">10km</option>
        <option value="">30km</option>
        <option value="">100km</option>
      </select>
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