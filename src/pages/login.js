/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';


export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/'); // Redireciona para a página inicial
        }
    }, [status, router]);

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="text-center">
                <div className="mb-4">
                </div>
                <button
                    onClick={() => signIn('github')}
                    className="bg-white  border border-gray-700 border-solid
                     text-black hover:bg-gray-800 transition duration-1000 
                     ease-in-out hover:text-white font-semibold py-2 px-4 rounded-lg">
                    Continuar com GitHub
                </button>
            </div>
        </div>
    );
}
