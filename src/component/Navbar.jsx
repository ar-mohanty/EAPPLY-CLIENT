import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import brandLogo from "../assets/brandLogo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
  { name: "Network", href: "/network" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <>
      <header className="sticky top-0 z-10 backdrop-blur-md border-b border-gray-300 shadow-sm">
        <nav
          className="flex items-center justify-between py-5 px-10 lg:px-8 lg:py-0 lg:justify-center"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src={brandLogo} alt="logo" className="h-10 lg:h-8 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>

          {user ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
              <a
                href="/#"
                className="py-3 text-base font-medium px-7 text-dark hover:text-primary lg:flex items-center gap-2"
              >
                <img
                  src={user.photos[0].value}
                  alt="profile image"
                  className="rounded-full"
                  height={38}
                  width={38}
                />
              </a>
              <a
                onClick={logout}
                className="text-sm font-semibold leading-6 text-red-500 cursor-pointer"
              >
                Logout <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end py-3">
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  src={brandLogo}
                  alt="logo"
                  className="h-10 lg:h-8 w-auto"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Navbar;
