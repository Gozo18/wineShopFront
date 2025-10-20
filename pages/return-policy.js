import Head from "next/head"
import styles from "../styles/return-policy.module.scss"

export default function ReturnPolicyPage() {
  return (
    <>
      <Head>
        <title>Reklamační a návratová politika - Víno Iris</title>
        <meta
          name="title"
          content="Reklamační a návratová politika - Víno Iris"
        />
        <meta
          name="description"
          content="Reklamační a návratová politika Víno Iris Pavlov - rodinné vinařství z Pavlova"
        />

        <meta
          property="og:title"
          content="Reklamační a návratová politika - Víno Iris"
        />
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

      <section>
        <h1 className={styles.heading}>Reklamační a návratová politika</h1>

        <p className={styles.paragraph}>
          Vážíme si každého zákazníka a přejeme si, abyste byli s naším vínem
          maximálně spokojeni. Pokud však dojde k situaci, kdy nejste s nákupem
          spokojeni, postupujte prosím podle níže uvedených pokynů.
        </p>

        {/* 1. Odstoupení od smlouvy */}
        <div>
          <div>
            <h2 className={styles.heading}>1. Odstoupení od smlouvy</h2>
            <p className={styles.paragraph}>
              V souladu se zákonem máte právo odstoupit od kupní smlouvy bez
              udání důvodu do <strong>14 dnů od převzetí zboží</strong>.
            </p>
            <p className={styles.paragraph}>
              Pro odstoupení, prosím, napište e-mail na adresu:{" "}
              <a href="mailto:info@vinoiris.cz">info@vinoiris.cz</a>.
            </p>
            <p className={styles.paragraph}>
              Zboží poté odešlete na naši adresu:
            </p>
            <address>
              <strong>Víno Iris</strong>
              <br />
              Podhradní 180
              <br />
              692 01 Pavlov
            </address>
            <ul>
              <li>
                Láhve musí být neotevřené, nepoškozené a v původním obalu.
              </li>
              <li>
                Zboží musí být bezpečně zabaleno, aby nedošlo k poškození.
              </li>
              <li>Náklady na dopravu zpět nese zákazník.</li>
            </ul>
            <p className={styles.paragraph}>
              Po doručení a kontrole stavu Vám do <strong>14 dnů</strong>{" "}
              vrátíme peníze stejným způsobem, jakým byla provedena platba.
            </p>
          </div>
        </div>

        {/* 2. Reklamace */}
        <div>
          <div>
            <h2 className={styles.heading}>2. Reklamace vadného zboží</h2>
            <p className={styles.paragraph}>
              Pokud obdržíte poškozenou láhev nebo vadné víno, kontaktujte nás
              prosím co nejdříve po doručení.
            </p>
            <p className={styles.paragraph}>
              Do e-mailu uveďte:
              <ul>
                <li>číslo objednávky,</li>
                <li>popis vady,</li>
                <li>fotografii poškození (pokud je to možné).</li>
              </ul>
            </p>
            <p className={styles.paragraph}>
              Následně se s Vámi dohodneme na výměně zboží nebo vrácení peněz.
            </p>
          </div>
        </div>

        {/* 3. Výjimky */}
        <div>
          <div>
            <h2 className={styles.heading}>3. Výjimky z vrácení</h2>
            <p className={styles.paragraph}>
              Z hygienických důvodů nelze vracet{" "}
              <strong>otevřené láhve vína</strong> nebo zboží, které bylo zjevně
              použito. Také nelze vrátit vína s přirozeným vývojem chuti či
              barvy po otevření, které nejsou vadou produktu.
            </p>
          </div>
        </div>

        {/* 4. Kontakt */}
        <div>
          <div>
            <h2 className={styles.heading}>4. Kontakt</h2>
            <p className={styles.paragraph}>
              Máte dotaz ohledně vrácení nebo reklamace? Kontaktujte nás:
            </p>
            <div>
              <a href="mailto:info@vinoiris.cz">info@vinoiris.cz</a>
            </div>
            <div>
              <a href="tel:+420602528545">+420 602 528 545</a>
            </div>
            <p>Po–Pá 9:00–17:00</p>
          </div>
        </div>
      </section>
    </>
  )
}
