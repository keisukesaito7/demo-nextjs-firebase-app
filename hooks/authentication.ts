import firebase from 'firebase/app'
import { User } from '../models/User'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'

const userState = atom<User>({
  key: 'user',
  default: null
})

async function createUserIfNotFound(user: User) {
  const userRef = firebase.firestore().collection('users').doc(user.uid)
  const doc = await userRef.get()
  if (doc.exists) {
    // 書き込みの方が高いので！
    return
  }

  await userRef.set({
    name: 'taro' + new Date().getTime()
  })
}

export function useAuthentication(): { user: User } {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    // eslint-disable-next-line no-console
    console.log('Start useEffect')

    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      })

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)
      } else {
        // User is signed out.
        setUser(null)
      }
    })
  }, [])

  return { user }
}
