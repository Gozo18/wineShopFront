import Link from "next/link"
import Image from "next/image"
import {
  HiOutlineShoppingCart,
  HiOutlineIdentification,
  HiOutlineHome,
  HiOutlineRectangleStack,
} from "react-icons/hi2"
import Cart from "./Cart"
import { useStateContext } from "../lib/context"
import { withRouter } from "next/router"
const { AnimatePresence, motion } = require("framer-motion")
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "../styles/Nav.module.scss"

function Nav({ router }) {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className={styles.navSpace}>
      <div className={styles.navSpaceFix}>
        <div className="container">
          <div className={styles.navBox}>
            <div className={styles.nav}>
              <Link href="/">
                <a className={styles.logoImage}>
                  <Image src="/logo_only.png" alt="logo" layout="fill" />
                </a>
              </Link>
              <div className={styles.navMenu}>
                {(router.pathname != "/kosik") &
                (router.pathname != "/objednavka") ? (
                  <>
                    <div
                      onClick={() => setShowCart(true)}
                      className={styles.navCart}
                    >
                      <AnimatePresence mode="popLayout">
                        {totalQuantities > 0 && (
                          <motion.span
                            key={totalQuantities}
                            animate={{ scale: [1, 5, 1] }}
                            initial={{ scale: 0 }}
                            transition={{ ease: "easeOut", duration: 0.5 }}
                          >
                            {totalQuantities}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <HiOutlineShoppingCart />
                      <div className={styles.navheading}>Košík</div>
                    </div>
                    <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
                  </>
                ) : (
                  <></>
                )}
                {/* <Link href="/velkoodber">
                  <div className={styles.navContacts}>
                    <HiOutlineRectangleStack />
                    <div className={styles.navheading}>Velkoodběr</div>
                  </div>
                </Link> */}
                <Link href="/kontakty">
                  <div className={styles.navContacts}>
                    <HiOutlineIdentification />
                    <div className={styles.navheading}>Kontakty</div>
                  </div>
                </Link>
                <Link href="https://vilapavlov.cz">
                  <div className={styles.navContacts}>
                    <HiOutlineHome />
                    <div className={styles.navheading}>Ubytování</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Nav)
