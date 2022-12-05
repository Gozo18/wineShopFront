import Link from "next/link";
import { FiShoppingBag, FiMapPin } from "react-icons/fi";
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
                    <FiShoppingBag />
                    <h3>Košík</h3>
                  </div>
                  <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
                </>
              ) : (
                <></>
              )}
              <Link href='/kontakty'>
                <div className={styles.navContacts}>
                  <FiMapPin />
                  <h3>Kontakty</h3>
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
