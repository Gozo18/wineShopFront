import Link from "next/link"
import styles from "../styles/Footer.module.scss"

function Footer() {
  return (
    <div className={styles.footerBox}>
      <div>Víno Iris s.r.o.</div>
      <div>
        <Link href="https://vilapavlov.cz">
          ubytování vila Pavlov - vilapavlov.cz
        </Link>
      </div>
      <div>
        <Link href="/return-policy">Vrácení a reklamace</Link>
      </div>
      <div>
        ©2025 <Link href="/">vinoiris.cz</Link>
      </div>
    </div>
  )
}

export default Footer
