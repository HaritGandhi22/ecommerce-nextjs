import SearchInput from './SearchInput';
import Link from 'next/link';

export default async function ProductCategory({ params, searchParams }) {
  const categoryName = decodeURIComponent(params.categoryName);
  const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
  const specificProducts = await response.json();

  const productsPerPage = 10;
  const page = parseInt(searchParams.page) || 1;
  const totalPages = Math.ceil(specificProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = specificProducts.slice(startIndex, startIndex + productsPerPage);

  const searchQuery = searchParams.search || '';

  const filteredProducts = currentProducts.filter(prod =>
    prod.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Product List Page</h1>
        <div className="mb-4">
          <SearchInput initialSearchQuery={searchQuery} categoryName={categoryName} />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {filteredProducts.map((prod) => (
            <Link href={`/p/${prod.title}`}>
              <div key={prod.id} className="border p-4">
                <img src={prod.image} alt={prod.title} className="w-72 h-72" />
                <h2 className="text-center font-bold">{prod.title}</h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {page > 1 && (
            <Link href={`/c/${categoryName}?search=${searchQuery}&page=${page - 1}`}>
              <button className="px-4 py-2 bg-gray-300 rounded">Previous</button>
            </Link>
          )}

          <span className="text-xl">{page} of {totalPages}</span>

          {page < totalPages && (
            <Link href={`/c/${categoryName}?search=${searchQuery}&page=${page + 1}`}>
              <button className="px-4 py-2 bg-gray-300 rounded">Next</button>
            </Link>
          )}
        </div>
      </div >
    </>
  );
}
