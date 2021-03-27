/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/authentication'
import firebase from 'firebase/app'
import { Question } from '../../models/Question'
import Layout from '../../components/Layout'

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
      {questions.length ? (
        <div>質問数: {questions.length}</div>
      ) : (
        <div className="spinner-border text-secondary" role="status"></div>
      )}
    </Layout>
  )
}

export default QuestionReceived
