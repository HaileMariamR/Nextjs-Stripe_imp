import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStoreContext } from "../context/store";
const Navbar = () => {
  const { showCart, setShowCart, totalQUantity } = useStoreContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Harry HP</Link>
      </p>
      <button type="button" onClick={()=>setShowCart(true)} className="cart-icon">
        <span className="cart-item-qty">{totalQUantity}</span>
        <AiOutlineShopping />
      </button>
      {
        showCart &&
        <Cart />
      }
    </div>
  );
};

export default Navbar;
