import React, { useState } from "react";
import { useForm } from "react-hook-form";

// service API
import { login } from "../../services/authAPI";

// redux
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LayoutUser from "../../components/layouts/LayoutUser";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location.state);
  
  // use react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const roleBaseRedirect = (role) => {
    let loc = location.state;
    if (loc) {
      navigate('../'+loc);
    } else {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/user/index");
      }
    }
  };

  const LoginSubmit = (data) => {
    login(data)
      .then((res) => {
        // console.log(res.data);
        toast.success("เข้าสู่ระบบสำเร็จ");
        dispatch({
          type: "LOGIN", 
          payload: {
            token: res.data.token,
            email: res.data.payload.user.email,
            role: res.data.payload.user.role,
          },
        });
        // เก็บ token ลงใน local storage
        localStorage.setItem("token", res.data.token);

        // check role
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((error) => {
        toast.error(error.response.data.errors);
      });
  };

  return (
    <LayoutUser title="เข้าสู่ระบบ">
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-5 bg-gradient-to-tr sm:p-10">
        <div className="w-full md:w-[50%] max-w-[500px] border-2 bg-palette-card shadow-lg py-4 px-8 rounded-lg">
          <div className="text-center ">
            <h1 class="text-2l font-semibold text-gray-900">เข้าสู่ระบบ</h1>
          </div>

          {/*---Reg from----*/}
          <form
            action="login"
            className="p-5 space-y-4"
            onSubmit={handleSubmit(LoginSubmit)}
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

            {/*-button--*/}
            <div className="flex pt-4 space-x-4">
              <button
                type="submit"
                className="w-full p-2 font-semibold text-center text-white uppercase rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
              >
                เข้าสู่ระบบเพื่อสั่งซื้อสินค้า
              </button>
            </div>
            {/*-------*/}
            <div className="text-right">
              <Link
                to="/forgot_password"
                className="text-xs text-right text-indigo-500 no-underline hover:underline"
              >
                ลืมรหัสผ่าน ?
              </Link>
            </div>
          </form>

          {/*-------*/}
          <div className="mt-1 text-center">
            {/*----*/}
            <div className="mt-5 text-center ">
              <a
                className="flex items-center justify-center inline text-gray-400 hover:text-yellow-600"
                href="/register"
              >
                <span className="no-underline hover:underline">
                  ลงทะเบียนใหม่
                </span>
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

export default Login;
