import React from "react";
import { useState, useEffect } from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import { useSelector } from "react-redux";
import { getWishList, removeWishList } from "../../services/usersAPI";
import { NavLink } from "react-router-dom";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemoveProductItem = (productId) => {
    //removeWishList
    removeWishList(user.token, productId).then((res) => {
      loadData();
    });
  };

  return (
    <LayoutUser>
      <div className="w-full pt-4 pb-4 pl-4 pr-4 bg-white">
        <div className="py-4 bg-white sm:py-16 lg:py-10">
          <div className="px-4 py-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-6xl mx-auto">
              <p className="mb-8 text-4xl font-bold text-center text-gray-900">
                สินค้าที่สนใจ
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-start xl:gap-x-8 lg:gap-x-6 gap-y-10">
                <div className="lg:col-span-3 xl:col-span-3">
                  <div className="flex mb-6 ml-0">
                  </div>
                  <div className="flow-root pt-2 pb-4 pl-8 pr-8 overflow-y-auto rounded shadow-lg h-96">
                    <div className="my-1 divide-y divide-gray-200">
                      {/* start loop */}
                      {wishlist.length > 0 ? 
                      wishlist.map((item, index) => (
                        <div key={index} className="flex py-2">
                          <div className="flex-shrink-0 mt-6">
                            <img
                              src={item.images[0].url}
                              className="object-cover w-16 h-16 rounded-lg"
                              alt=""
                              width="50"
                            />
                          </div>
                          <div className="flex-1 ml-5">
                            <div className="text-right">
                              <button
                                onClick={() =>
                                  handleRemoveProductItem(item._id)
                                }
                              >
                                <div className="font-extrabold">X</div>
                              </button>
                            </div>
                            <NavLink to={"/product/" + item._id}>
                              <div className="flex flex-wrap items-center justify-between w-full hover:text-yellow-500">
                                <div className="sm:pr-5 pr-9">
                                  <p className="text-base font-bold text-gray-900 break-words">
                                    {item.title} - {item.color}
                                  </p>
                                  <p className="font-medium text-sm mt-1.5 text-gray-500">
                                    {item.description}
                                  </p>
                                  <div className="my-2 text-sm font-medium text-gray-500">
                                    ราคา/ชิ้น : ฿ {item.price}
                                  </div>
                                  <div className="mb-2 text-sm font-medium text-gray-500"></div>
                                </div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      )): <div>ไม่พบสินค้าที่สนใจ</div>}
                      {/* End loop */}
                    </div>
                  </div>
                </div>
                <div className="shadow-lg lg:col-span-2 lg:sticky lg:top-6 lg:mt-10">
                  <div className="overflow-hidden text-black rounded bg-gray-50">
                    <div className="px-4 py-6 sm:p-6 lg:p-8">
                      <NavLink to="/shop">
                        <button className="w-full h-12 text-white bg-yellow-500 rounded focus:outline-none hover:bg-yellow-600">
                          เลือกซื้อสินค้าต่อ
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default WishList;
