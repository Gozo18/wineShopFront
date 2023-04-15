export const PRODUCT_QUERY = `query getProducts{
    products (sort: "sortNumber:asc", pagination: { limit: 100 }){
      data{
        attributes{
          description
          name
          slug
          price
          price6Pack
          price18Pack
          price30Pack
          sweetness
          year
          alcohol
          sugar
          acid
          locality
          attribute
          color
                 image{
            data{
              attributes{
              formats
              }
            }
          }
        }
      }
    }
  }
  `

export const GET_PRODUCT_QUERY = `
query getProducts($slug:String!){
  products(filters: {slug :{eq: $slug}}){
    data{
      attributes{
        name
        slug
        description
        price
        price6Pack
        price18Pack
        price30Pack
        sweetness
        year
        alcohol
        sugar
        acid
        locality
        attribute
        color
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`

export const GET_COLOR_PRODUCT_QUERY = `
query getProducts($color:String!){
  products(filters: {color :{eq: $color}}, sort: "sortNumber:asc"){
    data{
      attributes{
        name
        slug
        description
        price
        price6Pack
        price18Pack
        price30Pack
        sweetness
        year
        alcohol
        sugar
        acid
        locality
        attribute
        color
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`

export const CREATE_ORDER = `
    mutation createOrder($input: OrderInput!) {
      createOrder(data: $input) {
        data {
          attributes {
            Firstname
            Surname
            email
            Phone
            Street
            Town
            Psc
            Message
            Product {
              Productname
              Productprice
              Productquantity
            }
          }
        }
      }
    }
  `
