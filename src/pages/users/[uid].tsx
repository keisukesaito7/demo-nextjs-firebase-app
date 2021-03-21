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
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light mb-3"
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className="container">
          <div className="mr-auto">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
          </div>
          <form className="d-flex">
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container">
        <div>{user.name.length ? user.name : 'now loading ...'}</div>
      </div>
    </div>
  )
}

export default UserShow
