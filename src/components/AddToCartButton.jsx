'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddToCartButton = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);  
  const [successMessage, setSuccessMessage] = useState('');  
  const router = useRouter();  
  const handleAddToCart = () => {
    setIsAdding(true);
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = existingCart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    setTimeout(() => {
      setIsAdding(false);
      setSuccessMessage(`${product.title} has been added to your cart!`);
      setTimeout(() => {
        router.push('/cart');  
      }, 1500);
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className={`px-6 py-2 text-white ${isAdding ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} rounded`}
        disabled={isAdding}
      >
        {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

export default AddToCartButton;
