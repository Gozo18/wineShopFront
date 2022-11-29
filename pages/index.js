import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
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
      </Head>

      <main>
        <h1 className={styles.mainHeader}>Vinařství Iris</h1>
        <div className='row'>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
