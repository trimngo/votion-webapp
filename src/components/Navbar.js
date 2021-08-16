import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggle }) => {
  return (
    <nav
      className='flex justify-between items-center h-16 bg-grey-50 text-blue-900 relative shadow-sm font-mono font-medium'
      role='navigation'
    >
      <Link to='/' className='pl-8'>
        Votion!
      </Link>
      <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='yellow-600'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </div>
      <div className='pr-8 md:block  hidden'>
        <Link to='/' className='p-4'>
          Login
        </Link>
        <Link to='/create' className='p-4'>
          Create
        </Link>
        <Link to='/menu' className='p-4'>
          My profile
        </Link>
        <Link to='/about' className='p-4'>
          About Votion
        </Link>
        <Link to='/contact' className='p-4'>
          Projects
        </Link>
        <Link to='/delegation' className='p-4'>
          Help
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
