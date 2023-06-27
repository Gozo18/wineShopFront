import Link from "next/link"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from "../styles/Slider.module.scss"

function WineSlider(products) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 3,
        },
      },
    ],
  }

  const wines = products.products

  function checkPromo(wine) {
    return wine.attributes.Promo === true
  }

  const promoWines = wines.filter(checkPromo)

  return (
    <div className={styles.slider}>
      <h2 className={styles.wineHeader}>Top nabídka</h2>
      <Slider {...settings}>
        {promoWines.map((product) => (
          <div key={product.attributes.name}>
            <Link href={`/produkt/${product.attributes.slug}`}>
              <a>
                <div className={styles.imageBox}>
                  <Image
                    src={
                      product.attributes.image.data.attributes.formats.medium
                        .url
                    }
                    alt={product.attributes.name}
                    layout="fill"
                  />
                </div>
                <div className={styles.textBox}>
                  <h3>
                    {product.attributes.name} {product.attributes.year}
                  </h3>
                  <h4>{product.attributes.attribute}</h4>
                  <h4>{product.attributes.sweetness}</h4>
                  <h4>{product.attributes.price},- Kč</h4>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default WineSlider
