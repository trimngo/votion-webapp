import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggle }) => {
  return (
    <nav
      className='flex justify-between items-center h-16 bg-grey-100 text-blue-900 relative shadow-sm font-mono font-medium'
      role='navigation'
    >

<img
    className="h-14 w-auto"
    src="https://static.wixstatic.com/media/5c4159_e7b3aba60abb43b2b242319fcea9c60f~mv2.png/v1/fill/w_347,h_178,al_c,usm_0.66_1.00_0.01/Fakelogo.png"
    alt="Workflow"
                /> 
                
      <Link to='/' className='p-10'>
        Votion!
      </Link>
      <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
        <svg
          className='w-2 h-2'
          fill='none'
          stroke='yellow-600'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >


          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='4'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </div>
      <div className='pr-1 md:block  hidden'>
        <Link to='/' className='p-2'>
          Login
        </Link>
        <Link to='/create' className='p-2'>
          Create
        </Link>
        <Link to='/menu' className='p-2'>
          My profile
        </Link>
        <Link to='/about' className='p-2'>
          About Votion
        </Link>
        <Link to='/contact' className='p-2'>
          Projects   
        </Link>
        <Link to='/delegation' className='p-2'>
          Help
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
