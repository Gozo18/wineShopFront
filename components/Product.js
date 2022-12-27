import Link from "next/link";
import Image from 'next/image';
import { useStateContext } from "../lib/context";
import { useEffect, useState } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Products.module.scss";

export default function Product({ product }) {
  const { onAdd } = useStateContext();

  const [qty, setQty] = useState(1);

  //Increase product countity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const resetQuantity = () => {
    setQty(1);
  };
  useEffect(() => {
    resetQuantity();
  }, []);

  const { name, price, image, slug, year, sweetness, attribute } =
    product.attributes;

  return (
    <div className='col-6 col-lg-4 col-xl-3'>
      <div className='card w-100'>
        <Link href={`/produkt/${slug}`}>
          <a className={styles.imageBox}>
            <Image
              src={image.data.attributes.formats.small.url}
              alt={name}
              layout="fill"
            />
          </a>
        </Link>
        <div className='card-body'>
          <Link href={`/produkt/${slug}`}>
            <a className={styles.headerBox}>
              <h2>{name}</h2>
              <h3>{year}</h3>
              <h3>{sweetness}</h3>
              <h3>{attribute}</h3>
            </a>
          </Link>
          <h3 className={styles.price}>{price},- Kč</h3>
          <div className={styles.quantityBox}>
            <div onClick={decreaseQty}>
              <BsDashSquare />
            </div>
            <p>{qty}</p>
            <div onClick={increaseQty}>
              <BsPlusSquare />
            </div>
          </div>
          <button
            onClick={() => {
              onAdd(product.attributes, qty);
            }}
            className='btn btn-primary'
          >
            Koupit
          </button>
        </div>
      </div>
    </div>
  );
}
