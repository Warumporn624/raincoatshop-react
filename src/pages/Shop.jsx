import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import LayoutUser from "../components/layouts/LayoutUser";
import { Spin } from "antd";
import { Slider } from "antd";

// import function
import { listProduct, searchFilters, listColor} from "../services/productAPI";
import { listCategory } from "../services/categoryAPI";

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(false);
  const [product, setProduct] = useState([]);

  // filter category
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);

  const [selectCategory, setSelectCategory] = useState([]);
  const [selectColor, setSelectColor] = useState([]);
  const [selectPrice, setSelectPrice] = useState([0,1000]);
  const [selectFilter, setSelectFilter] = useState({price:[0,1000]});

  // 1. โหลดข้อมูลสินค้าทั้งหมด
  useEffect(() => {
    loadProduct();
    loadColor();
    listCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loadProduct = () => {
    setLoading(true);
    listProduct(20)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const loadColor = () => {
    listColor()
      .then((res) => {
        setColor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProductFilter = (arg) => {
    console.log("fetch");
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeFilterCategory = (e) => {
    // console.log(e.target.value)
    let onCheck = e.target.value;
    let inState = [...selectCategory];

    let findSelectCategory = inState.indexOf(onCheck);

    if (findSelectCategory === -1) {
      // if not found
      inState.push(onCheck);
    } else {
      inState.splice(findSelectCategory, 1);
    }
    setSelectCategory(inState);

    setSelectFilter({ ...selectFilter, category: inState });

    if (inState.length < 1) {
      setSelectFilter(current=>{
      const copy = {...current};
      delete copy['category'];
      return copy;
      })
      loadProduct();
    }
  };

  const handleChangeFilterColor = (e) => {
    let onCheck = e.target.value;
    let inState = [...selectColor];

    let findSelectColor = inState.indexOf(onCheck);

    if (findSelectColor === -1) {
      // if not found
      inState.push(onCheck);
    } else {
      inState.splice(findSelectColor, 1);
    }
    setSelectColor(inState);

    setSelectFilter({ ...selectFilter, color: inState });

    if (inState.length < 1) {
      setSelectFilter(current=>{
      const copy = {...current};
      delete copy['color'];
      return copy;
      })
      loadProduct();
    }
  };

  const handlePriceFilter = (value) => {
    setSelectPrice(value);
    setSelectFilter({ ...selectFilter, price: value })

    setTimeout(() => {
      setPass(!pass);
    }, 300);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProductFilter({ selectFilter: selectFilter });
  };

  return (
    <LayoutUser title="Shop">
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
            <div className="lg:sticky lg:top-4">
              <details
                open
                className="overflow-hidden border border-gray-200 rounded"
              >
                <summary className="flex items-center justify-between px-5 py-3 bg-gray-100 lg:show">
                  <span className="text-sm font-medium">กรองสินค้า</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </summary>
                <form
                  onSubmit={handleFilterSubmit}
                  className="border-t border-gray-200 lg:border-t-0"
                >
                  {/* filter category */}
                  <fieldset>
                    <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                      หมวดหมู่สินค้า
                    </legend>
                    <div className="px-5 py-6 space-y-2">
                      {/* -------Start loop------- */}
                      {category.length > 0 ?
                      category.map((item, index) => (
                        <div className="flex items-center" key={index}>
                          <input
                            name="category"
                            value={item._id}
                            onChange={handleChangeFilterCategory}
                            type="checkbox"
                            className="w-5 h-5 border-gray-300 rounded"
                          />
                          <label className="ml-3 text-sm font-medium">
                            {item.name}
                          </label>
                        </div>
                      )): <div>ไม่พบหมวดหมู่สินค้า</div>}
                      {/* -------End loop------- */}
                    </div>
                  </fieldset>
                  {/* End filter category */}

                  {/* filter color */}
                  <fieldset>
                    <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                      สีสินค้า
                    </legend>
                    <div className="px-5 py-6 space-y-2">
                      {/* -------Start loop------- */}
                      {color.length > 0 ? color.map((item, index) => (
                        <div className="flex items-center" key={index}>
                          <input
                            name="color"
                            value={item}
                            onChange={handleChangeFilterColor}
                            type="checkbox"
                            className="w-5 h-5 border-gray-300 rounded"
                          />
                          <label className="ml-3 text-sm font-medium">
                            {item}
                          </label>
                        </div>
                      )): <div>No data</div>}
                      {/* -------End loop------- */}
                    </div>
                  </fieldset>
                  {/* End filter color */}

                  {/* filter color */}
                  {/* <fieldset>
                    <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                      ราคา
                    </legend>
                    <div className="px-5 py-6 space-y-2"> */}
                      {/* -------Start loop------- */}
                      {/* {priceRange.map((item, index) => (
                        <div className="flex items-center" key={index}>
                          <input
                            name="price"
                            value={item}
                            onChange={handleChangeFilterPrice}
                            type="checkbox"
                            className="w-5 h-5 border-gray-300 rounded"
                          />
                          <label className="ml-3 text-sm font-medium">
                            {item[0]}-{item[1]}
                          </label>
                        </div>
                      ))} */}
                      {/* -------End loop------- */}
                    {/* </div>
                  </fieldset> */}
                  {/* End filter color */}

                  {/* --------price range---------- */}
                  <div>
                    <fieldset>
                      <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                        ราคา
                      </legend>
                      <div className="px-5">
                        <Slider
                          value={selectPrice}
                          onChange={handlePriceFilter}
                          range
                          max={1000}
                        />
                      </div>
                    </fieldset>
                  </div>
                  {/* -------End price range--------------- */}

                  <div className="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                    {/* <button
                      type="reset"
                      onClick={handleResetFilter}
                      className="px-3 py-1 m-2 text-xs font-medium tracking-wider text-blue-500 underline shadow-sm hover:text-blue-600"
                    >
                      ล้าง
                    </button> */}
                    <button
                      type="submit"
                      className="px-3 py-1 m-2 text-xs font-medium tracking-wider text-white bg-yellow-600 shadow-sm hover:shadow-lg hover:bg-yellow-600"
                    >
                      ตกลง
                    </button>
                  </div>
                </form>
              </details>
            </div>
            <div className="lg:col-span-3">
              {loading ? (
                <h1>
                  Loading...
                  <Spin />
                </h1>
              ) : (
                <p className="m-2"></p>
              )}
              {product.length < 1 && <p>ไม่พบสินค้า</p>}
              <div className="grid grid-cols-2 gap-px mt-4 bg-white border border-gray-200 sm:grid-cols-2 lg:grid-cols-4">
                {product.length > 0 ?
                product.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200">
                    <ProductCard product={item} />
                  </div>
                )):<div>ไม่พบสินค้า</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutUser>
  );
};

export default Shop;
