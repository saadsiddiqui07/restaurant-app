import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Header from "../../components/Header/Header";
import ItemCard from "../../components/ItemCard/ItemCard";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Available = () => {
  const [dishes, setDishes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "dishes"), (snapshot) =>
      setDishes(snapshot.docs)
    );
    return unsubscribe;
  }, []);

  return (
    <div className="h-full  flex flex-col">
      <Header />

      <div className="p-2 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="font-serief font-bold text-gray-500 text-[22px] md:text-[25px]">
          Available Dishes
        </h1>
      </div>
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

      <Box
        className="fixed right-0 bottom-1 z-50"
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <Fab
          onClick={() => router.push("/dish")}
          className="bg-blue-500 hover:bg-blue-500"
          aria-label="add"
        >
          <AddIcon className="text-white" />
        </Fab>
      </Box>
    </div>
  );
};

export default Available;
