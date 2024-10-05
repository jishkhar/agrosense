import React from "react";
import { NavbarDemo } from "./Navbar";
import Image from "next/image";
// import Background from '../Landing/Background';

const Hero = () => {
  return (
    <>

      <div
        className="bg-gray-300 h-fit"
        style={{
          backgroundImage: `url('/img/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '1000px',
          width: '100%',
        }}
      >

        <div id="main" className="flex text-2xl  p-2 relative z-10">
          <div id="logo" className="mt-7 ml-36">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={220}
              height={30}
              priority
            />
          </div>
          <NavbarDemo />
          <div className="flex mr-36 m-5 gap-4">
            <div id="login">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 text-lg rounded-full px-10 py-3.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login
              </button>
            </div>
            <div id="signup">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-full text-lg px-10 py-3.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>



        <div id="bg">
          <div className="flex mt-32 p-5 justify-center">
            <div id="photo" className="ml-64 p-5 bg-white z-auto opacity-60 rounded-l-lg">
              <Image
                src="/img/pk.jpeg"
                alt="Farming"
                width={1700}
                height={300}
                priority
                className="rounded-2xl"
              />
            </div>

            <div id="tagline" className="flex flex-col items-center justify-center mr-64 px-20 text-black bg-white z-auto opacity-60 rounded-r-lg">
              <h1 className="text-5xl mb-10 text-center">
                Empowering Farmers with Smart Water and Resource Management
              </h1>
              <p className="text-xl text-center">
                Agriculture is evolving, and so are the tools available to help
                farmers make better decisions. [App Name] brings advanced
                technology and data-driven insights to your fingertips, making it
                easier to manage your water resources, improve crop yield, and
                plan efficiently.
              </p>

              <button className=" mt-8 text-2xl p-3 bg-green-400 rounded-lg hover:bg-green-300 text-black border-green-800  transition-colors duration-100">
                EXPLORE TOOLS
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Hero;
