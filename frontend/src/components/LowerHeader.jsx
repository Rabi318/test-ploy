import React from "react";

const rice = [
  { id: 1, name: "Deradun", price: 2100 },
  { id: 2, name: "1009", price: 2000 },
  { id: 3, name: "Swarna", price: 1900 },
  { id: 4, name: "Bhulaxmi", price: 1850 },
];

const LowerHeader = () => {
  return (
    <nav className="bg-black px-4 pb-1 pt-2 mt-2 shadow-xl">
      <marquee direction="left" scrollamount="4" behavior="scroll">
        <div className="flex items-center">
          <div className="text-white text-sm tracking-wider">
            Aditya Enterprises
          </div>
          <div className="text-white text-sm tracking-wider mx-8">| |</div>
          {rice.map((item) => (
            <div key={item.id} className="flex items-center">
              <span className="text-white text-sm tracking-wider">
                {item.name} : ₹{item.price}
              </span>
              <div className="text-white text-sm tracking-wider mx-4">| |</div>
            </div>
          ))}
          <div className="text-sm text-[#62BC00] tracking-wider">
            Thank you for visiting...
          </div>
        </div>
      </marquee>
    </nav>
  );
};

export default LowerHeader;
