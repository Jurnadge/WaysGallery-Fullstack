// import css here
import programmerlogo from "../assets/images/BigHumanLogo.png";
import logo from "../assets/images/LogoLandPage.png";
import shape1 from "../assets/images/Vector1.png";
import shape2 from "../assets/images/Vector2.png";
import shape3 from "../assets/images/Vector3.png";

// import react here
import { useState } from "react";

// import componen here
import ModalLogin from "../component/ModalLogin";
import ModalRegister from "../component/ModalRegister";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="absolute -top-0 -left-0">
          <img src={shape1} alt="" />
        </div>

        <div className="absolute bottom-0 -left-0">
          <img src={shape2} alt="" />
        </div>

        <div className="absolute bottom-0 right-0">
          <img src={shape3} alt="" />
        </div>

        <div className="relative">
          <div className="w-full h-full mx-auto flex flex-col justify-between items-center gap-40 md:max-w-screen-md md:flex-row  md:h-screen lg:max-w-screen-xl">
            <div className="w-full flex flex-col justify-center items-start">
              <img src={logo} alt="logo" className="w-40 lg:w-96" />
              <h1 className="text-3xl font-medium mt-4 leading-5 ">
                show your work to inspire everyone
              </h1>
              <p className="mt-2 text-s text-gray-600">
                WaysGallery is a website design creators gather to share their
                work with other creators
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  className="px-5 py-3 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm hover:bg-[#2aa193]"
                  onClick={() => setShowSignup(true)}
                >
                  Join Now
                </button>
                <button
                  className="px-5 py-3 rounded-md text-slate-800 font-medium bg-[#E7E7E7] text-xs lg:text-sm hover:text-white hover:bg-[#2FC4B2]"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <img src={programmerlogo} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ModalLogin
        show={showLogin}
        showLogin={setShowLogin}
        showSignup={setShowSignup}
      />
      <ModalRegister
        show={showSignup}
        showLogin={setShowLogin}
        showSignup={setShowSignup}
      />
    </>
  );
}
