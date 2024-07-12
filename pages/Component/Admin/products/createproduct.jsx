import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getBrands,
  getCategories,
} from "@/Redux/actions/productActions"; // Adjust the import path as needed
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

const CreateProduct = ({setCreateMode}) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.products.brands);
  const categories = useSelector((state) => state.products.categories);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brand: "",
    categories: "",
    subCategory: "",
    image: "",
    discount: 0,
    price: 0,
    sellingPrice: 0,
    productQty: "",
    minimumOrderQty: 0,
    availableQty: 0,
    foodPrefence: "",
    life: "",
  });

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBrands(brands);
  }, [brands]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setProductData({ ...productData, brand: value });
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrands(filtered.length > 0 ? filtered : [{ name: value }]);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setProductData({ ...productData, categories: value });
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered.length > 0 ? filtered : [{ name: value }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(productData));
    setProductData({
      name: "",
      description: "",
      brand: "",
      categories: "",
      subCategory: "",
      image: "",
      discount: 0,
      price: 0,
      sellingPrice: 0,
      productQty: "",
      minimumOrderQty: 0,
      availableQty: 0,
      foodPrefence: "",
      life: "",
    });
  };

  return (
    <Box className="p-4">
      <Typography variant="h4" className="mb-4">
        Create Product
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Product Name"
          name="name"
          variant="outlined"
          fullWidth
          value={productData.name}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={productData.description}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Brand"
          name="brand"
          variant="outlined"
          fullWidth
          value={productData.brand}
          onChange={handleBrandChange}
          className="mb-4"
          select
        >
          {filteredBrands.map((brand) => (
            <MenuItem key={brand._id || brand.name} value={brand.name}>
              {brand.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Category"
          name="categories"
          variant="outlined"
          fullWidth
          value={productData.categories}
          onChange={handleCategoryChange}
          className="mb-4"
          select
        >
          {filteredCategories.map((category) => (
            <MenuItem key={category._id || category.name} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Sub-Category"
          name="subCategory"
          variant="outlined"
          fullWidth
          value={productData.subCategory}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Image URL"
          name="image"
          variant="outlined"
          fullWidth
          value={productData.image}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Discount"
          name="discount"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.discount}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.price}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Selling Price"
          name="sellingPrice"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.sellingPrice}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Product Quantity"
          name="productQty"
          variant="outlined"
          fullWidth
          value={productData.productQty}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Minimum Order Quantity"
          name="minimumOrderQty"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.minimumOrderQty}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Available Quantity"
          name="availableQty"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.availableQty}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Food Preference"
          name="foodPrefence"
          variant="outlined"
          fullWidth
          value={productData.foodPrefence}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Shelf Life"
          name="life"
          variant="outlined"
          fullWidth
          value={productData.life}
          onChange={handleChange}
          className="mb-4"
        />
        <div className="flex justify-between gap-2">
        <Button onClick={()=>setCreateMode(false)} variant="contained" color="error">
          Create Product
        </Button>
        <Button type="submit" variant="contained" color="success">
          Create Product
        </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreateProduct;
