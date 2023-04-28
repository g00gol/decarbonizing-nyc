import { GiHamburgerMenu } from "react-icons/gi";
import { RxCaretDown } from "react-icons/rx";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = {
  Home: "/",
  "Project Overview": "/overview",
  Team: "/team",
  "Project Progress": {
    "Phase 1": "/progress/phase1",
    "Phase 2": "/progress/phase2",
  },
  "System Design & Technical Analysis": "/design",
  Prototypes: {
    "Alpha Prototype": "/prototypes/alpha",
    "Beta Prototype/Scale Model": "/prototypes/beta",
  },
  "Opportunity Map": "/map",
  "NYSERDA Application": "/nyserda",
};

export default function Nav() {
  const [showNav, setShowNav] = useState(false);

  function toggleNav() {
    setShowNav(!showNav);
  }

  function toggleDropdown(key) {
    let dropdown = document.getElementById(key);
    dropdown.classList.toggle("hidden");
  }

  return (
    <>
      <button
        onClick={toggleNav}
        className={
          "z-30 flex text-3xl fixed left-0 top-0 m-4 bg-black/50 border-0 backdrop-blur rounded-lg shadow-md px-4 py-2 text-white transition-all" +
          (showNav ? " left-[-20%]" : " left-0")
        }
      >
        <GiHamburgerMenu />
        <p className="ml-4 text-lg">NYC Heat Recovery</p>
      </button>

      <header
        className={
          "z-30 [&>a]:text-white fixed w-nav modal rounded-none h-screen flex flex-col justify-start items-center transition-all space-y-8 [&>a]:transition-all [&>a:hover]:text-gray-300" +
          (showNav ? " left-0" : " left-[-20%]")
        }
      >
        <button
          onClick={toggleNav}
          className="z-30 text-3xl fixed left-0 top-0 m-4 px-4 py-2 text-white"
        >
          <GiHamburgerMenu />
        </button>

        <Link
          onClick={() => setShowNav(false)}
          className="w-fit h-fit mt-8"
          href="/"
        >
          <img className="w-[2vw]" src="/images/logo.svg" alt="logo" />
        </Link>

        {/* Map the navItems into links. If the value type is object, there is a dropdown */}
        {Object.entries(navItems).map(([key, value]) => {
          if (typeof value === "object") {
            return (
              <>
                <button
                  key={key}
                  className="cursor-pointer flex items-center"
                  onClick={() => toggleDropdown(key)}
                >
                  {key} <RxCaretDown />
                </button>
                <div
                  id={key}
                  key={key}
                  className="underline transition-all flex flex-col items-center"
                  hidden
                >
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <Link
                      className="text-white"
                      onClick={() => setShowNav(false)}
                      key={subKey}
                      href={subValue}
                    >
                      {subKey}
                    </Link>
                  ))}
                </div>
              </>
            );
          } else {
            return (
              <Link onClick={() => setShowNav(false)} key={key} href={value}>
                {key}
              </Link>
            );
          }
        })}
      </header>
    </>
  );
}
