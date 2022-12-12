import "../styles/globals.scss";
import Head from "next/head";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { StateContext } from "../lib/context";
import "bootstrap/dist/css/bootstrap.min.css";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Head>
        <title>Vinařství Iris</title>
        <meta name="title" content="Vinařství Iris" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        <link rel='icon' href='/favicon.ico' />
        <meta property="og:title" content="Vinařství Iris" />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
        <meta property="og:url" content="https://irispavlov.cz" />
      </Head>
      <Provider value={client}>
        <Nav />
        <div className='container'>
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </StateContext>
  );
}

export default MyApp;
