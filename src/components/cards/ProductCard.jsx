import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import _ from "lodash";
import { addWishList } from "../../services/usersAPI";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const { _id, title, color, description, price, images, sold } = product;

  const handleAddtoWishList = (e) => {
    // console.log(_id);
    if (user) {
      addWishList(user.token, _id)
        .then((res) => {
          // console.log(res.data);
          toast.success("เพิ่มลงในสินค้าที่ชอบสำเร็จ");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("กรุณาล็อคอิน");
    }
  }; 

  return (
    <>
      <div className="text-right">
        <button
          onClick={handleAddtoWishList}
          type="button"
          name="wishlist"
          className="m-1 p-1.5 text-white rounded-full bg-slate-300 hover:bg-yellow-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <NavLink to={"/product/" + _id}>
          <img
            alt=""
            className="object-contain w-full h-28 lg:h-40 border-b-slate-200"
            src={images && images.length ? images[0].url : ""}
          />

          <div className="p-2">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-400">
              New
            </span>
            <div class="mt-2 text-xs font-bold overflow-hidden truncate w-full">
              {title} - {color}
            </div>
            {/* <p className="mt-2 text-xs font-bold text-ellipsis overflow-hidden ...">{title}</p> */}
            {/* <p className="text-xs text-gray-500">{description}</p> */}
            <div class="text-xs text-gray-500 overflow-hidden truncate w-full">
              {description}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-600">
              ฿{price} บาท
            </p>
            <p className="text-xs text-right text-gray-500">
              ขายเเล้ว: {sold} ชิ้น
            </p>
          </div>
      </NavLink>
    </>
  );
};

export default ProductCard;
