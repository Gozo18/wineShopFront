import Image from 'next/image';
import { FaShoppingCart } from "react-icons/fa";
import { BsPlusSquare, BsDashSquare, BsXSquare } from "react-icons/bs";
import Link from "next/link";
import { useEffect } from "react";
import { useStateContext } from "../lib/context";
import { motion } from "framer-motion";

import styles from "../styles/Cart.module.scss";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice, setTotalPrice, totalQuantities } =
    useStateContext();

    useEffect(() => {
      setTotalPrice(0);
      cartItems.map((item) => {
        if (totalQuantities < 6) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price * item.quantity
          );
        } else if (totalQuantities > 5 && item.quantity < 18) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price6Pack * item.quantity
          );
        } else if (totalQuantities > 17 && item.quantity < 30) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price18Pack * item.quantity
          );
        } else if (totalQuantities > 29) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price30Pack * item.quantity
          );
        }
      });
    }, [onAdd]);


  return (
    <motion.div
      className={styles.cartWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <motion.div
        className={styles.cartStyle}
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={() => setShowCart(false)} className={styles.close}>
          <BsXSquare />
        </div>
        {cartItems.length < 1 && (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>Prázdný košík</h1>
            <FaShoppingCart />
          </motion.div>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <motion.div
                className={styles.card}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                key={item.slug}
              >
                <div className='row'>
                  <div className='col-4 align-items-center h-100'>
                    <div className={styles.imageBox}>
                      <Image
                        src={item.image.data.attributes.formats.thumbnail.url}
                        alt={name}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className='col-8'>
                    <div className={styles.cardInfo}>
                      <h3>
                        {item.name} {item.year}
                      </h3>
                      <p>
                        {item.attribute}
                      </p>
                      <p>
                        {item.sweetness}
                      </p>
                      {(totalQuantities < 6) && (
                        <h3>{item.price},- Kč</h3>
                      )}
                      {(totalQuantities > 5 && totalQuantities < 18) && (
                        <>
                          <p><del>{item.price},- Kč</del></p>
                          <h3>{item.price6Pack},- Kč</h3>
                        </>
                      )}
                      {(totalQuantities > 17 && totalQuantities < 30) && (
                        <>
                        <p><del>{item.price},- Kč</del></p>
                        <h3>{item.price18Pack},- Kč</h3>
                      </>
                      )}
                      {(totalQuantities > 29) && (
                        <>
                        <p><del>{item.price},- Kč</del></p>
                        <h3>{item.price30Pack},- Kč</h3>
                      </>
                      )}
                      <div className={styles.quantityBox}>
                        <div onClick={() => onRemove(item)}>
                          <BsDashSquare />
                        </div>
                        <p>{item.quantity}</p>
                        <div onClick={() => onAdd(item, 1)}>
                          <BsPlusSquare />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        <motion.div layout className={styles.checkout}>
          {cartItems.length >= 1 && (
            <div>
              <h3>Celkem {totalPrice},- Kč</h3>
              <Link href={"/kosik"}>
                <a className='btn btn-primary'>Objednat</a>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
