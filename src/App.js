import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";


// function App() {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // ----------- Input Filter -----------
//   const [query, setQuery] = useState("");

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const filteredItems = products.filter(
//     (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );

//   // ----------- Radio Filtering -----------
//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   // ------------ Button Filtering -----------
//   const handleClick = (event) => {
//     setSelectedCategory(event.target.value);
//   };

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

//   return (
//     <>
//       <Sidebar handleChange={handleChange} />
//       <Navigation query={query} handleInputChange={handleInputChange} />
//       <Recommended handleClick={handleClick} />
//       <Products result={result} />
//     </>
//   );
// }


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          {/* <Header /> */}
          <Routes>
            <Route path='/'  element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}


export default App;
