import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import OrderCard from "../../components/OrderCard/OrderCard";
import { onSnapshot, orderBy, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../Firebase/firebase";

const Dashboard = () => {
  const [{ user }, dispatch] = useStateValue();
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  // An oberver to check user sign-in state when app loads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authChef) => {
      if (authChef) {
        dispatch({
          type: "SET_USER",
          user: authChef,
        });
      } else {
        router.push("/chef");
      }
    });
    // clean up action
    return () => {
      unsubscribe();
    };
  }, [dispatch, router]);

  // fetch all the items from orders collection
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      orderBy("timestamp", "desc"),
      (snapshot) => setCartItems(snapshot.docs)
    );
    return unsubscribe;
  }, []);

  // function to logout user
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
    <div className="h-screen flex flex-col">
      <Header />
      <div className="h-full p-2">
        <h1 className="text-gray-800 text-xl font-semibold">
          Chef {user?.displayName}, get started!
        </h1>
        <div className="p-2">
          <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
            {cartItems.map((item) => (
              <OrderCard
                key={item.id}
                id={item.id}
                username={item.data().username}
                email={item.data().email}
                profileImg={item.data().profileImg}
                status={item.data().status}
                totalPay={item.data().totalPay}
                timestamp={item.data().timestamp}
                items={item.data().items}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
