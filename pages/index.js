import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  const router = useRouter()

  if (fetching) return (
    <div>
      <Head>
        <title>Vinařství Iris</title>
        <meta name="title" content="Vinařství Iris" />
        <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        
        <meta property="og:title" content="Vinařství Iris" />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
        <meta property="og:url" content="https://irispavlov.cz" />
      </Head>
      <div className="loadingBox">
        <div className="loader"></div>
      </div>
    </div>
  );
  if (error) return <p>Chyba... {error.message}</p>;

  if(!data) {
    router.reload(window.location.pathname);
  }
  const products = data.products.data;

  const closeModal = (e) => {
    document.getElementsByClassName("homepageOverlay")[0].style.display = 'none';
    document.getElementsByClassName("modal")[0].style.display = 'none';
  }

  return (
    <div className="homepage">
      <Head>
        <title>Vinařství Iris</title>
        <meta name="title" content="Vinařství Iris" />
        <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        
        <meta property="og:title" content="Vinařství Iris" />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
        <meta property="og:url" content="https://irispavlov.cz" />
      </Head>

      <main>
        <h1 className={styles.mainHeader}>Vinařství Iris</h1>
        <p className={styles.mainPar}>
          Rodinné vinařství Zdeňka Šilinka se nachází pod Pálavou v malebné vinařské obci Pavlov, kde má vinařství mnoha set letou tradici. V minulém století ještě platilo, že ke každému domku patří sklep a ke sklepu vinohrad.
          Vína vyrábíme klasickými postupy s přihlédnutím k novým výrobním trendům.
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
      <div className="homepageOverlay">
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vinařství Iris</h5>
                <button type="button" className="btn-close"onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Varování - pokud vám není 18 a více let, prosím, opusťte tyto stránky.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"onClick={closeModal}>Zavřít</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
