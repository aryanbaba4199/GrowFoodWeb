import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Dialog,
} from "@mui/material";
import axios from "axios";
import Loader from "../helpers/loader";
import { API_URL } from "../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "@/Redux/actions/productActions";


const CreateBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconURL, setIconURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [tempIconURL, setTempIconURL] = useState(""); 

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getBrands());
  }, [dispatch])


  const brands = useSelector((state)=>state.products.brands)
  

  const handleImageUpload = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", icon);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      if (res.data.url) {
        setIconURL(res.data.url);
        console.log("Image uploaded successfully. URL:", res.data.url);
        setIconURL(res.data.url);
      }
      setLoader(false);
    } catch (err) {
      console.error("Error uploading image", err);
      alert("Failed to upload image");
      setLoader(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      // Upload image to Cloudinary
      const uploadedUrl = await handleImageUpload(icon);
      setIconURL(uploadedUrl);

      // Create brand with name and uploaded icon URL
      const res = await axios.post(`${API_URL}/products/createBrand`, {
        name: brandName,
        icon: uploadedUrl,
      });

      if (res.status === 200) {
        alert("Brand created successfully");
        setBrandName("");
        setIcon(null);
        setIconURL("");
        setTempIconURL("");
      } else {
        alert("Failed to create brand");
      }
      setLoader(false);
    } catch (err) {
      console.error("Error creating brand", err);
      alert("Failed to create brand");
      setLoader(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedIcon = e.target.files[0];
    if (selectedIcon) {
      const tempIconUrl = URL.createObjectURL(selectedIcon);
      setTempIconURL(tempIconUrl);
      setIcon(selectedIcon);
    }
  };

  return (
    <div>
      
        <>
        <div className="">
          <div className=" font-semibold text-lg flex justify-center items-center mt-8">
              <p>Brands</p>
          </div>
          <div className="grid md:grid-cols-6  items-center mt-8">
            {brands.map((item, index)=>(
              <>
                <div className="W-44 h-24">
                  <img
                    src={item?.icon}
                    className="w-24"
                  />
                  <span>{item.name}</span>
                </div>
              </>
            ))}
          </div>
        </div>

          <div className="flex justify-center items-center">
            <p>Create Brand</p>
          </div>
          <div className="flex justify-center items-center mt-8">
            <span>Brand Name:</span>
            <TextField
              label="Brand Name"
              variant="outlined"
              fullWidth
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="border-2 border-black px-2 py-1 rounded-md ml-4"
            />
          </div>
          <div className="flex justify-center items-center mt-8">
            <span>Icon:</span>
            <input
              type="file"
              onChange={handleImageChange}
              className="border-2 border-black px-2 py-1 rounded-md ml-4"
            />
          </div>
          {tempIconURL && (
            <div className="flex justify-center items-center mt-4">
              <img
                src={tempIconURL}
                alt="Brand Icon"
                className="w-20 h-20"
              />
            </div>
          )}
          <div className="flex justify-center items-center mt-8">
            {icon !== null && brandName !== "" ? (
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-1 mb-8 rounded-md active:bg-green-600"
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      
    </div>
  );
};

export default CreateBrand;
