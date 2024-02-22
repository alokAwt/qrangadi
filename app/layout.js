import { Inter } from "next/font/google";
import "./globals.css";
import NextUIprovider from "../Components/NextUIprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QR ANGADI",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <NextUIprovider children={children} />
      </body>
    </html>
  );
}
