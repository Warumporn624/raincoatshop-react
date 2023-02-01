import React, { useState } from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const navigate = useNavigate();
  const { reset_token } = useParams();

  // use react hook form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const resetPasswordSubmit = async (data) => {
    // console.log(data);
    const { password, confirmPassword} = data;

    if (password && confirmPassword) {
      // check password
      if (password !== confirmPassword) {
        toast.error("รหัสผ่านยืนยันไม่ตรงกัน");
      } else {
  
        // sent data to database
        await axios
          .post(
            process.env.REACT_APP_API + "/reset",
            { reset_token, password },
          )
          .then((res) => {
            toast.success(res.data.message);

            setTimeout(() => {
              navigate("/login")
         }, 3000);
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
    <LayoutUser title="เปลี่ยนรหัสผ่าน">
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-5 bg-gradient-to-tr sm:p-10">
        <div className="p-3 bg-white shadow-2xl xl:w-2/5 md:w-2/5 rounded-xl">
          {/*---text----*/}
          <div className="text-center ">
            <h1 class="text-2xl font-semibold text-gray-900">
              เปลี่ยนรหัสผ่าน
            </h1>
          </div>

          {/*---Reg from----*/}
          <form
            action="login"
            className="p-5 space-y-4"
            onSubmit={handleSubmit(resetPasswordSubmit)}
          >
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

            {/*-button--*/}
            <div className="flex pt-4 space-x-4 ">
              <button
                type="submit"
                className="w-full p-2 font-semibold text-center text-white uppercase rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
              >
                ยืนยันการเปลี่ยนรหัสผ่าน
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
};

export default ResetPassword;
