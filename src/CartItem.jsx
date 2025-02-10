import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  // ✅ Memoized total amount calculation
  const totalAmount = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const cost = parseFloat(item.cost);
        const quantity = Number(item.quantity) || 0;

        if (isNaN(cost) || isNaN(quantity)) {
          console.warn(`Invalid cost/quantity detected for item:`, item);
          return acc; // Skip invalid items
        }

        acc.totalAmount += cost * quantity;
        acc.totalQuantity += quantity;
        return acc;
      },
      { totalAmount: 0, totalQuantity: 0 }
    );
  }, [cart]);

  console.log("Cart contents:", cart); // Debugging

  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      alert("Functionality to be added for future reference");
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Items: {totalQuantity || 0} | Total Amount: $
        {totalAmount > 0 ? totalAmount.toFixed(2) : "0.00"}
      </h2>

      {cart.length > 0 ? (
        cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost ?? 0}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span>{item.quantity ?? 1}</span>
                <button
                  className="cart-item-button"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${item.cost * item.quantity}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "gray", textAlign: "center" }}>
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default CartItem;
