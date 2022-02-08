import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();
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
    <div className="flex w-[100%] h-[100vh]  items-center">
      <Head>
        <title>Login</title>
      </Head>

      <Container
        className="p-2 h-[100vh]  w-[100%] flex-col hidden md:inline"
        component="main"
        maxWidth="xs"
      >
        <Box className="grid h-[100%] gap-2 content-center">
          <h1 className="font-serief font-bold text-[22px] text-gray-500">
            Hungerz Restaurant
            <span className="text-xs font-serief text-blue-600 ml-4">
              The best asian food of India.
            </span>
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              className="bg-black text-white font-bold border-2  hover:bg-green-400"
            >
              Sign In
            </Button>
            <hr />
            <p className="text-center my-2 text-gray-600 ">OR</p>
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
export default Login;
