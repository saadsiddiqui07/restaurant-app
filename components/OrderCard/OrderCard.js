import { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import OrderItem from "../OrderItem/OrderItem";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const OrderCard = ({
  id,
  username,
  email,
  profileImg,
  status,
  totalPay,
  timestamp,
  items,
  feedback,
}) => {
  const [cancel, setCancel] = useState(false);
  const [accept, setAccept] = useState(false);
  const [cooked, setCooked] = useState(false);

  // update the order status, if it is ready or not
  const acceptOrder = async () => {
    setAccept(true);
    await updateDoc(doc(db, "orders", id), {
      status: "Accepted",
    });
  };

  // cancel an order
  const cancelOrder = async () => {
    setCancel(true);
    await updateDoc(doc(db, "orders", id), {
      status: "Cancelled",
    });
  };

  // update an order
  const isOrderCooked = async () => {
    setCooked(true);
    await updateDoc(doc(db, "orders", id), {
      status: "Cooked",
    });
  };

  // identifiers
  const orderIsAccepted = status === "Accepted";
  const orderIsCancelled = status === "Cancelled";
  const orderIsCooked = status === "Cooked";

  return (
    <div className="flex flex-col bg-gray-100  shadow-lg w-[90%] m-2 p-2">
      <div className="flex flex-row border-b-2 items-center justify-between p-2">
        <p className="font-bold text-sm text-gray-500">Order #{id}</p>
        <Avatar src={profileImg} />
      </div>

      <div className="flex flex-col border-b-2">
        {items.map((item, index) => (
          <OrderItem
            key={index}
            id={item.id}
            amount={item.amount}
            image={item.image}
            price={item.price}
            rating={item.rating}
            title={item.title}
          />
        ))}
      </div>
      <div className="flex flex-row  text-lg font-bold p-2 items-center justify-between">
        <p>₹{totalPay}</p>
        {orderIsCooked ? (
          <p>Order is cooked</p>
        ) : (
          <Stack direction="row" spacing={2}>
            {!orderIsCancelled ? (
              <IconButton
                onClick={cancelOrder}
                className={`text-red-500 border-2 hover:bg-red-500 hover:text-white ${
                  orderIsAccepted && "hidden"
                }`}
              >
                <CloseIcon />
              </IconButton>
            ) : (
              <p className="text-sm p-1 text-red-500 border-2 border-red-500">
                Cancelled
              </p>
            )}
            {!orderIsAccepted ? (
              <IconButton
                onClick={acceptOrder}
                className={`text-green-500 border-2 hover:bg-green-500 hover:text-white ${
                  orderIsCancelled && "hidden"
                }`}
              >
                <CheckIcon />
              </IconButton>
            ) : (
              <div className={`flex flex-row items-center`}>
                <p className="text-sm p-1 rounded text-green-500 mr-3 border-2 border-green-500">
                  Accepted
                </p>
                <button
                  onClick={isOrderCooked}
                  className="text-sm text-white bg-blue-500 p-2  rounded-md  hover:bg-blue-700 "
                >
                  Cooked
                </button>
              </div>
            )}
          </Stack>
        )}
      </div>
      {feedback && (
        <div className="border-t-2">
          <h4 className="font-semibold">Feedback</h4>
          <p className="text-sm italic font-bold text-gray-600">
            {username}: {feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
