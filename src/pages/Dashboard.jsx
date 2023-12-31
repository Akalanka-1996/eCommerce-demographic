import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config/config";
import Form from "react-bootstrap/Form";
import Spinner from "../components/spinner/spinner";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [probabilityArray, setProbabilityArray] = useState([]);
  const [pic, setPic] = useState();
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImageUrl(imageUrl);
        const response = await axios.post(`${BASE_URL}/prediction`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProbabilityArray(response.data.predictions);

        console.log("probability 12345", probabilityArray);
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
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dinmf92zr/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const cloudinaryData = await response.json();
      setPic(cloudinaryData.url.toString());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("probabilityArray:", probabilityArray);
  }, [probabilityArray]);

  const publishImage = async () => {
    try {
      const classValues = probabilityArray.map((item) => item.class);

      const publishData = {
        image_url: pic,
        tags: classValues,
      };
      const token = localStorage.getItem("token");
      console.log("publish data", publishData);
      const response = await axios.post(`${BASE_URL}/upload`, publishData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("pic", pic);
  }, [pic]);

  return (
    <>
      <section
        className="heading"
        style={{ textAlign: "center", margin: "20px" }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Welcome {username} !
        </h1>
      </section>
      <section style={{ margin: "20px" }}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{ marginBottom: "10px", fontSize: "16px" }}>
            Please select an image to get predictions..
          </Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={handleUpload}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              borderRadius: "5px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Get Predictions
          </button>
          <br />
          <br />
          {selectedImageUrl && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={selectedImageUrl}
                alt="Selected"
                style={{
                  maxWidth: "400px",
                  height: "200px",
                  marginBottom: "10px",
                }}
              />
              {/* Display the content of probabilityArray */}
              {probabilityArray.length > 0 && (
                <div>
                  <h2>Probability Array:</h2>
                  <ul>
                    {probabilityArray.map((item, index) => (
                      <li key={index}>
                        <strong>Class:</strong> {item.class},{" "}
                        <strong>Probability:</strong> {item.probability}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <br />
          <br />
          <div>
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <Spinner />
                <p>Loading...</p>
              </div>
            ) : (
              <div>
                {probabilityArray.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={uploadToCloudinary}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Upload to Cloud
                    </button>
                    <br />
                    <br />
                    <button
                      onClick={publishImage}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Publish to Website
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Form.Group>
      </section>
    </>
  );
};

export default Dashboard;
