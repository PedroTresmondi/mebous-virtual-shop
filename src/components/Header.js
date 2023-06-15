/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useShoppingCart } from 'use-shopping-cart';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const { formattedTotalPrice, cartCount } = useShoppingCart();
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    return (
        <header className="sticky top-0 bg-white z-10 shadow-lg">
            <div className="container mx-auto p-5 flex justify-between items-center">
                <Logo />

                <Link
                    href="/cart"
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 text-sm ml-auto">
                    <div className="relative">
                        <ShoppingCartIcon className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <p className="text-lg">{formattedTotalPrice} </p>
                    <span className="text-xs text-gray-500">({cartCount})</span>
                </Link>

                {session ? (
                    <div className="flex items-center space-x-1 col-auto flex-col align-top ml-10">
                        <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                        <p className="text-gray-500 text-sm">{session.user.name}</p>
                        <button
                            onClick={handleSignOut}
                            className="text-gray-400 hover:text-gray-900 text-sm" >
                            Sign out
                        </button>
                    </div>
                ) : (
                    <Link href="/login">
                        <a className="text-gray-500 hover:text-gray-900 text-sm">Sign in</a>
                    </Link>
                )}
            </div>
        </header>
    );
}
