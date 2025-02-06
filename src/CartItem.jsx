import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + calculateTotalCost(item),
      0
    );
  };

  // ✅ Placeholder function for future checkout functionality
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  // ✅ Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // ✅ Decrement quantity (Remove if quantity = 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id)); // Remove item if quantity reaches 0
    }
  };

  // ✅ Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.id)); // Fixed: Use item.id correctly
  };

  // ✅ Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = Number(item.cost.replace("$", "")); // Convert "$15" → 15
    return itemCost * item.quantity; // Multiply by quantity
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>
      <div>
        {cartItems.map(
          (
            item // ✅ Fixed: Use cartItems instead of 'cart'
          ) => (
            <div className="cart-item" key={item.id}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Price: {item.cost}</div>

                {/* ✅ Quantity Controls */}
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                {/* ✅ Display subtotal for item */}
                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item).toFixed(2)}
                </div>

                {/* ✅ Remove item button */}
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* ✅ Continue Shopping and Checkout Buttons */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={onContinueShopping} // ✅ Fixed: Call function properly
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
