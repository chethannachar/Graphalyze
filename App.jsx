import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Home = () => {
  const [countries, setCountries] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const formattedCountries = countries
        .split(/[\s,]+/)
        .map((c) => c.trim())
        .filter((c) => c);

      const res = await axios.post('http://127.0.0.1:5000/covid-data', {
        countries: formattedCountries
      });

      navigate('/data', {
        state: {
          data: res.data.data,
          chart1: res.data.chart1,
          chart2: res.data.chart2
        }
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div>
    <header className="header">COVID-19 Dashboard</header>
    
    <div className="container">
      <div className="input-section">
        <h2 className="title">Enter Countries</h2>
        <input
          type="text"
          placeholder="Enter up to 3 countries (comma or space separated)"
          value={countries}
          onChange={(e) => setCountries(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchData} className="primary-button">
          Get Data
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default Home;
