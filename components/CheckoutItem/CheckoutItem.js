import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useStateValue } from "../../context-api/StateProvider";

const CheckoutItem = ({ id, title, image, price, amount, rating }) => {
  const [{}, dispatch] = useStateValue();

  const increaseItemAmount = () => {};

  const decreaseItemAmount = () => {};

  return (
    <Card className="m-2 w-[100%]" sx={{ maxWidth: 345 }}>
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
        <div className=" flex flex-row items-center">
          <IconButton>
            <AddBoxIcon className="text-green-500" />
          </IconButton>
          <p className="font-bold text-[20px]">{amount}</p>
          <IconButton>
            <IndeterminateCheckBoxIcon className="text-red-400" />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default CheckoutItem;
