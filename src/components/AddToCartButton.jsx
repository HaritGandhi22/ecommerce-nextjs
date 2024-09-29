'use client'; // This enables client-side interactivity in Next.js 13+

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddToCartButton = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);  // Loading state
  const [successMessage, setSuccessMessage] = useState('');  // Success message
  const router = useRouter();  // Use router to navigate

  const handleAddToCart = async () => {
    setIsAdding(true);

    // Simulate a mock API call
    setTimeout(() => {
      setIsAdding(false);
      setSuccessMessage(`${product.title} has been added to your cart!`);

      // Navigate to the cart page after a delay
      setTimeout(() => {
        router.push('/cart');  // Navigate to the cart page
      }, 1500);
    }, 1000);  // Mock delay for API call
  };

  return (
    <div>
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`px-6 py-2 text-white ${isAdding ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} rounded`}
        disabled={isAdding}
      >
        {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
      </button>

      {/* Success Message */}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

export default AddToCartButton;
