import React, { useState } from "react";
import Layout from "../Layout";
import { Image, Button } from "@nextui-org/react";
import coordeesSmallBlur from "../../assets/coordeesSmallBlur.svg";
import technicianImg from "../../assets/technicians.png";

function Homepage({}) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <Layout>
      {/* Background and Main Container */}
      <div
        className="relative bg-cover bg-center bg-green-100 min-h-screen"
        style={{ backgroundImage: `url(${coordeesSmallBlur})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white backdrop-blur-sm"></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-10">
            {/* Left Side Card */}
            <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-lg p-10 text-left md:w-1/2">
              <h1 className="text-3xl font-hanken font-bold mb-8 gradient-underline">
                WHAT DO YOU NEED TO FIND?
              </h1>
              <p className="text-lg mb-3 font-medium font-hanken">
                Just send Hi to our WhatsApp number and get instant access to
                trusted services—no calls required!
              </p>
              <p className="text-lg mb-3 font-hanken">
                Coordees, powered by Astech Group, is your go-to service
                provider for all household and institutional needs. Whether it’s
                a CCTV technician, plumber, or electrician, we’ve got you
                covered.
              </p>
              <p className="text-lg font-hanken mb-4">
                With Coordees, booking a reliable neighborhood technician is as
                easy as sending a message. We coordinate with local experts to
                ensure fast and efficient repairs or installations, all within a
                few minutes.
              </p>
              <p className="font-semibold font-hanken">
                No hassle, no long waits—just WhatsApp us, and we’ll take care
                of the rest.
              </p>
              <Button
                className="bg-[#2cbc61] text-white font-hanken mt-4"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </div>

            <div className="hidden md:block md:w-1/3">
              <Image
                src={technicianImg}
                alt="Coordees services"
                width="100%"
                height="auto"
                className="rounded-br-[250px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Div with Left and Right Sections */}
      <div className="flex flex-col md:flex-row justify-between items-start py-12 px-32">
        {/* Left Side: How Can Coordees Streamline Your Needs? */}
        <div className="bg-[#e9f2ea]/50 backdrop-blur-md shadow-xl rounded-lg p-8 text-left w-full md:w-1/2 rounded-bl-[90px]">
          <h2 className="text-3xl font-hanken font-bold mb-6">
            How Can Coordees Streamline Your Needs?
          </h2>
          <p className="text-lg mb-4 font-hanken text-gray-700">
            Coordees, powered by Astech Group, is your neighborhood's essential
            service coordinator. Whether you're in need of a quick repair or an
            installation, simply send a message on WhatsApp, and within minutes,
            our trusted local technicians will be at your service.
          </p>
          <p className="text-lg mb-4 font-hanken text-gray-700">
            We've partnered with skilled professionals across all
            trades—plumbers, electricians, A/C mechanics, CCTV specialists, pest
            control experts, and more—right in your community. Our mission is to
            deliver high-quality, reliable service with exceptional results,
            ensuring your household or institution runs smoothly, every time.
          </p>
          <p className="font-hanken font-semibold">
            Quality work, right from your own neighborhood.
          </p>
        </div>

        {/* Right Side: Collapsible Sections */}
        <div className="bg-[#6ae37e]/20 backdrop-blur-md shadow-xl rounded-lg p-8 w-full md:w-1/2 rounded-br-[90px] ml-5">
          <h2 className="text-3xl font-hanken font-bold mb-6">
            Just Send a "Hi"
          </h2>
          {/* Collapsible Sections */}
          {[
            {
              title: "Electricity is down? What to do?",
              content:
                "No need to worry! Send us a WhatsApp message, and we will have a technician out to fix the issue in no time.",
            },
            {
              title: "Your Satisfaction is Our Aim",
              content:
                "We aim to ensure that every service leaves you fully satisfied. Our trusted technicians provide high-quality work with quick turnaround times.",
            },
            {
              title: "Where are we available?",
              content:
                "We are available in every major neighborhood. Just a message away!",
            },
            {
              title:
                "Are you from any kind of company/work listed in Coordees?",
              content:
                "You have the opportunity to join our network and receive jobs near your location. Travel less, save time, and earn more!",
            },
          ].map((section, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(section.title)}
              >
                <h3 className="text-lg font-hanken">{section.title}</h3>
                <span>{openSection === section.title ? "−" : "+"}</span>
              </div>
              {openSection === section.title && (
                <p className="text-sm text-gray-600 mt-2 transition-opacity duration-300">
                  {section.content}
                </p>
              )}
            </div>
          ))}
          With Coordees, you do more than your usual jobs, and earn more. No
          more bargaining with your customers!. You get jobs near to your
          location, travel less, thereby saving time and money. You get more
          jobs to. With us, you are visible to a much larger customer base,
          without any marketing costs. We do your marketing for you!
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
