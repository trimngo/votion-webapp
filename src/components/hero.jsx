import React from 'react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div class="min-h-screen bg-gray-50 text-blue-900 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl mx-auto text-center">
        <span class="text-2xl font-bold">Login to your Votion! account</span>
        <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div class="h-2 bg-yellow-400 rounded-t-md"></div>
          <div class="py-6 px-8">
            <label class="block font-semibold">Username or Email</label>
            <input type="text" placeholder="Email" class=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md" />
            <label class="block mt-3 font-semibold">Password</label>
            <input type="password" placeholder="Password" class=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md" />
            <div class="flex justify-between items-baseline">
              <button class="mt-3 bg-yellow-600 text-white py-2 px-5 rounded-lg">Login</button>
              
              <button class="text-vs hover:underline">
                <Link to='/forgotpass' className='p-2'>Forgot Password</Link>
              </button>
              <button class="text-vs hover:underline">New user?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
