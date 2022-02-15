import { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useStateValue } from "../../context-api/StateProvider";
import CurrencyFormat from "react-currency-format";

const OrderCard = () => {
  const [{ user, total }] = useStateValue();
  const [cancel, setCancel] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex flex-col shadow-lg w-[90%] m-2 p-2">
      <div className="flex flex-row items-center justify-between p-2">
        <p className="font-bold text-sm">Order #.34545</p>
        <Avatar src={user?.photoURL} />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center p-2 ">
          <Avatar
            src="https://static.toiimg.com/thumb/53205522.cms?imgsize=302803&width=800&height=800"
            className="ml-2"
            sx={{ width: 56, height: 56 }}
          />
          <div className="flex flex-col mr-[40px]">
            <p className="text-md font-bold pb-3">The title of the dish</p>
            <div className="w-full flex items-center justify-between">
              <p className="text-sm font-bold text-gray-500">$35</p>
              <p className="text-sm font-bold text-gray-500">Qty 2</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center p-2 ">
            <Avatar
              src="https://static.toiimg.com/thumb/53205522.cms?imgsize=302803&width=800&height=800"
              className="ml-2"
              sx={{ width: 56, height: 56 }}
            />
            <div className="flex flex-col mr-[40px]">
              <p className="text-md font-bold pb-3">The title of the dish</p>
              <div className="w-full flex items-center justify-between">
                <p className="text-sm font-bold text-gray-500">$35</p>
                <p className="text-sm font-bold text-gray-500">Qty 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row  text-lg font-bold p-2 items-center justify-between">
          <CurrencyFormat
            renderText={(value) => <p>₹ {`${value}`}</p>}
            decimalScale={2}
            displayType={"text"}
            thousandSeparator={true}
            value={total}
          />
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
    </div>
  );
};

export default OrderCard;
