import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2 m-1">
            <Image src="/logo.svg" alt="Logo" width={42} height={42} />
            <span className="hidden sm:inline-block font-italic text-3xl text-gray-700 ml-10">
                Mebous Shop
            </span>
        </Link>
    )
}