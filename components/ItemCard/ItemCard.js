import * as React from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useStateValue } from "../../context-api/StateProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const ItemCard = ({ id, title, price, rating, image, amount }) => {
  const [{}, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const router = useRouter();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const deleteItem = (e) => {
    e.stopPropagation();
    deleteDoc(doc(db, "dishes", id));
  };

  // add an item to the cart
  const addToCart = () => {
    if (added) {
      dispatch({
        type: "INCREASE",
        payload: {
          id: id,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        item: {
          id,
          title,
          price,
          rating,
          image,
          amount,
        },
      });
      setAdded(true);
      setOpen(true);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Card className="m-2 w-[100%]" sx={{ maxWidth: 345 }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {title} added successfully !
          </Alert>
        </Snackbar>
      </Stack>
      <img
        src={image}
        alt="Loading dish"
        className="h-[180px] w-[100%] object-fill"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          className="flex flex-row items-center"
          variant="p"
          component="div"
        >
          Price: <p className="text-green-600 font-bold ml-2">₹{price}</p>
        </Typography>
      </CardContent>
      <CardActions className="flex flex-row items-center justify-between p-2 w-[100%]">
        <span className="p-2 bg-purple-500 text-white font-bold text-xs rounded-md">
          ★{rating}
        </span>
        {router.pathname === "/available" ? (
          <Button
            color="error"
            endIcon={<RemoveCircleOutlineIcon />}
            onClick={deleteItem}
          >
            Remove
          </Button>
        ) : (
          <Button color="primary" endIcon={<AddIcon />} onClick={addToCart}>
            Add
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemCard;
