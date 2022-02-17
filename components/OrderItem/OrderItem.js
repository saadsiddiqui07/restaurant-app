import Avatar from "@mui/material/Avatar";

const OrderItem = ({ id, amount, image, price, rating, title }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center p-2 ">
        <Avatar src={image} className="ml-2" sx={{ width: 56, height: 56 }} />
        <div className="flex flex-1 ml-[30px] flex-col mr-[40px]">
          <p className="text-md font-bold pb-3">{title}</p>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-bold text-gray-500">₹{price}</p>
            <p className="text-sm font-bold text-gray-500">Qty {amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
