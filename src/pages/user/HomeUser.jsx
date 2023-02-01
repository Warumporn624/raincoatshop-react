import React from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "../../components/Slider";
import BestSeller from "../../components/home/BestSeller";
import NewArrival from "../../components/home/NewArrival";

const HomeUser = () => {
  return (
    <LayoutUser title="หน้าแรก">
      <Slider />

      {/* new arrival */}
      <div className="px-10 py-5 text-2xl font-bold 2xl:container 2xl:mx-auto 2xl:px-0">
        สินค้ามาใหม่ล่าสุด !!
      </div>

      <NewArrival />
      {/* Best Seller */}
      <div className="px-10 py-5 text-2xl font-bold 2xl:container 2xl:mx-auto 2xl:px-0">
        สินค้าขายดี
      </div>
      <BestSeller />
      {/* <Product /> */}
    </LayoutUser>
  );
};

export default HomeUser;
