import { ReactChildren, FunctionComponent, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChipIcon, MenuIcon } from '@heroicons/react/solid';
import { NavLink } from './NavLink';

const navigation = [
  { name: 'Dashboad', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const Header: FunctionComponent = ({
  children,
}: {
  children: ReactChildren;
}) => {
  return (
    <header>
      <nav className="flex items-center justify-between p-6 container mx-auto ">
        <a href="#">
          <ChipIcon className="text-green-600 h-5 w-5" />
        </a>
        <div className="text-lg text-gray-600 hidden lg:flex">
          <NavLink href="#" displayName="Home" />
          <NavLink href="#" displayName="Services" />
          <NavLink href="#" displayName="Portfolio" />
          <NavLink href="#" displayName="Company" />
          <NavLink href="#" displayName="Contact" />
        </div>
        <div className="flex items-center">
          <div className="hidden lg:block mr-5 ">
            <button className="py-2 px-6 rounded-md text-gray-600 hover:text-gray-700 text-lg">
              Sign in
            </button>
            <button className="py-2 px-6 bg-green-500 rounded-md text-white hover:bg-green-600 text-lg">
              Sign up
            </button>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-4 py-3 border rounded  border-green-500 focus:outline-none">
              <MenuIcon name="Menu" className="text-green-500" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
