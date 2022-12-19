import {Fragment} from 'react';
import { Menu, Transition } from "@headlessui/react";
import { IoSearch, IoPersonCircleOutline } from "react-icons/io5";
import logo from "../assets/logo.svg"
import { Link } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  return (
    <div className="bg-gray-500 h-[240px] pt-8 flex bg-header bg-no-repeat bg-center bg-cover">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between">
          <Link to={"/"}><img src={logo} alt=""/></Link>
          <div className="flex align-center gap-6">
            <IoSearch size="30" fill="white"/>
            <Menu as="div" className="relative text-left self-center">
              <Menu.Button className="flex">
                <IoPersonCircleOutline size="30" fill="white"/>
              </Menu.Button>
              <Menu.Items className="absolute right-0 top-6 z-10 mt-3.5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                  {({active}) => (
                    <Link
                      to="/profile"
                      className={"w-full " + classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Мой профиль
                    </Link>
                  )}
                  </Menu.Item>
                  <Menu.Item>
                    {({active}) => (
                      <button
                        className={"w-full text-left " + classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Выйти
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            <Menu as="div" className="relative text-left self-center">
              <div>
                <Menu.Button className="flex flex-col justify-center gap-1.5">
                  <div className="w-6 h-0.5 bg-white"></div>
                  <div className="w-6 h-0.5 bg-white"></div>
                  <div className="w-6 h-0.5 bg-white"></div>
                </Menu.Button>
                <Menu.Items className="absolute right-0 top-6 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/favorites"
                          className={"w-full " + classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Избранные новости
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </div>
            </Menu>
          </div>
        </div>
        <h2 className="text-center font-medium text-6xl text-white flex items-center justify-center align-middle h-full">Новости</h2>
      </div>
    </div>
  );
};

export default Header;
