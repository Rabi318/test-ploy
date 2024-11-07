import React from "react";
import Carousel from "../components/Carousal";
import rice from "../assets/Assets/ricecrop.jpeg";
import basmati from "../assets/Assets/basmati.jpg";

const Home = () => {
  return (
    <>
      <Carousel />
      <div className="bg-gray-200 grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
        <div className="p-4 flex flex-col justify-center items-center">
          <div>
            <h1 className="text-lg font-bold flex justify-center items-center mb-2">
              Summary
            </h1>
            <p className="text-base font-medium font-serif mb-4 tracking-wider">
              Rice is one of the world's most important staple crops, feeding
              more than half of the global population. It belongs to the Oryza
              genus, with the two most widely cultivated species being Oryza
              sativa (Asian rice) and Oryza glaberrima (African rice).
            </p>
          </div>
          <div>
            <span className="text-lg font-bold flex justify-center items-center  mb-2">
              Growth Stages
            </span>
            <ul className="list-disc list-inside">
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Seedling: </span>
                Seeds are sown either directly in the field or in nurseries,
                where seedlings grow before being transplanted
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Tillering: </span>
                Plants produce multiple stems, known as tillers, which increases
                the number of potential grain-bearing panicles.
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Panicle Initiation: </span>
                The plant prepares to flower, and small panicles (clusters of
                grain) begin forming.
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Flowering: </span> The plant
                flowers and is pollinated.
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Grain Filling: </span>
                Rice grains start to develop and fill with starch.
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Ripening: </span>
                The grains mature and turn golden, ready for harvest.
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 transition ease-in delay-150 hover:translate-x-1 hover:scale-x-90 duration-300 ">
          <img
            src={rice}
            alt="rice crop"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
      <div className="bg-slate-100 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="p-4 transition ease-in delay-150 hover:translate-x-1 hover:scale-x-90 duration-300 ">
          <img
            src={basmati}
            alt="rice crop"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="p-4  flex flex-col justify-center items-center">
          <div>
            <h1 className="text-lg font-bold flex justify-center items-center  mb-2">
              Nutritional Value
            </h1>
            <p className="text-base text-balance font-medium font-serif mb-2 tracking-wider">
              Rice is a significant source of energy, especially carbohydrates.
              It contains small amounts of protein and almost no fat. White
              rice, which is most commonly consumed, is often fortified to
              replace nutrients lost during processing. Brown rice, which
              retains the bran and germ, is more nutrient-dense, containing more
              fiber, vitamins, and minerals.
            </p>
          </div>
          <div>
            <span className="text-lg font-bold flex justify-center items-center mt-2 mb-2">
              Challenges
            </span>
            <ul className="list-disc list-inside">
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Water Scarcity: </span>
                As rice is highly water-dependent, regions facing drought or
                water shortages may struggle to produce sufficient yields.
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">Climate Change: </span>
                Increased temperatures and erratic rainfall patterns could
                affect rice production, especially in vulnerable regions.
              </li>
              <li className="font-serif tracking-wider">
                <span className="font-semibold">
                  Pest and Disease Control:{" "}
                </span>
                Rice is susceptible to pests like rice stem borers and diseases
                like blast and bacterial leaf blight, which can significantly
                reduce crop yields if not properly managed.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
