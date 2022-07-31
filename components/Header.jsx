import css from "../styles/Header.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import Link from "next/link";
import { useStore } from "../store/store";
import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const items = useStore((state) => state.cart.pizzas.length);
  const [Order, setOrder] = useState("");

  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);

  return (
    <div className={css.header}>
      <Link href="/">
        <div className={css.logo}>
          <Image src={Logo} alt="Logo" width={50} height={50} />
          <span>Fudo</span>
        </div>
      </Link>
      <ul className={css.menu}>
        <Link href="/">
          <li>Home</li>
        </Link>
        <li>Menu</li>
        <li>Contact Us</li>
      </ul>

      <div className={css.rightSide}>
        <Link href="/cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>

        {Order && (
          <Link href={`/order/${Order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2E2E2E" />
              {Order != "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
