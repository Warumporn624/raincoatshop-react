//  (REF UI: https://larainfo.com/blogs/tailwind-css-simple-ecommerce-checkout-page-ui-example)
import React from "react";
import LayoutUser from "../components/layouts/LayoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  emptyCart,
  getInformAddress,
  getUserCart,
  saveInformAddress,
  saveOrder,
} from "../services/usersAPI";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [editInformAddress, setEditInformAddress] = useState(false);
  const [informAddress, setInformAddress] = useState({});
  const [save, setSave] = useState(false);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotalPrice(res.data.cartPriceTotal);
      setTotalNumber(res.data.cartNumberTotal);
    });
  }, []);

  useEffect(() => {
    getInformAddress(user.token)
      .then((res) => {
        setInformAddress(res.data);
        if (Object.keys(res.data).length > 0) {
          setEditInformAddress(false);
          setSave(true);
        } else {
          setEditInformAddress(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // use react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerSubmit = (data) => {
    // console.log(data);
    saveInformAddress(user.token, data).then((res) => {
      if (res.data.pass) {
        setEditInformAddress(false);
        setSave(true);
        setInformAddress(data);
      }
    });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token).then((res) => {
      emptyCart(user.token);
      toast.success("ใบสั่งซื้อของคุณถูกสร้าง กรุณาชำระเงิน");
      // clear Store
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      //clear local storage
      if (typeof window != "undefined") {
        localStorage.removeItem("cart");
      }
      navigate("/user/history");
    });
  };

  return (
    <LayoutUser title="ดำเนินการสั่งซื้อ">
      <div>
        {/* <div className="mt-5">
            <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
              Tailwind CSS Ecommerce Checkout Page UI
            </h1>
          </div> */}
        <div className="container p-5 mx-auto lg:px-24">
          <div className="flex flex-col w-full p-4 mx-auto border rounded-lg shadow-lg lg:p-10 border-b-gray-200 md:flex-row">
            {/* ----start ที่อยู่ในการจัดส่ง---------------------------- */}

            <div className="flex flex-col md:w-full">
              <h2 className="mb-4 font-bold md:text-xl text-heading ">
                ที่อยู่ในการจัดส่ง
              </h2>
              {/* ---------div ข้อมูลที่เคยมีอยู่ในระบบ------------------------------- */}

              {editInformAddress ? (
                <form
                  className="justify-center w-full mx-auto"
                  action="Adress"
                  onSubmit={handleSubmit(registerSubmit)}
                >
                  <div>
                    <div className="space-x-0 lg:flex lg:space-x-4">
                      <div className="w-full lg:w-1/2">
                        {/* ----------------------------- */}
                        <label
                          htmlFor="firstName"
                          className="block mb-3 text-sm font-semibold text-gray-500"
                        >
                          ชื่่อ
                        </label>
                        <input
                          defaultValue={informAddress.nameUser}
                          name="nameUser"
                          type="text"
                          placeholder="ชื่อ-นามสกุล"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("nameUser", {
                            required: "กรุณากรอกชื่อ",
                            maxLength: {
                              value: 50,
                              message: "ความยาวตัวอักษรไม่เกิน 50 ตัว",
                            },
                          })}
                        />

                        {errors.nameUser && (
                          <p className="text-xs text-red-500">
                            {errors.nameUser?.message}
                          </p>
                        )}
                      </div>
                      {/* ----------------------------- */}

                      <div className="w-full lg:w-1/2 ">
                        <label
                          htmlFor="firstName"
                          className="block mb-3 text-sm font-semibold text-gray-500"
                        >
                          เบอร์โทรศัพท์
                        </label>
                        <input
                          defaultValue={informAddress.tel}
                          name="tel"
                          type="text"
                          placeholder="xxxxxxxxxx"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("tel", {
                            required: "กรุณากรอกเบอร์โทรศัพท์",
                            minLength: {
                              value: 10,
                              message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 ตัว",
                            },
                          })}
                        />

                        {errors.tel && (
                          <p className="text-xs text-red-500">
                            {errors.tel?.message}
                          </p>
                        )}
                        {/* ----------------------------- */}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full">
                        <label
                          htmlFor="Email"
                          className="block mb-3 text-sm font-semibold text-gray-500"
                        >
                          อีเมล
                        </label>
                        <input
                          defaultValue={informAddress.email}
                          name="email"
                          type="text"
                          placeholder="อีเมล"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                    {/* ----------------------------- */}
                    <div className="mt-4">
                      <div className="w-full">
                        <label className="block mb-3 text-sm font-semibold text-gray-500">
                          ที่อยู่ในการจัดส่ง
                        </label>
                        <textarea
                          defaultValue={informAddress.address}
                          className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          name="address"
                          cols={20}
                          rows={4}
                          placeholder="xxx/xx ถนน xxx"
                          {...register("address", {
                            required: "กรุณากรอกที่อยู่ในการจัดส่ง",
                            maxLength: {
                              value: 100,
                              message: "ความยาวตัวอักษรไม่เกิน 100 ตัวอักษร",
                            },
                          })}
                        />
                        {errors.address && (
                          <p className="text-xs text-red-500">
                            {errors.address?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* ----------------------------- */}
                    <div className="space-x-0 lg:flex lg:space-x-4">
                      <div className="w-full lg:w-1/2">
                        <label className="block mb-3 text-sm font-semibold text-gray-500">
                          จังหวัด
                        </label>
                        <input
                          defaultValue={informAddress.province}
                          name="province"
                          type="text"
                          placeholder="จังหวัด"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("province", {
                            required: "กรุณากรอกจังหวัด",
                            maxLength: {
                              value: 50,
                              message: "ความยาวตัวอักษรไม่เกิน 50 ตัวอักษร",
                            },
                          })}
                        />
                        {errors.province && (
                          <p className="text-xs text-red-500">
                            {errors.province?.message}
                          </p>
                        )}
                      </div>
                      {/* ----------------------------- */}
                      <div className="w-full lg:w-1/2 ">
                        <label
                          htmlFor="postcode"
                          className="block mb-3 text-sm font-semibold text-gray-500"
                        >
                          รหัสไปรษณีย์
                        </label>
                        <input
                          defaultValue={informAddress.postcode}
                          name="postcode"
                          type="text"
                          placeholder="รหัสไปรษณีย์"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("postcode", {
                            required: "กรุณากรอกรหัสไปรษณีย์",
                            minLength: {
                              value: 5,
                              message: "ความยาวตัวอักษร 5 ตัวขึ้นไป",
                            },
                          })}
                        />
                        {errors.postcode && (
                          <p className="text-xs text-red-500">
                            {errors.postcode?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* ----------------------------- */}
                    <div className="space-x-0 lg:flex lg:space-x-4">
                      <div className="w-full lg:w-1/2">
                        <label className="block mb-3 text-sm font-semibold text-gray-500">
                          เขต/อำเภอ
                        </label>
                        <input
                          defaultValue={informAddress.district}
                          name="district"
                          type="text"
                          placeholder="เขต/อำเภอ"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("district", {
                            required: "กรุณากรอกเขต/อำเภอ",
                            maxLength: {
                              value: 50,
                              message: "ความยาวตัวอักษรไม่เกิน 50 ตัวอักษร",
                            },
                          })}
                        />
                        {errors.district && (
                          <p className="text-xs text-red-500">
                            {errors.district?.message}
                          </p>
                        )}
                      </div>
                      {/* ----------------------------- */}
                      <div className="w-full lg:w-1/2 ">
                        <label className="block mb-3 text-sm font-semibold text-gray-500">
                          แขวง/ตำบล
                        </label>
                        <input
                          defaultValue={informAddress.subDistrict}
                          name="subDistrict"
                          type="text"
                          placeholder=" แขวง/ตำบล"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("subDistrict", {
                            required: "กรุณากรอกแขวง/ตำบล",
                            maxLength: {
                              value: 50,
                              message: "ความยาวตัวอักษรไม่เกิน 50 ตัวอักษร",
                            },
                          })}
                        />
                        {errors.subDistrict && (
                          <p className="text-xs text-red-500">
                            {errors.subDistrict?.message}
                          </p>
                        )}
                      </div>
                    </div>
                      {/* ----------------------------- */}
                    <div className="relative pt-3 xl:pt-6">
                      <label
                        htmlFor="note"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        {" "}
                        ระบุหมายเหตุ (ถ้ามี)
                      </label>
                      <textarea
                        defaultValue={informAddress.note}
                        name="note"
                        className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                        rows={4}
                        placeholder="หมายเหตุ"
                        {...register("note")}
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-full px-6 py-2 text-white bg-yellow-600 hover:bg-yellow-900"
                      >
                        บันทึกที่อยู่
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  {/* -------------------------- */}

                  <div className="m-5">
                    <button
                      onClick={() => {
                        setEditInformAddress(true);
                      }}
                    >
                      <div className="text-xs text-right hover:text-yellow-500">
                        เเก้ไขที่อยู่
                      </div>
                    </button>
                    <div className="justify-center w-full p-8 mx-auto border shadow-sm border-b-gray-200">
                      {informAddress.nameUser +
                        " " +
                        informAddress.address +
                        " " +
                        informAddress.district +
                        " " +
                        informAddress.subDistrict +
                        " " +
                        informAddress.province +
                        " " +
                        informAddress.postcode +
                        " " +
                        informAddress.tel}
                    </div>
                  </div>
                  {/* -------------------------- */}
                  <h2 className="mb-4 font-bold md:text-xl text-heading ">
                    ช่องทางการชำระเงิน
                  </h2>
                  <div className="flow-root pt-2 pb-4 pl-8 pr-8 rounded shadow-md">
                    <div className="my-1 divide-y divide-gray-200">
                      <div className="flex py-1">
                        <div className="flex-shrink-0">
                          <img
                            src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                            className="object-cover w-16 h-16 rounded-lg"
                            alt=""
                            width="50"
                          />
                        </div>
                        <div className="flex-1 ml-5">
                          <div className="flex flex-wrap items-center justify-between w-full">
                            <div className="sm:pr-5 pr-9">
                              <p className="text-base font-bold text-gray-900 break-words">
                                ธนาคารกสิกรไทย
                              </p>
                              <p className="text-sm font-medium text-gray-500">
                                สาขา: xxxxxx
                              </p>
                              <div className="my-1 text-sm font-bold text-gray-500">
                                ชื่อบัญชี: xxxxxxx
                              </div>
                              <div className="mb-1 text-sm font-bold text-gray-800">
                                <div className="p-2 border-gray-700 rounded-lg bg-slate-100">
                                  หมายเลขบัญชี: 058183966
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ------------------------------------- */}
                  <h2 className="mt-4 font-bold md:text-xl text-heading ">
                    วิธีการจัดส่ง
                  </h2>
                  <div className="flow-root pt-2 pb-4 pl-8 pr-8 rounded shadow-md">
                    <div className="my-1 divide-y divide-gray-200">
                      <div className="flex py-1">
                        <div className="flex-shrink-0">
                          <img
                            src="https://stocklittle.com/wp-content/uploads/2017/09/KERRY-express-logo.jpg"
                            className="object-cover w-16 h-16 rounded-lg"
                            alt=""
                            width="50"
                          />
                        </div>
                        <div className="flex-1 ml-5">
                          <div className="flex flex-wrap items-center justify-between w-full">
                            <div className="sm:pr-5 pr-9">
                              <p className="text-base font-bold text-gray-900 break-words">
                                Kerry Express Thailand
                              </p>
                              <p className="text-sm font-medium text-gray-500">
                                บริการจัดส่งแบบมาตรฐาน: 1-2 วัน
                              </p>
                              {/* <div className="my-1 text-sm font-bold text-gray-500">
                                ชื่อบัญชี: บริษัท...
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* -----End ที่อยู่ในการจัดส่ง---------------------------- */}

            {/* start สรุปรายการสั่งซื้อ */}
            <div className="flex flex-col w-full ml-0 lg:ml-11 lg:w-2/5">
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 class="text-lg font-bold">
                  สรุปรายการสั่งซื้อทั้งหมด {products.length} รายการ
                </h2>
                <div className="flex-1 px-1 py-6 overflow-y-auto sm:px-6 h-72">
                  <div className="mt-2">
                    <div className="flow-root">
                      <div className="divide-y divide-gray-200">
                        {/* -------------Start loop--------------------- */}
                        {products.length > 0 ?
                        products.map((item, i) => (
                          <div key={i} className="flex py-6">
                            <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-gray-200 rounded-md">
                              <img
                                src={item.product.images[0].url}
                                alt="สินค้า"
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                            <div className="flex flex-col flex-1 ml-4">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <div class="mt-2 text-sm font-bold overflow-hidden truncate">
                                    {item.product.title} - {item.product.color}
                                  </div>
                                  {/* <p className="text-xs">฿{item.product.price}</p> */}
                                </div>
                                <div class="mt-1 text-xs text-gray-500 overflow-hidden truncate w-20">
                                  {item.product.description}
                                </div>
                                <div class="text-xs text-gray-500 overflow-hidden truncate w-20">
                                  {item.colorSelect}
                                </div>
                              </div>
                              <div className="flex items-end justify-between flex-1 mt-1 text-xs">
                                <p className="text-gray-500">
                                  ฿{item.product.price} x {item.count}
                                </p>
                              </div>
                              <div className="flex items-end justify-between flex-1 text-sm font-bold">
                                <p>฿{item.price * item.count}</p>
                              </div>
                            </div>
                          </div>
                        )): <div>ไม่พบข้อมูลรายการสั่งซื้อ</div>}

                        {/* -----------End loop----------------------- */}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                  <div className="flex justify-between text-base text-gray-900">
                    <p>ยอดรวมสินค้า</p>
                    <p className="">฿{totalPrice}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base text-gray-900 border-b-2">
                    <p>ค่าจัดส่ง</p>
                    <p>฿50</p>
                  </div>

                  <div className="flex justify-between my-3 text-base font-bold text-gray-900">
                    <p>ยอดที่ต้องชำระ</p>
                    <p className="">฿{totalPrice + 50}</p>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCreateOrder}
                      disabled={!save || !products.length}
                      className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700"
                    >
                      ดำเนินการสั่งซื้อ
                    </button>
                  </div>
                  <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                  </div>
                </div>
              </div>
            </div>
            {/* End สรุปรายการสั่งซื้อ */}
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Checkout;
