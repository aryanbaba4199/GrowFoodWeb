import axios from "axios";
import React, { useState } from "react";
import Loader from "../../helpers/loader";
import { API_URL } from "../../helpers/constants";

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconURL, setIconURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [tempIconURL, setTempIconURL] = useState(""); // For temporary display of uploaded image

  const handleCatSubmit = async () => {
    setLoader(true);
    handleImageUpload();
    try {
      const res = await axios.post(`${API_URL}/products/createCategory`, {
        category,
        icon: iconURL,
      });
      console.log(res);
      if (res.status === 200) {
        alert("Category Created successfully");
        setCategory("");
        setIcon(null);
        setIconURL("");
        setTempIconURL("");
      } else {
        alert("Failed to create category");
      }
      setLoader(false);
    } catch (err) {
      console.error("Error creating category", err);
      alert("Failed to create category");
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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-center">
            <p>Create Category</p>
          </div>
          <div className="flex justify-center items-center mt-8">
            <span>Category Name:</span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter a category Name"
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
                alt="Category Icon"
                className="w-20 h-20"
              />
            </div>
          )}
          <div className="flex justify-center items-center mt-8">
            {icon !== null && category !== "" ? (
              <button
                onClick={handleCatSubmit}
                className="bg-black text-white px-4 py-1 mb-8 rounded-md active:bg-green-600"
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CreateCategory;
