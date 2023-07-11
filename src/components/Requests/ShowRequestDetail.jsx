import React, { useState } from 'react';
import { Button, Card, Avatar } from 'flowbite-react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { AdjustmentsHorizontalIcon, HandRaisedIcon, ClipboardDocumentListIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useLocation } from 'react-router-dom'; //hook is used to access the location state in the target component.
import L from 'leaflet';
import API_BASE_URL from '../../config/apiConfig';

const ShowRequestDetail = () => {

  const location = useLocation();
  const token = JSON.parse(sessionStorage.getItem('token'));
  const current_user = JSON.parse(sessionStorage.getItem('user'));
  const [fulfillement, setFulfillement] = useState([]);
  const { request } = location.state || {}; //variable will be assigned the value of location.state.request

  if (!request) {
    return null; // Render nothing if request is null or undefined
  }

  const handleClicked = async (e) => {
    const fulfillmentData = {
      user_id: current_user.id,
      request_id: request.id
    }

    // will be redirected to the conversation page with the request.owner_id as a route parameter.
    window.location = `/chat/${request.owner_id}`;

    //Send a POST request to the fulfillment controller
    try {
      const response = await fetch(`${API_BASE_URL}/fulfillments`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        },
        body: JSON.stringify(fulfillmentData)
      });
      const data = await response.json()
      setFulfillement(data)
      console.log('Fulfillment created:', data);
    } catch (error) {
      // Handle the error
      console.error('Error creating fulfillment:', error);
    }
  }


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
            <h2 className="txt-color font-extrabold text-4xl mb-2">{request.title}</h2>
          </div>
          <div className='flex flex-row'>
            <div className='mr-5'>
              <Avatar rounded />
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
                <img className="object-contain h-full w-full lg:h-96 lg:w-{150} rounded-lg" src={request.image} alt="request image" />
              </div>
              <div className="pr-4 mb-8">
                <p className='text-2xl font-bold txt-color mb-3'>DESCRIPTIONS</p>
                <div className='h-[200px] bg-white rounded-lg'>
                  <p className="text-black-600 min-h-40 max-h-96 overflow-y-auto p-3">{request.description}</p>
                </div>
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
                  <span className='text-xl font-bold mb-1 txt-color'>
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
            color="gray"
            className='hover:text-yellow-900 hover:text-yellow-900 focus:outline-none focus:ring-4 focus:text-yellow-900 focus:ring-yellow-900 dark:focus:ring-yellow-900'
            outline>
            <span>Share</span>  <span><ShareIcon className="h-6 w-6 txt-color ml-2" /></span>
          </Button>
        </div>
        <div>
          <Button
            className='background-color hover:bg-yellow-900'
            type='submit'
            onClick={handleClicked}
            size="lg"
            disabled={request?.owner_id === current_user.id} //disabled the button if current user
          ><span>Fulfill</span> <span><HandRaisedIcon className="h-6 w-6 text-black ml-2" /></span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowRequestDetail;



