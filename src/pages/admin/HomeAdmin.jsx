import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LayoutAdmin from "../../components/layouts/LayoutAdmin";

// import function
import { listProduct, removeProduct } from "../../services/productAPI";

import { Spin } from "antd";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

import AdminProductCard from "../../components/cards/AdminProductCard";

const HomeAdmin = () => {
  // เข้าถึง ข้อมูลใน state ที่เก็บไว้ใน store
  const { user } = useSelector((state) => ({ ...state }));

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct(6);
  }, []);

  const loadProduct = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemoveProduct = (id) => {
    Swal.fire({
      title: "คุณต้องการลบสินค้า ?",
      text: "You won't be able to revert this!",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#50C878",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่! ต้องการลบ",
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(user.token, id)
          .then((res) => {
            toast.success("ลบสินค้าสำเร็จ");
            loadProduct(100);
          })
          .catch((err) => {
            toast.error("เกิดข้อผิดพลาด!");
            console.log(err);
          });
      }
    });
  };

  return (
    <LayoutAdmin title="Home Admin">
      <ToastContainer />
      <main className="h-full overflow-y-auto">
        {loading ? (
          <h1>
            Loading...
            <Spin />
          </h1>
        ) : (
          <p className="m-2"></p>
        )}

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-col w-full mb-10 text-center">
              <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
                สินค้า
              </h1>
              <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                สินค้าทั้งหมดของร้าน Raincoat Aurora
              </p>
            </div>
            <div className="flex flex-wrap -m-2">
              {product.length > 0 ?
              product.map((item) => (
                <div key={item._id} className="w-full p-2 lg:w-1/3 md:w-1/2">
                  <AdminProductCard
                    product={item}
                    handleRemoveProduct={handleRemoveProduct}
                  />
                </div>
              )): <div>ไม่มีสินค้าที่พบ</div>}
            </div>
          </div>
        </section>
      </main>
    </LayoutAdmin>
  );
};

export default HomeAdmin;
