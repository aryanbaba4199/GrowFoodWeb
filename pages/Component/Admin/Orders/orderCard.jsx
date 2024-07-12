import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/Redux/actions/productActions";
import { fetchUserDetails } from "@/Redux/actions/userAuthAction";
import { Tooltip } from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);
  const productDetails = useSelector((state) => state.products.product);
  const shippmentStatus = [
    "Order Created",
    "Shipped",
    "Dispatched",
    "Out for delivery",
  ];

  useEffect(() => {
    dispatch(getProduct(order.productId));
  }, [dispatch, order.productId]);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className="border border-gray-200 rounded p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">Order Details</h3>
      <p>
        <strong>User Name:</strong>{" "}
        {userDetails ? userDetails.name : "Loading..."}
      </p>
      <p>
        <strong>Product Name:</strong>{" "}
        {productDetails ? productDetails.name : "Loading..."}
      </p>
      <p>
        <strong>Product Category :</strong>{" "}
        {productDetails ? productDetails.name : "Loading..."}
      </p>
      <p>
        <strong>Quantity:</strong> {order.quantity}
      </p>
      <p>
        <strong>Order Amount:</strong> ${order.orderAmount}
      </p>
      <p>
        <strong>Payment Mode:</strong> {order.paymentMode}
      </p>
      <p>
        <strong>Payment ID:</strong> {order.paymentId}
      </p>
      <div className="flex justify-end text-xl gap-8">
        <MdModeEditOutline className="mr-8 hover:cursor-pointer text-blue-600" />

        <MdDelete className="text-red-600 hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default OrderCard;
