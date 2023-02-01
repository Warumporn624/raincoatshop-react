import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// import function
import { readCategory, editCategory } from "../../../services/categoryAPI";

import { ToastContainer, toast } from "react-toastify";

const UpdateCategory = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const params = useParams();

  // use react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");

  useEffect(() => {
    LoadCategory(user.token, params.id);
  }, []);

  const LoadCategory = (authtoken, id) => {
    readCategory(authtoken, id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCategorySubmit = (data) => {
    // console.log(data);
    // sent data to database
    editCategory(user.token, params.id, data)
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/admin/create-category");
        }, 800);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error update")
      });
  };

  return (
    <LayoutAdmin title="แก้ไขหมวดหมู่สินค้า">
      <ToastContainer />
      <main className="h-full overflow-y-auto shadow-md">
        <div className="container grid px-3 mx-auto">
          <div className="container grid px-3 mx-auto">
            เเก้ไขหมวดหมู่สินค้า
            <div>
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Profile
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
              </div>
              <div className="py-4 mt-5 md:col-span-2 md:mt-0">
                <form
                  action="updateCategory"
                  onSubmit={handleSubmit(updateCategorySubmit)}
                >
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">
                            เเก้ไขหมวดหมู่สินค้า
                          </label>
                          <div className="flex mt-1 rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                              หมวดหมู่
                            </span>
                            <input
                              autoFocus
                              type="text"
                              name="nameCategory"
                              defaultValue={name}
                              className="flex-1 block w-full border-gray-300 rounded-none rounded-r-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        บันทึกการเเก้ไข
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
    </LayoutAdmin>
  );
};

export default UpdateCategory;
