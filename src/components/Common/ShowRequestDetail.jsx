import React, { useState } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button } from 'flowbite-react';
import Fulfill from '../Modal/Fulfill';

//The request prop is added to the component, 
//which will receive the specific request data for the clicked marker
const ShowRequestDetail = ({ setModalOn, request }) => {

  const [alertOn, setAlertOn] = useState(false);

  const handleClicked = () => {
    setAlertOn(true);
  };

  //to remove the modal after clicking X button
  const handleCancelClick = () => {
    setModalOn(false);
  };

  //to share the modal details to another platform
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: request.title,
        text: request.description,
        url: window.location.href
      })
        .then(() => {
          console.log('Request shared successfully.');
        })
        .catch((error) => {
          console.error('Error sharing request:', error);
        });
    } else {
      console.warn('Web Share API not supported.');
    }
  };

  return (
    <>
      <div className="bg-zinc-200 fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
          <div className="flex justify-end pr-4 pt-4">
            <button onClick={handleCancelClick}>
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-gray-800 font-medium text-xl mb-2">{request.title}</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img className="object-cover w-full" src={request.image} alt="request image" />
            </div>
            <div>
              <p className="text-gray-600 min-h-40 max-h-96 overflow-y-auto">{request.description}</p>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleShareClick}
              >
                Share
              </Button>
              <Button type='submit' colorScheme='teal' onClick={() => handleClicked()} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Fulfill</Button>
            </div>
          </div>
        </div>
        {alertOn && (
          <div className="z-50 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white p-4">
              <Fulfill setAlertOn={setAlertOn} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowRequestDetail;
