import React from "react";
import LayoutUser from "../components/layouts/LayoutUser";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductRowInCart from "../components/cards/ProductRowInCart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userCart } from "../services/usersAPI";


const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const getTotalBasket = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleSubmitOrder = () => {
    Swal.fire({
      text: "ไปยังหน้า Checkout Order",
      position: "top",
      confirmButtonColor: "#50C878",
      confirmButtonText: "ยืนยัน",
    }).then((result)=>{
      if(result.isConfirmed){
        userCart(user.token, cart).then((res)=>{
          navigate("/checkout");
        }).catch((err)=>{
          console.log(err);
        })
      }
    })
  };

  return (
    <LayoutUser title="ตะกร้าสินค้า">
      <div className="w-full pt-4 pb-4 pl-4 pr-4 bg-white">
        <div className="py-4 bg-white sm:py-16 lg:py-10">
          <div className="px-4 py-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-6xl mx-auto">
              <p className="mb-8 text-4xl font-bold text-center text-gray-900">
                ตะกร้าสินค้า
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-start xl:gap-x-8 lg:gap-x-6 gap-y-10">
                <div className="lg:col-span-3 xl:col-span-3">                
                  <div className="flow-root pt-2 pb-4 pl-8 pr-8 rounded shadow-lg">
                    <div className="my-1 divide-y divide-gray-200">
                      {/* start loop */}
                      {cart.length > 0 ?
                      cart.map((item) => (
                        <ProductRowInCart key={item._id} item={item} />
                      )): <div>
                        ไม่มีรายการสินค้าในตะกร้า
                      </div>
                      }
                      {/* End loop */}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 lg:sticky lg:top-6 lg:mt-10">
                  <div className="overflow-hidden bg-gray-800 rounded text-gray-50">
                    <div className="px-4 py-6 sm:p-6 lg:p-8">
                      <div>
                        <div className="mb-4 ml-0">
                          <div className="flex items-center justify-between py-5 border-b-2">
                            <p className="text-lg font-bold capitalize text-gray-50">
                              ยอดรวมตะกร้าสินค้า {cart.length} ชิ้น :
                            </p>
                            <p className="text-base font-medium text-right text-gray-50">
                              ฿ {getTotalBasket()}
                            </p>
                          </div>

                          {cart.length > 0 ?
                          cart.map((item, index) => (
                            <div
                              key={index}
                              className="m-3 text-xs text-gray-400 "
                            >
                              {item.title}-{item.color} x {item.count} ={" "}
                              {item.price * item.count}
                            </div>
                          )):<div>ไม่มีรายการสินค้าในตะกร้า</div>}

                          <div className="flex items-center justify-between py-3">
                            <p className="text-base font-medium text-gray-50">
                              Subtotal
                            </p>
                            <p className="text-base font-medium text-right text-gray-50">
                            ฿ {getTotalBasket()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {user ? (
                        <button
                          className="w-full h-12 text-white bg-yellow-500 rounded focus:outline-none hover:bg-yellow-600"
                          disabled={!cart.length}
                          onClick={handleSubmitOrder}
                        >
                          ทำการสั่งซื้อ
                        </button>
                      ) : (
                        <NavLink to="/login" state="cart">
                          <button className="w-full h-12 text-white bg-yellow-500 rounded focus:outline-none hover:bg-yellow-600">
                            Login to Checkout
                          </button>
                        </NavLink>
                      )}
                      <p className="mt-4 text-sm font-bold capitalize">
                        หมายเหตุ
                      </p>
                      <p className="text-xs text-gray-50">
                        ค่าขนส่งจะถูกคำนวณที่หน้า Checkout
                      </p>
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

export default Cart;
