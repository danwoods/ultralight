import CssBaseline from '@material-ui/core/CssBaseline'
import { Fragment } from 'react'
import { AuthProvider } from '../util/auth/Provider'
import 'tailwindcss/tailwind.css'

function Ultralight({ Component, pageProps }) {
  return (
    <Fragment>
      <CssBaseline />
      <AuthProvider>
        <div className="w-screen h-screen flex">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </Fragment>
  )
}

export default Ultralight
