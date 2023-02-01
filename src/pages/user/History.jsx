import React from "react";
import LayoutUser from "../../components/layouts/LayoutUser";
import { getOrders } from "../../services/usersAPI";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TableHistoryOrder, {
  SelectColumnFilter,
  StatusPill,
} from "../../components/TableHistoryOrder";
import { useMemo } from "react";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ชื่อสินค้า",
        accessor: (item) => {
          return (
            <div>
              {/* <NavLink to='/' className="mt-1 text-xs text-gray-500 underline"> */}
              <NavLink to={"/user/invoices/" + item._id}>
                หมายเลขใบสั่งซื้อ: {item.numberInvoice}
              </NavLink>
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
        Header: "รวมการสั่งซื้อ",
        accessor: (item) => {
          return (
            <div>
              <div className="mb-3 text-sm font-bold">
                ฿{item.orderPriceTotal}
              </div>
              <div>({item.cartNumberTotal} ชิ้น)</div>{" "}
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
        Header: "Tracking No.",
        Cell: (props) => {
          const { row } = props;
          return (
            <p className="p-3 my-2 text-xs font-bold text-center text-red-500 break-words border-gray-700 rounded-lg bg-slate-100">
              {row.original.tracking}
            </p>
          );
        },
      },
    ],
    []
  );

  return (
    <LayoutUser title="ประวัติการสั่งซื้อ">
      <div className="w-full pt-2 pb-4 pl-4 pr-4 bg-white">
        <div className="py-4 bg-white sm:py-16 lg:py-10">
          <div className="px-4 py-2 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              <p className="mb-8 text-2xl font-bold text-center text-gray-900">
                ประวัติการสั่งซื้อ
              </p>
              <TableHistoryOrder columns={columns} data={orders} />
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default History;
