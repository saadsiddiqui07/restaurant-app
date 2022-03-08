import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import { Button, Box, Typography, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";

const Chef = () => {
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
        router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex w-[100%] h-[100vh] items-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <Head>
        <title>Login as a Chef</title>
      </Head>
      <Container
        className="p-2 h-[100vh]  w-[100%] flex-col hidden md:inline"
        component="main"
        maxWidth="xs"
      >
        <Box className="grid h-[100%] gap-2 content-center">
          <h1 className="font-serief text-white font-bold text-[25px] text-gray-500">
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            className="text-white text-center"
            component="h1"
            variant="h4"
          >
            Welcome to your kitchen.
          </Typography>
          <Typography component="h1" className="text-white" variant="h5">
            Sign in as a chef.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <hr />
            <Button
              type="submit"
              fullWidth
              className="bg-black text-white font-bold hover:bg-blue-500"
              onClick={handleSignIn}
            >
              Sign In With Google <GoogleIcon className="text-lg ml-2" />
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default Chef;
