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
        <meta name="title" content="Kontakty - Vinařství Iris" />
        <meta name='description' content='Kontakty Vinařství Iris Pavlov - rodinné vinařství z Pavlova' />
        
        <meta property="og:title" content="Kontakty - Vinařství Iris" />
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Vinařství Iris Pavlov - rodinné vinařství z Pavlova." />
        <meta property="og:image" content="https://wine-shop-front.vercel.app/bottlePal.png" />
        <meta property="og:url" content="https://irispavlov.cz" />
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
                <p>e-mail: <a href="mailto:info@irispavlov.cz">info@irispavlov.cz</a></p>
                <p>telefon: <a href="tel:+420602528545">+420 602 528 545</a></p>

                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10496.334384830496!2d16.6681095!3d48.8756829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf6137f3202ed0130!2zVmluYcWZc3R2w60gSXJpcw!5e0!3m2!1scs!2scz!4v1669815175725!5m2!1scs!2scz" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    
    </div>
  )
}

export default kontakty