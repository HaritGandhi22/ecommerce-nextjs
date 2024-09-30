'use client';

import { useEffect, useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-md">
            <img src={item.image} alt={item.title} className="w-full h-64 object-contain" />
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            <p className="mt-2">Price: ${item.price}</p>
            <p className="mt-2">Quantity: {item.quantity}</p>
            <p className="mt-2 font-bold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
