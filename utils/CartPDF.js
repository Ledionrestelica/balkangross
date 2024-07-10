// components/CartPDF.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: { fontSize: 15 },
  itemPrice: { fontSize: 15 },
});

const CartPDF = ({ cartItems = [] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Order Request:</Text>
      {cartItems.map((item) => (
        <View style={styles.item} key={item._id}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>kr {item.price}</Text>
          <Text style={styles.itemPrice}>{item.quantity}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default CartPDF;
