import firebase from 'firebase/app'
import { User } from '../models/User'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'

const userState = atom<User>({
  key: 'user',
  default: null
})

export function useAuthentication(): { user: User } {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      })

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous
        })
      } else {
        // User is signed out.
        setUser(null)
      }
    })
  }, [])

  return { user }
}
