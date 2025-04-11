import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

function Data() {
  const location = useLocation();
  const data = location.state?.data || [];
  const chart1 = location.state?.chart1 || "";
  const chart2 = location.state?.chart2 || "";

  return (
    <div>
    <header className="header">COVID-19 Data</header>

    <div className="container">
      {data.length > 0 ? (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Deaths</th>
                <th>Recovery Rate</th>
                <th>Death Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row["Country/Region"]}</td>
                  <td>{row["Confirmed"]}</td>
                  <td>{row["Total Recovered"]}</td>
                  <td>{row["Total Deaths"]}</td>
                  <td>{row["Recovery Rate"].toFixed(2)}%</td>
                  <td>{row["Death Rate"].toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="chart-container">
            {chart1 && (
              <div>
                <h3 className="chart-title">COVID-19 Statistics Chart</h3>
                <img src={`data:image/png;base64,${chart1}`} alt="COVID Chart 1" className="chart-image" />
              </div>
            )}
            {chart2 && (
              <div>
                <h3 className="chart-title">Recovery vs Death Rate Chart</h3>
                <img src={`data:image/png;base64,${chart2}`} alt="COVID Chart 2" className="chart-image" />
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No data available. Please go back and enter valid countries.</p>
      )}
    </div>
    </div>
  );
}

export default Data;