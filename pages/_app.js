import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { GoogleTagManager } from '@next/third-parties/google'

function MyApp({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  <Analytics />
  <GoogleTagManager gtmId='G-EDEGNF8SKY' />
</>
    
}

export default MyApp
