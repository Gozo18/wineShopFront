import Link from "next/link";
import styles from "../styles/Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footerBox}>
        <div>Vinařství Iris s.r.o.</div>
        <div>
            <Link href='https://vilapavlov.cz'>
                ubytování vila Pavlov - vilapavlov.cz
            </Link>
        </div>
        <div>©2023 <Link href='/'>vinarstviiris.cz</Link></div>
    </div>
  )
}

export default Footer