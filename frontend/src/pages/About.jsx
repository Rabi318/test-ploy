import React from "react";
import heroImg from "../assets/Assets/About us.webp";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import founderPic from "../assets/Assets/founder.jpeg";
import OfcImg from "../assets/Assets/office.jpg";

const About = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="flex-grow relative">
          <div className="relative">
            <img className="w-full h-auto" src={heroImg} alt="Tourimg" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold">
              About Us
            </div>
          </div>
        </div>
      </React.Fragment>

      <React.Fragment>
        <div className="container mx-auto p-8">
          <div className="">
            <div className="flex items-center">
              <div
                style={{ fontFamily: "cursive" }}
                className="text-[#62BC00] text-2xl font-bold text-start mb-4"
              >
                Who are we..
              </div>
              <FaPersonCircleQuestion size={50} className="mt-[-2.3rem] mr-2" />
            </div>

            <p className="text-[#051836] leading-relaxed text-justify">
              At RiceLink, we specialize in connecting farmers with rice
              production factories, ensuring a seamless process from harvest to
              production. We take pride in sourcing raw rice directly from local
              farmers, ensuring the highest quality at every stage. Our mission
              is to support farmers while delivering premium rice to production
              units, where it is processed and prepared for market distribution.
              With deep roots in the agriculture sector, we offer unparalleled
              expertise in the rice supply chain. By fostering strong
              relationships with both farmers and factories, we create a smooth,
              efficient process that benefits all parties. Whether you're a
              farmer looking for a reliable partner to sell your crop, or a
              production unit seeking quality raw rice, RiceLink is here to make
              the process hassle-free. Partner with us to streamline your rice
              business, and let us handle everything from procurement to
              logistics, ensuring timely deliveries and quality assurance. At
              RiceLink, we're committed to helping farmers grow their business
              and ensuring that production facilities receive the best raw
              materials for their operations.
            </p>
          </div>

          <div className="mt-8">
            <div
              style={{ fontFamily: "cursive" }}
              className="text-[#62BC00] text-2xl font-bold text-start w-full mb-4"
            >
              Our Commitments
            </div>

            <p className="text-[#051836] leading-relaxed text-justify">
              <div>
                1. We don't fight price, we only fight quality, service, and
                after-sales.
              </div>
              <div>
                2. Our focus is on delivering the highest quality raw rice,
                exceptional service, and reliable partnerships, not competing on
                price alone.
              </div>
              <div>
                3. While we may not always offer the lowest price, we guarantee
                top-quality rice, seamless logistics, and comprehensive support
                throughout the entire process, from procurement to delivery.
              </div>
              <div>
                4. We believe in long-term partnerships, not one-time
                transactions. Our goal is to create a reliable and sustainable
                supply chain that benefits both farmers and factories.
              </div>
              <div>
                5. Partner with us, and we promise to exceed your expectations
                with our commitment to quality, consistency, and service.
              </div>
              <div>
                6. When comparing services, evaluate the quality, pricing, and
                after-sales support we offer. At RiceLink, we ensure that every
                aspect of our service reflects our dedication to excellence.
              </div>
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="md:w-1/2">
              <div
                style={{ fontFamily: "cursive" }}
                className="text-[#62BC00] text-2xl font-bold text-start w-full mb-4"
              >
                Our Vission
              </div>

              <p className="text-[#051836] leading-relaxed text-justify">
                Our vision is to become a leading and innovative force in the
                rice supply chain, bridging the gap between farmers and
                production factories. We strive to be recognized for our
                commitment to quality, professionalism, and sustainability in
                the agricultural industry. By ensuring that both farmers and
                factories benefit from our reliable services, we aim to set new
                standards in the rice trade and build a lasting identity in the
                market.
              </p>
            </div>

            <div className="md:w-1/2">
              <div
                style={{ fontFamily: "cursive" }}
                className="text-[#62BC00] text-2xl font-bold text-start w-full mb-4"
              >
                Our Mission
              </div>

              <p className="text-[#051836] leading-relaxed text-justify">
                Our mission is to provide exceptional service in the rice supply
                chain by connecting farmers with production factories, ensuring
                top-quality raw rice and seamless logistics. We are dedicated to
                supporting farmers, enhancing production efficiency, and
                delivering value that exceeds expectations. Our goal is to build
                long-term, trust-based relationships, where customer
                satisfaction is at the heart of everything we do. We aim to save
                both time and resources while consistently offering the best
                value in the industry.
              </p>
            </div>
          </div>

          <div className="bg-[#cae9f7] w-full border-2 border-[#30aadd] p-4 rounded-lg flex flex-col md:flex-row items-center mt-8">
            {/* First Column (Image) */}
            <div className="w-full flex justify-center md:w-1/2  overflow-hidden rounded-md">
              <img
                src={founderPic}
                className=" max-h-80 max-w-80 rounded-md"
                alt="founder-img"
              />
            </div>

            {/* Second Column (Information) */}
            <div className="w-full md:w-1/2 text-start md:text-left">
              <h2
                className="text-2xl font-bold mb-4 tracking-wide text-[#62BC00]"
                style={{ fontFamily: "cursive" }}
              >
                Founder & Chairman
              </h2>

              <div className="text-start space-y-2">
                <p className="text-[#051836] tracking-wide font-bold text-lg">
                  Bhruguram Sahoo
                </p>
                <p className="text-[#051836] text-md md:contents hidden">
                  adityaenterprises@gmail.com
                </p>
                <p
                  className="text-[#051836] tracking-wide text-md md:hidden"
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  adityaenterprises@gmail.com
                </p>
                <p className="text-[#051836] tracking-wide text-md">
                  +91-9658035929 / +91-9438346289
                </p>
                <p className="text-[#051836] tracking-wide text-md">
                  With over 10 years of professional experience in the
                  agriculture and rice supply chain industry, we are dedicated
                  to upholding the highest standards of ethics and discipline in
                  every aspect of our operations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#cae9f7] w-full border-2 border-[#30aadd] p-4 rounded-lg flex flex-col md:flex-row items-center mt-8">
            <div className="w-full flex justify-center md:w-1/2  overflow-hidden rounded-md">
              <img
                src={OfcImg}
                className=" max-h-80 max-w-80 rounded-md"
                alt="founder-img"
              />
            </div>

            <div className="w-full md:w-1/2 text-start md:text-left">
              <h2
                className="text-2xl font-bold mb-4 tracking-wide text-[#62BC00]"
                style={{ fontFamily: "cursive" }}
              >
                Office Details
              </h2>

              <div className="text-start space-y-2">
                <p className="text-[#051836] tracking-wide font-bold text-lg">
                  Head Office
                </p>
                <p className="text-[#051836] tracking-wide text-md">
                  adityaenterprises@gmail.com
                </p>
                <p className="text-[#051836] tracking-wide text-md">
                  +91-9658035929, +91-9348346289
                </p>
                <p className="text-[#051836] tracking-wide text-md">
                  Sankhachilla, Pin-755015, Jajpur Road, Odisha
                </p>
              </div>

              <div className="text-start space-y-2 mt-4">
                <p className="text-[#051836] tracking-wide font-bold text-lg">
                  Branch Office
                </p>

                <p className="text-[#051836] tracking-wide text-md">
                  Sankhachilla, Pin-755015, Jajpur Road, Odisha
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default About;
