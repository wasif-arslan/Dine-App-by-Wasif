import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo.webp";
import { GrFacebookOption, GrTwitter, GrLinkedinOption } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-white mt-10  w-full bottom-0 left-0  text-black py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        <div className="logo mb-6  md:mb-0">
          <Image src={Logo} width={180} height={30} alt="logo" className="" />
          <p className="text-sm mt-4 md:w-80">
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className="icon-container flex mt-4">
            <div className="mr-4">
              <GrTwitter size={20} className="text-black" />
            </div>
            <div className="mr-4">
              <GrFacebookOption size={20} className="text-black" />
            </div>
            <div>
              <GrLinkedinOption size={20} className="text-black" />
            </div>
          </div>
        </div>
        <div className="footer-links mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="text-sm">
            <li className="mb-2">About</li>
            <li className="mb-2">Terms of Use</li>
            <li className="mb-2">Privacy Policy</li>
            <li className="mb-2">How it Works</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-links mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="text-sm">
            <li className="mb-2">Support Career</li>
            <li className="mb-2">24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        <div className="footer-links mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm">
            <li className="mb-2">Whatsapp</li>
            <li>Support 24h</li>
          </ul>
        </div>
      </div>
      <div className="w-full h-[1px] m-5 bg-black"></div>
      <div className="text-center ">
        <p className="text-sm">Copyright © 2022 Dine Market By Wasif</p>
      </div>
    </footer>
  );
};

export default Footer;
