import { useStateValue } from "../../context-api/StateProvider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import OrderItem from "../OrderItem/OrderItem";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const UserOrderCard = ({
  id,
  username,
  email,
  profileImg,
  status,
  totalPay,
  timestamp,
  items,
}) => {
  const [{ user }] = useStateValue();

  // cancel an order
  const handleCancelOrder = (e) => {
    e.stopPropagation();
    deleteDoc(doc(db, "orders", id));
  };

  // filter orders
  if (user?.email !== email) return null;

  // identifiers
  const orderIsAccepted = status === "Accepted";
  const orderIsCancelled = status === "Cancelled";
  const orderIsCooked = status === "Cooked";

  return (
    <div
      aria-disabled={orderIsCancelled}
      className={`flex flex-col cursor-pointer shadow-lg w-[90%] m-2 p-2 ${
        orderIsCancelled && "bg-gray-200"
      }`}
    >
      <div className="flex flex-row border-b-2 items-center justify-between p-2">
        <p className="font-bold text-sm text-gray-500">Order: #{id}</p>
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
      <div className="flex flex-row p-2 items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xs text-gray-600 md:text-lg font-semibold">
            Order status: {status}
          </p>
          <small className="text-xs  italic">
            {orderIsAccepted ? (
              <p className="text-green-500 font-bold">
                Order accepted & in making
              </p>
            ) : orderIsCooked ? (
              <p className="text-blue-500 font-bold">
                Your order is on the way!
              </p>
            ) : orderIsCancelled ? (
              <p className="text-red-500 font-bold">
                The Chef has cancelled your order
              </p>
            ) : (
              "Waiting for chef to accept order."
            )}
          </small>
        </div>

        <p className="text-md font-semibold">₹{totalPay}</p>
      </div>

      {status === "Pending" && (
        <Button color="error" onClick={handleCancelOrder}>
          Cancel
        </Button>
      )}
    </div>
  );
};
export default UserOrderCard;
