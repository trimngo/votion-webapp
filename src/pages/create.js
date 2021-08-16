import React from 'react';

const create = () => {
  return (
    <>
    <div class="min-h-screen bg-gray-50 text-blue-900 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-4 sm:max-w-xl mx-auto text-center">
        <span class="text-2xl font-bold">Create a new Votion! Account</span>
        <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div class="h-2 bg-yellow-400 rounded-t-md"></div>
          <div class="py-7 px-8">
            <label class="block font-semibold">Name</label>
            <input type="text" placeholder="Name" class=" border w-full h-8 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-yellow-600 rounded-md" />
            <label class="block font-semibold">Email</label>
            <input type="text" placeholder="Email" class=" border w-full h-3 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-yellow-600 rounded-md" />
            <label class="block mt-3 font-semibold">Password</label>
            <input type="password" placeholder="Password" class=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-yellow-600 rounded-md" />
            <div class="flex justify-between items-baseline">
              <button class="mt-4 bg-yellow-600 text-white py-2 px-6 rounded-lg">Create</button>
              <button class="text-sm hover:underline">Need help?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default create;
