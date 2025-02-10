import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.name === action.payload
      );
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity; // ✅ Subtract quantity before removing
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);

      if (item) {
        state.totalQuantity += quantity - item.quantity; // ✅ Adjust total quantity
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0; // ✅ Reset total quantity
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
