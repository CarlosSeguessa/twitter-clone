import { useState, useEffect } from 'react'
import { onAuthStateChanged } from '@/firebase/client'
import Router from 'next/router'
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && Router.push('/')
  }, [user])
  return user
}
