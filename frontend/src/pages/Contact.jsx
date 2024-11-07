import React from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import heroImg from "../assets/Assets/Contact us.webp";

const Contact = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="flex-grow relative">
          <div className="relative">
            <img className="w-full h-auto" src={heroImg} alt="Tourimg" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold">
              Contact Us
            </div>
          </div>
        </div>
      </React.Fragment>

      <React.Fragment>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4 mb-4">
          <div className="bg-[#EBEBEB] h-44 w-44 p-4 m-4 flex flex-col items-center justify-center rounded-md transition-transform transform hover:scale-105">
            <HiMiniBuildingOffice2 size={50} color="#30aadd" />

            <div className="text-[#0C2D62] text-sm font-bold text-center tracking-wide my-4">
              OUR OFFICE
            </div>

            <div className="text-[#0C2D62] text-xs text-center tracking-wide">
              Sankhachilla, Pin-755015, Jajpur Road, Odisha
            </div>
          </div>

          <div className="bg-[#EBEBEB] h-44 w-44 p-4 m-4 flex flex-col items-center justify-center rounded-md transition-transform transform hover:scale-105">
            <MdEmail size={50} color="#ea4335" />

            <div className="text-[#0C2D62] text-sm font-bold text-center tracking-wide my-4">
              EMAIL
            </div>

            <div className="text-[#0C2D62] text-xs text-center tracking-wide">
              adityaenterprises@gmail.com
            </div>
          </div>

          <div className="bg-[#EBEBEB] h-44 w-44 p-4 m-4 flex flex-col items-center justify-center rounded-md transition-transform transform hover:scale-105">
            <RiWhatsappFill size={50} color="#10b416" />

            <div className="text-[#0C2D62] text-sm font-bold text-center tracking-wide my-4">
              WHATSAPP
            </div>

            <div className="text-[#0C2D62] text-xs text-center tracking-wide">
              +91-9658035929
            </div>
          </div>

          <div className="bg-[#EBEBEB] h-44 w-44 p-4 m-4 flex flex-col items-center justify-center rounded-md transition-transform transform hover:scale-105">
            <IoMdCall size={50} color="#30aadd" />

            <div className="text-[#0C2D62] text-sm font-bold text-center tracking-wide my-4">
              PHONE
            </div>

            <div className="text-[#0C2D62] text-xs text-center tracking-wide">
              +91-9658035929
            </div>

            <div className="text-[#0C2D62] text-xs text-center tracking-wide mt-2">
              +91-9438346289
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Contact;
