import { useState } from 'react';
import { Alert, Button } from "reactstrap";
import errorCases from './ErrorHandling';
import API_Urls from './APIConfig';

// Produce a search bar for the user to input desired countries
function SearchBar(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [innerSearch, setInnerSearch] = useState('');

  // Fetch all listed countries from the API where there are volcanos
  const onSubmit = (e) => {
    // Prevents the form being submitted in the default format
    e.preventDefault();
    // Check if the fecthed data includes the country the user searched
    fetch(API_Urls.listCountriesAPI)
    .then(response => errorCases(response))
    .then(data => {
      // If API does not include the country log an error and change the error message to notify the user it was an invalid query
      if (!data.includes(innerSearch)) {
        console.error('Error: Invalid Query: Bad request - 400');
        setErrorMessage('Invalid Query');
        return;
      }
      // If the country is in the API list set the error message to empty, then update the volcano list to display the volcano's filtered by country
      setErrorMessage(null);
      props.onSubmit(innerSearch);
    })
    // Catch and log any errors when fetching the countries
    .catch(error => {
      console.error('Error fetching countries:', error.message);
      setErrorMessage('Failed to fetch countries');
    });
  };
    
  // User can search for desired country's
  // Check to see if the user has inputted a vailed country listed in the API
  // If an error occurs display the corresponding error message
  return (
    <div>
      <form onSubmit={onSubmit}>
        <span>Country:</span> &nbsp;
        <input
          aria-labelledby='search-button'
          name='search'
          id='search'
          type='search'
          placeholder='Search Country'
          value={innerSearch}
          onChange={(e) => {setInnerSearch(e.target.value)}}
        />&nbsp;
        <Button id='search-button' type='submit' color='primary' size="sm">
          Search
        </Button>
      </form>
      <Alert color='warning' hidden={!errorMessage}>
					{errorMessage}
			</Alert>
    </div>
  );
}

// Allow the function to be imported by other files
export default SearchBar;