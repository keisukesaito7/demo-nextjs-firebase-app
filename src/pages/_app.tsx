import { RecoilRoot } from 'recoil'
import '../libs/firebase'
import '../styles/index.scss'
import '../styles/globals.scss'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
