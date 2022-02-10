import { useStateValue } from "../../context-api/StateProvider";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const [{ cart, isDrawerOpen }, dispatch] = useStateValue();

  const handleDrawer = () => {
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
        <h2> Your cart </h2>
        <IconButton onClick={handleDrawer}>
          <CloseIcon />
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
    </div>
  );
};

export default Cart;
