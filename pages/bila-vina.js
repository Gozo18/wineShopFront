import Head from "next/head";
import { useQuery } from "urql";
import { GET_COLOR_PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
import Header from "../components/Header";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function bilaVina() {
    const [results] = useQuery({
        query: GET_COLOR_PRODUCT_QUERY,
        variables: { color: "bílé" },
        });
    const { data, fetching, error } = results;

    if (fetching) return (
      <div>
        <Head>
          <title>Bílá vína - Vinařství Iris</title>
          <meta name="title" content="Bílá vína - Vinařství Iris" />
          <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
          
          <meta property="og:title" content="Vinařství Iris - bílá vína" />
          <meta property="og:type" content="website"/>
          <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
          <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
          <meta property="og:url" content="https://irispavlov.cz/bila-vina" />
        </Head>
        <div className="loadingBox">
          <div className="loader"></div>
        </div>
      </div>
    );
  if (error) return <p>Chyba... {error.message}</p>;
  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>Bílá vína - Vinařství Iris</title>
        <meta name="title" content="Bílá vína - Vinařství Iris" />
        <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        
        <meta property="og:title" content="Vinařství Iris - bílá vína" />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
        <meta property="og:url" content="https://irispavlov.cz/bila-vina" />
      </Head>

      <main>
        <Header />
        <h2 className={styles.wineHeader}>Naše bílá vína</h2>
        <div  className={styles.filterBox}>
            <Link href='/'>
                <a className={styles.allWine}>
                    všechna vína
                </a>
            </Link>
            <Link href='/cervena-vina'>
            <a className={styles.redWine}>
              červená vína
            </a>
            </Link>
            <Link href='/ruzova-vina'>
                <a className={styles.roseWine}>
                růžová vína
                </a>
            </Link>
        </div>
        <div className='row'>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}