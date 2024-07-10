// utils/exportToCSV.js
import { Parser } from "json2csv";

export const exportToCSV = (cartItems) => {
  const fields = ["_id", "name", "price", "quantity", "articleNumber"];
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(cartItems);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "cart.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error(err);
  }
};
