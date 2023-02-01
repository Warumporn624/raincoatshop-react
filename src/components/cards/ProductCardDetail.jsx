import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Tabs } from "antd";

import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import { addWishList } from "../../services/usersAPI";
import { toast } from "react-toastify";

const ProductCardDetail = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const {
    _id,
    sku,
    color,
    title,
    description,
    price,
    quantity,
    images,
    sold,
    category,
  } = product;

  const handleAddtoCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });

    // let productUnique = _.uniqWith(cart, _.isEqual);
    let productUnique = _.uniqBy(cart, (o) =>
      JSON.stringify(_.omit(o, ["count"]))
    );

    localStorage.setItem("cart", JSON.stringify(productUnique));

    dispatch({
      type: "ADD_TO_CART",
      payload: productUnique,
    });
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

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
    <section className="overflow-hidden text-gray-600 body-font">
      <div className="container px-5 py-20 pt-5 mx-auto">
        <div className="flex flex-wrap mx-auto lg:w-4/5">
          <div className="object-cover object-center w-full h-auto rounded lg:w-1/2 lg:h-auto">
            <Carousel axis="horizontal" infiniteLoop showThumbs={true}>
              {images &&
                images.map((item) => (
                  <img
                    key={item.public_id}
                    src={item.url}
                    className=""
                    alt="รูปภาพสินค้า"
                  />
                ))}
            </Carousel>
          </div>

          <div className="w-full mt-0 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
            {category && (
              <h5 className="text-xs tracking-widest text-gray-500 title-font">
                หมวดหมู่สินค้า: {category.name}
              </h5>
            )}
            <h1 className="mt-3 mb-1 text-3xl font-medium text-gray-900 title-font">
              {title} - {color}
            </h1>

            <p className="leading-relaxed">{description}</p>
            <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
              <div className="flex">
                <span className="mr-3">สีสินค้า:</span>
                {color}
              </div>
            </div>
            <div className="flex">
              <span className="text-2xl font-medium text-gray-900 title-font">
                ฿{price}
              </span>
              <button
                onClick={handleAddtoCart}
                className="flex px-6 py-2 ml-auto text-white bg-yellow-500 border-0 rounded focus:outline-none hover:bg-yellow-600"
              >
                หยิบใส่ตะกร้า
              </button>
              <button
                onClick={handleAddtoWishList}
                className="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full hover:bg-yellow-600"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="รายละเอียดสินค้า" key="1">
              {description}
            </Tabs.TabPane>
            <Tabs.TabPane tab="การจัดส่งสินค้า" key="2">
              <p>
              ส่งของ 2 รอบ ตัดรอบเที่ยง 11.30 น. เก็บตกรอบเย็นไม่เกิน 16.00 น. สั่งหลัง 16.00 น. ทางร้านจะตัดเป็นรอบเที่ยงของวันถัดไป
              </p>
              <p>
              ** แนะนำให้กรอกข้อมูลให้ครบถ้วนดังนี้ บ้านเลขที่ ซอย ถนน หมู่ ตำบล/แขวง อำเภอ/เขต จังหวัด และรหัสไปรษณีย์
              </p>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProductCardDetail;
