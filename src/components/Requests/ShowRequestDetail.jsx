import React from 'react';
import { Button, Card, Avatar } from 'flowbite-react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { AdjustmentsHorizontalIcon, HandRaisedIcon, ClipboardDocumentListIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useLocation } from 'react-router-dom'; //hook is used to access the location state in the target component.
import L from 'leaflet';

const ShowRequestDetail = () => {

  const location = useLocation();
  const { request } = location.state || {}; //variable will be assigned the value of location.state.request

  if (!request) {
    return null; // Render nothing if request is null or undefined
  }

  const handleClicked = () => {
    // will be redirected to the conversation page with the request.owner_id as a route parameter.
    window.location = `/chat/${request.owner_id}`;

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
      <div className='bg-zinc-100'>
        <div className='p-3 bg-white shadow-lg p-1 lg:pl-6'>
          <div>
            <h2 className="text-gray-800 font-extrabold text-4xl mb-2">{request.title}</h2>
          </div>
          <div className='flex flex-row'>
            <div className='mr-5'>
              <Avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="image"
                rounded={true} />
            </div>
            <div className='flex flex-col mb-1'>
              <div>
                <p className='text-l font-normal font-zinc-300'> Hosted By:</p>
              </div>
              <div>
                <p className='text-xl font-bold'>{request.owner_full_name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:p-4 p-1 mx-2 mt-2 lg:mt-4">
          <div className="lg:flex flex-row">
            <div className="lg:w-6/12 flex flex-col lg:mr-8">
              <div className="mb-4">
                <img className="h-full w-full lg:h-96 lg:w-{150} rounded-lg" src={request.image} alt="request image" />
              </div>
              <div className="pr-4 mb-8">
                <p className='text-2xl font-bold'>DESCRIPTIONS</p>
                <p className="text-black-600 min-h-40 max-h-96 overflow-y-auto">{request.description}</p>
              </div>
            </div>
            <div className="lg:w-6/12 flex flex-col">
              <div className='mb-4'>
                <Card className="mb-2 flex flex-row w-11/12 lg:w-6/12 float-center">
                  <div className='flex flex-row mb-1'>
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
                  <div className='flex flex-row mb-1'>
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
              </div>
              <div>
                <div className='mb-4'>
                  <span className='text-2xl font-bold mb-1'>
                    Address:
                  </span> <span>({request.address})</span>
                </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end mr-6 py-4 items-center">
        <div className='mr-2'>
          <Button
            size="lg"
            onClick={handleShareClick}
            gradientDuoTone="purpleToPink"
            outline>
            <span>Share</span>  <span><ShareIcon className="h-6 w-6 text-green-500 ml-2" /></span>
          </Button>
        </div>
        <div>
          <Button
            gradientMonochrome="success"
            type='submit'
            onClick={handleClicked}
            size="lg"
          ><span>Fulfill</span> <span><HandRaisedIcon className="h-6 w-6 text-red-200 ml-2" /></span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowRequestDetail;



