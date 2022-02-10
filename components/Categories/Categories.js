import { useStateValue } from "../../context-api/StateProvider";
import { data } from "../../data/starter";
import { mainCourseData } from "../../data/mainCourse";
import { sweetDishData } from "../../data/drinks";
import ItemCard from "../../components/ItemCard/ItemCard";
import Drawer from "@mui/material/Drawer";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Cart from "../Cart/Cart";

const Categories = () => {
  const [{ user, isDrawerOpen }] = useStateValue();

  return (
    <div className="flex flex-col p-2">
      <Drawer anchor="right" open={isDrawerOpen}>
        <Cart />
      </Drawer>
      <div className="p-2 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="font-serief font-bold text-gray-500 text-[22px] md:text-[25px]">
          Welcome, {user?.displayName}.
        </h1>
        <p className="w-max bg-blue-500 text-white text-sm font-semibold p-2 rounded-md cursor-pointer">
          Check your orders <ArrowRightAltIcon />{" "}
        </p>
      </div>
      <hr />
      <div className=" flex flex-col  m-1 p-2">
        <h1 className="italic font-semibold text-[25px]">Starter</h1>
        <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {data.map((item, index) => (
            <ItemCard
              key={index}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
              amount={item.amount}
            />
          ))}
        </div>
        <h1 className="italic font-semibold text-[25px]">Main Course</h1>
        <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {mainCourseData.map((item, index) => (
            <ItemCard
              key={index}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
              amount={item.amount}
            />
          ))}
        </div>

        <h1 className="italic font-semibold text-[25px]">Sweet Dishes</h1>
        <div className="flex flex-col m-2 items-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {sweetDishData.map((item, index) => (
            <ItemCard
              key={index}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
              amount={item.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
