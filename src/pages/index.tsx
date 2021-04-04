import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthentication } from '../hooks/authentication'

export const Home = (): JSX.Element => {
  const { user } = useAuthentication()

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <button
          onClick={() => {
            window.alert('With typescript and Jest')
          }}
        >
          Test Button
        </button>

        <p>{user?.uid || '未ログイン'}</p>
        <Link href="/nextpage">
          <a>Go to page2</a>
        </Link>
        <br></br>
        <Link href={`/users/${user?.uid}`}>
          <a>Go to UserPage (for {user?.uid})</a>
        </Link>
        <br></br>
        <Link href={'/questions/received'}>
          <a>Go to Questions Page</a>
        </Link>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            height={'32'}
            width={'64'}
          />
        </a>
      </footer>
    </div>
  )
}

export default Home
