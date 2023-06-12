import "../styles/globals.scss"
import Head from "next/head"
import { Provider, createClient } from "urql"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { StateContext } from "../lib/context"
import "bootstrap/dist/css/bootstrap.min.css"

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API })

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q1XH9M80QQ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q1XH9M80QQ');
        `,
          }}
        />
      </Head>
      <Provider value={client}>
        <Nav />
        <div className="container">
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </StateContext>
  )
}

export default MyApp
