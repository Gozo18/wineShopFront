const EXTERNAL_DATA_URL =
  "https://strapi-production-16e2.up.railway.app/api/products?pagination[limit]=100"
const PAGE_URL = "https://www.vinarstviiris.cz/produkt"
const URL = "https://www.vinarstviiris.cz"

function generateSiteMap(products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/nase-vina</loc>
     </url>
     <url>
       <loc>${URL}/bila-vina</loc>
     </url>
     <url>
       <loc>${URL}/cervena-vina</loc>
     </url>
     <url>
       <loc>${URL}/ruzova-vina</loc>
     </url>
      <url>
       <loc>${URL}/kontakty</loc>
     </url>
     ${products
       .map((product) => {
         return `
       <url>
           <loc>${`${PAGE_URL}/${product.attributes.slug}`}</loc>
       </url>
     `
       })
       .join("")}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL)
  const result = await request.json()

  if (result) {
    const products = result.data

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(products)

    res.setHeader("Content-Type", "text/xml")
    // we send the XML to the browser
    res.write(sitemap)
    res.end()
  }
  return {
    props: {},
  }
}

export default SiteMap
