import { useRouter } from "next/router";
import Head from "next/head";
import {
    BsChevronDoubleLeft,
  } from "react-icons/bs";
import styles from "../styles/Contacts.module.scss";

function kontakty() {

    const router = useRouter();


  return (
    <div>
        <Head>
        <title>Kontakty - Vinařství Iris</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='description' content='Kontakty Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

        <div className='row'>
            <div className='col-12 mb-4'>
                <a onClick={() => router.back()} className={styles.backLink}>
                    <BsChevronDoubleLeft /> zpět
                </a>
            </div>
            <div className='col-12' id={styles.contactBox}>
                <h1>Kontakty</h1>

                <p>Vinařství Iris s.r.o.</p>
                <p>Podhradní 180</p>
                <p>692 01 Pavlov</p>
                <p>e-mail: <a href="mailto:obchod@vinarstviiris.cz">obchod@vinarstviiris.cz</a></p>
                <p>telefon: <a href="tel:+420602528545">+420 602 528 545</a></p>

                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10496.334384830496!2d16.6681095!3d48.8756829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf6137f3202ed0130!2zVmluYcWZc3R2w60gSXJpcw!5e0!3m2!1scs!2scz!4v1669815175725!5m2!1scs!2scz" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    
    </div>
  )
}

export default kontakty