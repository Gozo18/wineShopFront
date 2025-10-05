import Head from "next/head"
import { useRouter } from "next/router"
import { useStateContext } from "../lib/context"
import { useEffect, useState } from "react"
import Link from "next/link"
import styles from "../styles/Checkout.module.scss"

function objednavka() {
  const { cartItems, totalPrice, orderInfo, removeAll, setTotalPrice } =
    useStateContext()
  const [sendingMessage, setSendingMessage] = useState(true)

  const router = useRouter()

  const orderedItems = []

  cartItems.map((item) => {
    let name = item.name + " " + item.year + " " + item.sweetness
    if (item.attribute != null) {
      name += " " + item.attribute
    }
    let addItem = {}
    addItem = {
      productname: name,
      productquantity: item.quantity,
      productprice: item.price,
    }
    orderedItems.push(addItem)
  })

  const headers = {
    "Content-Type": "application/json",
  }

  const orderData = {
    ...orderInfo,
    Totalprice: totalPrice,
    Orderedproduct: orderedItems,
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://strapi-production-16e2.up.railway.app/api/orders?populate=*",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: orderData,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          /* console.log(data); */
          setSendingMessage(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleSubmit()
    removeAll()
    setTotalPrice(0)
  }, [])

  return (
    <>
      <Head>
        <title>Víno Iris</title>
        <meta name="title" content="Objednávka dokončena - Víno Iris" />
        <meta
          name="description"
          content="Víno Iris Pavlov - rodinné vinařství z Pavlova"
        />

        <meta property="og:title" content="Objednávka dokončena - Víno Iris" />
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
      <div className={styles.thanksPage}>
        {sendingMessage ? (
          <h1>Odesílám objednávku...</h1>
        ) : (
          <div>
            <h1>Objednávka odeslána.</h1>
            <p>Děkujeme za nákup!</p>
            <p>Budeme vás kontaktovat.</p>
            <p>
              <Link href="/">
                <a>zpět na hlavní stránku.</a>
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default objednavka
