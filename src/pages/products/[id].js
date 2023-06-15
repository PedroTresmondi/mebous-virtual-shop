import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { stripe } from "src/utils/stripe"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

export default function ProductPage({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useShoppingCart();

    function onAddToCart(e) {
        e.preventDefault()
        const id = toast.loading(`Adicionando ${quantity} ite ${quantity > 1 ? "m": "ns"}`);
        addItem(product, { quantity })
        toast.success(` ${quantity} ${product.name} adicionado`, { id })
    }


    return (
        <div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12">
                <div className="relative w-76 h-76 sm:w-96 sm:h-96 ">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="100%"
                        priority
                    />
                </div>
                <div className="w-full flex-1 max-w-md border-opacity-50 rounded-md shadow-lg p-6 bg-slate-100">
                    <h2 className="text-3x; font-semibold m-5">{product.name}</h2>
                    <p className="pt-2 flex item-center space-x-2">
                        <CheckIcon className="text-lime-800 w-5 h-5" />
                        <span className="font-semibold"> Em estoque </span>
                    </p>
                    <div className="mt-4 border-t pt-4" >
                        <p className="text-gray-500"> Preço </p>
                        <p className="text-xl font-semibold">
                            {formatCurrencyString({
                                value: product.price,
                                currency: product.currency,
                            })}
                        </p>
                    </div>
                    <div className="mt-4 border-t pt-4" >
                        <p className="text-gray-500" >Quantidade</p>
                        <div className="mt-1 flex items-center space-x-3" >
                            <button disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)} className="p-1 rounded-md hover:bg-gray-300 hover:text-rose-500">
                                <MinusSmallIcon className="w-6 h-6 flex-shrink-0 " />
                            </button>
                            <p className="font-semibold text-xl">{quantity}</p>

                            <button onClick={() => setQuantity(quantity + 1)} className="p-1 rounded-md hover:bg-gray-300 hover:text-green-950">
                                <PlusSmallIcon className="w-6 h-6 flex-shrink-0 " />
                            </button>
                        </div>
                    </div>
                    <button onClick={onAddToCart}
                        className="w-full mt-4 border border-lime-500 py-2 px-6
                      bg-lime-500 hover:bg-lime-600
                       hover:border-lime-600 focus:ring-4
                        focus:ring-opacity-50 focus:ring-lime-500
                         text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-md" >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    )
}
export async function getStaticPaths() {
    const inventory = await stripe.products.list()
    inventory.data.map(product => ({
        params: { id: product.id }
    }))
    return {
        paths: [],
        fallback: "blocking"
    }
}
export async function getStaticProps({ params }) {
    const inventory = await stripe.products.list({
      expand: ["data.default_price"],
    });
    const products = inventory.data.map(product => {
      const price = product.default_price;
      return {
        currency: price.currency,
        id: product.id,
        name: product.name,
        price: price.unit_amount,
        image: product.images[0],
      };
    });
    const product = products.find(product => product.id === params.id);
  
    if (!product) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        product,
      },
      revalidate: 60 * 60,
    };
  }
  