import React from 'react';
import Title from '../components/Title';
import { assets } from "../assets/assets";
import Reffer from '../components/Reffer';

const About = () => {
  return (
    <div>

      {/* ABOUT TITLE SECTION */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* ABOUT IMAGE & MISSION SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-12">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={assets.about_img}
            alt="About Forever"
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="text-gray-700 space-y-6 text-justify">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We’re dedicated to providing a
              seamless shopping experience that exceeds expectations—from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-2xl text-center py-8">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base mb-20">
        {/* QUALITY ASSURANCE */}
        <div className="border rounded-lg p-8 flex flex-col gap-4 shadow-sm">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        {/* CONVENIENCE */}
        <div className="border rounded-lg p-8 flex flex-col gap-4 shadow-sm">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        {/* CUSTOMER SERVICE */}
        <div className="border rounded-lg p-8 flex flex-col gap-4 shadow-sm">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you every
            step of the way, ensuring your satisfaction throughout the journey.
          </p>
        </div>
      </div>

      {/* REFER SECTION */}
      <div className="px-6 pb-10">
        <Reffer />
      </div>
    </div>
  );
};

export default About;
