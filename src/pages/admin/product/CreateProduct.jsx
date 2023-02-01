import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

// import function
import { createProduct, listColor } from "../../../services/productAPI";
import { listCategory } from "../../../services/categoryAPI";

import { ToastContainer, toast } from "react-toastify";

import UploadImage from "./UploadImage";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import { useRef } from "react";

let index = 0;

const initialstate = {
  sku: "",
  color: "",
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    LoadCategory(user.token);
    loadColor();
  }, []);

  const LoadCategory = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadColor = () => {
    listColor()
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createProductSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        toast.success("เพิ่มสินค้าสำเร็จ");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data);
      });
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleColorChange = (value) => {
    setValues({ ...values, color: value });
  };

  return (
    <LayoutAdmin title="เพิ่มสินค้า">
      <ToastContainer />
      <main className="h-full overflow-y-auto shadow-md">
        <div className="flex items-center justify-center px-4 py-5 bg-center bg-no-repeat bg-cover sm:px-6 lg:px-8 bg-gray-50">
          <div className="w-full max-w-3xl p-10 space-y-8 bg-white shadow-lg rounded-xl">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col ">
                <div className="flex flex-col items-center sm:flex-row">
                  <h2 className="mr-auto text-lg">เพิ่มสินค้า</h2>
                  <div className="w-full mt-1 sm:w-auto sm:ml-auto sm:mt-0" />
                </div>
                <div className="mt-1">
                  <form onSubmit={createProductSubmit}>
                    <UploadImage
                      values={values}
                      setValues={setValues}
                      loading={loading}
                      setLoading={setLoading}
                    />

                    <div className="flex-row w-full mt-3 text-xs md:flex md:space-x-4">
                      <div className="w-full mb-3 space-y-2 text-xs">
                        <label className="py-2 font-semibold text-gray-600">
                          SKU สินค้า
                        </label>
                        <input
                          required="required"
                          placeholder="SKU สินค้า"
                          className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                          type="text"
                          name="sku"
                          value={values.sku}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full mb-3 space-y-1 text-xs">
                        <div className="py-1 font-semibold text-gray-600">
                          สี
                        </div>

                        <Select
                          showSearch
                          onChange={handleColorChange}
                          style={{
                            width: 220,
                          }}
                          placeholder="สีสินค้า"
                          dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider
                                style={{
                                  margin: "4px 0",
                                }}
                              />
                              <Space
                                style={{
                                  padding: "0 8px 4px",
                                }}                               
                              >
                                <Input
                                  placeholder="ระบุสีเพิ่มเติม"
                                  ref={inputRef}
                                  value={name}
                                  onChange={onNameChange}
                                />
                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={addItem}
                                >
                                  เพิ่มสี
                                </Button>
                              </Space>
                            </>
                          )}
                          options={
                            items &&
                            items.map((item) => ({
                              label: item,
                              value: item,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex-row w-full mt-3 text-xs md:flex md:space-x-4">
                      <div className="w-full mb-3 space-y-2 text-xs">
                        <label className="py-2 font-semibold text-gray-600">
                          ชื่อสินค้า
                        </label>
                        <input
                          required="required"
                          placeholder="ชื่อสินค้า"
                          className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                          type="text"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full mb-3 space-y-2 text-xs">
                        <label className="py-2 font-semibold text-gray-600">
                          ราคา
                        </label>
                        <input
                          required="required"
                          placeholder="ราคา"
                          className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                          type="number"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex-row w-full text-xs md:flex md:space-x-4">
                      <div className="flex flex-col w-full mb-3">
                        <label className="py-2 font-semibold text-gray-600">
                          จำนวนสต็อกสินค้า
                        </label>
                        <input
                          required="required"
                          placeholder="จำนวนสต็อกสินค้า"
                          className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                          type="number"
                          name="quantity"
                          value={values.quantity}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col w-full mb-3">
                        <label className="py-2 font-semibold text-gray-600">
                          หมวดหมู่สินค้า
                        </label>

                        <select
                          className="block w-full h-10 px-4 border rounded-lg bg-grey-lighter text-grey-darker border-grey-lighter md:w-full "
                          required="required"
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                        >
                          <option>หมวดหมู่สินค้า...</option>
                          {values.categories.length > 0 &&
                            values.categories.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex-auto w-full mb-1 space-y-2 text-xs">
                      <label className="py-2 font-semibold text-gray-600">
                        รายละเอียดสินค้า
                      </label>
                      <textarea
                        required="required"
                        name="description"
                        className="min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                        placeholder="รายละเอียดสินค้า"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                      <button className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100">
                        {" "}
                        ยกเลิก{" "}
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-yellow-500 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-yellow-600"
                      >
                        บันทึก
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
};

export default CreateProduct;
