import Image from "next/image";
import Link from 'next/link'

export default async function Home() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  const categories = await response.json();
  return (
    <div>
      <main>
        <Image
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
      <div>
        <nav className="flex justify-center mt-5">
          {categories.map((category) => (
            <Link key={category} href={`/c/${category}`} className="mx-4 text-lg capitalize hover:text-blue-500">
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
