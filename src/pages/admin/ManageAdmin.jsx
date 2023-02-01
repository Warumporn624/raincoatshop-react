import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LayoutAdmin from "../../components/layouts/LayoutAdmin";
import Swal from "sweetalert2";
import dayjs from "dayjs";

// services api
import {
  changeEnabled,
  changeRole,
  deleteUser,
  listUser,
} from "../../services/usersAPI";

import TableUser, {
  SelectColumnFilter,
  StatusPill,
} from "../../components/TableUser";

const ManageAdmin = () => {
  // เข้าถึง ข้อมูลใน state ที่เก็บไว้ใน store
  const { user } = useSelector((state) => ({ ...state }));

  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getUserData(user.token);
  }, []);

  const getUserData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleChangeEnabled = (e, id) => {
    // console.log(e.target.checked, id)
    const value = {
      id: id,
      enabled: e.target.checked,
    };
    changeEnabled(user.token, value)
      .then((res) => {
        // console.log(res);
        getUserData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (e, id) => {
    const values = {
      id: id,
      role: e.target.value,
    };
    changeRole(user.token, values)
      .then((res) => {
        // console.log(res);
        getUserData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "คุณต้องการลบบัญชีผู้ใช้นี้",
      text: "เมื่อลบแล้วจะไม่สารถกู้คืนบัญชีนี้ได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการลบ",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.token, id)
          .then((res) => {
            // console.log(res);
            getUserData(user.token);
          })
          .catch((err) => {
            console.log(err);
          });

        Swal.fire("ลบ", "คุณได้ลบบัญชีผู้ใช้เรียบร้อยแล้ว");
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Created",
        accessor: (d) => {
          return dayjs(d.createdAt).format("YYYY-MM-DD h:mm A");
        },
      },
      {
        Header: "Updated",
        accessor: (d) => {
          return dayjs(d.updatedAt).format("YYYY-MM-DD h:mm A");
        },
      },
      {
        Header: "Seleted Role",
        Cell: (props) => {
          const { row } = props;

          return (
            <div className="flex flex-col space-y-2">
              <select
                onChange={(e) => handleChangeRole(e, row.original._id)}
                value={row.original.role}
                name="role"
                className={`${
                  row.original.role === "admin"
                    ? "border-0 cursor-pointer rounded-full drop-shadow-md bg-green-200 text-xs"
                    : "border-0 cursor-pointer rounded-full drop-shadow-md bg-yellow-200 text-xs"
                } bg-white w-30 duration-100 hover:bg-white focus:bg-white text-xs`}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          );
        },
      },
      {
        Header: "Enable Role",
        Cell: (props) => {
          const { row } = props;
          // console.log(row.original.enabled)

          return (
            <div className="relative flex items-center w-16 align-middle select-none">
              <div className="flex">
                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                  <input
                    onChange={(e) => handleChangeEnabled(e, row.original._id)}
                    type="checkbox"
                    className="sr-only peer"
                    checked={row.original.enabled}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          );
        },
      },

      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },
      {
        Header: "Action",
        Cell: (props) => {
          const { row } = props;

          return (
            <div className="flex items-center space-x-2">
              {/* delete */}
              <button
                onClick={() => handleDeleteUser(row.original._id)}
                className="p-0.5 text-white duration-200 bg-black bg-opacity-25 rounded-lg hover:bg-red-400 hover:text-white"
                type="button"
                aria-label="Delete"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <LayoutAdmin title="จัดการผู้ใช้งาน">
      <main className="h-full overflow-y-auto shadow-md">
        <div className="container grid px-6 mx-auto">
          <TableUser columns={columns} data={dataUser} />
        </div>
      </main>
    </LayoutAdmin>
  );
};

export default ManageAdmin;
