import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import LayoutAdmin from "../../components/layouts/LayoutAdmin";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import TableCheckPayment, {
  SelectColumnFilter,
  StatusPill,
} from "../../components/TableCheckPayment";

import { changeOrderStatus, getPayment } from "../../services/adminAPI";

const CheckPayment = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [payments, setPayments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getPayment(user.token).then((res) => {
      setPayments(res.data);
    });
  };

  const handleChangeStatus = (e, id) => {
    const values = {
      id: id,
      orderStatus: e.target.value,
    };
    changeOrderStatus(user.token, values)
      .then((res) => {
        loadData(user.token);
        toast.success(
          "Update สถานะสำเร็จ ผู้ขายเตรียมของจัดส่ง ไปยังเมนูจัดการคำสั่งซื้อ"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "การชำระเงิน",
        accessor: (item) => {
          return (
            <div>
              <p className="mt-1 text-xs text-gray-500">
                จ่ายโดย: {item.PayBy.email}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                หมายเลขคำสั่งซื้อ: {item.order.numberInvoice}
              </p>
              <div>
                <div className="flex py-1">
                  <div className="flex-shrink-0">
                    <img
                      src={item.images[0].url}
                      className="object-cover w-16 h-16 rounded-lg"
                      alt=""
                      width="50"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right"></div>
              <div className="flex flex-wrap items-center justify-between w-full">
                <div className="sm:pr-5 pr-9">
                  <p className="text-xs font-bold text-gray-900 break-words">
                    โอนจากธนาคาร: {item.transactionFrom}
                  </p>
                  <p className="p-3 my-2 text-xs font-bold text-center text-red-500 break-words border-gray-700 rounded-lg bg-slate-100">
                    จำนวนเงินทีโอน  ฿{item.amount}
                  </p>
                  <div className="text-xs text-gray-500">
                    Payment Date: {dayjs(item.paymentDate).format("YYYY-MM-DD h:mm A")}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                สั่งซื้อเมื่อ:{" "}
                {dayjs(item.createdAt).format("YYYY-MM-DD h:mm A")}
              </p>
            </div>
          );
        },
      },
      {
        Header: "รูปภาพสลิป",
        accessor: (item) => {
          return (
            <>
              <Button type="link" onClick={showModal}>
                {item.order.numberInvoice}
              </Button>

              <Modal
                title="หลักฐานการชำระ"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.images[0].url}
                    className="object-cover w-auto h-auto rounded-lg"
                    alt=""
                    // width="50"
                  />
                </div>
                <p>
                  วันเวลาที่จ่าย:{" "}
                  {dayjs(item.paymentDate).format("YYYY-MM-DD h:mm A")}
                </p>
              </Modal>
            </>
          );
        },
      },

      {
        Header: "ที่ต้องชำระ",
        accessor: (item) => {
          return (
            <div>
              <div className="p-3 my-3 mb-3 text-sm font-bold text-red-500 border-gray-700 rounded-lg bg-slate-100">
                ฿{item.order.orderPriceTotal}
              </div>
            </div>
          );
        },
      },

      {
        Header: "สถานะ",
        accessor: "order.orderStatus",
        // Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },

      {
        Header: "สถานะการจัดส่ง",
        Cell: (props) => {
          const { row } = props;

          return (
            <div className="flex flex-col space-y-2">
              <select
                onChange={(e) => handleChangeStatus(e, row.original.order._id)}
                value={row.original.order.orderStatus}
                name="orderStatus"
                className={`${
                  row.original.order.orderStatus === "รอตรวจสอบการชำระเงิน"
                    ? "border-0 cursor-pointer rounded-full drop-shadow-md bg-green-200 text-xs"
                    : "border-0 cursor-pointer rounded-full drop-shadow-md bg-yellow-200 text-xs"
                } bg-white w-30 duration-100 hover:bg-white focus:bg-white text-xs`}
              >
                <option value="รอตรวจสอบการชำระเงิน">
                  รอตรวจสอบการชำระเงิน
                </option>
                <option value="ที่ต้องจัดส่ง">ที่ต้องจัดส่ง</option>
              </select>
            </div>
          );
        },
      },
    ],
    [isModalOpen]
  );

  return (
    <LayoutAdmin title="จัดการคำสั่งซื้อ">
      <main className="h-full overflow-y-auto shadow-md">
        <div className="container grid px-6 mx-auto">
          <TableCheckPayment columns={columns} data={payments} />
        </div>
      </main>
    </LayoutAdmin>
  );
};

export default CheckPayment;
