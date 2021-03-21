/* eslint-disable no-console */
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../models/User'
import firebase from 'firebase/app'

const defaultUser: User = {
  uid: '',
  isAnonymous: true,
  name: ''
}

type Query = {
  uid: string
}

const UserShow: React.FC = () => {
  const [user, setUser] = useState<User>(defaultUser)
  const router: NextRouter = useRouter()
  const query = router.query as Query

  useEffect(() => {
    if (query.uid === undefined) {
      return
    }

    const loadUser = async () => {
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get()

      if (!doc.exists) {
        // console.log('returned!')
        // console.log(user?.name)
        return
      }

      const gotUser = doc.data() as User
      gotUser.uid = doc.id
      setUser(gotUser)
    }
    loadUser()
  }, [query.uid])

  // defaultUserが表示されるので、nameがからのときに
  return <div>{user.name.length ? user.name : 'now loading ...'}</div>
}

export default UserShow
