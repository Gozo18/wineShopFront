import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  //Our application state
  const [showWarning, setShowWarning] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantitites] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});

  //Increase product countity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  //Add Product To Cart
  const onAdd = (product, quantity) => {
    //Total Price
    /* if (quantity < 6) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
    } else if (quantity > 5 && quantity < 18) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price6Pack * quantity
      );
    } else if (quantity > 17 && quantity < 30) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price18Pack * quantity
      );
    } else if (quantity > 29) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price30Pack * quantity
      );
    } */
    setCartItems([...cartItems, { ...product, quantity: quantity }]);
    //Increase total quantity
    setTotalQuantitites(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    //Check if product is in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity}
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
    /* console.log(cartItems); */
    /* setTotalPrice(0);
      cartItems.map((item) => {
        if (item.quantity < 6) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price * item.quantity
          );
          console.log(totalPrice);
        } else if (item.quantity > 5 && item.quantity < 18) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price6Pack * item.quantity
          );
        } else if (item.quantity > 17 && item.quantity < 30) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price18Pack * item.quantity
          );
        } else if (item.quantity > 29) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price30Pack * item.quantity
          );
        }
      }); */
  };
  //Remove product
  const onRemove = (product) => {
    //Set Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);

    //Remove from total quantities
    setTotalQuantitites((prevTotalQuantities) => prevTotalQuantities - 1);

    //Check if product exists
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  //Remove all products
  const removeAll = () => {
    setCartItems([]);
    setShowCart(false);
    setTotalQuantitites(0);
    setOrderInfo({});
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        qty,
        increaseQty,
        decreaseQty,
        cartItems,
        onAdd,
        onRemove,
        removeAll,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setQty,
        orderInfo,
        setOrderInfo,
        showWarning,
        setShowWarning,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
