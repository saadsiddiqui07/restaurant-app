import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useStateValue } from "../../context-api/StateProvider";

export default function Review() {
  const [{ cart, user, total }] = useStateValue();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart?.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.title} />
            <Typography variant="body2">{`${product.price} x ${product.amount}`}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹{total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom className="font-bold text-gray-500">
            Name: {user?.displayName}
          </Typography>
          <Typography gutterBottom className="font-bold text-gray-500">
            Email: {user?.email}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Typography variant="p">Payment done using Debit Card.</Typography>

          <small className="italic">Inclusive all taxes*</small>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
