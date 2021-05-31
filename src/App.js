import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry] = useState("Worldwide")

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/countries`)
      .then(response => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        setCountries(countries);  
      })
    };

    getCountriesData();
  },[])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app_header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
            
      </div>
    </div>
  );
}

export default App;
