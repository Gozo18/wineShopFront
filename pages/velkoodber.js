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
          <title>Velkoodběr - Víno Iris</title>
          <meta name="title" content="Velkoodběr - Víno Iris" />
          <meta
            name="description"
            content="Víno Iris Pavlov - rodinné vinařství z Pavlova"
          />

          <meta property="og:title" content="Víno Iris" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Víno Iris Pavlov - rodinné vinařství z Pavlova."
          />
          <meta
            property="og:image"
            content="https://wine-shop-front.vercel.app/bottlePal.png"
          />
          <meta property="og:url" content="https://vinoiris.cz" />
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
        <title>Velkoodběr - Víno Iris</title>
        <meta name="title" content="Velkoodběr - Víno Iris" />
        <meta
          name="description"
          content="Kontakty Víno Iris Pavlov - rodinné vinařství z Pavlova"
        />
        <meta property="og:title" content="Kontakty - Víno Iris" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Víno Iris Pavlov - rodinné vinařství z Pavlova."
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
              name: "Víno Iris",
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
              sameAs: "http://www.vinoiris.cz",
              email: "info@vinoiris.cz",
              image:
                "https://www.vinoiris.cz/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgxiw0ujm%2Fimage%2Fupload%2Fv1681570595%2Flarge_pa21_polosladke_c93aed8add.png&w=1920&q=75",
            }),
          }}
        />
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
            Pro nabídku sudových vín nás kontaktujte. Tel:
            <a href="tel:+420602528545">+420 602 528 545</a> Email:
            <a href="mailto:info@irispavlov.cz">info@irispavlov.cz</a>
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
