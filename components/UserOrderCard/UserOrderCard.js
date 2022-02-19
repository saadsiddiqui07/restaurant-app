import { useStateValue } from "../../context-api/StateProvider";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import OrderItem from "../OrderItem/OrderItem";

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

  // filter orders
  if (user?.email !== email) return null;
  return (
    <div className="flex flex-col bg-gray-100 cursor-pointer shadow-lg w-[90%] m-2 p-2">
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
      <div className="flex flex-row p-2 items-center justify-between">
        <p className="text-md font-semibold">₹{totalPay}</p>
        <div className="flex flex-col">
          <p className="text-xs text-gray-600 md:text-lg font-semibold">
            Order status: {status}
          </p>
          <small className="text-xs text-gray-500 italic">
            Approx 15 mins.
          </small>
        </div>
      </div>
    </div>
  );
};
export default UserOrderCard;
