import { useEffect } from "react";
import { useStateValue } from "../../context-api/StateProvider";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Subtotal from "../Subtotal/Subtotal";

const Cart = () => {
  const [{ cart, total }, dispatch] = useStateValue();

  const closeDrawer = () => {
    dispatch({
      type: "CLOSE_DRAWER",
      payload: {
        isDrawerOpen: false,
      },
    });
  };

  return (
    <div className="w-[500px] flex flex-col items-center">
      <div className="w-full flex flex-row justify-between items-center p-1">
        <IconButton onClick={() => closeDrawer()}>
          <ArrowBackIcon />
        </IconButton>
      </div>

      {cart?.map((item, index) => (
        <CheckoutItem
          key={index}
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          amount={item.amount}
          rating={item.rating}
        />
      ))}
      <div className="p-2 w-full">
        <Subtotal />
      </div>
    </div>
  );
};

export default Cart;
