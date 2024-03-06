"use client";
import ProfileNav from "@/components/ProfileComponents/ProfileNav";
import Sidebar from "@/components/ProfileComponents/Sidebar";
import React, { useEffect } from "react";
import { UseStatevalue } from "@/Utility/Contextfiles/StateProvider";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [{token},dispatch]=UseStatevalue()
  const pathname = usePathname();
  const router = useRouter();

  const getToken = () => {
    let tokenn = localStorage.getItem("token");
    if (tokenn) {
    dispatch({ type: 'SET_TOKEN', tokenn })
    }  
  };
  useEffect(() => {
    getToken();
  }, [pathname]);




  useEffect(() => {
    const protectedRoutes = [
      "/Profile",
      "/Analytics",
      "/gamification",
      "/QRcodesolution",
    ];
  
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      if (token === null) {
        router.replace("/Login");
      }
    }
  }, [pathname, token]);
  
  // useEffect(() => {
  //   const protectedRoutes = [
  //     "/Profile",
  //     "/Analytics",
  //     "/gamification",
  //     "/QRcodesolution",
  //   ];
  //   if (
  //     protectedRoutes.includes(pathname)
     
  //   ) {
  //     if (token === null) {
  //       router.replace("/Login");
  //     }
  //   }
  // }, [pathname, token]);


  

  return (
    <main className="flex sticky top-0">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <ProfileNav />
        {children}
      </div>
    </main>
  );
};

export default Layout;
