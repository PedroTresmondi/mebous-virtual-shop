import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Auth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      // Ainda está carregando a autenticação, aguarde
      return
    }

    if (!session) {
      // Usuário não autenticado, redirecione para a página de login
      router.replace('/login')
    }
  }, [session, status, router])

  return null
}
