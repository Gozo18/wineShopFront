import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { BsChevronDoubleLeft } from "react-icons/bs"
import { useQuery } from "urql"
import { PRODUCT_QUERY } from "../lib/query"
import styles from "../styles/Velko.module.scss"

function velkoodber() {
  const router = useRouter()

  const [results] = useQuery({ query: PRODUCT_QUERY })
  const { data, fetching, error } = results

  if (fetching)
    return (
      <div>
        <Head>
          <title>Velkoodběr - Vinařství Iris</title>
          <meta name="title" content="Velkoodběr - Vinařství Iris" />
          <meta
            name="description"
            content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova"
          />

          <meta property="og:title" content="Vinařství Iris" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova."
          />
          <meta
            property="og:image"
            content="https://wine-shop-front.vercel.app/bottlePal.png"
          />
          <meta property="og:url" content="https://irispavlov.cz" />
        </Head>
        <div className="loadingBox">
          <div className="loader"></div>
        </div>
      </div>
    )
  if (error) return <p>Chyba... {error.message}</p>
  const products = data.products.data

  return (
    <div>
      <Head>
        <title>Velkoodběr - Vinařství Iris</title>
        <meta name="title" content="Velkoodběr - Vinařství Iris" />
        <meta
          name="description"
          content="Kontakty Vinařství Iris Pavlov - rodinné vinařství z Pavlova"
        />

        <meta property="og:title" content="Kontakty - Vinařství Iris" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova."
        />
        <meta
          property="og:image"
          content="https://wine-shop-front.vercel.app/bottlePal.png"
        />
        <meta property="og:url" content="https://irispavlov.cz" />
      </Head>

      <div className="row">
        <div className="col-12 mb-4">
          <a onClick={() => router.back()} className={styles.backLink}>
            <BsChevronDoubleLeft /> zpět
          </a>
        </div>
        <div className="col-12" id={styles.velkoBox}>
          <h1>Velkoodběr</h1>
          <p className={styles.mainPar}>
            Pro nabídku sudových vín nás kontaktujte. Tel:<a href="tel:+420602528545">+420 602 528 545</a></p> Email:<a href="mailto:info@irispavlov.cz">info@irispavlov.cz</a></p>
          </p>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Název</th>
                <th scope="col">1 kus</th>
                <th scope="col">6 kusů</th>
                <th scope="col">18 kusů</th>
                <th scope="col">30 kusů</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.attributes.slug}>
                  <td>
                    <Link href={`/produkt/${product.attributes.slug}`}>
                      <a>
                        {product.attributes.name} {product.attributes.year}{" "}
                        {product.attributes.attribute}{" "}
                        {product.attributes.sweetness}
                      </a>
                    </Link>
                  </td>
                  <td>{product.attributes.price},-</td>
                  <td>{product.attributes.price6Pack},-</td>
                  <td>{product.attributes.price18Pack},-</td>
                  <td>{product.attributes.price30Pack},-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default velkoodber
