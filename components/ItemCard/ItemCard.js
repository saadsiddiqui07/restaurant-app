import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "../../context-api/StateProvider";

export default function ItemCard({ id, title, price, rating, image, amount }) {
  const [{ user, cart }, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // add an item to cart
  const addToCart = () => {
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
    setOpen(true);
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
        <Button color="primary" endIcon={<AddIcon />} onClick={addToCart}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
