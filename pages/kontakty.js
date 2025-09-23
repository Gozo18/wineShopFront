import { useRouter } from "next/router"
import Head from "next/head"
import { BsChevronDoubleLeft } from "react-icons/bs"
import styles from "../styles/Contacts.module.scss"

function kontakty() {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Kontakty - Víno Iris</title>
        <meta name="title" content="Kontakty - Víno Iris" />
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
        <meta property="og:url" content="https://vinoiris.cz" />
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
        <div className="col-12" id={styles.contactBox}>
          <h1>Kontakty</h1>

          <p>Víno Iris s.r.o.</p>
          <p>Podhradní 180</p>
          <p>692 01 Pavlov</p>
          <p>
            e-mail: <a href="mailto:info@vinoiris.cz">info@vinoiris.cz</a>
          </p>
          <p>
            telefon: <a href="tel:+420602528545">+420 602 528 545</a>
          </p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10496.334384830496!2d16.6681095!3d48.8756829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf6137f3202ed0130!2zVmluYcWZc3R2w60gSXJpcw!5e0!3m2!1scs!2scz!4v1669815175725!5m2!1scs!2scz"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default kontakty
