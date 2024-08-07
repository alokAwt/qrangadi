"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";

import Image from "next/image";
import { Tabs, Tab, Spinner } from "@nextui-org/react";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import Square from "../../public/QRgenerate/Dotoptions/Square.png";
import Dots from "../../public/QRgenerate/Dotoptions/Dots.png";
import Rounded from "../../public/QRgenerate/Dotoptions/Rounded.png";
import Extrarounded from "../../public/QRgenerate/Dotoptions/Extrarounded.png";
import Classy from "../../public/QRgenerate/Dotoptions/Classy.png";
import Classyrounded from "../../public/QRgenerate/Dotoptions/Classyrounded.png";
import Extraroundedcorner from "../../public/QRgenerate/Corners/Extrarounded.png";
import Squarecorner from "../../public/QRgenerate/Corners/Square.png";
import Dotscorner from "../../public/QRgenerate/Corners/Dot.png";
import Squarecorner1 from "../../public/QRgenerate/CornersDotoptions/Square.png";
import Dotscorner1 from "../../public/QRgenerate/CornersDotoptions/Dot.png";
import { MdInfo } from "react-icons/md";
import { Col, ColorPicker, Divider, Row, Space, theme } from "antd";
import { generate, green, presetPalettes, red, cyan } from "@ant-design/colors";
import Uploadimage from "../../public/QRgenerate/Upload.png";
import Nosample from "../../public/QRgenerate/Samplelogo/No sample.png";
import Apple from "../../public/QRgenerate/Samplelogo/Apple.png";
import Kiwi from "../../public/QRgenerate/Samplelogo/Kiwi.png";
import Heart from "../../public/QRgenerate/Samplelogo/Heart.png";
import Sunflower from "../../public/QRgenerate/Samplelogo/Sunflower.png";
// import QRCodeStyling from "qr-code-styling";
import { QrType } from "@/Utility/QrType/QrType";
import { CreateQr } from "@/Utility/CreateQr";
import { useToast } from "../../components/ui/usetoast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { UpdateProfileQrImages } from "@/Utility/QrType/UpdateQrImages";
import { UpdateProfileQr } from "@/Utility/QrType/UpdateQr";
import { Video } from "lucide-react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";

const isBrowser = typeof window !== "undefined";
let QRCodeStyling;

if (isBrowser) {
  QRCodeStyling = require("qr-code-styling");
}

const Extension = [
  { label: "png", value: "png" },
  { label: "jpeg", value: "jpeg" },
  { label: "webp", value: "webp" },
  { label: "svg", value: "svg" },
];

