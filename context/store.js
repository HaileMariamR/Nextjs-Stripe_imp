import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQUantity, setTotalQUantity] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;
  const onAdd = (product, quantity) => {
    const checkProductinCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice((pre) => pre + product.price * quantity);
    setTotalQUantity((pq) => pq + quantity);

    if (checkProductinCart) {
      const updateCartItems = cartItems.map((cp) => {
        if (cp._id == product._id)
          return {
            ...cp,
            quantity: cp.quantity + quantity,
          };
      });
      setCartItems(updateCartItems);
      toast.success(`${qty} ${product.name} added to cart`);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      toast.success(`${qty} ${product.name} added to cart`);
    }
  };

  const incQty = () => {
    setQty((pQty) => pQty + 1);
  };
  const decQty = () => {
    setQty((pQty) => {
      if (pQty - 1 < 1) return 1;
      return pQty - 1;
    });
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    let newcartitems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice((pre) => pre - foundProduct.price * foundProduct.quantity);
    setTotalQUantity((pq) => pq - foundProduct.quantity);
    setCartItems(newcartitems);
  };
  const toggleCartItemQuanity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id == id);
    let newcartitems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      setCartItems([
        ...newcartitems,
        {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        },
      ]);
      setTotalPrice((pre) => pre + foundProduct.price * foundProduct.quantity);
      setTotalQUantity((pq) => pq + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newcartitems,
          {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          },
        ]);
        setTotalPrice(
          (pre) => pre - foundProduct.price * foundProduct.quantity
        );
        setTotalQUantity((pq) => pq - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQUantity,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        showCart,
        toggleCartItemQuanity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStoreContext = () => useContext(Context);
