import Header from "../../components/Header/Header";
import { onSnapshot, collection, orderBy } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import UserOrderCard from "../../components/UserOrderCard/UserOrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // fetch data from orders collection
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      orderBy("timestamp", "desc"),
      (snapshot) => setOrders(snapshot.docs)
    );
    // clean up action
    return unsubscribe;
  }, []);
  console.log(orders);

  return (
    <div className="flex flex-col">
      <Header />

      <h1 className="text-gray-800 text-xl font-semibold">
        Start cooking Chef.
      </h1>
      <div className="p-2">
        <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {orders.map((item) => (
            <UserOrderCard
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
  );
};

export default Orders;
