import { Inter } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { svSE } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Balkangross",
    default: "Balkangross",
  },
  description: "Balkangross AB shop",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={svSE}>
      <html lang="en">
        <body className={inter.className}>
          <GlobalProvider>{children}</GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
