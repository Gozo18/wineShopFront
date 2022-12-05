import { useEffect, useState } from "react";
import styles from "../styles/Admin.module.scss";

function Orders() {

    const [orders, setOrders] = useState([]);

    const ordersSummary = async () => {
        try {
            const response = await fetch(
            "https://wineshopback-production.up.railway.app/api/orders?populate=*",
            {
                method: "GET",
            }
            )
            .then((response) => response.json())
            .then((data) => {
                setOrders(data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        ordersSummary();
    }, [setOrders]);

    const toggleDetails = (e) => {
        if(e.target.classList.contains("collapsed")) {
            document.querySelectorAll(".accordion-button").forEach((el) => {
                el.classList.add("collapsed");
            });
            document.querySelectorAll(".accordion-collapse").forEach((el) => {
                el.classList.remove("show");
            });
            e.target.classList.remove("collapsed");
            const parentEl = e.target.parentElement.parentElement;
            parentEl.childNodes[1].classList.add("show");
        } else {
            document.querySelectorAll(".accordion-button").forEach((el) => {
                el.classList.add("collapsed");
            });
            document.querySelectorAll(".accordion-collapse").forEach((el) => {
                el.classList.remove("show");
            });
            e.target.classList.add("collapsed");
            const parentEl = e.target.parentElement.parentElement;
            parentEl.childNodes[1].classList.remove("show");
        }
    }

    console.log(orders);

  return (
    <div className='row'>
        <div className='col-12 mb-2 mb-lg-4'>
            <h2 className='text-center mt-2'>Objednávky</h2>
            <div className={styles.ordersBox}>
                <div className="accordion" id="ordersAccordion">
                    {orders.map((order) => (
                    <div className="accordion-item" key={order.id}>
                        <h3 className="accordion-header" id={`heading${order.id}`}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseText${order.id}`} aria-expanded="false" aria-controls={`collapseText${order.id}`} onClick={toggleDetails}>
                                Objednávka číslo {order.id} - {order.attributes.Firstname} {order.attributes.Surname} - {order.attributes.Totalprice},- Kč
                            </button>
                        </h3>
                        <div id={`collapseText${order.id}`} className="accordion-collapse collapse" aria-labelledby={`heading${order.id}`} data-bs-parent="#ordersAccordion">
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <p><span>Jméno:</span> {order.attributes.Firstname} {order.attributes.Surname}</p>
                                        <p><span>Ulice:</span> {order.attributes.Street}</p>
                                        <p><span>Město:</span> {order.attributes.Town}</p>
                                        <p><span>PSČ:</span> {order.attributes.Psc}</p>
                                        <p><span>Telefon:</span> {order.attributes.Phone}</p>
                                        <p><span>E-mail:</span> {order.attributes.email}</p>
                                        <p><span>Vzkaz:</span> {order.attributes.Message}</p>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <h4>Produkty</h4>
                                        {order.attributes.Orderedproduct.map((product) => (
                                        <div key={product.id} className={styles.productBox}>
                                            <div>{product.productname}</div>
                                            <div className={styles.amounttBox}>
                                                <div><span>Množství:</span> {product.productquantity}</div>
                                                <div><span>Cena:</span> {product.productprice},-</div>
                                                <div><span>Cena celkem:</span> {product.productquantity*product.productprice},-</div>
                                            </div>
                                        </div>
                                        ))}
                                        <div className={styles.totalPrice}><span>Celková cena objednávky:</span> {order.attributes.Totalprice},-</div>
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