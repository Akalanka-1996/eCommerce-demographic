import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config/config";
import Form from 'react-bootstrap/Form';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

     const response = await axios.post(`${BASE_URL}/prediction`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    console.log('response', response.data)
    }
  };

  return (
    <>
    <section className="heading">
      <h1>Welcome</h1>
    </section>
    <section>
    <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={handleFileChange}  />
        <button onClick={handleUpload}>Upload</button>
      </Form.Group>
    </section>
  </>
  )
 
  
};

export default Dashboard;
