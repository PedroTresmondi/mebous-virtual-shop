import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, index }) {
    const { addItem } = useShoppingCart();

    function onAddToCart(e) {
        e.preventDefault()
        const id = toast.loading("Adicionando item...") 
        addItem(product)
        toast.success(`${product.name} adicionado`, { id })
    }

    return (
        <Link
            href={`/products/${product.id}`}
            className="border-2 rounded-md group overflow-hidden shadow-lg hover:scale-110 transition-transform">
            <div className="relative w-full h-64 p-10" >
                <Image priority={index === 0}
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="100%"
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>

            <div className="p-5 bg-white">
                <p className="font-semibold text-lg">{product.name}</p>
                <Rating />
                <div className="mt-4 flex items-center justify-between space-x-2">
                    <div>
                        <p className="text-gray-500"> Preco </p>
                        <p className="text-lg font-semibold">{formatCurrencyString({
                            currency: product.currency,
                            value: product.price
                        })}</p>
                    </div>
                    <button onClick={onAddToCart} className="border rounded-lg py-1 px-2"> + Carrinho </button>
                </div>
            </div>
        </Link>
    )

}