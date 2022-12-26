import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../config/firebase'
import LoadingContext from '../styles/LoadingContext'
import Login from './login'

export default function App({ Component, pageProps }: AppProps) {
  const [loggedUser, loading, _error] = useAuthState(auth)

  useEffect(() => {
    if (!loggedUser) return
      ; (async () => {
        try {
          await setDoc(doc(db, 'users', loggedUser?.email as string),
            {
              email: loggedUser?.email,
              lastSeen: serverTimestamp(),
              photoUrl: loggedUser?.photoURL
            },
            { merge: true }
          )
        } catch (error) {

        }
      })()
  }, [loggedUser])

  if (loading) return <LoadingContext />

  if (!loggedUser) return <Login />
  return <Component {...pageProps} />
}
