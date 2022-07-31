import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import { useStore } from "../store/store";
import css from "../styles/OrderModal.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [FormData, setFormData] = useState({});

  const total = typeof window !== "undefined" && localStorage.getItem("total");

  const handleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const resetCart = useStore((state) => state.resetCart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, total, PaymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <textarea
          style={{ resize: "none" }}
          onChange={handleInput}
          placeholder="Address"
          name="address"
          cols="8"
          rows="4"
        ></textarea>

        <span>
          You Will Pay {""}
          <span>$ {total}</span> {""}
          on delivery
        </span>

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
}
