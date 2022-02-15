import React from "react";
import Header from "../../components/Header/Header";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import OrderCard from "../../components/OrderCard/OrderCard";

const Dashboard = () => {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        router.push("/login");
        console.log("User signed out successfully");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" h-screen flex flex-col">
      <Header />
      <div className="h-full p-2">
        <h1 className="text-gray-800 text-xl font-semibold">
          Start cooking Chef.
        </h1>
        <div className="p-2">
          <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
