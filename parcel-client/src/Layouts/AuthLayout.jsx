import React from 'react';
import Login from '../pages/Authentication/Login/Login';
import Navbar from '../pages/Shared/Navbar/Navbar';
import AuthImag from "../assets/authImage.png";
import ProFastLogo from '../pages/Shared/ProFastLogo/ProFastLogo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-1 bg-base-200 mt-3 px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* <div className="mb-6 md:mb-8">
            <ProFastLogo />
          </div> */}
          <div className="flex flex-col-reverse gap-8 lg:flex-row-reverse lg:gap-12 items-center">
            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <img
                src={AuthImag}
                alt="Authentication"
                className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <Outlet />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;