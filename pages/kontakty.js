import { useRouter } from "next/router";
import {
    BsChevronDoubleLeft,
  } from "react-icons/bs";
import styles from "../styles/Contacts.module.scss";

function kontakty() {

    const router = useRouter();


  return (
    <div className='row'>
        <div className='col-12 mb-4'>
            <a onClick={() => router.back()} className={styles.backLink}>
                <BsChevronDoubleLeft /> zpět
            </a>
        </div>
        <div className='col-12' id={styles.contactBox}>
            <h1>
                Kontakty
            </h1>
            
            <p>Vinařství Iris s.r.o.</p>
            <p>Podhradní 180</p>
            <p>692 01 Pavlov</p>
            <p>e-mail: <a href="mailto:obchod@vinarstviiris.cz">obchod@vinarstviiris.cz</a></p>
            <p>telefon: <a href="tel:+420602528545">+420 602 528 545</a></p>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.0834122236547!2d16.665920815903487!3d48.87568640744245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712cdcdfdeefbe9%3A0x1a3830fe50f8b6a5!2sPodhradn%C3%AD%20180%2C%20692%2001%20Pavlov!5e0!3m2!1scs!2scz!4v1614621074531!5m2!1scs!2scz" width="600" height="450" loading="lazy"></iframe>
        </div>
    </div>
  )
}

export default kontakty