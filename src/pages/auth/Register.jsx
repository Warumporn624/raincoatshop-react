import React, { useState } from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import { useForm } from "react-hook-form";

// import function
import { registerAPI } from "../../services/authAPI";

import { ToastContainer, toast } from "react-toastify";

const Register = () => {

  // use react hook form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerSubmit = (data) => {
    // console.log(data);

    if (data.email && data.password && data.confirmPassword) {
      // check password
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't matches");
      } else {
        // sent data to database
        registerAPI(data)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((error) => {
            // console.log(error.response.data);
            toast.error(error.response.data.errors);
          });
      }
    } else {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <LayoutUser title="สมัครสมาชิก">
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-5 bg-gradient-to-tr sm:p-10">
      <div className="w-full md:w-[50%] max-w-[500px] border-2 bg-palette-card shadow-lg py-4 px-8 rounded-lg">
          {/*---text----*/}
          <div className="text-center ">
            <h1 class="text-2xl font-semibold text-gray-900">สมัครสมาชิก</h1>
          </div>

          {/*---Register from----*/}
          <form
            action="login"
            className="p-5 space-y-4"
            onSubmit={handleSubmit(registerSubmit)}
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

            {/*-Password--*/}
            <div>
              <h4 className="text-gray-500">
                รหัสผ่าน <span className="text-red-500 ">*</span>
              </h4>
              <div className="relative ">
                <span className="absolute top-3 left-0 p-0.5">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                {/* toggle show-hide password */}
                <span className="absolute top-2 right-1">
                  <label
                    onClick={() => setShowPassword(!showPassword)}
                    class="bg-gray-200 hover:bg-gray-200 rounded px-0.5 py-0.5 text-xs text-gray-400 font-mono cursor-pointer "
                    for="toggle"
                  >
                    {showPassword ? "hide" : "show"}
                  </label>
                </span>

                <input
                  className="w-full py-2 pl-6 text-gray-400 placeholder-gray-400 border-b-2 border-gray-300 focus:border-blue-300 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่าน"
                  name="password"
                  {...register("password", {
                    required: "กรุณากรอกรหัสผ่าน",
                    minLength: {
                      value: 6,
                      message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
                    },
                    validate: (value) => {
                      const isValid =
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[-!@#$*])/.test(
                          value
                        );
                      if (!isValid)
                        return "รหัสผ่านต้องประกอบด้วยตัวอักษรภาษาอังกฤษ พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข เครื่องหมายหรืออักขระพิเศษ (-!@#$*)";
                      else return true;
                    },
                  })}
                />
                {errors.password && (
                  <div class="rounded-lg">
                    <p className="text-xs text-red-600 break-words">
                      {errors.password?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/*-Re type Password--*/}
            <div>
              <h4 className="text-gray-500">
                ยืนยันรหัสผ่าน <span className="text-red-500 ">*</span>
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                {/* toggle show-hide password */}
                <span className="absolute top-2 right-1">
                  <label
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    class="bg-gray-200 hover:bg-gray-200 rounded px-0.5 py-0.5 text-xs text-gray-400 font-mono cursor-pointer "
                    for="toggle"
                  >
                    {showConfirmPassword ? "hide" : "show"}
                  </label>
                </span>

                <input
                  className="w-full py-2 pl-6 text-gray-400 placeholder-gray-400 border-b-2 border-gray-300 focus:border-blue-300 focus:outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="ยืนยันรหัสผ่าน"
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "กรุณายืนยันรหัสผ่าน",
                    validate: (value) => {
                      const { password } = getValues();
                      return password === value || "ยืนยันรหัสผ่านไม่ถูกต้อง";
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div class="rounded-lg">
                    <p className="text-xs text-red-600 break-words">
                      {errors.confirmPassword?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/*-Term and condition--*/}
            <div className="flex items-center ">
              <input className="w-4 h-4 mr-2 " type="checkbox" required />
              <span className="text-gray-400 ">
                I agree all statements in{" "}
                <a className="underline " href="#">
                  {" "}
                  Terms of service
                </a>
              </span>
            </div>

            {/*-button--*/}
            <div className="flex pt-4 space-x-4 ">
              <button
                type="submit"
                className="w-full p-2 font-semibold text-center text-white uppercase rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
              >
                สมัครสมาชิกเเละสั่งซื้อสินค้า
              </button>
            </div>
          </form>
          {/*-------*/}
          <div className="mt-1 text-center">
            
            {/*----*/}
            <div className="mt-5 text-center ">
            <span className="text-xs text-gray-400 ">เป็นสมาชิกอยู่เเล้ว ?</span>
              <a
                className="flex items-center justify-center inline text-gray-400 hover:text-yellow-600"
                href="/login"
              >
                <span className="no-underline hover:underline">เข้าสู่ระบบ</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Register;
