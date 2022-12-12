import Head from "next/head";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import {
  BsPlusSquare,
  BsDashSquare,
  BsChevronDoubleLeft,
} from "react-icons/bs";
import { useStateContext } from "../../lib/context";
import { useEffect } from "react";
import styles from "../../styles/Detail.module.scss";

export default function ProductDetails() {
  //Use state
  const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext();

  const resetQuantity = () => {
    setQty(1);
  };
  useEffect(() => {
    resetQuantity();
  }, []);

  const router = useRouter();

  //Fetch slug
  const { query } = useRouter();
  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  //Extract Data
  const {
    name,
    description,
    image,
    year,
    attribute,
    sweetness,
    sugar,
    acid,
    alcohol,
    locality,
    color,
  } = data.products.data[0].attributes;

  return (
    <div>
      <Head>
        <title>{name} {year} {attribute} - Vinařství Iris</title>
        <meta name="title" content={`${name} ${year} ${attribute} - Vinařství Iris`} />
        <meta name='description' content={`${name} ${year} ${attribute} - Vinařství Iris Pavlov - rodinné vinařství z Pavlova`} />
        
        <meta property="og:title" content={`${name} ${year} ${attribute} - Vinařství Iris Pavlov`} />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content={`${name} ${year} ${attribute} - Vinařství Iris Pavlov - rodinné vinařství z Pavlova`} />
        <meta property="og:image" content={`${image.data.attributes.formats.medium.url}`} />
        <meta property="og:url" content="https://irispavlov.cz" />
      </Head>
    
      <div className='row'>
        <div className='col-12 mb-4'>
          <a onClick={() => router.back()} className={styles.backLink}>
            <BsChevronDoubleLeft /> zpět
          </a>
        </div>
        <div className='col-12 col-lg-6'>
          <img src={image.data.attributes.formats.medium.url} alt={name} />
        </div>
        <div className='col-col-12 col-lg-6 mb-4'>
          <div className={styles.detailText}>
            <h1>
              {name} {year} <br />{attribute}
            </h1>
            <p>{sweetness}</p>
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
                onAdd(data.products.data[0].attributes, qty);
              }}
              className='btn btn-primary'
            >
              Přidat do košíku
            </button>
            {description != null && <p>{description}</p>}
            {color != null && (
              <p>
                <strong>Barva:</strong> {color}
              </p>
            )}
            {alcohol != null && (
              <p>
                <strong>Alkohol:</strong> {alcohol}
              </p>
            )}
            {sugar != null && (
              <p>
                <strong>Zbytkový cukr:</strong> {sugar}
              </p>
            )}
            {acid != null && (
              <p>
                <strong>Kyselinky:</strong> {acid}
              </p>
            )}
            {locality != null && (
              <p>
                <strong>Obec:</strong> {locality}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
