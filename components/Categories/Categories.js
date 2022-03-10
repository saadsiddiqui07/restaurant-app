import { useRouter } from "next/router";
import { useStateValue } from "../../context-api/StateProvider";
import ItemCard from "../../components/ItemCard/ItemCard";
import Drawer from "@mui/material/Drawer";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Cart from "../Cart/Cart";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const Categories = () => {
  const [{ user, isDrawerOpen }] = useStateValue();
  const [dishes, setDishes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "dishes"), (snapshot) =>
      setDishes(snapshot.docs)
    );
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col  p-2">
      <Drawer anchor="right" open={isDrawerOpen}>
        <div className="bg-gradient-to-b from-rose-100 to-teal-100 h-auto">
          <Cart />
        </div>
      </Drawer>
      <div className="p-2 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="font-serief font-bold text-gray-500 text-[22px] md:text-[25px]">
          Welcome, {user?.displayName}.
        </h1>
        <p
          onClick={() => router.push("/orders")}
          className="w-max bg-blue-500 text-white text-sm font-semibold p-2 rounded-md cursor-pointer"
        >
          Check your orders <ArrowRightAltIcon />{" "}
        </p>
      </div>
      <hr />
      <div className=" flex flex-col  m-1 p-2">
        <h1 className="italic font-semibold text-[25px]">Dishes</h1>
        <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {dishes.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              image={item.data().image}
              title={item.data().title}
              price={item.data().price}
              rating={item.data().rating}
              amount={item.data().amount}
              timestamp={item.data().timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
