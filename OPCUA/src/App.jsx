import React, { useState } from "react";
import OPCUAReader from "./Component/OPCUAReader"
import "./App.css"; // Import CSS file for styling

function App() {
  const [endpoint, setEndpoint] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [readInterval, setReadInterval] = useState(1000); // Default read interval
  const [monitoringStarted, setMonitoringStarted] = useState(false);

  const startMonitoring = () => {
    setMonitoringStarted(true);
  };

  const stopMonitoring = () => {
    setMonitoringStarted(false);
  };

  return (
    <div className="app-container">
      <h1>OPC UA Reader</h1>
      <div className="input-container">
        <label htmlFor="endpoint">Endpoint:</label>
        <input
          type="text"
          id="endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="nodeId">Node ID:</label>
        <input
          type="text"
          id="nodeId"
          value={nodeId}
          onChange={(e) => setNodeId(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="readInterval">Read Interval (ms):</label>
        <input
          type="number"
          id="readInterval"
          value={readInterval}
          onChange={(e) => setReadInterval(Number(e.target.value))}
        />
      </div>
      {!monitoringStarted && <button onClick={startMonitoring}>Start Monitoring</button>}
      {monitoringStarted && <button onClick={stopMonitoring}>Stop Monitoring</button>}
      {monitoringStarted && <OPCUAReader endpoint={endpoint} nodeId={nodeId} readInterval={readInterval} />}
    </div>
  );
}

export default App;
