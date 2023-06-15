import ProductCard from "src/components/ProductCard"
import { stripe } from "src/utils/stripe"
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function Home({ products }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
        <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto mt-60">
        <ExclamationCircleIcon className="w-24 h-24 mx-auto flex-shrink-0 text-gray-600" />
        <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1" >
        Por favor, faça login
          <p className="text-lg" >
          <Link href="/login" className="text-blue-600 underline hover:text-blue-950 transition transform"> ir para login. </Link>          </p>
        </h2>
      </div>
      // <div className="p-2 rounded-md text-gray-500 max-w-md mx-auto" >
      //   <Link href="/login" className="text-blue-600 underline hover:text-blue-950 transition transform">  Por favor, faça login para acessar a página principal. </Link>
      // </div>
    );
  }
}

export async function getStaticProps() {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 8,
  })
  const products = inventory.data.map(product => {
    const price = product.default_price
    return {
      currency: price.currency,
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      image: product.images[0]
    }
  })

  return {
    props: {
      products,
    }
  }
}
