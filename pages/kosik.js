import Head from "next/head";
import Image from 'next/image';
import { FaShoppingCart } from "react-icons/fa";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../lib/context";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Checkout.module.scss";

function kosik() {
  const { cartItems, totalPrice, setOrderInfo, setNotOrderSended } =
    useStateContext();

  const router = useRouter();

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      phone: "",
      street: "",
      town: "",
      psc: "",
      message: "",
    },
    onSubmit: () => {
      const Firstname = formik.values.name;
      const Surname = formik.values.surname;
      const email = formik.values.email;
      const Phone = formik.values.phone;
      const Street = formik.values.street;
      const Town = formik.values.town;
      const Psc = formik.values.psc;
      const Message = formik.values.message;

      setOrderInfo({
        Firstname: Firstname,
        Surname: Surname,
        email: email,
        Phone: Phone,
        Street: Street,
        Town: Town,
        Psc: Psc,
        Message: Message,
      });

      router.push("/objednavka");
    },
    validationSchema: yup.object({
      name: yup.string().trim().required("Prosím, vyplňte vaše jméno."),
      surname: yup.string().trim().required("Prosím, vyplňte vaše příjmení."),
      email: yup
        .string()
        .email("Prosím, vyplňte e-mail ve správném tvaru.")
        .required("Prosím, vyplňte e-mail."),
      phone: yup.string().trim().required("Prosím, vyplňte telefonní číslo."),
      street: yup
        .string()
        .trim()
        .required("Prosím, vyplňte ulici a číslo domu."),
      town: yup.string().trim().required("Prosím, vyplňte město."),
      psc: yup.string().trim().required("Prosím, vyplňte PSČ."),
    }),
  });

  return (
    <>
    <Head>
      <title>Vinařství Iris</title>
      <meta name="title" content="Košík - Vinařství Iris" />
      <meta name='description' content='Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
      
      <meta property="og:title" content="Košík - Vinařství Iris" />
      <meta property="og:type" content="website"/>
      <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
      <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
      <meta property="og:url" content="https://irispavlov.cz" />
    </Head>
    <div className='row'>
      <div className='col-12 mb-2 mb-lg-4'>
        <a onClick={() => router.back()} className={styles.backLink}>
          <BsChevronDoubleLeft /> zpět
        </a>
        <h1 className='text-center mt-2'>Objednávka</h1>
        <p className={styles.orderWarning}>Po objednání budete kontaktovaní pro způsob dopravy a platby.</p>
      </div>
      <div className='col-12 col-lg-6'>
      {cartItems.length >= 1 &&
        <label className='form-label'>Produkty</label>
      }
        {cartItems.length < 1 && (
          <div className={styles.emptyCartBox}>
            <FaShoppingCart />
            <h1>Prázdný košík</h1>
          </div>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <div className='card w-100 mb-3' key={item.slug}>
                <div className='row g-0'>
                  <div className='col-4 col-lg-2 p-2'>
                    <div className={styles.imageBox}>
                      <Image
                        src={item.image.data.attributes.formats.thumbnail.url}
                        alt={name}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className='col-8 col-lg-10'>
                    <div className={styles.cardBody}>
                      <h3>
                        {item.name} {item.year} {item.attribute}{" "}
                        {item.sweetness}
                      </h3>
                      <p>Kusů: {item.quantity}</p>
                      <p>Cena: {item.price},- Kč</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {cartItems.length >= 1 && (
          <div>
            <h3 className='text-end'>Celkem {totalPrice},- Kč</h3>
          </div>
        )}
      </div>
      <div className='col-12 col-lg-6 d-flex flex-column mb-5'>
        <div hidden={!submitted} className='alert alert-primary' role='alert'>
          {message}
        </div>
        
        {cartItems.length >= 1 &&
        <form className='w-100' onSubmit={formik.handleSubmit}>
          <div className='mb-1 mb-lg-3'>
            <label htmlFor='name' className='form-label'>
              Jméno
            </label>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Jméno'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <div className='text-danger'>{formik.errors.name}</div>
            )}
          </div>

          <div className='mb-1 mb-lg-3'>
            <label htmlFor='surname' className='form-label'>
              Příjmení
            </label>
            <input
              type='text'
              name='surname'
              className='form-control'
              placeholder='Příjmení'
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <div className='text-danger'>{formik.errors.surname}</div>
            )}
          </div>

          <div className='mb-1 mb-lg-3'>
            <label htmlFor='email' className='form-label'>
              E-mail
            </label>
            <input
              type='email'
              name='email'
              className='form-control'
              placeholder='jmeno@domena.cz'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && (
              <div className='text-danger'>{formik.errors.email}</div>
            )}
          </div>

          <div className='mb-1 mb-lg-3'>
            <label htmlFor='phone' className='form-label'>
              Telefon
            </label>
            <input
              type='text'
              name='phone'
              className='form-control'
              placeholder='+420 123 456 789'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && (
              <div className='text-danger'>{formik.errors.phone}</div>
            )}
          </div>

          <div className='mb-1 mb-lg-3'>
            <label htmlFor='street' className='form-label'>
              Ulice a číslo popisné
            </label>
            <input
              type='text'
              name='street'
              className='form-control'
              placeholder='Ulice'
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <div className='text-danger'>{formik.errors.street}</div>
            )}
          </div>

          <div className='mb-1 mb-lg-3'>
            <label htmlFor='town' className='form-label'>
              Město
            </label>
            <input
              type='text'
              name='town'
              className='form-control'
              placeholder='Město'
              value={formik.values.town}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <div className='text-danger'>{formik.errors.town}</div>
            )}
          </div>

          <div className='mb-1 mb-lg-3'>
            <label htmlFor='psc' className='form-label'>
              PSČ
            </label>
            <input
              type='text'
              name='psc'
              className='form-control'
              placeholder='PSČ'
              value={formik.values.psc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <div className='text-danger'>{formik.errors.psc}</div>
            )}
          </div>

          <div className='mb-3'>
            <label htmlFor='message' className='form-label'>
              Váš vzkaz
            </label>
            <textarea
              name='message'
              className='form-control'
              placeholder='Váš vzkaz ...'
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.message && (
              <div className='text-danger'>{formik.errors.message}</div>
            )}
          </div>

          <button type='submit' className='btn btn-primary'>
            Odeslat objednávku
          </button>
        </form>
        }
      </div>
    </div>
    </>
  );
}

export default kosik;
