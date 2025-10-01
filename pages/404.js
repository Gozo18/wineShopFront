import Link from "next/link"
import { GiWineBottle } from "react-icons/gi"
import styles from "../styles/404.module.scss"

export default function FourOhFour() {
  return (
    <div className={styles.errorBox}>
      <div className={styles.errorIcon}>
        <GiWineBottle />
      </div>
      <h1>404 - Stránka nenalezena</h1>
      <Link href="/">zpět na hlavní stránku</Link>
    </div>
  )
}
