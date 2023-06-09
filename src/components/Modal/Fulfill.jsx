import React from 'react'
import { Button } from 'flowbite-react';
import { InformationCircleIcon } from "@heroicons/react/24/outline";


const Fulfill = ({ setAlertOn }) => {

  const handleCancelClick = () => {
    setAlertOn(false);
  };

  return (
    <>
      <div className="bg-zinc-200 fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
          <div className='mt-2'>
            <InformationCircleIcon className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-500" />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-gray-800 font-medium text-xl mb-2">Are you sure?, you want to fulfill this request?</h2>
          </div>
          <div className="flex justify-center my-4 gap-2">
            <Button
              className="px-2 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-800"
            >
              Send Message
            </Button>
            <Button type='submit' onClick={handleCancelClick} colorScheme='teal' className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-800">Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fulfill