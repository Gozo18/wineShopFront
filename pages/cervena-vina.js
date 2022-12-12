import Head from "next/head";
import { useQuery } from "urql";
import { GET_COLOR_PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

function cervenaVina() {
    const [results] = useQuery({
        query: GET_COLOR_PRODUCT_QUERY,
        variables: { color: "červené" },
        });
    const { data, fetching, error } = results;
  
    if (fetching) return (
      <div>
        <Head>
          <title>Červená vína - Vinařství Iris</title>
          <meta name="title" content="Červená vína - Vinařství Iris" />
          <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
          
          <meta property="og:title" content="Vinařství Iris - červená vína" />
          <meta property="og:type" content="website"/>
          <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
          <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
          <meta property="og:url" content="https://irispavlov.cz/cervena-vina" />
        </Head>
        <p>Načítání...</p>
      </div>
    );
    if (error) return <p>Chyba... {error.message}</p>;
    const products = data.products.data;

  return (
    <div>
      <Head>
        <title>Červená vína - Vinařství Iris</title>
        <meta name="title" content="Červená vína - Vinařství Iris" />
        <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        
        <meta property="og:title" content="Vinařství Iris - červená vína" />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
        <meta property="og:url" content="https://irispavlov.cz/cervena-vina" />
      </Head>

      <main>
        <h1 className={styles.mainHeader}>Vinařství Iris</h1>
        <p className={styles.mainPar}>
          Rodinné vinařství Zdeňka Šilinka se nachází pod Pálavou v malebné vinařské obci Pavlov, kde má vinařství mnoha set letou tradici. V minulém století ještě platilo, že ke každému domku patří sklep a ke sklepu vinohrad.
          Vína vyrábíme klasickými postupy z přihlédnutím k novým výrobním trendům.
        </p>
        <h2 className={styles.wineHeader}>Naše červená vína</h2>
        <div  className={styles.filterBox}>
            <Link href='/'>
                <a className={styles.allWine}>
                    všechna vína
                </a>
            </Link>
            <Link href='/bila-vina'> 
            <a className={styles.whiteWine}>
              bílá vína
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

export default cervenaVina