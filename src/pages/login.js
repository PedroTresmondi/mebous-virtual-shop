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

    const handleGitHubLogin = () => {
        signIn('github');
    };

    const handleAuth0Login = () => {
        signIn('auth0');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center h-auto">

                <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                    <p className='font-semibold'>Bem vindo a Mebous Shop!</p>
                    <p className='font-light' >Faça o login para continuar</p>
                    <div className="space-y-4 flex flex-col items-center shadow-xl mt-5">
                        <button
                            onClick={handleGitHubLogin}
                            className="bg-white border border-gray-700 border-solid
             text-black hover:bg-gray-800 transition duration-1000
              ease-in-out hover:text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Continuar com GitHub
                        </button>
                        <button
                            onClick={handleAuth0Login}
                            className="bg-white border border-gray-700 border-solid
            text-black hover:bg-gray-800 transition duration-1000
             ease-in-out hover:text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Continuar com Auth0
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
