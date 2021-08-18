import React from 'react';

const forgotpass = () => {
  return (
    <>
   
    <div class="min-h-screen bg-gray-50 text-blue-900 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-4 sm:max-w-xl mx-auto text-center">
      <img
    className="h-14 w-auto"
    src="https://static.wixstatic.com/media/5c4159_e7b3aba60abb43b2b242319fcea9c60f~mv2.png/v1/fill/w_347,h_178,al_c,usm_0.66_1.00_0.01/Fakelogo.png"
    alt="Workflow"
                /> 
    <div class="relative py-4 sm:max-w-xl mx-auto text-center">
      </div>            
        <span class="text-2xl font-bold">Forgot Username/Password</span>
        <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div class="h-2 bg-yellow-400 rounded-t-md"></div>
          <div class="py-7 px-8">
            <label class="block font-semibold text-center">Please provide the email address you used to sign up for an account</label>
            <label class="block font-semibold">Email</label>
            <input type="text" placeholder="Email" class=" border w-full h-3 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-yellow-600 rounded-md" />
            <div class="flex justify-between items-baseline">
              <button class="mt-4 bg-yellow-600 text-white py-2 px-6 rounded-lg">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default forgotpass;
