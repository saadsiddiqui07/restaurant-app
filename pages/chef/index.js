import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import { Button, Box, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const Chef = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  // create a user with email
  const handleSignInWithEmail = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: username[0],
        });
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        router.push("/dashboard");
        setEmail("");
        setPassword("");
        setUsername("");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          alert("Email already taken. Please try with a different email");
        }
      });
  };

  // sign in with email and password
  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/user-not-found") {
          alert("Create account first");
        } else if (err.code === "auth/wrong-password") {
          alert("Incorrect password. Try again!");
        }
      });
  };

  return (
    <div className="flex w-[100%] h-[100vh] items-center ">
      <Head>
        <title>Login as a Chef</title>
      </Head>

      <Container
        className=" h-[100vh] w-[100%]  p-4 bg-[#2FAA96]  flex-col hidden md:inline"
        component="main"
      >
        <Box className="grid h-[100%] justify-center text-white gap-2 content-center">
          <div className="flex flex-col italic items-center">
            <RestaurantIcon className="text-[90px]" />
            <h1 className="text-center text-[40px] uppercase font-normal">
              First we cook. <br /> then we do everything.
            </h1>
          </div>
        </Box>
      </Container>
      <Container className="p-2 flex-col w-[100%] h-[100vh]" component="main">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="grid h-[100%] gap-2 content-center items-center"
        >
          <div className="w-[100%] items-center flex flex-col justify-center">
            <div className="flex flex-col w-[60%]">
              <h1 className="text-[30px] text-gray-600 mr-auto">
                Login and start cooking.
              </h1>{" "}
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="my-2 rounded-xl p-3 w-[100%] bg-gray-100 outline-0 border-none font-bold text-gray-500"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="my-2 rounded-xl p-3 w-[100%] bg-gray-100 outline-0 border-none font-bold text-gray-500"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="my-2 rounded-xl p-3 w-[100%] bg-gray-100 outline-0 border-none font-bold text-gray-500"
              />
              <div className="flex items-center p-2 justify-between">
                <p className="text-black font-bold text-xs underline cursor pointer ">
                  Forgot your password?
                </p>
                <div className="flex items-center">
                  <button
                    onClick={handleLoginWithEmail}
                    className="bg-blue-500 text-white mr-[10px] rounded-md font-bold px-2 py-1 hover:bg-[#2FAA96]"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignInWithEmail}
                    className="bg-[#2FAA96] text-white rounded-md font-bold px-2 py-1 hover:bg-blue-500"
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <hr />
              <Button
                className="my-3 hover:text-white hover:bg-blue-500"
                onClick={handleSignIn}
                endIcon={<GoogleIcon />}
              >
                Sign in with google
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};
export default Chef;
