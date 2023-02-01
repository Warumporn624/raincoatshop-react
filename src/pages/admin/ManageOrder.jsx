import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import LayoutAdmin from "../../components/layouts/LayoutAdmin";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { PDFDownloadLink } from "@react-pdf/renderer";

import Invoice from "../../components/order/Invoice";

import dayjs from "dayjs";
import TableManageOrder, {
  SelectColumnFilter,
  StatusPill,
} from "../../components/TableManageOrder";

import {
  changeOrderStatus,
  getOrdersAdmin,
  searchOrders,
  updateTrackingNumber,
} from "../../services/adminAPI";

const ManageOrder = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState([]);
  const [trackingNo, setTrackingNo] = useState({id:"", tracking:""});
  const [edit, setEdit] = useState({id:"", status:false})

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrdersAdmin(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log("search", search);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("submitsearch");

    searchOrders(user.token, { search: search })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!search) {
      loadData();
    }
  };

  const handleChangeStatus = (e, id) => {
    const values = {
      id: id,
      orderStatus: e.target.value,
    };
    changeOrderStatus(user.token, values)
      .then((res) => {
        loadData(user.token);
        toast.success("Update สถานะสำเร็จ");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeTracking = (e, id) => {
    setTrackingNo({...trackingNo, id:id ,tracking:e.target.value});
  };

  console.log("trackingNo", trackingNo);

  const handleTrackingSubmit = (e,id) => {
    e.preventDefault();

    const values = {
      id:id,
      tracking:trackingNo.tracking
    }
   
    console.log("submit", values);

    updateTrackingNumber(user.token, values)
      .then((res) => {
        loadData(user.token);
        toast.success("Update Tracking No. สำเร็จ");
      })
      .catch((err) => {
        console.log(err);
      });
      setTrackingNo({})
      setEdit({...edit, id:"", status:false})
  };

  const columns = useMemo(
    () => [
      {
        Header: "ชื่อสินค้า",
        accessor: (item) => {
          return (
            <div>
              <p className="mt-1 text-xs text-gray-500">
                {item.orderedBy.email}
              </p>
              <p className="mt-1 text-xs text-gray-500">{item.numberInvoice}</p>

              {item &&
              item.products.map((p, i) => (
                <div>
                  {/* ---------------------------------- */}

                  <div className="flex py-1">
                    <div className="flex-shrink-0">
                      <img
                        src={p.product.images[0].url}
                        className="object-cover w-16 h-16 rounded-lg"
                        alt=""
                        width="50"
                      />
                    </div>
                    <div className="flex-1 ml-5">
                      <div className="text-right"></div>
                      <div className="flex flex-wrap items-center justify-between w-full">
                        <div className="sm:pr-5 pr-9">
                          <p className="text-sm font-bold text-gray-900 break-words">
                            {p.product.title} - {p.product.color}
                          </p>
                          <p className="text-xs font-bold text-gray-900 break-words">
                            {p.colorSelect}
                          </p>
                          <div className="my-1 text-xs text-gray-500">
                            ฿{p.product.price}
                          </div>
                          <div className="mb-1 text-xs text-gray-500">
                            <div className="mt-1">x{p.count}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ---------------------------------- */}
                </div>
              ))}
              <p className="mt-1 text-xs text-gray-500">
                สั่งซื้อเมื่อ:{" "}
                {dayjs(item.createdAt).format("YYYY-MM-DD h:mm A")}
              </p>
            </div>
          );
        },
      },

      {
        Header: "สถานะ",
        accessor: "orderStatus",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },

      {
        Header: "เลือกสถานะการจัดส่ง",
        Cell: (props) => {
          const { row } = props;

          return (
            <div className="flex flex-col space-y-2">
              {row.original.orderStatus === "รอตรวจสอบการชำระเงิน" ||
              row.original.orderStatus === "ที่ต้องชำระ" ? (
                <select
                  name="orderStatus"
                  className="text-xs border-0 rounded-full cursor-pointer drop-shadow-md bg-grey-200"
                >
                  <option>รอตรวจสอบ</option>
                </select>
              ) : (
                <select
                  onChange={(e) => handleChangeStatus(e, row.original._id)}
                  value={row.original.orderStatus}
                  name="orderStatus"
                  className="text-xs duration-100 bg-white border-0 rounded-full cursor-pointer drop-shadow-md w-30 hover:bg-white focus:bg-white"
                >
                  <option value="ที่ต้องจัดส่ง">ที่ต้องจัดส่ง</option>
                  <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                  <option value="สำเร็จ">สำเร็จ</option>
                  <option value="ยกเลิกออเดอร์">ยกเลิกออเดอร์</option>
                </select>
              )}
            </div>
          );
        },
      },
      {
        Header: "ใบปะหน้า",
        Cell: (props) => {
          const { row } = props;
          return (
            <div>
              <PDFDownloadLink
                document={<Invoice row={row} />}
                fileName={`${row.original.numberInvoice}.pdf`}
              >
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Download ใบปะหน้า
                </button>
              </PDFDownloadLink>
            </div>
          );
        },
      },

      {
        Header: "Tracking No.",
        Cell: (props) => {
          const { row } = props;
          return (
            <>
             <button
                onClick={() => setEdit({...edit, id:row.original._id ,status:true})}
                className="px-1 text-xs font-medium tracking-wider text-blue-500 underline shadow-sm hover:text-blue-600"
              >
                แก้ไข
              </button>
            {
              edit.status && edit.id === row.original._id ? 
              <form onSubmit={(e)=>handleTrackingSubmit(e, row.original._id)}>
              <div>
              {row.original.tracking}
              </div>
              <input
                onChange={(e) => handleChangeTracking(e, row.original._id)}
                type="text"
                value={trackingNo.tracking}
                className="text-xs border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="px-1 py-1 my-2 text-xs font-medium tracking-wider text-blue-500 underline shadow-sm hover:text-blue-600"
              >
              บันทึก
              </button>
            </form>: <p className="p-3 my-2 text-xs font-bold text-center text-red-500 break-words border-gray-700 rounded-lg bg-slate-100">
                    {row.original.tracking}
                  </p>
            }
            
            </>
          );
        },
      },
    ],
    [open, trackingNo, edit]
  );

  return (
    <LayoutAdmin title="จัดการคำสั่งซื้อ">
      <main className="h-full overflow-y-auto shadow-md">
        <div className="container grid px-6 mx-auto">
          <form onSubmit={handleSearchSubmit}>
            <span className="text-xs text-gray-700">
              ค้นหาหมายเลขคำสั่งซื้อ:{" "}
            </span>
            <input
              onChange={handleChangeSearch}
              type="text"
              className="text-xs border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="px-3 py-1 m-2 text-xs font-medium tracking-wider text-white bg-yellow-600 shadow-sm hover:shadow-lg hover:bg-yellow-600"
            >
              ค้นหา
            </button>
          </form>

          <TableManageOrder columns={columns} data={orders} />
        </div>
      </main>
    </LayoutAdmin>
  );
};

export default ManageOrder;
