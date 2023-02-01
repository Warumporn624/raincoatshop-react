import React from "react";
import dayjs from "dayjs";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import fontDev from "./THSarabunNew.ttf";

// Register font
Font.register({ family: "THSarabunNew", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "THSarabunNew",
    // textAlign: "center",
  },
  section: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
  },

  sectionAddress: {
    marginBottom: 20,
  },
});

const Invoice = ({ row }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        <Text>
            ที่อยู่ในการจัดส่ง{" "}
            {row.original.shippingAddress.nameUser +
              " " +
              row.original.shippingAddress.address +
              " " +
              row.original.shippingAddress.district +
              " " +
              row.original.shippingAddress.subDistrict +
              " " +
              row.original.shippingAddress.province +
              " " +
              row.original.shippingAddress.postcode +
              " " +
              row.original.shippingAddress.note}
          </Text>
          <Text>{"เบอร์โทรศัพท์: " + row.original.shippingAddress.tel}</Text>
          <Text style={styles.sectionAddress}>----------------------------------------</Text>
          <Text>
            {"วันที่สั่งซื้อ: " +
              dayjs(row.original.createdAt).format("YYYY-MM-DD")}
          </Text>
          <Text>{"เลขที่สั่งซื้อ: " + row.original.numberInvoice}</Text>
          
          <Table data={row.original.products}>
            <TableHeader textAlign={"center"}>
              <TableCell weighting={0.8} >ชื่อสินค้า</TableCell>
              <TableCell weighting={0.1}>จำนวน</TableCell>
              <TableCell weighting={0.1}>สี</TableCell>
              <TableCell weighting={0.1}>ราคา</TableCell>
            </TableHeader>
            <TableBody textAlign={"center"}>
              <DataTableCell weighting={0.8} getContent={(r) => r.product.title + " " + r.product.description}/>
              <DataTableCell weighting={0.1} getContent={(r) => r.count} />
              <DataTableCell weighting={0.1} getContent={(r) => r.product.color} />
              <DataTableCell weighting={0.1} getContent={(r) => r.product.price} />
            </TableBody>
          </Table>
          <Text>
            {"ราคารวมสุทธิ: " + row.original.orderPriceTotal + " บาท"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
