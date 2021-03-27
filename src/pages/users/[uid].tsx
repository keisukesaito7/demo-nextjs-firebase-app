/* eslint-disable no-console */
import { NextRouter, useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { User } from '../../models/User'
import { toast } from 'react-toastify'
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
  const [body, setBody] = useState('')
  const [isSending, setIsSending] = useState(false)
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSending(true)

    await firebase.firestore().collection('questions').add({
      senderUid: firebase.auth().currentUser.uid,
      receiverUid: user.uid,
      body,
      isReplied: false,
      createAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    setIsSending(false)
    setBody('')
    toast.success('質問を送信しました。', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

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
              <form onSubmit={onSubmit}>
                <textarea
                  className="form-control"
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="好きな食べ物は何ですか？"
                  required
                ></textarea>
                <div className="m-3">
                  {isSending ? (
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    ></div>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={body.length ? false : true}
                    >
                      質問を送信する
                    </button>
                  )}
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
