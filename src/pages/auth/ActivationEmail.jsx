import React, { useState, useEffect } from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            process.env.REACT_APP_API + "/activation",
            { activation_token }
          );
          setSuccess(res.data.message);
        } catch (err) {
          err.response.data.message && setErr(err.response.data.message);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <LayoutUser>
      <div>
        {success ? (
          <div className="flex items-center justify-center px-4 py-5  bg-gradient-to-tr sm:p-10">
            <div className="p-3 bg-white shadow-2xl  xl:w-2/5 md:w-2/5 rounded-xl">
              <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    class="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg leading-6 text-green-500">Successful!</h3>
                <div class="mt-2 px-7 py-3">
                  <p class="text-sm text-green-500">{success}</p>
                </div>
              </div>

              {/*-button--*/}
              <div className="flex pt-4 space-x-4 ">
                <a
                  href="/login"
                  className="w-full p-2 mb-4 font-semibold text-center text-white uppercase rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                >
                  เข้าสู่ระบบ
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center px-4 py-5  bg-gradient-to-tr sm:p-10">
            <div className="p-3 bg-white shadow-2xl  xl:w-2/5 md:w-2/5 rounded-xl">
              <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                  </svg>
                </div>
                {/* <h3 class="text-lg leading-6 text-red-500">เกิดข้อผิดพลาด</h3> */}
                <div class="mt-2 px-7 py-3">
                  <p class="text-sm text-red-500">{err}</p>
                </div>
              </div>
              {/*-------*/}
              <div className="mt-1 text-center">
                <div className="mt-5 text-center ">
                  <a
                    className="flex items-center justify-center inline text-gray-400 "
                    href="/"
                  >
                    <span>กลับสู่หน้าหลัก</span>
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
                 {/*-button--*/}
            <div className="flex pt-4 space-x-4 ">
              <a
                href="/login"
                className="w-full p-2 mb-4 font-semibold text-center text-white uppercase rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
              >
                เข้าสู่ระบบ
              </a>
            </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutUser>
  );
};

export default ActivationEmail;
