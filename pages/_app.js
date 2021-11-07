import CssBaseline from '@material-ui/core/CssBaseline'
import { Fragment } from 'react'
import { AuthProvider } from '../util/auth/Provider'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Fragment>
  )
}

export default MyApp
