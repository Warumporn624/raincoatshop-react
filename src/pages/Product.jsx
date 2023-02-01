import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCardDetail from "../components/cards/ProductCardDetail";
import LayoutUser from "../components/layouts/LayoutUser";

// import function
import { readProduct } from "../services/productAPI";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [colorSelected, setColorSelected] = useState([]);

  useEffect(() => {
    LoadProduct(params.id);
  }, []);

  const LoadProduct = (id) => {
    readProduct(id)
      .then((res) => {
        setProduct(res.data);
        setColorSelected(res.data.color);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <LayoutUser title="Product">
        <ProductCardDetail product={product} colorSelected={colorSelected}/>
        {/* {JSON.stringify(product)} */}
      </LayoutUser>
    </>
  );
};

export default Product;
