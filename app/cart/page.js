"use client";
import { useContext } from "react";
import { CartContext } from "../lib/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 && <p>No items added yet.</p>}

      {cart.map(item => (
        <div key={item.id}
             style={{ display: "flex", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #ddd" }}>
          <span>{item.nama} x {item.quantity}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
