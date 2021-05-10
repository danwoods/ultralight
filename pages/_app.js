//import '../styles/globals.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
