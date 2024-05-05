import React, { useState, useEffect } from "react";

function OPCUAReader({ endpoint, nodeId, readInterval }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your backend server
        const response = await fetch(`http://localhost:5000/api/opcua?endpoint=${endpoint}&nodeId=${nodeId}`);
        const data = await response.json();
        setValue(data.value);
      } catch (err) {
        console.error("Error fetching OPC UA value:", err);
      }
    };

    const intervalId = setInterval(fetchData, readInterval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [endpoint, nodeId, readInterval]);

  return (
    <div>
      <h2>OPC UA Value:</h2>
      <p>{value}</p>
    </div>
  );
}

export default OPCUAReader;
