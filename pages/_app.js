import CssBaseline from '@material-ui/core/CssBaseline'
import { Fragment } from 'react'
import { AuthProvider } from '../util/auth/Provider'
import 'tailwindcss/tailwind.css'
import AppShell from '../components/AppShell'
import { Head, TITLE, DESCRIPTION } from '../components/Page/Head'

function Ultralight({ Component, pageProps }) {
  return (
    <Fragment>
      <Head />
      <CssBaseline />
      <AuthProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </AuthProvider>
    </Fragment>
  )
}

export default Ultralight
