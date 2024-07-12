import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Dialog } from "@mui/material";
import ProductDetails from "./productDetails";

const ProductCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="px-2 border rounded-md flex flex-col py-2 justify-center items-center cursor-pointer shadow-sm shadow-black hover:shadow-black hover:shadow-md"
      >
        <img src={item.image[0]} className="w-24" alt={item.name} />
        <p>{item.name}</p>
        <p className="font-bold">{item.categories}</p>
        <div className=" flex gap-2">
          <FaRupeeSign className="mt-1" />
          <p>{item.price}/-</p>
        </div>
      </div>
      <Dialog
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { width: "80%", height: "100vh" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ProductDetails setOpen={setOpen} product={item} />
      </Dialog>
    </>
  );
};

export default ProductCard;
