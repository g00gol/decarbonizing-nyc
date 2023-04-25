import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = {
  "/": "Home",
  "/overview": "Project Overview",
  "/team": "Team",
  "/prototype": "Prototype",
  "/map": "Opportunity Map",
  "/nysderda": "NYSERDA Application",
};

export default function Nav() {
  const [showNav, setShowNav] = useState(false);

  function toggleNav() {
    setShowNav(!showNav);
  }

  return (
    <>
      <button
        onClick={toggleNav}
        className={
          "z-20 flex text-3xl fixed left-0 top-0 m-4 bg-black/50 border-0 backdrop-blur rounded-lg shadow-md px-4 py-2 text-white transition-all" +
          (showNav ? " left-[-20%]" : " left-0")
        }
      >
        <GiHamburgerMenu />
        <p className="ml-4 text-lg">NYC Heat Recovery</p>
      </button>

      <header
        className={
          "z-20 fixed w-nav modal h-screen flex flex-col justify-start items-center transition-all space-y-8" +
          (showNav ? " left-0" : " left-[-20%]")
        }
      >
        <button
          onClick={toggleNav}
          className="z-20 text-3xl fixed left-0 top-0 m-4 px-4 py-2 text-white"
        >
          <GiHamburgerMenu />
        </button>

        <Link
          onClick={() => setShowNav(false)}
          className="w-fit h-fit mt-8"
          href="/"
        >
          <img className="w-[4vw]" src="/images/logo.svg" alt="logo" />
        </Link>

        {Object.keys(navItems).map((key) => (
          <Link key={key} onClick={() => setShowNav(false)} href={key}>
            {navItems[key]}
          </Link>
        ))}
      </header>
    </>
  );
}
