import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Reffer from '../components/Reffer';

const Contact = () => {
  return (
    <div>
      {/* Page Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Image + Info Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Image */}
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Text Section */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Amma station <br />
            Kengunte, Bengaluru - 560074, India
          </p>
          <p className="text-gray-500">
            Tel:7411983546 <br />
            Email: adminurbancart@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Careers at UrbanCart</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Reffer Component */}
      <Reffer />
    </div>
  );
};

export default Contact;
