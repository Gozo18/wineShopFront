import Link from "next/link";
import { HiOutlineShoppingCart, HiOutlineIdentification, HiOutlineHome, HiOutlineRectangleStack } from "react-icons/hi2";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
import { withRouter } from "next/router";
const { AnimatePresence, motion } = require("framer-motion");
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Nav.module.scss";

function Nav({ router }) {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className={styles.navSpace}>
      <div className={styles.navSpaceFix}>
        <div className="container">
          <div className={styles.navBox}>
            <div className={styles.nav}>
              <Link href='/'>
                <img src='/logo_only.png' alt='logo' className={styles.logoImage} />
              </Link>
              <div className={styles.navMenu}>
              {(router.pathname != "/kosik") & (router.pathname != "/objednavka") ? (
                <>
                  <div onClick={() => setShowCart(true)} className={styles.navCart}>
                    {totalQuantities > 0 && (
                      <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
                        {totalQuantities}
                      </motion.span>
                    )}
                    <HiOutlineShoppingCart />
                    <h3>Košík</h3>
                  </div>
                  <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
                </>
              ) : (
                <></>
              )}
              <Link href='/velkoodber'>
                <div className={styles.navContacts}>
                  <HiOutlineRectangleStack />
                  <h3>Velkoodběr</h3>
                </div>
              </Link>
              <Link href='/kontakty'>
                <div className={styles.navContacts}>
                  <HiOutlineIdentification />
                  <h3>Kontakty</h3>
                </div>
              </Link>
              <Link href='https://vilapavlov.cz'>
                <div className={styles.navContacts}>
                  <HiOutlineHome />
                  <h3>Ubytování</h3>
                </div>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Nav);