const EditQR = ({ id, type, profie, close }) => {
  const { toast } = useToast();
  const [selected, setSelected] = React.useState("STATIC");
  const [image, setImages] = useState("");
  const [logo, setLogo] = useState("");
  const [dotColorHex, setDotColorHex] = useState("#000");
  const [eyeColorHex, setEyeColorHex] = useState("#000");
  const [cornersColorHex, setCornersColorHex] = useState("#000");
  const [backgroundColorHex, setBackgroundColorHex] = useState("#fff");
  const [formatHex, setFormatHex] = useState("hex");
  const [selectedOptions, setSelectedOptions] = useState([]); //dotoptins value
  const [cornersSquareOption, setCornersSquareOption] = useState([]); //cornersquareoptions
  const [cornersDotOption, setCornersDotOption] = useState([]); //cornerdotoptions
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [qrType, setQrType] = useState("");
  const [Url, setUrl] = useState("");
  const [qrName, setQrName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // DYNAMIC UPDATE STATE MAP/Video/AUDIO  ----------------------------------------------
  const [QRimage, SetQRimage] = useState("");
  const [QrData, setQrData] = useState("");
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [textFile, setTextFile] = useState(null);

  const onChangeQRimage = (e) => {
    setQRimageMemoized(e.target.files[0]);
    setQrData(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideo({
          file,
          url: reader.result,
        });
      };
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const Audioreader = new FileReader();
      Audioreader.readAsDataURL(file);
      Audioreader.onloadend = () => {
        setAudio({
          name: file.name,
          url: Audioreader.result,
        });
      };
    }
  };

  const handlePdfFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPdfFile(selectedFile);
  };

  const handleTextChange = (e) => {
    setTextFile(e.target.files[0]);
  };

  //--------------------------------------------------------------------------------------------------

  console.log("type", type);
  const [options, setOptions] = useState({
    width: 300,
    height: 300,
    type: "png",
    data: "https://angadiworldtech.com/",
    image: Apple,
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#222222",
      type: "rounded",
    },
    backgroundOptions: {
      color: "#5FD4F3",
    },
    cornersSquareOptions: {
      color: "#222222",
      type: "extra-rounded",
    },
    cornersDotOptions: { type: "Square", color: "#000000" },
  });

  const [fileExt, setFileExt] = useState("");
  const [qrCode] = useState(new QRCodeStyling(options));
  const ref = useRef(null);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([option]);
    }
  };

  // squareoptions
  const handleSquareOptionSelect = (option) => {
    if (cornersSquareOption.includes(option)) {
      setCornersSquareOption(
        cornersSquareOption.filter((item) => item !== option)
      );
    } else {
      setCornersSquareOption([option]);
    }
  };

  const handleDotOptionSelect = (option) => {
    if (cornersDotOption.includes(option)) {
      setCornersDotOption(cornersDotOption.filter((item) => item !== option));
    } else {
      setCornersDotOption([option]);
    }
  };

  const selectedOptionsString = useMemo(
    () => selectedOptions.join(", "),
    [selectedOptions]
  );

  const dotHexString = useMemo(
    () =>
      typeof dotColorHex === "string"
        ? dotColorHex
        : dotColorHex?.toHexString(),
    [dotColorHex]
  );

  const eyeHexString = useMemo(
    () =>
      typeof eyeColorHex === "string"
        ? eyeColorHex
        : eyeColorHex?.toHexString(),
    [eyeColorHex]
  );

  const cornersHexString = useMemo(
    () =>
      typeof cornersColorHex === "string"
        ? cornersColorHex
        : cornersColorHex?.toHexString(),
    [cornersColorHex]
  );

  const backgroundHexString = useMemo(
    () =>
      typeof backgroundColorHex === "string"
        ? backgroundColorHex
        : backgroundColorHex?.toHexString(),
    [backgroundColorHex]
  );

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    setOptions((options) => ({
      ...options,
      data: `${lat} ${lon}`,
      image: logo,
      backgroundOptions: {
        ...options.backgroundOptions,
        color: backgroundHexString,
      },
      dotsOptions: {
        ...options.dotsOptions,
        color: dotHexString,
        type: selectedOptionsString,
      },
      cornersDotOptions: {
        ...options.cornersDotOptions,
        color: cornersHexString,
        type: cornersDotOption.join(", "),
      },
      cornersSquareOptions: {
        ...options.cornersSquareOptions,
        color: eyeHexString,
        type:
          cornersSquareOption.join(", ") || options.cornersSquareOptions.type,
      },
    }));
  }, [
    backgroundHexString,
    dotHexString,
    selectedOptions,
    cornersHexString,
    cornersDotOption,
    eyeHexString,
    cornersSquareOption,
    logo,
    lat,
    lon,
  ]);

  const onDataChange = (event) => {
    setUrl(event.target.value);
    setOptions((options) => ({
      ...options,
      data: event.target.value,
    }));
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };

  const setLogoMemoized = useMemo(() => {
    return (file) => {
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setLogo(reader.result);
        });
        reader.readAsDataURL(file);
      }
    };
  }, []);

  const onChangePicture = (e) => {
    setImages(e.target.files[0]);
    setLogoMemoized(e.target.files[0]); // Use the memoized function to set the logo
  };

  const UpdateQrProfileImages = async () => {
    console.log("alok", image);
    setLoading(true);
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "vsqmoxq9");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxlmwq61j/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const file = await res.json();
      setLoading(false);
      if (file.secure_url.length > 10) {
        setLoading(true);
        UpdateProfileQrImages(
          type,
          id,
          backgroundHexString,
          dotHexString,
          selectedOptions,
          cornersHexString,
          cornersDotOption,
          eyeHexString,
          cornersSquareOption,
          setLoading,
          toast,
          profie,
          close,
          file.secure_url
        );
        setImages("");
      }
    } else {
      UpdateProfileQrImages(
        type,
        id,
        backgroundHexString,
        dotHexString,
        selectedOptions,
        cornersHexString,
        cornersDotOption,
        eyeHexString,
        cornersSquareOption,
        setLoading,
        toast,
        profie,
        close,
        ""
      );
    }
  };

  const UpdateQrdata = () => {
    setLoading(true);
    UpdateProfileQr(
      type,
      id,
      qrName,
      Url,
      lat,
      lon,
      setLoading,
      toast,
      profie,
      close
    );
  };

  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map(([label, colors]) => ({
      label,
      colors,
    }));

  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    cyan,
  });

  const customPanelRender = (_, { components: { Picker, Presets } }) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider
        type="vertical"
        style={{
          height: "auto",
        }}
      />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <div className="flex flex-col  justify-center items-center mt-2 w-full gap-2">
      <div className="mt-2 md:w-96 mx-auto">
        <Tabs
          variant="bordered"
          fullWidth
          size="lg"
          aria-label="Tabs form"
          classNames={{
            tabList: " w-full  p-0 border-2 border-buttoncolor rounded-md",
            cursor: "w-full bg-buttoncolor rounded-sm ",
            tab: "  text-white h-8 ",
            tabContent: "group-data-[selected=true]:text-white w-full text-buttoncolor",
          }}
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="STATIC" title="QR IMAGE" className="w-full"></Tab>
          <Tab key="DYNAMIC" title="QR DATA"></Tab>
        </Tabs>
      </div>
      {selected === "STATIC" && (
        <div className="flex flex-row  justify-center items-center  w-full gap-8">
          <div className="flex flex-col justify-center items-start  gap-2 border-1 rounded-sm border-buttoncolor border-opacity-50 p-2 md:w-3/4 w-full overflow-hidden">
            <h6 className="text-sm font-medium">Customize your QR Code</h6>
            <div className="w-full mx-auto md:mb-4">
              <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList:
                    "md:gap-6 w-full relative rounded-none p-0 font-medium ",
                  cursor: "w-full bg-buttoncolor font-medium",
                  tab: "w-full  h-12",
                  tabContent: "group-data-[selected=true]:text-buttoncolor ",
                }}
              >
                <Tab
                  key="Pattern"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Pattern</span>
                    </div>
                  }
                >
                  {/* dot options */}
                  <Card className="rounded-sm shadow-none">
                    <CardBody>
                      <div className="grid grid-cols-3 place-content-evenly gap-4 mt-4 place-items-start">
                        {/* Mapping through options */}
                        {[
                          { label: "square", imageSrc: Square },
                          { label: "dots", imageSrc: Dots },
                          { label: "rounded", imageSrc: Rounded },
                          { label: "extra-rounded", imageSrc: Extrarounded },
                          { label: "classy", imageSrc: Classy },
                          { label: "classy-rounded", imageSrc: Classyrounded },
                        ].map((option) => (
                          <div
                            key={option.label}
                            className="flex flex-col items-center gap-2 w-full"
                          >
                            {/* Button with image */}
                            <Button
                              className={`flex justify-center items-center gap-2 flex-col h-auto w-auto bg-slate-100 rounded-md p-2 cursor-pointer ${
                                selectedOptions.includes(option.label)
                                  ? "bg-buttonopacitycolor ring-1 ring-buttoncolor"
                                  : ""
                              }`}
                              onClick={() => handleOptionSelect(option.label)}
                            >
                              <Image
                                className="md:h-20 md:w-20"
                                src={option.imageSrc}
                              />
                            </Button>
                            <p className="md:text-xs text-[0.55rem] font-medium">
                              {option.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab
                  key="Eyes"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Eyes</span>
                    </div>
                  }
                >
                  <Card className="rounded-sm shadow-none ">
                    <CardBody>
                      <div className="flex flex-col justify-start items-center md:items-start mt-2 gap-3">
                        {/* Square Options */}
                        <div className="flex-col justify-start items-start gap-4">
                          <span className="text-xs font-medium">
                            Square Options
                          </span>
                          <div className="grid grid-cols-3 place-content-evenly gap-12 mt-4 place-items-start">
                            {/* Mapping through square options */}
                            {[
                              { label: "square", imageSrc: Squarecorner },
                              { label: "dot", imageSrc: Dotscorner },
                              {
                                label: "extra-rounded",
                                imageSrc: Extraroundedcorner,
                              },
                            ].map((option) => (
                              <div
                                key={option.label}
                                className="flex justify-center flex-col items-center gap-2 w-full"
                              >
                                {/* Button with image */}
                                <Button
                                  className={`flex justify-center items-center gap-2 h-auto w-auto flex-col bg-slate-100 rounded-md p-2 cursor-pointer ${
                                    cornersSquareOption.includes(option.label)
                                      ? "bg-buttonopacitycolor ring-1 ring-buttoncolor"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleSquareOptionSelect(option.label)
                                  }
                                >
                                  <Image
                                    className="md:h-20 md:w-20"
                                    src={option.imageSrc}
                                  />
                                </Button>
                                <p className="md:text-xs text-[0.55rem] font-medium">
                                  {option.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dot Options */}
                        <div className="flex-col justify-start items-start gap-4">
                          <span className="text-xs font-medium">
                            Dot Options
                          </span>
                          <div className="grid grid-cols-3 place-content-evenly gap-12 mt-4 place-items-start">
                            {/* Mapping through dot options */}
                            {[
                              { label: "square", imageSrc: Squarecorner1 },
                              { label: "dot", imageSrc: Dotscorner1 },
                            ].map((option) => (
                              <div
                                key={option.label}
                                className="flex justify-center flex-col items-center gap-2 w-full"
                              >
                                {/* Button with image */}
                                <Button
                                  className={`flex h-auto w-auto justify-center items-center gap-2 flex-col bg-slate-100 rounded-md p-2 cursor-pointer ${
                                    cornersDotOption.includes(option.label)
                                      ? "bg-buttonopacitycolor ring-1 ring-buttoncolor"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleDotOptionSelect(option.label)
                                  }
                                >
                                  <Image
                                    className="md:h-20 md:w-20"
                                    src={option.imageSrc}
                                  />
                                </Button>
                                <p className="md:text-xs text-[0.55rem] font-medium">
                                  {option.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab
                  key="Colors"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Colors</span>
                    </div>
                  }
                >
                  <Card className="rounded-sm shadow-none ">
                    <CardBody>
                      <div className="flex flex-col justify-start items-start gap-4 w-full mx-auto">
                        <div className="flex flex-col justify-between items-start w-full gap-4">
                          <h6 className="text-xs font-medium">Dot Options</h6>

                          <div className=" bg-slate-100 w-full p-1 rounded-md border-1 border-gray-300 flex items-center gap-2">
                            <ColorPicker
                              defaultValue={token.colorPrimary}
                              format={formatHex}
                              value={dotColorHex}
                              onChange={setDotColorHex}
                              onFormatChange={setFormatHex}
                              styles={{
                                popupOverlayInner: {
                                  width: 300,
                                },
                              }}
                              presets={presets}
                              panelRender={customPanelRender}
                            />
                            <p className="text-sm font-medium">
                              {dotHexString}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-start w-full gap-4">
                          <h6 className="text-xs font-medium">Eye Options</h6>
                          <div className=" bg-slate-100 w-full p-1 rounded-md border-1 border-gray-300 flex items-center gap-2">
                            <ColorPicker
                              defaultValue={token.colorPrimary}
                              format={formatHex}
                              value={eyeColorHex}
                              onChange={setEyeColorHex}
                              onFormatChange={setFormatHex}
                              styles={{
                                popupOverlayInner: {
                                  width: 300,
                                },
                              }}
                              presets={presets}
                              panelRender={customPanelRender}
                            />
                            <p className="text-sm font-medium">
                              {eyeHexString}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                          <h6 className="text-xs font-medium">
                            Corners Options
                          </h6>
                          <div className=" bg-slate-100 w-full p-1 rounded-md border-1 border-gray-300 flex items-center gap-2">
                            <ColorPicker
                              defaultValue={token.colorPrimary}
                              format={formatHex}
                              value={cornersColorHex}
                              onChange={setCornersColorHex}
                              onFormatChange={setFormatHex}
                              styles={{
                                popupOverlayInner: {
                                  width: 300,
                                },
                              }}
                              presets={presets}
                              panelRender={customPanelRender}
                            />
                            <p className="text-sm font-medium">
                              {cornersHexString}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                          <h6 className="text-xs font-medium">Background</h6>
                          <div className=" bg-slate-100 w-full p-1 rounded-md border-1 border-gray-300 flex items-center gap-2">
                            <ColorPicker
                              defaultValue={token.colorPrimary}
                              format={formatHex}
                              value={backgroundColorHex}
                              onChange={setBackgroundColorHex}
                              onFormatChange={setFormatHex}
                              styles={{
                                popupOverlayInner: {
                                  width: 300,
                                },
                              }}
                              presets={presets}
                              panelRender={customPanelRender}
                            />
                            <p className="text-sm font-medium">
                              {backgroundHexString}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab
                  key="Logo"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Logo</span>
                    </div>
                  }
                >
                  <Card className="rounded-sm shadow-none p-0">
                    <CardBody>
                      <div className="flex flex-col justify-start items-start mt-2 gap-4">
                        <div className="flex-col justify-start items-start gap-4">
                          <span className="text-sm font-bold">
                            Sample Logos
                          </span>
                          <div className="grid md:grid-cols-5 grid-cols-3 place-content-evenly	md:gap-12 gap-2 mt-4 place-items-start	">
                            <div className="flex justify-center flex-col items-center gap-2">
                              <Button className="flex justify-center items-center gap-2 h-auto w-auto flex-col bg-slate-100 rounded-md p-2  cursor-pointer">
                                <Image
                                  className="md:h-20 md:w-20 h-8 w-8 object-contain"
                                  src={Nosample}
                                />
                              </Button>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-2">
                              <Button className="flex h-auto w-auto justify-center items-center gap-2 flex-col bg-slate-100 rounded-md p-2 cursor-pointer">
                                <Image
                                  className="md:h-20 md:w-20 h-8 w-8"
                                  src={Apple}
                                />
                              </Button>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-2">
                              <Button className="flex md:h-24 md:w-24  h-12 w-10 justify-center items-center gap-2 flex-col bg-slate-100 rounded-md p-2 cursor-pointer">
                                <Image
                                  className="md:h-14 md:w-14 h-6 w-6"
                                  src={Sunflower}
                                />
                              </Button>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-2">
                              <Button className="flex h-auto w-auto justify-center items-center gap-2 flex-col bg-slate-100 rounded-md p-2 cursor-pointer">
                                <Image
                                  className="md:h-20 md:w-20 h-8 w-8"
                                  src={Kiwi}
                                />
                              </Button>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-2">
                              <Button className="flex md:h-24 md:w-24 h-12 w-10 justify-center items-center gap-2 flex-col bg-slate-100 rounded-md p-2 cursor-pointer">
                                <Image
                                  className="md:h-14 md:w-14 w-6 h-6"
                                  src={Heart}
                                />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex-col justify-start items-start gap-4 mt-2 w-full">
                          <span className="md:text-sm text-xs font-bold flex flex-row items-center gap-4">
                            Upload Your Logo{" "}
                            <span className="flex flex-row items-center gap-1 md:text-xs text-[0.55rem] font-normal">
                              <MdInfo className="text-blue-500 inline-block" />
                              Supported formats - .png, .jpeg, .pdf
                            </span>
                          </span>

                          <div className="flex md:flex-row flex-col w-full items-center gap-4 mt-4 border-1 border-buttoncolor border-opacity-50 rounded-sm px-4 py-2">
                            <div>
                              {logo ? (
                                <img
                                  className="w-40 h-32 object-contain"
                                  alt="upload image"
                                  src={logo}
                                />
                              ) : (
                                <Image
                                  className="w-40 h-32 object-contain"
                                  alt="upload image"
                                  src={Uploadimage}
                                />
                              )}
                            </div>
                            <div className="flex flex-col justify-center items-center gap-4">
                              <Button className="md:w-60 w-full bg-buttoncolor text-white font-medium rounded-sm">
                                <label htmlFor="fileInput">Upload</label>
                                <input
                                  type="file"
                                  id="fileInput"
                                  style={{ display: "none" }}
                                  onChange={(e) => onChangePicture(e)}
                                />
                              </Button>
                              <Button
                                onPress={() => (setLogo(""), setImages(""))}
                                variant="light"
                                className="md:w-60 w-full ring-2 ring-buttoncolor rounded-sm text-buttoncolor font-medium"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>

          {/* qrpreview */}
          <div className="flex flex-col justify-start items-center gap-2 md:w-2/5 w-full md:p-0 p-2">
            <div className="shadow-lg md:w-96 md:h-96 flex justify-center items-center p-2 border-1 border-gray-300 rounded-sm">
              <div ref={ref} />
            </div>
            <p className="text-xs  items-center flex gap-1">
              <span>
                <MdInfo className="inline-block text-lg text-blue-700" />
              </span>
              This is your Preview.
            </p>

            <Button
              className="w-full rounded-md bg-buttoncolor text-white"
              onClick={UpdateQrProfileImages}
            >
              {loading ? <Spinner></Spinner> : " Update "}
            </Button>
          </div>
        </div>
      )}

      {selected === "DYNAMIC" && (
        <div className="flex flex-col justify-start items-start gap-2 p-4 w-full rounded-sm border-1 border-buttoncolor border-opacity-50 mt-4">
          <h6 className="text-sm font-bold">Enter QR details</h6>
          <div className="mb-1 mt-2 w-full">
            <label
              htmlFor="Enter your QR Name *"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter your QR Name <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              onChange={(e) => setQrName(e.target.value)}
              value={qrName}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 "
              placeholder="Enter QR Name"
              required
            />
          </div>
          {type === "GoogleMap" ? (
            <div className="mb-4 w-full ">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter Latitute And Longitude of Location
                <span className="text-red-500">*</span>{" "}
                <span className="text-xs text-gray-500">
                  (eg: 10.2022,20.400)
                </span>
              </label>
              <div>
                <input
                  onChange={(e) => setLat(e.target.value)}
                  value={lat}
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 d "
                  placeholder="Enter Latitude of Location"
                  required
                />
                <input
                  onChange={(e) => setLon(e.target.value)}
                  value={lon}
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 d mt-2"
                  placeholder="Enter Lonitude of Location"
                  required
                />
              </div>
            </div>
          ) : type === "Website" ? (
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter URL of webpage <span className="text-red-500">*</span>{" "}
                <span className="text-xs text-gray-500">
                  (eg: https://www.designdaddie.com/)
                </span>
              </label>
              <input
                onChange={(e) => onDataChange(e)}
                value={Url}
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 d "
                placeholder="Enter webpage URL"
                required
              />
            </div>
          ) : type === "playstore" ? (
            <>
              <div className="mb-4 w-full">
                <label
                  htmlFor="Android"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter URL for Android <span className="text-red-500">*</span>{" "}
                  <span className="text-xs text-gray-500">
                    {/* (eg: https://www.designdaddie.com/) */}
                  </span>
                </label>
                <input
                  onChange={(e) => onDataChange(e)}
                  // value={Url}
                  type="text"
                  id="Android"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 d "
                  placeholder="Enter Android URL https://"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="Android"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter URL for Ios <span className="text-red-500">*</span>{" "}
                  <span className="text-xs text-gray-500">
                    {/* (eg: https://www.designdaddie.com/) */}
                  </span>
                </label>
                <input
                  onChange={(e) => onDataChange(e)}
                  // value={Url}
                  type="text"
                  id="Android"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 d "
                  placeholder="Enter Ios URL https://"
                  required
                />
              </div>
            </>
          ) : type === "Images" ? (
            <div className="mb-4 w-full">
              <p className="text-start p-2 text-sm font-medium">Upload image</p>
              <div className="flex  justify-between gap-12 items-center border-1 border-buttonopacitycolor p-4 rounded-lg">
                <div className="flex justify-center items-center gap-2 flex-col h-44 w-2/4 border-1.5 border-dashed rounded-lg">
                  {QRimage ? (
                    <div>
                      <Image
                        src={QRimage}
                        width={400}
                        height={100}
                        className=" w-full h-60 object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <Button className="md:w-60 w-full h-14 bg-buttoncolor text-white font-medium rounded-sm">
                      <IoIosAddCircle className="text-xl" />
                      <label htmlFor="fileInputQRimage">Upload image</label>
                      <input
                        type="file"
                        id="fileInputQRimage"
                        style={{ display: "none" }}
                        onChange={(e) => onChangeQRimage(e)}
                      />
                    </Button>
                  )}
                </div>
                <div className="h-60 w-2/4 flex flex-col gap-4 justify-start items-start ">
                  <p className="text-lg">Supported formats:</p>
                  <div className="flex justify-evenly items-center gap-4">
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      JPEG
                    </span>
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      JPG
                    </span>
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      PNG
                    </span>
                  </div>
                  {QRimage && (
                    <div className="flex items-center gap-4">
                      <p className="text-md leading-5">Image.png</p>
                      <Button
                        onPress={() => SetQRimage("")}
                        variant="light"
                        className="text-buttoncolor"
                      >
                        <MdDelete size={24} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : type === "Video" ? (
            <div className="mb-4 w-full">
              <p className="text-start p-2 text-sm font-medium">Upload Video</p>
              <div className="flex  justify-between gap-12 items-center border-1 border-buttonopacitycolor p-6 rounded-lg">
                <div className="flex justify-center items-center gap-2 flex-col h-44 w-2/4 border-1.5 border-dashed rounded-lg">
                  {video ? (
                    <div>
                      <video
                        controls
                        className="w-full h-60 object-contain rounded-md"
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <Button className="md:w-60 w-full h-14 bg-buttoncolor text-white font-medium rounded-sm">
                      <IoIosAddCircle className="text-xl" />
                      <label htmlFor="fileInputvideo">Upload Video</label>
                      <input
                        type="file"
                        id="fileInputvideo"
                        style={{ display: "none" }}
                        onChange={(e) => handleVideoChange(e)}
                      />
                    </Button>
                  )}
                </div>
                <div className="h-60 w-2/4 flex flex-col gap-4 justify-start items-start ">
                  <p className="text-lg">Supported formats:</p>
                  <div className="flex justify-evenly items-center gap-4">
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      MP4
                    </span>
                  </div>
                  {video && (
                    <div className="flex items-center gap-4">
                      <p className="text-md leading-5">{video.file.name}</p>
                      <Button
                        onPress={() => setVideo(null)}
                        variant="light"
                        className="text-buttoncolor"
                      >
                        <MdDelete size={24} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : type === "Audio" ? ( //need to change
            <div className="mb-4 w-full">
              <p className="text-start p-2 text-sm font-medium">Upload Audio</p>
              <div className="flex  justify-between gap-12 items-center border-1 border-buttonopacitycolor p-6 rounded-lg">
                <div className="flex justify-center items-center gap-2 flex-col h-44 w-2/4 border-1.5 border-dashed rounded-lg">
                  {audio ? (
                    <div>
                      <audio
                        controls
                        className="w-full h-60 object-contain rounded-md"
                      >
                        <source src={audio.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <Button className="md:w-60 w-full h-14 bg-buttoncolor text-white font-medium rounded-sm">
                      <IoIosAddCircle className="text-xl" />
                      <label htmlFor="fileInputAudio">Upload Audio</label>
                      <input
                        type="file"
                        id="fileInputAudio"
                        style={{ display: "none" }}
                        onChange={(e) => handleAudioChange(e)}
                      />
                    </Button>
                  )}
                </div>
                <div className="h-60 w-2/4 flex flex-col gap-4 justify-start items-start ">
                  <p className="text-lg">Supported formats:</p>
                  <div className="flex justify-evenly items-center gap-4">
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      MP3
                    </span>
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      WAV
                    </span>
                  </div>
                  {audio && (
                    <div className="flex items-center gap-4">
                      <p className="text-md leading-5">{audio.name}</p>
                      <Button
                        onPress={() => setAudio(null)}
                        variant="light"
                        className="text-buttoncolor"
                      >
                        <MdDelete size={24} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : type === "Social" ? (
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter URL of Social Account{" "}
                <span className="text-red-500">*</span>{" "}
                <span className="text-xs text-gray-500">
                  (eg: https://www.facebook.com/)
                </span>
              </label>
              <input
                // onChange={(e) => onDataChange(e)}
                // value={Url}
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-buttoncolor focus:border-buttoncolor block w-full p-2.5 d "
                placeholder="Enter  URL https://"
                required
              />
            </div>
          ) : type === "Documents" ? (
            <div className="mb-4 w-full">
              <p className="text-start p-2 text-sm font-medium">Upload PDF</p>
              <div className="flex  justify-between gap-12 items-center border-1 border-buttonopacitycolor p-6 rounded-lg">
                <div className="flex justify-center items-center gap-2 flex-col h-44 w-2/4 border-1.5 border-dashed rounded-lg">
                  {pdfFile ? (
                    <div>
                      <embed
                        src={URL.createObjectURL(pdfFile)}
                        type="application/pdf"
                        width={400}
                        height={200}
                      />
                    </div>
                  ) : (
                    <Button className="md:w-60 w-full h-14 bg-buttoncolor text-white font-medium rounded-sm">
                      <IoIosAddCircle className="text-xl" />
                      <label htmlFor="pdfFileInput">Upload PDF</label>
                      <input
                        type="file"
                        id="pdfFileInput"
                        accept=".pdf"
                        style={{ display: "none" }}
                        onChange={(e) => handlePdfFileChange(e)}
                      />
                    </Button>
                  )}
                </div>
                <div className="h-60 w-2/4 flex flex-col gap-4 justify-start items-start ">
                  <p className="text-lg">Supported formats:</p>
                  <div className="flex justify-evenly items-center gap-4">
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      PDF
                    </span>
                  </div>
                  {pdfFile && (
                    <div className="flex items-center gap-4">
                      <p className="text-md leading-5">{pdfFile.name}</p>
                      <Button
                        onPress={() => setPdfFile(null)}
                        variant="light"
                        className="text-buttoncolor"
                      >
                        <MdDelete size={24} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : type === "Documents" ? (
            <div className="mb-4 w-full">
              <p className="text-start p-2 text-sm font-medium">
                Upload Textfile
              </p>
              <div className="flex  justify-between gap-12 items-center border-1 border-buttonopacitycolor p-6 rounded-lg">
                <div className="flex justify-center items-center gap-2 flex-col h-44 w-2/4 border-1.5 border-dashed rounded-lg">
                  {textFile ? (
                    <div className="flex flex-col justify-center items-center">
                      <IoDocumentTextSharp
                        size={40}
                        className="text-buttoncolor text-3xl"
                      />

                      <p className="text-xs font-medium">
                        File name: {textFile.name}
                      </p>
                    </div>
                  ) : (
                    <Button className="md:w-60 w-full h-14 bg-buttoncolor text-white font-medium rounded-sm">
                      <IoIosAddCircle className="text-xl" />
                      <label htmlFor="fileInputText">Upload Textfile</label>
                      <input
                        type="file"
                        id="fileInputText"
                        style={{ display: "none" }}
                        onChange={(e) => handleTextChange(e)}
                      />
                    </Button>
                  )}
                </div>
                <div className="h-60 w-2/4 flex flex-col gap-4 justify-start items-start ">
                  <p className="text-lg">Supported formats:</p>
                  <div className="flex justify-evenly items-center gap-4">
                    <span className="p-2 text-buttoncolor border border-buttoncolor rounded-md cursor-pointer">
                      Txt
                    </span>
                  </div>
                  {textFile && (
                    <div className="flex items-center gap-4">
                      <p className="text-md leading-5">{textFile.name}</p>
                      <Button
                        onPress={() => setTextFile(null)}
                        variant="light"
                        className="text-buttoncolor"
                      >
                        <MdDelete size={24} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <Button
            className="bg-buttoncolor rounded-sm text-white "
            onClick={UpdateQrdata}
          >
            Update Data
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditQR;
