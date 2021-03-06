import { useState, forwardRef } from "react";
import { useStateValue } from "../../context-api/StateProvider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import OrderItem from "../OrderItem/OrderItem";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const UserOrderCard = ({
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
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [{ user }] = useStateValue();

  // identifiers
  const orderIsAccepted = status === "Accepted";
  const orderIsCancelled = status === "Cancelled";
  const orderIsCooked = status === "Cooked";
  const orderIsPending = status === "Pending";

  // cancel an order
  const handleCancelOrder = (e) => {
    e.stopPropagation();
    deleteDoc(doc(db, "orders", id));
  };

  // open feedback form
  const openFeedBackForm = () => {
    if (!done) {
      setOpen(true);
    }
  };

  // add a feedback to a dish
  const addFeedBack = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "orders", id), {
      feedback: input,
    });
    setOpen(false);
    setInput("");
    setDone(true);
  };

  // filter orders
  if (user?.email !== email) return null;

  return (
    <div
      aria-disabled={orderIsCancelled}
      className={`flex flex-col shadow-lg w-[90%] m-2 p-2 ${
        orderIsCancelled && "bg-gray-200"
      }`}
    >
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="text-[14px] font-semibold text-gray-600 md:text-xl">
          Give us feedback of your experience
        </DialogTitle>
        .{" "}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextareaAutosize
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="minimum height"
              minRows={3}
              placeholder="Please tell us about our service & food quality."
              className="w-[100%] border-none outline-none text-black"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            varaint="outlined"
            autoFocus
            onClick={addFeedBack}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

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
      <div className="flex flex-row p-2 border-b-2 items-center justify-between">
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
              <p className="text-blue-500 font-bold">Kill your cravings now!</p>
            ) : orderIsCancelled ? (
              <p className="text-red-500 font-bold">
                The Chef has cancelled your order
              </p>
            ) : (
              "Waiting for chef to accept order."
            )}
          </small>
        </div>

        <p className="text-md font-semibold">???{totalPay}</p>
      </div>

      {orderIsPending && (
        <Button color="error" onClick={handleCancelOrder}>
          Cancel
        </Button>
      )}
      {orderIsCooked && (
        <>
          {!feedback ? (
            <Button
              color="primary"
              variant="outlined"
              onClick={openFeedBackForm}
            >
              Would you like to give us a feedback?
            </Button>
          ) : (
            <p className="font-bold text-sm p-2 text-gray-600">
              Thankyou for your feedback!
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default UserOrderCard;
