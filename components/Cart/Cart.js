import { useEffect } from "react";
import { useStateValue } from "../../context-api/StateProvider";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import CurrencyFormat from "react-currency-format";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const [{ cart, total }, dispatch] = useStateValue();

  // get total on every time product amount changed
  useEffect(() => {
    dispatch({
      type: "GET_TOTAL",
    });
  }, [dispatch, cart]);

  const closeDrawer = () => {
    dispatch({
      type: "OPEN_DRAWER",
      payload: {
        isDrawerOpen: false,
      },
    });
  };

  return (
    <div className="w-[500px] flex flex-col items-center">
      <div className="w-full flex flex-row justify-between items-center p-2">
        <h2> Your cart {cart?.length} items </h2>
        <div>
          <CurrencyFormat
            renderText={(value) => <p>₹ {`${value}`}</p>}
            decimalScale={2}
            displayType={"text"}
            thousandSeparator={true}
            value={total}
          />
        </div>
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
    </div>
  );
};

export default Cart;
