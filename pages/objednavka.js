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
    const name = item.name + " " + item.year + " " + item.sweetness;
    if(item.attribute != null) {
      name += " " + item.attribute;
    }
    const addItem = {
      productname: name,
      productquantity: item.quantity,
      productprice: item.price,
    };
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
        "http://localhost:1337/api/orders?populate=*",
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
  );
}

export default objednavka;
