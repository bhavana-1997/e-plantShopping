import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity); // ✅ Get total quantity

  return (
    <nav className="navbar">
      <h1>Plant Store</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
