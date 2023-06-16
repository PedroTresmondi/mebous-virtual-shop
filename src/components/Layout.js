import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Header from './Header'
import Footer from './Footer'
import Meta from './Meta'

const inter = Inter({
    subsets: ['latin'],
    variable: "--font-inter"
})

export default function AppLayout({ children }) {
    // const { data: session, status } = useSession() 

    // if (status === 'loading') {
    //     return <div>Carregando...</div> 
    // }

    return (
        <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
            <Meta />
            <Header />
            <main className="flex-grow bg-gray-50" >
                {children}
            </main>
            <Footer />
        </div>
    )
}
