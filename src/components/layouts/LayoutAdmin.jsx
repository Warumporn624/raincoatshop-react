import React, { useState, useRef, useEffect } from "react";
import DocumentTitle from "react-document-title";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LayoutAdmin = ({ children, title = "admin" }) => {
  // สร้างตัวเเปร state ไว้เก็บสถานะของเมนู
  const [hamberger, setHamberger] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (hamberger && ref.current && !ref.current.contains(e.target)) {
        setHamberger(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [hamberger]);

  const logout = () => {
    Swal.fire({
      title: "คุณต้องการออกจากระบบ ?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่! ต้องการออกจากระบบ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      <DocumentTitle title={title + " | Admin"} />

      <aside className="shadow-xl ml-[-100%] fixed top-0 pb-3 px-2 w-full flex flex-col justify-between h-screen border-r bg-yellow-500 transition duration-200 md:w-4/12 lg:ml-0 lg:w-[20%] xl:w-[17%] 2xl:w-[15%]">
        <div>
          <div className="mt-8 text-center">
            <img
              src="/images/logo.jpg"
              alt="logo"
              className="object-cover w-10 h-10 m-auto rounded-full lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 mb-4 text-xl font-semibold text-gray-600 lg:block">
              Admin
            </h5>
            {/* <span className="hidden text-black lg:block">Admin</span> */}
          </div>

          <div className="w-full space-x-6 text-xs font-semibold">
            <ul className="w-full tracking-wider">
              <NavLink to="/admin/manage">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  จัดการผู้ใช้งาน
                </li>
              </NavLink>
              <NavLink to="/admin/index">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  สินค้า
                </li>
              </NavLink>
              <NavLink to="/admin/create-product">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  เพิ่มสินค้า
                </li>
              </NavLink>
              <NavLink to="/admin/create-category">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  เพิ่มหมวดหมู่สินค้า
                </li>
              </NavLink>
              <NavLink to="/admin/orders">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  จัดการคำสั่งซื้อ
                </li>
              </NavLink>
              <NavLink to="/admin/check-payment">
                <li className="px-8 py-4 duration-300 shadow-md hover:text-white">
                  ตรวจสอบการชำระเงิน
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </aside>

      <div className="ml-auto mb-6 lg:w-[80%] xl:w-[83%] 2xl:w-[85%]">
        <div className="sticky top-0 h-16 border-b bg-gray-100 lg:py-2.5 shadow-md">
          <div className="flex items-center justify-between px-6 space-x-4 2xl:container">
            <button
              onClick={() => setHamberger((prev) => !prev)}
              className="w-12 h-16 -mr-2 border-r lg:hidden"
            >
              {/* hamberger */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h5 className="text-2xl font-medium text-gray-600 lg:block">
              Dashboard
            </h5>

            {/* logout */}
            <div className="flex space-x-4">
              <button
                className="p-2 mr-3 text-white duration-300 bg-black bg-opacity-25 rounded-full hover:bg-red-400 hover:text-white"
                onClick={logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto mb-6 lg:w-[80%] xl:w-[83%] 2xl:w-[85%]">
        <div className="px-6 pt-3 pb-6 2xl:container">{children}</div>
      </div>

      {/* mobile sidebar */}
      <div
        ref={ref}
        className={`${
          hamberger ? "block" : "hidden"
        } fixed top-0 left-0 shadow-2xl w-72 h-screen uppercase overflow-y-auto bg-yellow-500`}
      >
        <div
          onClick={() => setHamberger((prev) => !prev)}
          className="flex items-center justify-center p-2 m-4 mx-2 text-white bg-black rounded-md cursor-pointer"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <div className="m-3 text-center">
          <img
            src="/images/logo.jpg"
            alt="logo"
            className="object-cover w-10 h-10 m-auto rounded-full lg:w-28 lg:h-28"
          />
        </div>

        <div className="w-full space-x-6 text-xs font-semibold">
        <ul className="w-full tracking-wider">
              <NavLink to="/admin/manage">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  จัดการผู้ใช้งาน
                </li>
              </NavLink>
              <NavLink to="/admin/index">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  สินค้า
                </li>
              </NavLink>
              <NavLink to="/admin/create-product">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  เพิ่มสินค้า
                </li>
              </NavLink>
              <NavLink to="/admin/create-category">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  เพิ่มหมวดหมู่สินค้า
                </li>
              </NavLink>
              <NavLink to="/admin/orders">
                <li className="px-10 py-4 duration-300 shadow-md hover:text-white">
                  จัดการคำสั่งซื้อ
                </li>
              </NavLink>
              <NavLink to="/admin/check-payment">
                <li className="px-8 py-4 duration-300 shadow-md hover:text-white">
                  ตรวจสอบการชำระเงิน
                </li>
              </NavLink>
            </ul>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
