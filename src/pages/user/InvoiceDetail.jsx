import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import UploadImage from "../admin/product/UploadImage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

// import function
import { createPayment } from "../../services/usersAPI";

const InvoiceDetail = ({ invoice, products }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { numberInvoice, orderStatus } = invoice;

  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    paymentDate: "",
    amount: "",
    transactionFrom: "",
    transactionTo: "",
    images: [],
    idInvoice: params.id,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createPaymentSubmit = (e) => {
    // console.log("ส่ง", values);
    e.preventDefault();
    Swal.fire({
      text: "ยืนยันการแจ้งชำระเงิน",
      position: "top",
      confirmButtonColor: "#50C878",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      if (result.isConfirmed) {
        createPayment(user.token, values)
          .then((res) => {
            // console.log(res);
            toast.success("แจ้งชำระการโอนให้กับผู้ขายสำเร็จ");
            navigate("/user/history");
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data);
          });
      }
    });
  };

  return (
    <div>
      <div className="container p-5 mx-auto lg:px-24 ">
        <div className="flex flex-col w-full p-4 mx-auto border rounded-lg shadow-lg lg:p-10 border-b-gray-200 md:flex-row">
          <div className="flex flex-col md:w-full ">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              {orderStatus}
            </h2>
            {orderStatus === "ที่ต้องชำระ" ? (
              <form
                className="justify-center w-full mx-auto"
                onSubmit={createPaymentSubmit}
              >
                <UploadImage
                  values={values}
                  setValues={setValues}
                  loading={loading}
                  setLoading={setLoading}
                />

                <div>
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2">
                      {/* ----------------------------- */}
                      <label className="block mb-3 text-sm font-semibold text-gray-500"></label>
                      <select
                        required="required"
                        name="transactionTo"
                        type="text"
                        value={values.transactionTo}
                        onChange={handleChange}
                        placeholder="--โอนเงินเข้าบัญชี--"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      >
                        <option>--โอนเงินเข้าบัญชี--</option>
                        <option>ธนาคารกสิกรไทย</option>
                      </select>
                    </div>
                    {/* ----------------------------- */}

                    <div className="w-full lg:w-1/2 ">
                      <label className="block mb-3 text-sm font-semibold text-gray-500"></label>
                      <select
                        required="required"
                        name="transactionFrom"
                        type="text"
                        value={values.transactionFrom}
                        onChange={handleChange}
                        placeholder="--จากธนาคาร--"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      >
                        <option>--จากธนาคาร--</option>
                        <option>ธนาคารกสิกรไทย</option>
                      </select>

                      {/* ----------------------------- */}
                    </div>
                  </div>

                  {/* ----------------------------- */}
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2">
                      <label className="block mt-3 text-sm font-semibold text-gray-500">
                        จำนวนเงิน
                      </label>
                      <input
                        required="required"
                        name="amount"
                        type="number"
                        value={values.amount}
                        onChange={handleChange}
                        placeholder="จำนวนเงิน"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    {/* ----------------------------- */}
                    <div className="w-full lg:w-1/2 ">
                      <label className="block mt-3 text-sm font-semibold text-gray-500">
                        วัน-เวลาที่โอน
                      </label>
                      <input
                        required="required"
                        name="paymentDate"
                        type="datetime-local"
                        value={values.paymentDate}
                        onChange={handleChange}
                        placeholder="วัน-เวลาที่โอน"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    {/* ----------------------------- */}
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full px-6 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 "
                    >
                      แจ้งการโอนเงิน
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              ""
            )}

            {/* ------------------------------------------- */}
            <div className="flow-root pt-2 pb-4 pl-8 pr-8 mt-3 rounded shadow-lg">
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
                          สาขา: xxxxx
                        </p>
                        <div className="my-1 text-sm font-bold text-gray-500">
                          ชื่อบัญชี: xxxxx
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
          </div>

          {/* start สรุปรายการสั่งซื้อ */}
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/3">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 class="text-lg font-bold">
                หมายเลขคำสั่งซื้อ: {numberInvoice}
              </h2>
              <div className="flex-1 px-2 py-6 overflow-y-auto sm:px-6 h-72">
                <div className="mt-2">
                  <div className="flow-root">
                    <div className="divide-y divide-gray-200">
                      {/* -------------Start loop--------------------- */}
                      {products &&
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
                                <div class="mt-2 text-sm font-bold overflow-hidden truncate w-30">
                                  {item.product.title} - {item.product.color}
                                </div>
                                {/* <p className="text-xs">฿{item.product.price}</p> */}
                              </div>
                              <div class="mt-1 text-xs font-bold text-gray-500 overflow-hidden truncate w-20">
                                {item.product.description}
                              </div>
                            </div>
                            <div className="flex items-end justify-between flex-1 text-sm">
                              <p className="text-gray-500">
                                ฿{item.product.price} x {item.count}
                              </p>
                              <div className="flex font-bold">
                                <p>฿{item.price * item.count}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* -----------End loop----------------------- */}

                      {/* More products... */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between text-base text-gray-900">
                  <p>
                    {"ยอดรวมสินค้า (" + invoice["cartNumberTotal"] + ") ชิ้น:"}
                  </p>
                  <p className="font-bold">฿{invoice["cartPriceTotal"]}</p>
                </div>
                <div className="flex justify-between text-base text-gray-900 border-b-2">
                  <p>ค่าจัดส่ง</p>
                  <p>฿50</p>
                </div>
                <div className="flex justify-between p-3 my-3 text-base font-bold text-red-500 border-gray-700 rounded-lg bg-slate-100">
                  <p>ยอดที่ต้องชำระ</p>
                  <p className="">฿{invoice["orderPriceTotal"]}</p>
                </div>
              </div>
            </div>
          </div>
          {/* End สรุปรายการสั่งซื้อ */}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
