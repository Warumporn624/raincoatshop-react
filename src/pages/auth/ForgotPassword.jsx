import React, { useState } from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {

  // use react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ForgotSubmit = (data) => {
    // console.log(data);
    const { email } = data;

    if (email) {
        // sent data to database
        axios
          .post(process.env.REACT_APP_API + "/forgot", { email })
          .then((res) => {
            // console.log(res.data);
            toast.success(res.data.message);
          })
          .catch((error) => {
            // console.log(error.response.data);
            toast.error(error.response.data.errors);
          });
      
    } else {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <LayoutUser title="ลืมรหัสผ่าน">
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-5 bg-gradient-to-tr sm:p-10">
        <div className="p-3 bg-white shadow-2xl xl:w-2/5 md:w-2/5 rounded-xl">
          <div className="text-center ">
            <h1 class="text-2xl font-semibold text-gray-900">ลืมรหัสผ่าน ?</h1>
          </div>

          {/*---Reg from----*/}
          <form
            action="login"
            className="p-5 space-y-4"
            onSubmit={handleSubmit(ForgotSubmit)}
          >
            {/*-email--*/}
            <div>
              <h4 className="text-gray-500">
                อีเมล <span className="text-red-500 ">*</span>
              </h4>
              <div className="relative ">
                <span className="absolute left-0 top-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mb-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  className="w-full py-2 pl-6 text-gray-400 placeholder-gray-400 border-b-2 border-gray-300 focus:border-blue-300 focus:outline-none"
                  type="text"
                  placeholder="xxx@example.com"
                  name="email"
                  {...register("email", {
                    required: "กรุณากรอกอีเมล",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "รูปเเบบของอีเมลไม่ถูกต้อง",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            {/*-button--*/}
            <div className="flex pt-4 space-x-4 ">
              <button
                type="submit"
                className="w-full p-2 font-semibold text-center text-white uppercase rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
              >
                ส่งยืนยันอีเมล
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
};

export default ForgotPassword;
