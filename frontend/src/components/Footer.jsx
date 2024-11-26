import React, { useEffect } from "react";

import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import logo from "../assets/Assets/alogo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  // Scroll to the top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <div className="shadow-md">
      <div className="bg-black text-white p-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-24 object-contain mx-auto md:mx-0 rounded-lg"
            />
            <p className="text-[#8592A6] text-xs w-full md:text-left tracking-wide">
              Your Rice, Our Commitment
            </p>
            <p className="mt-2 text-sm tracking-normal">GSTIN-12347huti9o</p>
            <p className="mt-2 text-sm tracking-normal">
              Registered by Govt of India
            </p>
            <p className="mt-2 text-sm tracking-normal">UDYAM-DL-11-097689</p>

            <div className="flex items-center justify-center mt-4 md:justify-start md:mt-8">
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FF3D00"
                      d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                    ></path>
                    <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#3F51B5"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                  >
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                      cx="19.38"
                      cy="42.035"
                      r="44.899"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#fd5"></stop>
                      <stop offset=".328" stopColor="#ff543f"></stop>
                      <stop offset=".348" stopColor="#fc5245"></stop>
                      <stop offset=".504" stopColor="#e64771"></stop>
                      <stop offset=".643" stopColor="#d53e91"></stop>
                      <stop offset=".761" stopColor="#cc39a4"></stop>
                      <stop offset=".841" stopColor="#c837ab"></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                      cx="11.786"
                      cy="5.54"
                      r="29.813"
                      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#4168c9"></stop>
                      <stop
                        offset=".999"
                        stopColor="#4168c9"
                        stopOpacity="0"
                      ></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                    ></path>
                    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                    <path
                      fill="#fff"
                      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                  >
                    <linearGradient
                      id="_osn9zIN2f6RhTsY8WhY4a_5MQ0gPAYYx7a_gr1"
                      x1="10.341"
                      x2="40.798"
                      y1="8.312"
                      y2="38.769"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#2aa4f4"></stop>
                      <stop offset="1" stopColor="#007ad9"></stop>
                    </linearGradient>
                    <path
                      fill="url(#_osn9zIN2f6RhTsY8WhY4a_5MQ0gPAYYx7a_gr1)"
                      d="M46.105,11.02c-1.551,0.687-3.219,1.145-4.979,1.362c1.789-1.062,3.166-2.756,3.812-4.758	c-1.674,0.981-3.529,1.702-5.502,2.082C37.86,8.036,35.612,7,33.122,7c-4.783,0-8.661,3.843-8.661,8.582	c0,0.671,0.079,1.324,0.226,1.958c-7.196-0.361-13.579-3.782-17.849-8.974c-0.75,1.269-1.172,2.754-1.172,4.322	c0,2.979,1.525,5.602,3.851,7.147c-1.42-0.043-2.756-0.438-3.926-1.072c0,0.026,0,0.064,0,0.101c0,4.163,2.986,7.63,6.944,8.419	c-0.723,0.198-1.488,0.308-2.276,0.308c-0.559,0-1.104-0.063-1.632-0.158c1.102,3.402,4.299,5.889,8.087,5.963	c-2.964,2.298-6.697,3.674-10.756,3.674c-0.701,0-1.387-0.04-2.065-0.122C7.73,39.577,12.283,41,17.171,41	c15.927,0,24.641-13.079,24.641-24.426c0-0.372-0.012-0.742-0.029-1.108C43.483,14.265,44.948,12.751,46.105,11.02"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <h3 className="font-semibold text-xl mb-4 tracking-wide">
              Useful Links
            </h3>
            <div className="tracking-wide flex flex-col">
              <NavLink to="/" className="cursor-pointer hover:text-[#62BC00] ">
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="cursor-pointer hover:text-[#62BC00]  mt-2"
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className="cursor-pointer hover:text-[#62BC00] mt-2"
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/404"
                className="cursor-pointer hover:text-[#62BC00] mt-2"
              >
                Feedback
              </NavLink>
              <NavLink
                to="/404"
                className="cursor-pointer hover:text-[#62BC00] mt-2"
              >
                Terms & Conditions
              </NavLink>

              <NavLink
                to="/404"
                className="cursor-pointer hover:text-[#62BC00] mt-2"
              >
                Privacy & Pricing Policy
              </NavLink>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <h3 className="font-semibold mb-4 text-xl tracking-wide">
              Get in Touch
            </h3>
            <ul className="tracking-wide">
              <li className="flex items-center justify-center">
                <MdOutlineEmail />
                <span className="ml-2">adityaenterprises@gamil.com</span>
              </li>
              <li className="flex items-center justify-center my-4">
                <FaPhoneAlt />
                <span className="ml-2">+91-9658035929, +91-9448346289</span>
              </li>
              <li className="flex items-center justify-center">
                <CiLocationOn />
                <span className="ml-2">
                  <span className="text-[#62BC00]">Head Office : </span>
                </span>
                &nbsp;Sankhachilla, Nahanda, Pin-755015
              </li>
              <li>Jajpur Road, Odisha</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-900 border-solid text-sm py-4 mt-4 tracking-wide">
          <div className="container px-4 m-auto">
            <div className="md:flex md:mx-4 md:items-center">
              <div className="md:flex-1 md:px-4 md:text-left text-center">
                <p className="text-gray-500">
                  &copy; 2024 Aditya Enterprises. All Right Reserved
                </p>
              </div>
              <div className="md:flex-1 md:text-right text-center md:px-4">
                <span className="text-gray-500">Design & Developed by</span>
                <a
                  href="https://bitfusion-mu.vercel.app/"
                  className="text-[#62BC00] cursor-pointer hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;Technova
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
