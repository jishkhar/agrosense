import ParentComponent from "./parentCard";
import { NavbarDemo } from "../Landing/Navbar";
import Image from "next/image";

export default function Dashboard() {
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
            width={300}
            height={30}
            priority
          />
        </div>
        <NavbarDemo />
        <div className="flex mr-36 m-5 gap-4">
          <div id="login">
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-slate-200 focus:ring-4 focus:ring-gray-100 text-lg rounded-full px-10 py-3.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Login
            </button>
          </div>
          <div id="signup">
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-slate-200 focus:ring-4 focus:ring-gray-100 rounded-full text-lg px-10 py-3.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      <div className="mt-40">
        <ParentComponent/>
      </div>

    </div>
  </>
)}

