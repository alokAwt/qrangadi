"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextUIprovider from "../components/NextUIprovider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbarcomponets/Navbar";
import Footernav from "../components/Homecomponents/Footer";
import { Toaster } from "../components/ui/toaster";
import { useEffect } from "react";
import { StateProvider } from "@/Utility/Contextfiles/StateProvider";
import { initialState } from "@/Utility/Contextfiles/initialState";
import reducer from "@/Utility/Contextfiles/reducer";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
});

// export const metadata = {
//   title: "QR ANGADI",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Any code here will only run on the client
    const self = window.self;
    // You can use 'self' here
  }, []);

  return (
    <html lang="en" className={font.className}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <GoogleOAuthProvider clientId="756205924792-fne212j4eil3dj99ain2deme3o083opr.apps.googleusercontent.com">
          <body className="scrollbar-hide md:scrollbar-default sm:scrollbar-default lg:scrollbar-default">
            <AntdRegistry>
              <NextUIProvider>
                <main className="">
                  <div className="">
                    {pathname === "/Profile" ||
                    pathname.startsWith("/Analytics") ||
                    pathname === "/Profile/settings" ||
                    pathname === "/Profile/accountinfo" ||

                    pathname === "/Login" ? null : (
                      <Navbar />
                    )}
                    {children}
                    <Toaster />
                    {pathname === "/Profile" ||
                    pathname.startsWith("/Analytics") ||
                    pathname === "/Profile/settings" ||
                    pathname === "/Profile/accountinfo" ||
                    pathname === "/Login" ? null : (
                      <Footernav />
                    )}
                  </div>
                </main>
              </NextUIProvider>
            </AntdRegistry>
          </body>
        </GoogleOAuthProvider>
      </StateProvider>
    </html>
  );
}
