import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

// import function
import { createCategory, listCategory, deleteCategory } from "../../../services/categoryAPI";

import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const CreateCategory = () => {

  // เข้าถึง ข้อมูลใน state ที่เก็บไว้ใน store
  const { user } = useSelector((state) => ({ ...state }));

  const [category, setCategory] = useState([]);

  useEffect(() => {
    LoadCategory(user.token);
  }, []);

  const LoadCategory = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // use react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createCategorySubmit = (data) => {
    // console.log(data);
    // sent data to database
    createCategory(user.token, data)
      .then((res) => {
        // console.log(res.data);
        LoadCategory(user.token);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error update")
      });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: 'คุณต้องการลบหมวดหมู่สินค้า',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#50C878',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(user.token, id)
        .then((res) => {
          // console.log(res);
          LoadCategory(user.token);
        })
        .catch((err) => {
          console.log(err);
        });

        Swal.fire(
          'ลบหมวดหมู่สินค้าสำเร็จ',
          'Your category has been deleted.',
        )
      }
    })
  }

  return (
    <LayoutAdmin title="เพิ่มหมวดหมู่สินค้า">
      <ToastContainer />
      <main className="h-full overflow-y-auto shadow-md">
        <div className="container grid px-3 mx-auto">
          <div className="container grid px-3 mx-auto">
            Raincoat Aurora
            <div>
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                  </p>
                </div>
              </div>
              <div className="py-4 mt-5 md:col-span-2 md:mt-0">
                <form
                  action="createCategory"
                  onSubmit={handleSubmit(createCategorySubmit)}
                >
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">
                            เพี่มหมวดหมู่สินค้า
                          </label>
                          <div className="flex mt-1 rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                              หมวดหมู่
                            </span>
                            <input
                              type="text"
                              name="nameCategory"
                              className="flex-1 block w-full border-gray-300 rounded-none rounded-r-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="โปรดระบุหมวดหมู่"
                              {...register("nameCategory", {
                                required: "กรุณาระบุข้อมูล",
                              })}
                            />
                          </div>
                          {errors.nameCategory && (
                            <div class="rounded-lg">
                              <p className="text-xs text-red-600 break-words">
                                {errors.nameCategory?.message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm bg- hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        เพิ่ม
                      </button>
                    </div>
                    <div className="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------------------- */}
      <div className="mb-2 overflow-hidden shadow-lg rounded-t-8xl rounded-b-5xl">
        <div className="px-4 pt-3 pb-3 bg-white md:pb-1 md:px-16 bg-opacity-40">
          
        </div>
        <div className="px-4 pt-2 pb-12 overflow-hidden bg-white md:px-16">
          <div className="flex flex-wrap">
            <div className="w-full mb-6 md:w-2/3 md:mb-0">
              <p className="max-w-2xl mb-3 leading-loose text-darkBlueGray-400">
                หมวดหมู่สินค้าทั้งหมดที่มี
              </p>
              <div className="-mb-2">
                {/* ---------start loop card------------------- */}
                {category.length > 0 ?
                category.map((item)=>(
                  <div className="inline-flex w-full mb-2 md:w-auto md:mr-2">
                  <div className="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">              
                    <span className="px-3 font-medium text-green-500 font-heading">
                      {item.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      {/* edit */}
                      <NavLink to={`/admin/update-category/${item._id}`}>
                      <button
                        className="p-0.5 text-white duration-200 bg-black bg-opacity-25 rounded-lg hover:bg-yellow-400 hover:text-white"
                        type="button"
                        aria-label="Edit"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-5 h-5"
                          aria-hidden="true"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      </NavLink>

                      {/* delete */}
                      <button
                        className="p-0.5 text-white duration-200 bg-black bg-opacity-25 rounded-lg hover:bg-red-400 hover:text-white"
                        type="button"
                        aria-label="Delete"
                        onClick={()=>handleDeleteUser(item._id)}
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
                  </div>
                </div>
                )): <div>ไม่มีหมวดหมู่สินค้าที่พบ</div>}
                {/* ---------end loop card------------------- */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default CreateCategory;
