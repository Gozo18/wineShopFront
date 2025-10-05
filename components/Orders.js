import { useEffect, useState } from "react"
import { HiOutlineTruck } from "react-icons/hi2"
import styles from "../styles/Admin.module.scss"

function Orders() {
  const [orders, setOrders] = useState([])

  const ordersSummary = async () => {
    try {
      const response = await fetch(
        "https://strapi-production-16e2.up.railway.app/api/orders?populate=*&sort[1]=id%3Adesc",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setOrders(data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ordersSummary()
  })

  const toggleDetails = (e) => {
    if (e.target.classList.contains("collapsed")) {
      document.querySelectorAll(".accordion-button").forEach((el) => {
        el.classList.add("collapsed")
      })
      document.querySelectorAll(".accordion-collapse").forEach((el) => {
        el.classList.remove("show")
      })
      e.target.classList.remove("collapsed")
      const parentEl = e.target.parentElement.parentElement
      parentEl.childNodes[1].classList.add("show")
    } else {
      document.querySelectorAll(".accordion-button").forEach((el) => {
        el.classList.add("collapsed")
      })
      document.querySelectorAll(".accordion-collapse").forEach((el) => {
        el.classList.remove("show")
      })
      e.target.classList.add("collapsed")
      const parentEl = e.target.parentElement.parentElement
      parentEl.childNodes[1].classList.remove("show")
    }
  }

  const deliveryButton = async (e) => {
    const isDelivered = e.target.getAttribute("data-delivered")

    if (isDelivered === "false") {
      const orderId = e.target.getAttribute("data-orderid")
      const headers = {
        "Content-Type": "application/json",
      }
      try {
        const response = await fetch(
          `https://strapi-production-16e2.up.railway.app/api/orders/${orderId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              data: {
                Delivered: true,
              },
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
      } catch (error) {
        console.log(error)
      }
    } else {
      const orderId = e.target.getAttribute("data-orderid")
      const headers = {
        "Content-Type": "application/json",
      }
      try {
        const response = await fetch(
          `https://strapi-production-16e2.up.railway.app/api/orders/${orderId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              data: {
                Delivered: false,
              },
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  function formatMyDate(value, locale = "cs-CS") {
    return new Date(value).toLocaleDateString(locale)
  }

  let totalQuantities = 0

  order.attributes.Orderedproduct.map(
    (product) => (totalQuantities += product.productquantity)
  )

  return (
    <div className="row">
      <div className="col-12 mb-2 mb-lg-4">
        <h2 className="text-center mt-2 mb-4">Objednávky</h2>
        <div className={styles.ordersBox}>
          <div className="accordion" id="ordersAccordion">
            {orders.map((order) => (
              <div className="accordion-item" key={order.id}>
                <h3 className="accordion-header" id={`heading${order.id}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseText${order.id}`}
                    aria-expanded="false"
                    aria-controls={`collapseText${order.id}`}
                    onClick={toggleDetails}
                  >
                    <b
                      className={
                        order.attributes.Delivered
                          ? styles.idDelivered
                          : styles.idNotDelivered
                      }
                    >
                      #{order.id}
                    </b>{" "}
                    <span>{formatMyDate(order.attributes.createdAt)}</span>{" "}
                    <b>
                      {order.attributes.Firstname} {order.attributes.Surname}
                    </b>{" "}
                    <span>{order.attributes.Totalprice},- Kč</span>
                  </button>
                </h3>
                <div
                  id={`collapseText${order.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${order.id}`}
                  data-bs-parent="#ordersAccordion"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <p>
                          <span>Jméno:</span> {order.attributes.Firstname}{" "}
                          {order.attributes.Surname}
                        </p>
                        <p>
                          <span>Ulice:</span> {order.attributes.Street}
                        </p>
                        <p>
                          <span>Město:</span> {order.attributes.Town}
                        </p>
                        <p>
                          <span>PSČ:</span> {order.attributes.Psc}
                        </p>
                        <p>
                          <span>Telefon:</span> {order.attributes.Phone}
                        </p>
                        <p>
                          <span>E-mail:</span> {order.attributes.email}
                        </p>
                        <p>
                          <span>Vzkaz:</span> {order.attributes.Message}
                        </p>
                      </div>
                      <div className="col-12 col-lg-6">
                        <h4>Produkty</h4>
                        {order.attributes.Orderedproduct.map((product) => (
                          <div key={product.id} className={styles.productBox}>
                            <div>{product.productname}</div>
                            <div className={styles.amounttBox}>
                              <div>
                                <span>Množství:</span> {product.productquantity}
                              </div>
                              <div>
                                <span>Cena:</span> {product.productprice},-
                              </div>
                              <div>
                                <span>Cena celkem:</span>{" "}
                                {product.productquantity * product.productprice}
                                ,-
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className={styles.totalPrice}>
                          <span>Celková sleva:</span>{" "}
                          {Math.floor(totalQuantities / 6) * 100 +
                            Math.floor(totalQuantities / 30) * 200}
                          ,-
                        </div>
                        <div className={styles.totalPrice}>
                          <span>Celková cena objednávky:</span>{" "}
                          {order.attributes.Totalprice},-
                        </div>
                      </div>
                      <div className="col-12">
                        <div className={styles.deliveryBox}>
                          {order.attributes.Delivered ? (
                            <span
                              className={styles.deliveryTrue}
                              onClick={deliveryButton}
                              data-delivered={order.attributes.Delivered}
                              data-orderid={order.id}
                            >
                              <HiOutlineTruck /> Doručeno
                            </span>
                          ) : (
                            <span
                              className={styles.deliveryFalse}
                              onClick={deliveryButton}
                              data-delivered={order.attributes.Delivered}
                              data-orderid={order.id}
                            >
                              <HiOutlineTruck /> Nedoručeno
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
