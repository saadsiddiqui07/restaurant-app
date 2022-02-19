import * as React from "react";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useStateValue } from "../../context-api/StateProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Hungerz Restaurant
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Delivery address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

const CheckoutForm = () => {
  const [{ user, total, cart }, dispatch] = useStateValue();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // add all items of cart to firestore database
  const addAllItems = async (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      setLoading(true);
      await addDoc(collection(db, "orders"), {
        username: user?.displayName,
        email: user?.email,
        profileImg: user?.photoURL,
        items: [...cart],
        status: "pending",
        totalPay: total,
        timestamp: serverTimestamp(),
      });
      dispatch({
        type: "EMPTY_CART",
      });
      dispatch({
        type: "CLOSE_DRAWER",
        isDrawerOpen: false,
      });
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ backgroundColor: "black" }}>
          <Typography variant="h6" color="white" noWrap>
            Hungerz Restaurant.
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #437948gjhvg. Our chef has received your
                  order, and will send you an update when your order is ready.
                </Typography>
                <Button onClick={() => router.push("/orders")}>
                  Check your Orders
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md mr-[10px] hover:bg-blue-800"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}

                  <button
                    onClick={addAllItems}
                    disabled={loading === true}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-800"
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutForm;
