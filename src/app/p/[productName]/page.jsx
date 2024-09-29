import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetails({ params }) {
    const productName = decodeURIComponent(params.productName).toLowerCase().trim();

    const response = await fetch('https://fakestoreapi.com/products');
    const allProducts = await response.json();
    const product = allProducts.find(prod => prod.title.toLowerCase().trim() === productName);
    return (
        <div className="container mx-auto mt-10">
            <div className="flex">
                <img src={product.image} alt={product.title} className="w-96 h-96 object-contain" />
                <div className="ml-10">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <h3 className="text-3xl font-bold mb-4">{product.category}</h3>
                    <p className="text-lg mb-2">Price: ${product.price}</p>
                    <p className="text-gray-700">{product.description}</p>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};