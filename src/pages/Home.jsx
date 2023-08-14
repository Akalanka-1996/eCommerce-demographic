import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../components/Card";
import Sidebar from "../Sidebar/Sidebar";
import Recommended from "../Recommended/Recommended";
import Products from "../Products/Products";
import Navigation from "../Navigation/Nav";
import axios from "axios";
import BASE_URL from "../config/config";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/items");
    console.log(data);

    setProducts(data);
    console.log("products", products);
  };

  const renderProducts = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 4) {
      const rowProducts = products.slice(i, i + 4);
      const row = (
        <div className="row" key={i}>
          {rowProducts.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image_url} alt={`Product ${index}`} />
              {/* <p>{product.name}</p> */}
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  //   const filteredItems = products.filter(
  //     (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  //   );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //   function filteredData(products, selected, query) {
  //     let filteredProducts = products;

  //     // Filtering Input Items
  //     if (query) {
  //       filteredProducts = filteredItems;
  //     }

  //     // Applying selected filter
  //     if (selected) {
  //       filteredProducts = filteredProducts.filter(
  //         ({ category, color, company, newPrice, title }) =>
  //           category === selected ||
  //           color === selected ||
  //           company === selected ||
  //           newPrice === selected ||
  //           title === selected
  //       );
  //     }

  //     return filteredProducts.map(
  //       ({ img, title, star, reviews, prevPrice, newPrice }) => (
  //         <Card
  //           key={Math.random()}
  //           img={img}
  //           title={title}
  //           star={star}
  //           reviews={reviews}
  //           prevPrice={prevPrice}
  //           newPrice={newPrice}
  //         />
  //       )
  //     );
  //   }

  //   const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <div className="App">{renderProducts()}</div>
    </>
  );
};

export default Home;
