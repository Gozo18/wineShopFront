import Head from "next/head";
import { useRouter } from "next/router";
import { useStateContext } from "../lib/context";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Checkout.module.scss";

function objednavka() {
  const { cartItems, totalPrice, orderInfo, removeAll, setTotalPrice } = useStateContext();
  const [sendingMessage, setSendingMessage] = useState(true);

  const router = useRouter();

  const orderedItems = [];

  cartItems.map((item) => {
    let name = item.name + " " + item.year + " " + item.sweetness;
    if(item.attribute != null) {
      name += " " + item.attribute;
    }
    let addItem = {};
    if (item.quantity < 6) {
      addItem = {
        productname: name,
        productquantity: item.quantity,
        productprice: item.price,
      };
    } else if (item.quantity > 5 && item.quantity < 18) {
      addItem = {
        productname: name,
        productquantity: item.quantity,
        productprice: item.price6Pack,
      };
    } else if (item.quantity > 17 && item.quantity < 30) {
      addItem = {
        productname: name,
        productquantity: item.quantity,
        productprice: item.price18Pack,
      };
    } else if (item.quantity > 29) {
      addItem = {
        productname: name,
        productquantity: item.quantity,
        productprice: item.price30Pack,
      };
    }
    orderedItems.push(addItem);
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const orderData = {
    ...orderInfo,
    Totalprice: totalPrice,
    Orderedproduct: orderedItems,
  };

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
          setSendingMessage(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
    removeAll();
    setTotalPrice(0);
  }, []);

  return (
    <>
    <Head>
      <title>Vinařství Iris</title>
      <meta name="title" content="Objednávka dokončena - Vinařství Iris" />
      <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
      
      <meta property="og:title" content="Objednávka dokončena - Vinařství Iris" />
      <meta property="og:type" content="website"/>
      <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
      <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
      <meta property="og:url" content="https://irispavlov.cz" />
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
            <Link href='/'>
              <a>zpět na hlavní stránku.</a>
            </Link>
          </p>
        </div>
      )}
    </div>
    </>
  );
}

export default objednavka;
