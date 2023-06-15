import { CheckCircleIcon } from "@heroicons/react/24/solid"
import useSWR from 'swr'
import axios from "axios"
import { useRouter } from "next/router"
import { useShoppingCart } from "use-shopping-cart"

export default function SuccessPage() {
    const router = useRouter()
    const { clearCart } = useShoppingCart();
    const sessionId = router.query.session_id
    const { data, error } = useSWR(() => sessionId ? `/api/checkout-sessions/${sessionId}`
        : null, (url) => axios.get(url).then((res) => res.data),
        {
            onSuccess() {
                clearCart()
            }
        }
    );
    console.log(data, error);
    const email = data?.customer_details?.email
    return (
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center" >
            {error ? (
                <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
                    <p className="text-lg">Uhh...algo deu errado</p>
                </div>

            ) : !data ? (
                <div className="p-2 rounded-md text-gray-500 max-w-md mx-auto" >
                    <p className="text-lg">Carregando....</p>
                </div>
            ) : (
                <div className="py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto">
                    <CheckCircleIcon className="w-24 h-24 mx-auto flex-shrink-0 text-lime-600" />
                    <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1" >
                        Obrigado pela compra!
                        <p className="text-lg" >
                            Acompanhe seu pedido pelo e-mail! ({email})
                        </p>
                    </h2>
                </div>
            )}
        </div>
    )
}