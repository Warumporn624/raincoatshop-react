import React, { useState, useEffect } from "react";
import ProductCard from "../cards/ProductCard";

// import function
import { listProductBy } from "../../services/productAPI";

import LoadingCard from "../cards/LoadingCard";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    LoadProduct();
  }, []);

  const LoadProduct = () => {
    setLoading(true);
    listProductBy("sold", "desc", 3)
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="px-10 py-5 2xl:container 2xl:mx-auto 2xl:px-0">
      {loading ? (
        <LoadingCard />
      ) : (
        <div className="grid grid-cols-2 gap-px mt-1 bg-white border border-gray-200 sm:grid-cols-2 lg:grid-cols-6">
        {products.length > 0 ? 
        products.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200">
            <ProductCard product={item} /> 
          </div>
        )): <div>ไม่พบสินค้า</div>}
      </div>
      )}
    </div>
  )
}

export default BestSeller