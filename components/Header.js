import Link from "next/link"
import styles from "../styles/Home.module.scss"

export default function Header() {
  return (
    <>
      <h1 className={styles.mainHeader}>Víno Iris</h1>
      <div className={styles.filterBox}>
        <Link href="/nase-vina">
          <a>
            <div className="card w-100 h-100">
              <img src="/miniatura.png" />
              všechna vína
            </div>
          </a>
        </Link>
        <Link href="/bila-vina">
          <a>
            <div className="card w-100 h-100">
              <img src="/miniatura.png" />
              bílá vína
            </div>
          </a>
        </Link>
        <Link href="/cervena-vina">
          <a>
            <div className="card w-100 h-100">
              <img src="/miniatura.png" />
              červená vína
            </div>
          </a>
        </Link>
        <Link href="/ruzova-vina">
          <a>
            <div className="card w-100 h-100">
              <img src="/miniatura.png" />
              růžová vína
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}
