import { useState, useEffect } from "react";
import { useStateValue } from "../../context-api/StateProvider";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Subtotal from "../Subtotal/Subtotal";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [{ cart, total, user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "orders", user?.email, "dishes"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setCartItems(snapshot.docs)
    );
    return unsubscribe;
  }, []);

  console.log(cartItems?.length);

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
        />
      ))}
      <div className="p-2 w-full">
        <Subtotal />
      </div>
    </div>
  );
};

export default Cart;
