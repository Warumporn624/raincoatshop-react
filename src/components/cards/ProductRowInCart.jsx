import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ProductRowInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      toast.error("สินค้ามีจำกัด จำนวนทั้งหมด: " + item.quantity + " ขิ้น");
      return;
    }

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemoveProductItem = () => {
    Swal.fire({
      // title: "คุณต้องการนำสินค้าออกจากตะกร้า ?",
      text:"คุณต้องการนำสินค้าออกจากตะกร้า ?",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่! ต้องการนำออก",
      cancelButtonText:"ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) { 
        let cart = [];
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
          if (product._id === item._id) {
            cart.splice(i, 1);
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    });
  };

  return (
    <div className="flex py-1">
      <ToastContainer />

      <div className="flex-shrink-0 mt-8">
        <img
          src={item.images[0].url}
          className="object-cover w-16 h-16 rounded-lg"
          alt=""
          width="50"
        />
      </div>
      <div className="flex-1 ml-5">
        <div className="text-right">
          <button onClick={handleRemoveProductItem}>
            <div className="font-extrabold">X</div>
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="sm:pr-5 pr-9">
            <p className="text-base font-bold text-gray-900 break-words">
              {item.title} - {item.color}
            </p>
            <p className="font-medium text-sm mt-1.5 text-gray-500">{item.description}</p>
            <div className="my-2 text-sm font-medium text-gray-500">
              ราคา/ชิ้น : ฿ {item.price}
            </div>
            <div className="mb-2 text-sm font-medium text-gray-500">
              <div className="mt-1">
                จำนวน :
                <input
                  onChange={handleChangeCount}
                  value={item.count}
                  type="number"
                  className="h-6 px-1 mx-2 text-xs bg-gray-100 border border-white rounded focus:outline-none w-14"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRowInCart;