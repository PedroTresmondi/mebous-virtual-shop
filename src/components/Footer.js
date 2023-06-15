import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-300 bg-white py-5 text-center shadow-lg">
            <p className="text-sm text-gray-500">
                Mebous Shop 2023
            </p>
            <Link href="https://github.com/PedroTresmondi/mebous-virtual-shop"
             className="text-sm text-gray-400 hover:text-gray-900 transition transform ease-in-out delay-300" >
                Ver no GitHub
            </Link>
        </footer>
    )
}