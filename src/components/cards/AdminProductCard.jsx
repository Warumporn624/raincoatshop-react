import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const AdminProductCard = ({ product, handleRemoveProduct }) => {
  const { _id, title, description, price, images, color } = product;
  return (
    <div className="flex items-center h-full p-1 border border-gray-200 rounded-lg">
      <img
        alt=""
        className="flex-shrink-0 object-cover object-center w-16 h-16 mr-4 bg-gray-100 rounded-md"
        src={images && images.length ? images[0].url : ""}
      />
      <div className="flex-grow">
        {/* <h2 className="font-medium text-gray-900 title-font">{title}</h2> */}
        <div class="mt-2 text-sm font-bold overflow-hidden truncate w-30">
          {title} - {color}
        </div>
        <h5 className="text-xs font-medium text-gray-900 title-font">
          ราคา: ฿ {price}
        </h5>
        <div class="text-xs text-gray-500 overflow-hidden truncate w-20">
          {description}
        </div>
      </div>

      {/* ---------edit-------------------- */}
      <div className="flex items-center space-x-1">
        <NavLink to={`/admin/update-product/${_id}`}>
          <button
            className="p-1 duration-200 rounded-lg hover:bg-yellow-400"
            type="button"
            aria-label="Edit"
          >
            <EditOutlined key="edit" />
          </button>
        </NavLink>

      {/* ---------delete-------------------- */}
        <button
          className="p-1 duration-200 rounded-lg hover:bg-red-400"
          type="button"
          aria-label="Delete"
          onClick={() => handleRemoveProduct(_id)}
        >
          <DeleteOutlined />
        </button>
      </div>

      
    </div>
    
    
  );
};

export default AdminProductCard;
