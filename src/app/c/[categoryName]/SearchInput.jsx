'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchInput({ initialSearchQuery, categoryName }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const router = useRouter();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    router.push(`/c/${categoryName}?search=${encodeURIComponent(query)}&page=1`);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="border p-2 rounded w-full"
    />
  );
}
