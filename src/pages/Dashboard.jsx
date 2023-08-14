import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config/config";
import Form from "react-bootstrap/Form";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pic, setPic] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        console.log("form data", formData);
        const response = await axios.post(`${BASE_URL}/prediction`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "MERNAuthentication");
    data.append("cloud_name", "dinmf92zr");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dinmf92zr/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const cloudinaryData = await response.json();
      setPic(cloudinaryData.url.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const publishImage = async () => {
    try {
        const publishData = {
            image_url: pic,
            tags: ["gender_male",
            "isMarried_True",
            "race_Muslim"]
        }
        const token = localStorage.getItem("token");
        console.log('publish data', publishData)
        const response = await axios.post(`${BASE_URL}/upload`, publishData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("pic", pic);
  }, [pic]);

  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
      </section>
      <section>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Get Predictions</button>
          <br></br>
          <br></br>
          <button onClick={uploadToCloudinary}>Upload</button>
          <br></br>
          <br></br>
          <button onClick={publishImage}>Publish</button>
        </Form.Group>
      </section>
    </>
  );
};

export default Dashboard;
