"use client";
import React, { useContext } from "react";
import { DataContext } from "@/app/gamification/[type]/page";
import { BsInfoCircleFill } from "react-icons/bs";
import { Button, Select, SelectItem } from "@nextui-org/react";
import MobileScreen from "../MobileScreen/MobileScreen";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
// BsInfoCircleFill
function General() {
  const {
    params,
    couponName,
    setCouponName,
    couponTitle,
    setCouponTitle,
    couponSubtitle,
    setCouponSubtitle,
    campaignLanguage,
    setCampaignLanguage,
    timeZone,
    setTimeZone,
    domainName,
    setDomainName,
    poweredByName,
    setPoweredByName,
    poweredByWebsite,
    setPoweredByWebsite,
    appearsAs,
    setAppeasAs,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    couponLogo,
    setCouponLogo,
    couponImage,
    setCouponImage,
    title,
    setTitle,
    termsAndConditions,
    setTermsAndConditions,
    couponMainColor,
    setCouponMainColor,
    couponHFColor,
    setCouponHFColor,
    font,
    setFont,
    fontColor,
    setFontColor,
    buttonStyle,
    setButtonStyle,
    buttonColor,
    setButtonColor,
    buttonTextColor,
    setButtonTextColor,
    backgroundType,
    setBackgrountType,
    backgroundImage,
    setBackgroundImage,
  } = useContext(DataContext);
  let arr = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  let language = ["English", "Hindi", "Telugu", "Kannada"];
  const timezones = ["Asia/kolkata", "Asia/Hongkong"];
  const fontsList = ["Poppins", "Sans Serif", "Roboto"];
  const backgroundTypes = ["Image", "gif", "mp4"];
  const buttonStyles = ["Square", "rounded"];

  return (
    <div className="mt-5">
      <p>Enter the details and set up the general settings of your coupon.</p>
      <div className="min-h-[1px] bg-[#C8C8C8] my-3"></div>
      <div className="font-semibold text-lg mb-5">General Setting</div>
      {params.type==="slot-machine" && <div className="absolute w-[300px] right-[65px] top-[150px]">
        <MobileScreen />
      </div>}
      {/* coupon name */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="couponName" className="text-sm font-[600]">
            Coupon Name
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="Enter your Coupon Name"
            type="text"
            id="couponName"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      {/* coupon title */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="couponName" className="text-sm font-[600]">
            Coupon Title
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="flex gap-2">
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
            <input
              placeholder="Enter Coupon Title"
              type="text"
              id="couponTitle"
              value={couponTitle.title}
              onChange={(e) =>
                setCouponTitle((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
              className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
            />
          </div>
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center min-w-[42px] italic text-xl">
            <select
              onChange={(e) =>
                setCouponTitle((prev) => {
                  return { ...prev, pixel: e.target.value };
                })
              }
              value={couponTitle.pixel}
              className="border-0 focus:ring-0 rounded-md"
            >
              {arr.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item} px
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center min-w-[42px] font-semibold text-xl"
            onClick={() =>
              setCouponTitle((prev) => {
                return { ...prev, bold: !couponTitle.bold };
              })
            }
          >
            B
          </div>
          <div
            className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center min-w-[42px] italic text-xl"
            onClick={() =>
              setCouponTitle((prev) => {
                return { ...prev, italic: !couponTitle.italic };
              })
            }
          >
            I
          </div>
          <div className="min-w-fit">
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
              <input
                id="couponmainColorInput"
                placeholder={"Title color"}
                type="text"
                value={couponTitle.color}
                onChange={(e) => {}}
                className={`border-0 focus:ring-0 rounded-md placeholder:text-sm text-white font-semibold`}
                onFocus={() => {
                  let mainC = document.getElementById("coupontitleMain");
                  mainC.click();
                }}
              />
              <input
                id="coupontitleMain"
                style={{ display: "none" }}
                placeholder={couponTitle.color}
                type="color"
                value={couponTitle.color}
                onChange={(e) => {
                  const mainCI = document.getElementById(
                    "couponmainColorInput"
                  );
                  mainCI.style.backgroundColor = e.target.value;
                  mainCI.style.borderColor = e.target.value;
                  setCouponTitle((prev) => {
                    return {
                      ...prev,
                      color: e.target.value,
                    };
                  });
                }}
                className="border-0 focus:ring-0 rounded-md placeholder:text-sm"
              />
            </div>
          </div>{" "}
        </div>
      </div>
      {/* coupon subtitle */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="couponSubTitle" className="text-sm font-[600]">
            Coupon Subtitle
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="flex gap-2">
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
            <input
              placeholder="Enter Coupon Subtitle"
              type="text"
              id="couponSubTitle"
              value={couponSubtitle.title}
              onChange={(e) =>
                setCouponSubtitle((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
              className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
            />
          </div>
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center min-w-[42px] italic text-xl">
            <select
              onChange={(e) =>
                setCouponSubtitle((prev) => {
                  return { ...prev, pixel: e.target.value };
                })
              }
              value={couponSubtitle.pixel}
              className="border-0 focus:ring-0 rounded-md"
            >
              {arr.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item} px
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center min-w-[42px] font-semibold text-xl"
            onClick={() =>
              setCouponSubtitle((prev) => {
                return { ...prev, bold: !couponSubtitle.bold };
              })
            }
          >
            B
          </div>
          <div
            className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center min-w-[42px] italic text-xl"
            onClick={() =>
              setCouponSubtitle((prev) => {
                return { ...prev, italic: !couponSubtitle.italic };
              })
            }
          >
            I
          </div>
          <div className="min-w-fit">
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
              <input
                id="couponsubmainColorInput"
                placeholder={"Subtitle color"}
                type="text"
                value={couponSubtitle.color}
                onChange={(e) => {}}
                className={`border-0 focus:ring-0 rounded-md placeholder:text-sm text-white font-semibold`}
                onFocus={() => {
                  let mainC = document.getElementById("couponsubtitleMain");
                  mainC.click();
                }}
              />
              <input
                id="couponsubtitleMain"
                style={{ display: "none" }}
                type="color"
                value={couponSubtitle.color}
                onChange={(e) => {
                  const mainCI = document.getElementById(
                    "couponsubmainColorInput"
                  );
                  mainCI.style.backgroundColor = e.target.value;
                  mainCI.style.borderColor = e.target.value;
                  setCouponSubtitle((prev) => {
                    return {
                      ...prev,
                      color: e.target.value,
                    };
                  });
                }}
                className="border-0 focus:ring-0 rounded-md placeholder:text-sm"
              />
            </div>
          </div>{" "}
        </div>
      </div>
      {/* Campaign Language */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="campaignLanguage" className="text-sm font-[600]">
            Campaign Language
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="flex gap-2">
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center  text-normal">
            <select
              onChange={(e) => setCampaignLanguage(e.target.value)}
              value={campaignLanguage}
              className="border-0 focus:ring-0 rounded-md w-[330px]"
            >
              {language.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {/* domain name */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="domainName" className="text-sm font-[600]">
            Domain Name
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="Enter your Domain Name"
            type="text"
            id="domainName"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      {/* Time Zone */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="timeZone" className="text-sm font-[600]">
            Time Zone
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="flex gap-2">
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center  text-normal">
            <select
              onChange={(e) => setTimeZone(e.target.value)}
              value={timeZone}
              className="border-0 focus:ring-0 rounded-md w-[330px]"
            >
              {timezones.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="min-h-[1px] bg-[#C8C8C8] my-3"></div>
      <div className="font-semibold text-lg mb-5">Your Company</div>
      {/* powered by name */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="poweredBy" className="text-sm font-[600]">
            Powered By Name
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="QR Angadi"
            type="text"
            id="poweredBy"
            value={poweredByName}
            onChange={(e) => setPoweredByName(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      {/* powewed by website */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="poweredByWebsite" className="text-sm font-[600]">
            Powered By Website
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="www.qrangadi.com"
            type="text"
            id="poweredByWebsite"
            value={poweredByWebsite}
            onChange={(e) => setPoweredByWebsite(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      {/* appears as */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="appearsAs" className="text-sm font-[600]">
            Appears As
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="POWERED BY QR ANGADI"
            type="text"
            id="appearsAs"
            value={appearsAs}
            onChange={(e) => setAppeasAs(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      <div className="min-h-[1px] bg-[#C8C8C8] my-3"></div>
      <div className="font-semibold text-lg mb-5">Start & Expiration date</div>
      {/* start date */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="startTime" className="text-sm font-[600]">
            Starts On
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="Enter your Coupon Name"
            type="datetime-local"
            id="startTime"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>{" "}
      {/* End date */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="endTime" className="text-sm font-[600]">
            Ends On
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="Enter your Coupon Name"
            type="datetime-local"
            id="endTime"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      <div className="min-h-[1px] bg-[#C8C8C8] my-3"></div>
      <div className="font-semibold text-lg mb-5">Coupon Appearance</div>
      {/* upload logo */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label className="text-sm font-[600]">Logo</label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button className=" w-full bg-white border-1 border-buttoncolor text-buttoncolor font-medium rounded-sm">
            <label htmlFor="couponLogo">Upload</label>
            <input
              type="file"
              id="couponLogo"
              style={{ display: "none" }}
              onChange={(e) => {
                setCouponLogo("");
                if (e.target.files[0]) {
                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    setCouponLogo(reader.result);
                  });
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </Button>
          {couponLogo ? (
            <img
              className="w-40 h-32 object-contain"
              alt="upload image"
              src={couponLogo}
            />
          ) : null}
        </div>
      </div>
      {/* upload Image */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label className="text-sm font-[600]">Coupon Image</label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button className=" w-full bg-white border-1 border-buttoncolor text-buttoncolor font-medium rounded-sm">
            <label htmlFor="couponImage">Upload</label>
            <input
              type="file"
              id="couponImage"
              style={{ display: "none" }}
              onChange={(e) => {
                setCouponImage("");
                if (e.target.files[0]) {
                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    setCouponImage(reader.result);
                  });
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </Button>
          {couponImage ? (
            <img
              className="w-40 h-32 object-contain"
              alt="upload image"
              src={couponImage}
            />
          ) : null}
        </div>
      </div>
      {/* coupon main color, header footer color */}
      <div className="flex gap-4">
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label className="text-sm font-[600]">Coupon Main Color</label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
            <input
              id="mainColorInput"
              placeholder={"click here"}
              type="text"
              value={couponMainColor}
              onChange={(e) => {}}
              className={`border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px] text-white font-semibold`}
              onFocus={() => {
                let mainC = document.getElementById("maincolor");
                mainC.click();
              }}
            />
            <input
              id="maincolor"
              style={{ display: "none" }}
              placeholder={couponMainColor}
              type="color"
              value={couponMainColor}
              onChange={(e) => {
                const mainCI = document.getElementById("mainColorInput");
                mainCI.style.backgroundColor = e.target.value;
                mainCI.style.borderColor = e.target.value;
                setCouponMainColor(e.target.value);
                console.log(e.target.value);
              }}
              className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
            />
          </div>
        </div>{" "}
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label className="text-sm font-[600]">
              Coupon Header/Footer Color*
            </label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
            <input
              id="couponHF"
              placeholder={"click here"}
              type="text"
              value={couponHFColor}
              className={`border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px] text-white font-semibold`}
              onFocus={() => {
                let mainC = document.getElementById("hfcolor");
                mainC.click();
              }}
            />
            <input
              id="hfcolor"
              style={{ display: "none" }}
              placeholder={couponHFColor}
              type="color"
              value={couponHFColor}
              onChange={(e) => {
                const couponHF = document.getElementById("couponHF");
                couponHF.style.backgroundColor = e.target.value;
                couponHF.style.borderColor = e.target.value;
                setCouponHFColor(e.target.value);
              }}
              className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
            />
          </div>
        </div>{" "}
      </div>
      {/* Font and font color */}
      <div className="flex gap-4">
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label htmlFor="font" className="text-sm font-[600]">
              Font
            </label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="flex gap-2">
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center  text-normal">
              <select
                onChange={(e) => setFont(e.target.value)}
                value={font}
                className="border-0 focus:ring-0 rounded-md w-[330px]"
              >
                {fontsList.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label className="text-sm font-[600]">Font Color</label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
            <input
              id="fontColor"
              placeholder={"click here"}
              type="text"
              value={fontColor}
              className={`border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px] text-white font-semibold`}
              onFocus={() => {
                let mainC = document.getElementById("fontColorMain");
                mainC.click();
              }}
            />
            <input
              id="fontColorMain"
              style={{ display: "none" }}
              placeholder={fontColor}
              type="color"
              value={fontColor}
              onChange={(e) => {
                const fontcolor = document.getElementById("fontColor");
                fontcolor.style.backgroundColor = e.target.value;
                fontcolor.style.borderColor = e.target.value;
                setFontColor(e.target.value);
              }}
              className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
            />
          </div>
        </div>{" "}
      </div>
      {/* button styles button color, button text color */}
      <div className="flex gap-4">
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label htmlFor="buttonStyle" className="text-sm font-[600]">
              Button Style
            </label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="flex gap-2">
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center  text-normal">
              <select
                onChange={(e) => setButtonStyle(e.target.value)}
                value={buttonStyle}
                className="border-0 focus:ring-0 rounded-md w-[330px]"
              >
                {buttonStyles.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="w-[330px] max-w-[330px] mt-3 flex gap-4 ">
          <div className="flex-1 w-[40%]">
            <div className="flex items-center">
              <label className="text-sm font-[600]">Button Color</label>
              <span className="text-[#ED0000]">*</span>
              <BsInfoCircleFill className="text-[#1877f2] ms-2" />
            </div>
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
              <input
                id="btnColor"
                placeholder={"click here"}
                type="text"
                value={buttonColor}
                onChange={(e) => {}}
                className={`border-0 focus:ring-0 w-full rounded-md placeholder:text-sm text-white font-semibold`}
                onFocus={() => {
                  let elem = document.getElementById("mainBtnColor");
                  elem.click();
                }}
              />
              <input
                id="mainBtnColor"
                style={{ display: "none" }}
                placeholder={buttonColor}
                type="color"
                value={buttonColor}
                onChange={(e) => {
                  const mainCI = document.getElementById("btnColor");
                  mainCI.style.backgroundColor = e.target.value;
                  mainCI.style.borderColor = e.target.value;
                  setButtonColor(e.target.value);
                }}
                className="border-0 focus:ring-0 rounded-md placeholder:text-sm"
              />
            </div>
          </div>{" "}
          <div className="flex-1 w-[40%]">
            <div className="flex items-center">
              <label className="text-sm font-[600]">Button Text Color</label>
              <span className="text-[#ED0000]">*</span>
              <BsInfoCircleFill className="text-[#1877f2] ms-2" />
            </div>
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
              <input
                id="btnTextColor"
                placeholder={"click here"}
                type="text"
                value={buttonTextColor}
                className={`border-0 focus:ring-0 w-full  rounded-md placeholder:text-sm text-white font-semibold`}
                onFocus={() => {
                  let elem = document.getElementById("mainBtnTextColor");
                  elem.click();
                }}
              />
              <input
                id="mainBtnTextColor"
                style={{ display: "none" }}
                placeholder={buttonTextColor}
                type="color"
                value={buttonTextColor}
                onChange={(e) => {
                  const couponHF = document.getElementById("btnTextColor");
                  couponHF.style.backgroundColor = e.target.value;
                  couponHF.style.borderColor = e.target.value;
                  setButtonTextColor(e.target.value);
                }}
                className="border-0 focus:ring-0 rounded-md placeholder:text-sm"
              />
            </div>
          </div>{" "}
        </div>
      </div>
      {/* image type and upload background Image */}
      <div className="flex gap-4">
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label htmlFor="backgroundType" className="text-sm font-[600]">
              Background
            </label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="flex gap-2">
            <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md flex justify-center items-center  text-normal">
              <select
                onChange={(e) => setBackgrountType(e.target.value)}
                value={backgroundType}
                className="border-0 focus:ring-0 rounded-md w-[330px]"
              >
                {backgroundTypes.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="w-[330px] min-w-fit mt-3">
          <div className="flex items-center">
            <label className="text-sm font-[600]">
              Upload Background Image
            </label>
            <span className="text-[#ED0000]">*</span>
            <BsInfoCircleFill className="text-[#1877f2] ms-2" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button className=" w-full bg-white border-1 border-buttoncolor text-buttoncolor font-medium rounded-sm">
              <label htmlFor="backgroundImage">Upload</label>
              <input
                type="file"
                id="backgroundImage"
                style={{ display: "none" }}
                onChange={(e) => {
                  setBackgroundImage("");
                  if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                      setBackgroundImage(reader.result);
                    });
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </Button>
            {backgroundImage ? (
              <img
                className="w-40 h-32 object-contain"
                alt="upload image"
                src={backgroundImage}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="min-h-[1px] bg-[#C8C8C8] my-3"></div>
      <div className="font-semibold text-lg mb-5">Terms & Condition</div>
      {/* coupon name */}
      <div className="w-[330px] min-w-fit mt-3">
        <div className="flex items-center">
          <label htmlFor="title" className="text-sm font-[600]">
            Title
          </label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md">
          <input
            placeholder="Enter Title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 focus:ring-0 rounded-md placeholder:text-sm w-[330px]"
          />
        </div>
      </div>
      <div className=" min-w-fit mt-3 w-full">
        <div className="flex items-center">
          <label className="text-sm font-[600]">Content</label>
          <span className="text-[#ED0000]">*</span>
          <BsInfoCircleFill className="text-[#1877f2] ms-2" />
        </div>
        {/* <div className="border-1 border-[#C8C8C8] max-w-fit rounded-md"> */}
        <ReactQuill
          placeholder="Enter Terms and Conditions"
          type="text"
          modules={modules}
          formats={formats}
          bounds={".app"}
          id="title"
          value={termsAndConditions}
          onChange={setTermsAndConditions}
          className={`border-0 focus:ring-0 rounded-md placeholder:text-sm w-full editorContainer h-fit `}
        />
        {/* </div> */}
      </div>
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
let modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
let formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
export default General;
