import Head from "next/head"
import { useQuery } from "urql"
import { PRODUCT_QUERY } from "../lib/query"
import Product from "../components/Product"
import Header from "../components/Header"
import Link from "next/link"
import { useRouter } from "next/router"
import { useStateContext } from "../lib/context"
import WineSlider from "../components/WineSlider"
import styles from "../styles/Home.module.scss"

export default function Home() {
  const { showWarning, setShowWarning } = useStateContext()

  const [results] = useQuery({ query: PRODUCT_QUERY })
  const { data, fetching, error } = results

  const router = useRouter()

  if (fetching)
    return (
      <div>
        <Head>
          <title>Vinařství Iris</title>
          <meta name="title" content="Vinařství Iris" />
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
  if (error) {
    router.reload(window.location.pathname)
  }

  if (!data) {
    router.reload(window.location.pathname)
  } else {
    const products = data.products.data

    const closeModal = () => {
      setShowWarning(false)
    }

    return (
      <div className="homepage">
        <Head>
          <title>Vinařství Iris</title>
          <meta name="title" content="Vinařství Iris" />
          <meta
            name="description"
            content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova, vinařství Šilinek, víno Pavlov, Pálava"
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

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": ["Winery", "TouristAttraction"],
                name: "Vinařství Iris",
                description:
                  "Rodinné vinařství Zdeňka Šilinka se nachází pod Pálavou ve vinařské obci Pavlov.",
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
                sameAs: "http://www.vinarstviiris.cz",
                email: "info@vinarstviiris.cz",
                image:
                  "http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgxiw0ujm%2Fimage%2Fupload%2Fv1681570595%2Flarge_pa21_polosladke_c93aed8add.png&w=1920&q=75",
              }),
            }}
          />
        </Head>

        <main>
          <Header />
          <WineSlider products={products} />
          <h2 className={styles.wineHeader}>Naše vína</h2>
          <div className={styles.filterBox}>
            <Link href="/bila-vina">
              <a className={styles.whiteWine}>bílá vína</a>
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
        {showWarning && (
          <div className="homepageOverlay">
            <div className="modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title">Vinařství Iris</p>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                      aria-label="Close button"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Varování - pokud vám není 18 a více let, prosím, opusťte
                      tyto stránky.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                      aria-label="Close button"
                    >
                      Zavřít
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
