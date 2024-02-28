"use client";

import { Button, Input } from "@nextui-org/react";
import { Footer } from "flowbite-react";
import Whatsapp from "../../public/Footer/whatsapp.svg";
import FB from "../../public/Footer/fb.png";
import Insta from "../../public/Footer/insta.png";
import twit from "../../public/Footer/twit.png";
import tweet from "../../public/Footer/tweet.png";
import YT from "../../public/Footer/YT.png";
import LinkedIn from "../../public/Footer/linked.png";
import paparPlane from "../../public/Footer/paper-plane.png";
import Image from "next/image";
import Link from "next/link";

function Footernav() {
  return (
    <Footer className="bg-black text-white rounded-none mt-4 flex flex-col w-full md:px-0 ">
      <div className="flex flex-wrap-reverse w-full justify-between max-sm:px-3 md:px-20 py-10 max-sm:p-5">
        {/* others */}
        <div className="grid grid-cols-3 p-2 md:grid-cols-3 md:gap-24 gap-8 sm:grid-cols-3 sm:gap-6">
          <div>
            <Footer.Title title="Products" className="mb-2 text-white" />
            <Footer.LinkGroup
              col
              className="flex flex-col justify-center items-start text-xs  gap-4 text-white no-underline hover:no-underline"
            >
              <Footer.Link className="hover:no-underline" href="#">
                Static QR
              </Footer.Link>
              <Footer.Link href="#">Dyamic Qr</Footer.Link>
              <Footer.Link href="#">Scan Analytices</Footer.Link>
              <Footer.Link href="#">Multiple Types</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Services" className="mb-2 text-white" />
            <Footer.LinkGroup
              col
              className="flex flex-col justify-center text-xs items-start gap-4 text-white no-underline"
            >
              <Footer.Link href="#">QR Creation</Footer.Link>
              <Footer.Link href="#">Analytices</Footer.Link>
              <Footer.Link href="#">Game solutions</Footer.Link>
              <Footer.Link href="#">Product Reach out</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Resources" className="mb-2 text-white" />
            <Footer.LinkGroup
              col
              className="flex flex-col justify-center text-xs items-start gap-4 text-white no-underline"
            >
              <Footer.Link className="no-underline" href="#">
                News
              </Footer.Link>

              <Link href={"/blog"}>Blog</Link>

              <Footer.Link href="#">Videos</Footer.Link>
              <Footer.Link href="#">FAQ's</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        {/* subscribe */}
        <div className="flex flex-col justify-start items-start px-2 max-md:mt-5 max-w-[320px] mb-5">
          <div>
            <h6 className="text-2xl font-bold text-buttoncolor">
              Subscribe to Newsletter!
            </h6>
            <p className="text-[14px] py-2 font-normal text-white">
              Stay up to date on the latest features and releases by joining our
              newsletter.
            </p>
          </div>
          <div className="bg-[#5D5D5D] flex rounded-md w-full mt-3">
            <input
              type="email"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="border-none outline-none bg-transparent placeholder-[#909090] text-white focus:border-none focus:outline-none focus:shadow-transparent flex-1"
              placeholder="Enter Mail"
              style={{
                width: "calc(100% - 50px)",
              }}
            />

            <button className="rounded-md  bg-buttoncolor text-black h-full w-[50px] flex justify-center items-center">
              <Image src={paparPlane} height={15} width={15} />
            </button>
          </div>
          {/* <div className="flex justify-evenly items-center gap-2 mt-4 md:ml-auto ">
              <Image className="h-8 w-8" src={LinkedIn} />
              <Image src={Whatsapp} className="h-8 w-8" />
              <Image className="h-8 w-8" src={FB} />
              <Image className="h-8 w-8" src={Insta} />
              <Image src={twit} className="h-8 w-8" />
              <Image src={tweet} className="h-8 w-8" />
              <Image src={YT} className="h-8 w-8" />
            </div> */}
        </div>
      </div>

      <div className="w-full sm:flex sm:items-center sm:justify-between p-4 bg-[#f48020] ">
        <Footer.Copyright
          href="#"
          by="Mockup. All Rights Reserved.™"
          year={2024}
          className="text-black text-xs"
        />
        <div className="mt-4 flex text-xs gap-2 sm:mt-0 sm:justify-center  text-black">
          <Link href="/Privacypolicy">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/Termsandconditions">
            <p>Terms of Service</p>
          </Link>
        </div>
      </div>
    </Footer>
  );
}

export default Footernav;
