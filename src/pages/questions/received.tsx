/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/authentication'
import firebase from 'firebase/app'
import { Question } from '../../models/Question'
import Layout from '../../components/Layout'
import dayjs from 'dayjs'
import Link from 'next/link'

const QuestionReceived: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const { user } = useAuthentication()

  useEffect(() => {
    if (!process.browser) {
      return
    }
    if (user === null) {
      return
    }

    const loadQuestions = async () => {
      const snapshot = await firebase
        .firestore()
        .collection('questions')
        .where('receiverUid', '==', user.uid)
        // .orderBy('createdAt', 'desc')
        .get()

      if (snapshot.empty) {
        return
      }

      const gotQuestions = snapshot.docs.map((doc) => {
        const question = doc.data() as Question
        question.id = doc.id
        return question
      })
      setQuestions(gotQuestions)
    }

    loadQuestions()
  }, [process.browser, user])

  return (
    <Layout>
      <h1 className="h4">受け取った質問一覧</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          {questions.length ? (
            questions.map((question) => {
              return (
                <div className="card p-0" key={question.id}>
                  <div className="card-body">
                    <div className="text-truncate">{question.body}</div>
                    <div className="text-muted text-end">
                      <small>
                        {dayjs(question.createdAt?.toDate()).format(
                          'YYYY/MM/DD HH:mm'
                        )}
                      </small>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="spinner-border text-secondary" role="status"></div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default QuestionReceived
