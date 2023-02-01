import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNav = () => {
  const { cart } = useSelector((state) => ({ ...state }));

     // สร้างตัวเเปร state ไว้เก็บสถานะของเมนู
     const [hamberger, setHamberger] = useState(false);

     const ref = useRef()

     useEffect(() => {
        const checkIfClickedOutside = e => {
          if (hamberger && ref.current && !ref.current.contains(e.target)) {
            setHamberger(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [hamberger])

  return (

    <div className="flex items-center justify-between px-4 bg-yellow-500 xl:px-24 sm:px-10">
      {/*-------001---------*/}
      <div>
        <button
          onClick={() => setHamberger((prev) => !prev)}
          className="inline-block p-2 rounded bg-gradient-to-b lg:hidden"
        >
          <span className="text-white ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-justify"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
          </span>
        </button>
        {/*-------Mobile Menu---------*/}

        {/* <div className="fixed top-0 left-0 z-50 h-screen overflow-y-auto uppercase bg-white shadow-2xl w-72"> */}
        <div
        ref={ref}
          className={`${
            hamberger ? "block" : "hidden"
          } fixed top-0 left-0 bg-white shadow-2xl w-72 h-screen uppercase overflow-y-auto z-50`}
        >

          <div
            onClick={() => setHamberger((prev) => !prev)}
            className="flex items-center justify-center p-2 m-4 mx-2 text-white bg-red-500 rounded-md cursor-pointer"
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
          <div
            className="w-full space-x-6 text-xs font-semibold"
          >
            <ul className="w-full tracking-wider">
              <li className="px-10 py-4 duration-300 border-t border-b hover:shadow">
                <NavLink to="/">
                  หน้าแรก
                </NavLink>
              </li>                        
              <li className="px-10 py-4 duration-300 border-t border-b hover:shadow">
                <NavLink to="/shop">
                  สินค้าทั้งหมด
                </NavLink>
              </li>                        
              <li className="px-10 py-4 duration-300 border-b hover:tracking-widest hover:shadow">
                <NavLink to="/cart">ตะกร้าสินค้า</NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/*-------main Menu---------*/}
        <ul className="items-center hidden space-x-1 text-sm font-bold text-white uppercase lg:flex">
          <li>
            <NavLink className="p-3 hover:bg-yellow-600" to="/">
              หน้าแรก
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 hover:bg-yellow-600" to="/shop">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 hover:bg-yellow-600" to="/cart">
            ตะกร้าสินค้า
            </NavLink>
          </li>
        </ul>
      </div>
      {/*-------002---------*/}
      <div className="relative ">
        <NavLink to="/cart" className="relative flex items-center p-3 px-4 space-x-2 font-bold text-white uppercase bg-yellow-600 hover:bg-yellow-800">
          <span className>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span className="box-border absolute top-0 z-20 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-700 rounded-full left-9">
              {cart.length}
            </span>
          </span>
          <div className="items-center hidden space-x-2 lg:flex">
            <span>ตะกร้าสินค้า</span>
          </div>
        </NavLink>
        {/* <div className="absolute right-0 z-50 flex items-center justify-center h-40 p-5 bg-white border rounded shadow-2xl -left-56 lg:-left-8 top-12 w-72">
          <ul>
            <li>Your cart is empty</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default BottomNav;
