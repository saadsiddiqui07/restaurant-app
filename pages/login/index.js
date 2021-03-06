import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import { Button, Box, Typography, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const router = useRouter();

  // sign in a new user
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex w-[100%] h-[100vh] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 items-center">
      <Head>
        <title>Login</title>
      </Head>
      <Container
        className="p-2 h-[100vh]  w-[100%] flex-col hidden md:inline"
        component="main"
        maxWidth="xs"
      >
        <Box className="grid h-[100%] gap-2 content-center">
          <h1 className="font-serief font-bold text-[25px] text-white">
            Hungerz Restaurant
          </h1>
          <Image
            src="https://resizer.otstatic.com/v2/photos/xlarge/1/25913892.jpg"
            alt="testing"
            height="100%"
            width="100%"
            layout="responsive"
            objectFit="contain"
            className="rounded-lg shadow-md"
          />
        </Box>
      </Container>
      <Container className="p-2" component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            className="text-white text-center"
            component="h1"
            variant="h3"
          >
            Welcome
          </Typography>
          <Typography className="text-white" component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate className="p-2 w-[90%]" sx={{ mt: 1 }}>
            <Button
              type="submit"
              endIcon={<RestaurantIcon />}
              fullWidth
              className="bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white"
              onClick={() => router.push("/chef")}
            >
              Login as a Chef
            </Button>
            <hr />
            <p className="text-center my-2 text-gray-600 ">OR</p>
            <Button
              type="submit"
              fullWidth
              className="bg-white text-black font-bold hover:bg-white hover:text-black"
              onClick={handleSignIn}
            >
              Sign In With Google <GoogleIcon className="text-lg ml-2" />
            </Button>
            <hr />
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default Login;
