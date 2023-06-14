import axios from "axios";
import Link from "next/link"
import { useState } from "react";
import { toast } from "react-hot-toast";
import CartProduct from "src/components/CartProduct"
import { useShoppingCart } from "use-shopping-cart"

export default function CartPage() {
    const { cartCount, clearCart, formattedTotalPrice, cartDetails, redirectToCheckout } = useShoppingCart()
    const [isRedirecting, setRedirecting] = useState(false)

    function clearAll() {
        const id = toast.loading(`Limpando carrinho`);
        clearCart()
        toast.success(`Carrinho Limpo`, { id })

    }
    async function onCheckout() {
        if (cartCount > 0) {
          try {
            setRedirecting(true);
            const { id } = await axios.post("/api/checkout-sessions", cartDetails);
            const result = await redirectToCheckout(id);
            if (result?.error) {
              console.log("Erro no resultado", result);
            }
          } catch (e) {
            console.log("Error", e);
          } finally {
            setRedirecting(false);
          }
        }
      }
    return (
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
            {cartCount > 0 ? (
                <>
                    <h2 className="text-5xl font-semibold" > Seu carrinho </h2>
                    <p className="mt-1 text-xl" >
                        {cartCount} itens {" "}
                    </p>
                    <button onClick={() => clearAll()} className="opacity-50 hover:opacity-100 text-base capitalize" >
                        (Limpar tudo)
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-5xl font-semibold" > Seu carrinho esta vazio... </h2>
                    <p className="mt-1 text-xl" >
                        Adicione produtos ao seu carrinho e comece a comprar {" "}
                        <Link href="/" className="text-blue-600 underline"> aqui!
                        </Link>
                    </p>
                </>
            )}
            {cartCount > 0 && (
                <div className="mt-12 space-y-4" >
                    {Object.entries(cartDetails).map(([key, product]) => (
                        <CartProduct key={key} product={product} />
                    ))}

                    <div className="flex flex-col items-end border-t py-4 mt-8" >
                        <p className="text-xl" > Total: {" "}
                            <span className="font-semibold" > {formattedTotalPrice} </span>
                        </p>
                        <button
                            onClick={onCheckout}
                            disabled={isRedirecting}
                            className="border rounded py-2 px-6
                             bg-yellow-500 hover:bg-yellow-600 border-yellow-500
                             hover:border-yellow-600 focus:ring-4 focus:ring-opacity-50
                             focus:ring-yellow-500 text-white transition-colors disabled:opacity-50 
                             disabled:cursor-not-allowed
                             disabled:hover:bg-yellow-500 mt-4 max-w-max" >
                            {isRedirecting ? "Indo ao checkout..." : "Checkout"}
                        </button>
                    </div>
                </div>)}
        </div>
    )
}