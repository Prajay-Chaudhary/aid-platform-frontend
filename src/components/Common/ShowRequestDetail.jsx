import React, { useState } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button, Card } from 'flowbite-react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import L from 'leaflet';
import Fulfill from '../Modal/Fulfill';

const ShowRequestDetail = ({ setModalOn, request }) => {
  const [alertOn, setAlertOn] = useState(false);

  const handleClicked = () => {
    setAlertOn(true);
  };

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

  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl w-full sm:w-10/12 md:w-9/12 lg:w-10/12">
          <div className="flex justify-end pr-4 pt-4">
            <button onClick={handleCancelClick}>
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-gray-800 font-extrabold text-4xl mb-2">{request.title}</h2>
            <div className="flex">
              <div className="w-2/5 pr-4">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img className="object-cover w-full" src={request.image} alt="request image" />
                </div>
                <div className="md:w-1/2 pr-4">
                  <p className='text-2xl font-bold'>DESCRIPTIONS</p>
                  <p className="text-gray-600 min-h-40 max-h-96 overflow-y-auto">{request.description}</p>
                </div>

              </div>
              <div className="w-3/5">
                <Card className="mb-2 flex-row">
                  <div className='flex mb-1'>
                    <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-500" />
                    <div className='ml-1'>
                      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Type of request:
                      </h5>
                      <p className='ml-1 text-red-800'>
                        {request.request_type}
                      </p>
                    </div>
                  </div>
                  <div className='flex mb-1'>
                    <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                    <div className='ml-1'>
                      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Status:
                      </h5>
                      <p className='ml-1 text-red-800'>
                        {request.request_status}
                      </p>
                    </div>
                  </div>
                </Card>
                <div className="">
                  <h1 className='text-2xl font-bold'>
                    Address:
                  </h1>
                  <MapContainer center={[request.latitude, request.longitude]} zoom={13} scrollWheelZoom={false} className='rounded-xl z-0' style={{ width: '100%', height: '400px' }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[request.latitude, request.longitude]} icon={markerIcon}>
                      <Popup>{request.address}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleShareClick}>
                    Share
                  </Button>
                  <Button type='submit' colorScheme='teal' onClick={handleClicked} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Fulfill</Button>
                </div>
              </div>
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
