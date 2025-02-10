import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AboutUs from "./AboutUs";
import Navbar from "./Navbar";
import CartItem from "./CartItem"; // Import CartItem
import "./App.css";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <Router>
      <Navbar /> {/* Display Navbar */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <div
                className={`landing-page ${showProductList ? "fade-out" : ""}`}
              >
                <div className="background-image"></div>
                <div className="content">
                  <div className="landing_content">
                    <h1>Welcome To Paradise Nursery</h1>
                    <div className="divider"></div>
                    <p>Where Green Meets Serenity</p>

                    <button
                      className="get-started-button"
                      onClick={handleGetStartedClick}
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="aboutus_container">
                    <AboutUs />
                  </div>
                </div>
              </div>
              <div
                className={`product-list-container ${
                  showProductList ? "visible" : ""
                }`}
              >
                <ProductList />
              </div>
            </div>
          }
        />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;
