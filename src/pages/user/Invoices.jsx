import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutUser from "../../components/layouts/LayoutUser";
import { getInvoice } from "../../services/usersAPI";
import InvoiceDetail from "./InvoiceDetail";
import { useSelector } from "react-redux";

const Invoices = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const params = useParams();
const [invoice, setInvoice] = useState({})
const [products, setProducts] = useState([])
  useEffect(() => {
    LoadInvoice(user.token, params.id);
  }, []);

  const LoadInvoice = (token,id) => {
    getInvoice(token,id)
      .then((res) => {
        setInvoice(res.data);
        setProducts(res.data.products)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };


  return (
    <>
      <LayoutUser title="Invoice">
        <InvoiceDetail invoice={invoice} products={products}/>
        {/* {JSON.stringify(product)} */}
      </LayoutUser>
    </>
  );
};

export default Invoices;
