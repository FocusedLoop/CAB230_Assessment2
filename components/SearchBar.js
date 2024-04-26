import { useState, useEffect } from 'react';
import { Button } from "reactstrap";

function SearchBar(props) {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [innerSearch, setInnerSearch] = useState('');

    // Fetch all listed countries from the API where there are volcanos
    useEffect(() => {
      const fetchCountries = async () => {
          try {
              const response = await fetch('http://4.237.58.241:3000/countries');
              if (!response.ok) {
                throw new Error('Failed to fetch country details');
            }
              const data = await response.json();
              setCountries(data);
          } catch (error) {
            setError('Failed to match country')
          }
        };
        fetchCountries();
      }, []);
    
    // User can search for desired country's
    // Check to see if the user has inputted a vailed country listed in the API
    return (
      <div>
        <input
          aria-labelledby='search-button'
          name='search'
          id='search'
          type='search'
          value={innerSearch}
          onChange={(e) => {setInnerSearch(e.target.value)}}
        />
        <Button 
            id='search-button' 
            type='button'
            onClick={() => {
              if (countries.includes(innerSearch)) {
                setError(null);
                props.onSubmit(innerSearch)
              } else if (!(/^[a-zA-Z]+$/).test(innerSearch)) {
                setError("Invalid Character!")
              } else {
                setError("Invalid Country!")
              }
            }}
        >
          Search
        </Button>
        {error != null ? <p>Error: {error}</p> : null}
      </div>
    );
  }
  
  export default SearchBar;