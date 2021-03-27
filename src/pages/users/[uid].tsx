/* eslint-disable no-console */
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../models/User'
import firebase from 'firebase/app'
import Layout from '../../components/Layout'
import Link from 'next/link'

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
    <Layout>
      {user.name.length ? (
        <>
          <div className="text-center">
            <h1 className="h4">{user.name}さんのページ</h1>
            <div className="m-5">{user.name}さんに質問しよう！</div>
            <Link href="/">
              <a>Go To RootPage</a>
            </Link>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-12 col-md-6">
              <form>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="hello?"
                  required
                ></textarea>
                <div className="m-3">
                  <button type="submit" className="btn btn-primary">
                    質問を送信する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        'now loading ...'
      )}
    </Layout>
  )
}

export default UserShow
