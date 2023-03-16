import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import ProductComponent from "./ProductComponent";
import { useDispatch } from "react-redux";
import { SetProducts } from "../redux/actions/ProductActions";

function ProductList() {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products").catch((err) => console.log(err));
    dispatch(SetProducts(response.data));
  };
  useEffect(()=>{
    fetchProducts()
  }, [])
  return (
    <div className="ui grid container" style={{ marginTop: "20px" }}>
      <ProductComponent />
    </div>
  );
}

export default ProductList;
