import { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useStateValue } from "../../context-api/StateProvider";
import OrderItem from "../OrderItem/OrderItem";

const OrderCard = ({
  id,
  username,
  email,
  profileImg,
  status,
  totalPay,
  timestamp,
  items,
}) => {
  const [{ user, total }] = useStateValue();
  const [cancel, setCancel] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 cursor-pointer shadow-lg w-[90%] m-2 p-2">
      <div className="flex flex-row items-center justify-between p-2">
        <p className="font-bold text-sm text-gray-500">Order #{id}</p>
        <Avatar src={profileImg} />
      </div>

      <div className="flex flex-col">
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
        <Stack direction="row" spacing={2}>
          {!cancel ? (
            <IconButton
              onClick={() => setCancel(!cancel)}
              className="text-red-500 border-2 hover:bg-red-500 hover:text-white"
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton>
              <p className="text-sm font-semibold border-2 border-red-300 p-1 rounded text-red-500">
                Cancelled
              </p>
            </IconButton>
          )}
          {!confirm ? (
            <IconButton
              onClick={() => setConfirm(!confirm)}
              className="text-green-500 border-2 hover:bg-green-500 hover:text-white"
            >
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton>
              <p className="text-sm font-bold border-2 border-green-300 p-1 rounded text-green-500">
                Confirmed
              </p>
            </IconButton>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default OrderCard;
