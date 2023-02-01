import React from "react";
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    <div className="px-0 py-0 2xl:container 2xl:mx-auto 2xl:px-0">
      <Carousel
        autoPlay
        axis="horizontal"
        interval="3000"
        transitionTime="1000"
        infiniteLoop
        showThumbs={false}  
      >
        <div>
          <img
            className="object-cover object-center w-64 h-64"
            src="https://res.cloudinary.com/dwoevbten/image/upload/v1666067064/cld-sample.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="object-cover object-center w-64 h-64"
            src="https://res.cloudinary.com/dwoevbten/image/upload/v1666067065/cld-sample-2.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="object-cover object-center w-64 h-64"
            src="https://res.cloudinary.com/dwoevbten/image/upload/v1666067066/cld-sample-5.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
