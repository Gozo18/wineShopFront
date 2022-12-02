import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  if (fetching) return <p>Načítání...</p>;
  if (error) return <p>Chyba... {error.message}</p>;
  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>Vinařství Iris</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        <link rel='icon' href='/favicon.ico' />
        <meta property="og:title" content="Vinařství Iris" />
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="/logo_only.png" />
        <meta property="og:url" content="https://irispavlov.cz" />
      </Head>

      <main>
        <h1 className={styles.mainHeader}>Vinařství Iris</h1>
        <p className={styles.mainPar}>
          Rodinné vinařství Zdeňka Šilinka se nachází pod Pálavou v malebné vinařské obci Pavlov, kde má vinařství mnoha set letou tradici. V minulém století ještě platilo, že ke každému domku patří sklep a ke sklepu vinohrad.
          Vína vyrábíme klasickými postupy z přihlédnutím k novým výrobním trendům.
        </p>
        <h2 className={styles.wineHeader}>Naše vína</h2>
        <div className={styles.filterBox}>
          <Link href='/bila-vina'> 
            <a className={styles.whiteWine}>
              bílá vína
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
  );
}
