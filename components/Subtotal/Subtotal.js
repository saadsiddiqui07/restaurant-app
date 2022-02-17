import { useEffect, useState } from "react";
import { useStateValue } from "../../context-api/StateProvider";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const Subtotal = () => {
  const [{ user, cart, total }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // add all items of cart to firestore database
  const addAllItems = async (e) => {
    setLoading(true);
    e.preventDefault();
    await addDoc(collection(db, "orders"), {
      username: user?.displayName,
      email: user?.email,
      profileImg: user?.photoURL,
      items: [...cart],
      status: false,
      totalPay: total,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    router.push("/checkout");
  };

  // get total on every time product amount changed
  useEffect(() => {
    dispatch({
      type: "GET_TOTAL",
    });
  }, [dispatch, cart]);

  return (
    <div className="bg-gray-100 p-1 shadow-lg rounded-lg w-full flex flex-col items-center justify-center">
      <div className="flex font-semibold p-2 w-full flex-row p-1 items-center justify-between">
        <h2 className="text-sm text-gray-500">{user?.displayName}</h2>
        <h3 className="text-sm text-gray-500">Cart: {cart?.length} items</h3>
      </div>
      <div className="flex font-mono border-t-2 font-bold text-lg w-full flex-row p-1 items-center justify-between">
        <h1 className="">Total</h1>
        <p>₹{total}</p>
      </div>
      <button
        disabled={!loading}
        onClick={addAllItems}
        className="bg-blue-500  w-[80%] text-white rounded px-2 py-1"
      >
        Checkout
      </button>
    </div>
  );
};

export default Subtotal;
