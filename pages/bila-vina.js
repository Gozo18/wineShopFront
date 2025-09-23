import Head from "next/head"
import { useQuery } from "urql"
import { GET_COLOR_PRODUCT_QUERY } from "../lib/query"
import Product from "../components/Product"
import Header from "../components/Header"
import Link from "next/link"
import styles from "../styles/Home.module.scss"

export default function bilaVina() {
  const [results] = useQuery({
    query: GET_COLOR_PRODUCT_QUERY,
    variables: { color: "bílé" },
  })
  const { data, fetching, error } = results

  if (fetching)
    return (
      <div>
        <Head>
          <title>Bílá vína - Víno Iris</title>
          <meta name="title" content="Bílá vína - Víno Iris" />
          <meta
            name="description"
            content="Víno Iris Pavlov - rodinné vinařství z Pavlova"
          />

          <meta property="og:title" content="Víno Iris - bílá vína" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Víno Iris Pavlov - rodinné vinařství z Pavlova."
          />
          <meta
            property="og:image"
            content="https://wine-shop-front.vercel.app/bottlePal.png"
          />
          <meta property="og:url" content="https://vinoiris.cz/bila-vina" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": ["Winery", "TouristAttraction"],
                name: "Víno Iris",
                description:
                  "Rodinné vinařství Zdeňka Šilinka se nachází pod Pálavou ve vinařské obci Pavlov. Bílá vína.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Pavlov",
                  addressCountry: "CZ",
                  postalCode: "69201",
                  streetAddress: "Podhradní 180",
                },
                publicAccess: true,
                availableLanguage: ["Czech"],
                openingHours: ["Po-Su 9:00-19:00"],
                touristType: ["Wine tourism"],
                telephone: ["+420602528545"],
                sameAs: "http://www.vinoiris.cz/bila-vina",
                email: "info@vinoiris.cz",
                image:
                  "https://www.vinarstviiris.cz/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgxiw0ujm%2Fimage%2Fupload%2Fv1681570595%2Flarge_pa21_polosladke_c93aed8add.png&w=1920&q=75",
              }),
            }}
          />
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
        <title>Bílá vína - Víno Iris</title>
        <meta name="title" content="Bílá vína - Víno Iris" />
        <meta
          name="description"
          content="Víno Iris Pavlov - rodinné vinařství z Pavlova"
        />

        <meta property="og:title" content="Víno Iris - bílá vína" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Víno Iris Pavlov - rodinné vinařství z Pavlova."
        />
        <meta
          property="og:image"
          content="https://wine-shop-front.vercel.app/bottlePal.png"
        />
        <meta property="og:url" content="https://vinoiris.cz/bila-vina" />
      </Head>

      <main>
        <Header />
        <h2 className={styles.wineHeader}>Naše bílá vína</h2>
        <div className={styles.filterBox}>
          <Link href="/">
            <a className={styles.allWine}>všechna vína</a>
          </Link>
          <Link href="/cervena-vina">
            <a className={styles.redWine}>červená vína</a>
          </Link>
          <Link href="/ruzova-vina">
            <a className={styles.roseWine}>růžová vína</a>
          </Link>
        </div>
        <div className="row">
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
