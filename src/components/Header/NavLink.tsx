import { NextPage } from 'next';

interface NavLinkProps {
  href: string;
  displayName: string;
}

export const NavLink: NextPage<NavLinkProps> = ({ href, displayName }) => {
  return (
    <a
      href={href}
      className="block mt-4 lg:inline-block hover:text-gray-700 lg:mt-0 mr-10"
    >
      {displayName}
    </a>
  );
};
