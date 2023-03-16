import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RemoveSelectedProduct, SelectedProduct } from "../redux/actions/ProductActions";

function ProductDetails() {
  const product = useSelector((state) => state.allProducts.product);
  const { productId } = useParams();
  const {image, title, price, category, description }=product;
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    const response = await axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .catch((err) => console.log(err));
    dispatch(SelectedProduct(response.data));
  };
  useEffect(() => {
    if (product && productId !== "") fetchProduct();
    return ()=>{
      dispatch(RemoveSelectedProduct());
    }
  }, [productId]);
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div style={{marginTop: '100px'}}><h2>Loading...</h2></div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img src={image} className="ui fluid image" />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
