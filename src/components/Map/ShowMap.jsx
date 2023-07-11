import React, { useEffect, useState, useRef } from "react";
import LocateUser from "./LocateUser";
import { Card, Button, Tooltip } from 'flowbite-react';
import ShowRequestDetail from "../Requests/ShowRequestDetail"
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaLocationArrow } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../../config/apiConfig";
import { token } from "../../utils/auth";
import L from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ShowMap = () => {
  //mapRef is used to reference the MapContainer component
  const mapRef = useRef();
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  //loading time
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])



  const locataeMe = () => {
    window.location = "/requests"
  };

  //to show the selected request after clicking show details button
  const handleClicked = (request) => {
    setSelectedRequest(request);
    navigate('/request-details', { state: { request } }); //navigate to the "/request-details" route and pass the request object as state.


  };

  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });


  const markerIcon2 = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });



  //this is the component that we will use to get the boundries of the map
  //we will be able to drag the map and get the boundaries in longitude and latitude
  const InnerComponent = ({ setBoundaries }) => {
    // hook to listen for the moveend and dragend events of the map 
    useMapEvents({
      moveend() {
        const map = mapRef.current;
        if (map != null) {
          const { _southWest, _northEast } = map.getBounds(); //the current map boundaries are retrieved using the getBounds() method.
          //function is called to update the currentBoundaries state.
          setBoundaries({
            _southWest: [_southWest.lat, _southWest.lng],
            _northEast: [_northEast.lat, _northEast.lng]
          });
        }
      },
      dragend() {
        const map = mapRef.current;
        if (map != null) {
          const { _southWest, _northEast } = map.getBounds();
          setBoundaries({
            _southWest: [_southWest.lat, _southWest.lng],
            _northEast: [_northEast.lat, _northEast.lng]
          });
        }
      }
    });
    return null;
  };




  //get requests from the backend
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/requests`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        }
      });

      const data = await res.json();
      setRequest(data);

      console.log('requests', data);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  let counter = 0;

  return (
    <>
      <div className="relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} ref={mapRef} className="z-0 h-screen w-screen">
          <LocateUser />
          <InnerComponent setBoundaries={() => { }} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {request.map((request) => {
            const { id, latitude, longitude, request_type, image, description, title } = request;
            const isOnetime = request_type === 'onetime';
            const markerIconToUse = isOnetime ? markerIcon : markerIcon2;

            //conditional statement that checks whether a request's latitude and longitude fall within the current boundaries of the map.
            // If the condition is true, the counter variable is incremented.
            if (
              latitude >= mapRef.current.getBounds()._southWest.lat &&
              latitude <= mapRef.current.getBounds()._northEast.lat &&
              longitude >= mapRef.current.getBounds()._southWest.lng &&
              longitude <= mapRef.current.getBounds()._northEast.lng
            ) {
              counter++;
            }

            return (
              <Marker key={id} position={{ lat: latitude, lng: longitude }} icon={markerIconToUse}>
                <Popup className="max-h-[250px] min-w-[390px]">
                  <Card className="min-w-[350px] max-h-[225px]">
                    <div className="flex flex-row gap-4">
                      <div className="max-h-[250px] min-h-[200px] max-w-[150px]">
                        <img src={image} alt="request image" className="min-h-[175px] rounded " />
                      </div>
                      <div className="text-center">
                        <div>
                          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {request_type}
                          </h5>
                        </div>
                        <div>
                          <p className="font-normal text-gray-700 dark:text-gray-400">{title}</p>
                        </div>
                        <div>
                          <Button size="sm" className="background-color hover:bg-yellow-900" onClick={() => handleClicked(request)}>
                            <span>See details</span>
                            <ArrowRightIcon className="h-6 w-6 text-black mr-1 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <ShowRequestDetail request={selectedRequest} />
        <div className="absolute top-20 z-10">
          <Tooltip
            content="Locate me"
            placement="right"
            style="light"
          >
            <button className="font-bold py-2 px-4 rounded txt-color text-2xl" onClick={locataeMe}>
              <FaLocationArrow />
            </button>
          </Tooltip>

        </div>
      </div>
    </>
  );
};

export default ShowMap;