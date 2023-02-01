import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";

export const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };

  const getTotalBasket = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <Drawer
      title={"ตะกร้าสินค้า ( " + cart.length + " ) ชิ้น"}
      placement="right"
      visible={drawer}
      onClose={onCloseDrawer}
    >
      <div className="flex-1 px-4 py-6 overflow-y-auto h-96 sm:px-6">
        <div className="mt-2">
          <div className="flow-root">
            <div className="-my-6 overflow-y-auto divide-y divide-gray-200">
              {/* -------------Start loop--------------------- */}
              {cart.length < 1 ? <p>ไม่มีสินค้าในตะกร้า</p>:
              cart.map((item) => (
                <div className="flex py-6">
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                    <img
                      src={item.images[0].url}
                      alt="สินค้า"
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1 ml-4">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <div class="mt-2 text-sm font-bold overflow-hidden truncate w-30">
                          {item.title} - {item.color}
                        </div>
                      </div>
                      <div class="mt-1 text-xs text-gray-500 overflow-hidden truncate w-20 font-bold">
                        {item.colorSelect}
                      </div>
                      <div className="flex items-end justify-between flex-1 mt-1 text-xs">
                        <p className="text-gray-500">
                          ฿{item.price} x {item.count}
                        </p>
                      </div>
                      <div className="flex items-end justify-between flex-1 text-sm font-bold">
                        <p>฿{item.price * item.count}</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between flex-1 text-sm"></div>
                  </div>
                </div>
              ))}

              {/* -----------End loop----------------------- */}

              {/* More products... */}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p> ฿ {getTotalBasket()}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          ค่าขนส่งจะถูกคำนวณที่หน้า checkout.
        </p>
        <div className="mt-6">
          <NavLink
            onClick={onCloseDrawer}
            to="/cart"
            className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700"
          >
            ไปยังตะกร้าสินค้า
          </NavLink>
        </div>
        <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
          <NavLink
            to="/shop"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            เลือกซื้อสินค้าต่อ
            <span aria-hidden="true"> →</span>
          </NavLink>
        </div>
      </div>
    </Drawer>
  );
};
