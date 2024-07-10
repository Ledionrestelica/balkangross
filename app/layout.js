import { Inter } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Balkangross AB",
  description: "Balkangross AB shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
