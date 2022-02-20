import { useStateValue } from "../../context-api/StateProvider";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Subtotal from "../Subtotal/Subtotal";

const Cart = () => {
  const [{ cart }, dispatch] = useStateValue();

  // close the drawer
  const closeDrawer = () => {
    dispatch({
      type: "CLOSE_DRAWER",
      payload: {
        isDrawerOpen: false,
      },
    });
  };

  return (
    <div className="w-[100vw] md:w-[500px] flex flex-col items-center ">
      <div className="w-full flex flex-row items-center px-3">
        <IconButton onClick={() => closeDrawer()}>
          <ArrowBackIcon />
        </IconButton>
        <h1 className="text-gray-500 font-bold md:text-[20px] ">Your Cart.</h1>
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
          closeDrawer={closeDrawer}
        />
      ))}
      <div className="p-2 w-full">
        {cart?.length > 0 ? (
          <Subtotal />
        ) : (
          <p className="text-center text-xl font-bold text-gray-500 italic">
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
