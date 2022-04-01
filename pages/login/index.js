import Head from "next/head";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import { Button, Box, Container } from "@mui/material";
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
    <div className="flex w-[100%] h-[100vh]  items-center ">
      <Head>
        <title>Login</title>
      </Head>
      <Container
        className=" h-[100vh] w-[100%]  p-4 bg-[#B6CDC1]  flex-col hidden md:inline"
        component="main"
      >
        <Box className="grid h-[100%] justify-center text-white gap-2 content-center">
          <div className="flex flex-col italic items-center">
            <RestaurantIcon className="text-[90px]" />
            <h1 className="text-center text-[40px] uppercase font-normal">
              First we eat. <br /> then we do everything.
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
              <h1 className="text-[30px] text-gray-600 mr-auto">Login</h1>{" "}
              <input
                placeholder="Enter your email"
                className="my-2 rounded-xl p-3 w-[100%] bg-gray-100 outline-0 border-none font-bold text-gray-500"
              />
              <input
                placeholder="Enter your password"
                className="my-2 rounded-xl p-3 w-[100%] bg-gray-100 outline-0 border-none font-bold text-gray-500"
              />
              <div className="flex items-center p-2 justify-between">
                <p className="text-black font-bold text-xs underline cursor pointer ">
                  Forgot your password?
                </p>
                <button className="bg-[#B6CDC1] text-white rounded-md font-bold px-2 py-1 hover:bg-blue-500">
                  Sign In
                </button>
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
            <h3 className="my-[10px] text-gray-400">OR</h3>

            <Button
              onClick={() => router.push("/chef")}
              className="my-3 bg-[#B6CDC1] w-[60%] text-white border-solid border-1 hover:text-black"
              endIcon={<FoodBankIcon />}
            >
              Login as a chef
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};
export default Login;
