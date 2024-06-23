import React, { useState } from 'react';
import axios from 'axios';
import './LocationSearch.css';

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const geoNamesUsername = 'lfedronic';

  const handleSearch = (event) => {
    setQuery(event.target.value);

    if (event.target.value.trim() !== '') {
      axios.get(`http://api.geonames.org/searchJSON?q=${event.target.value}&maxRows=3&username=${geoNamesUsername}`)
        .then(response => {
          setResults(response.data.geonames);
        })
        .catch(error => {
          console.error('Error fetching results:', error);
        });
    } else {
      setResults([]);
    }
  };

  const handleSelection = (location) => {
    setSelectedLocation(location);
    setResults([]);
    setQuery(location.name);
    if (onSelect) {
      onSelect(location);
    }
  };

  return (
    <div className="location-search">
      <input
        type="text"
        placeholder="Search for a location..."
        value={query}
        onChange={handleSearch}
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="results-list">
          {results.map(location => (
            <li key={location.geonameId} onClick={() => handleSelection(location)}>
              {location.name}{location.adminName1 ? `, ${location.adminName1}` : ''}{location.countryName ? `, ${location.countryName}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearch;