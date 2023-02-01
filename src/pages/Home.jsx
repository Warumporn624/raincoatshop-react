import React from "react";
import BestSeller from "../components/home/BestSeller";
import NewArrival from "../components/home/NewArrival";
import LayoutUser from "../components/layouts/LayoutUser";
// import Product from "../components/Product";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <LayoutUser title="Home Page">
      <Slider />

      {/* new arrival */}
      <div className="px-10 py-5 2xl:container 2xl:mx-auto 2xl:px-0 text-2xl font-bold">
        สินค้ามาใหม่ล่าสุด !!
      </div>

      <NewArrival />
      {/* Best Seller */}
      <div className="px-10 py-5 2xl:container 2xl:mx-auto 2xl:px-0 text-2xl font-bold">
        สินค้าขายดี
      </div>
      <BestSeller />
      {/* <Product /> */}
    </LayoutUser>
  );
};

export default Home;
