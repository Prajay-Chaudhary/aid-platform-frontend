import React, { useState, useRef } from "react";
import LocateUser from "./LocateUser";
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
  const [currentBoundaries, setCurrentBoundaries] = useState(null);
  const ref = useRef();
  const cancelRef = useRef();

  //object represents a latitude and longitude coordinate
  const request = {
    latitude: 59.0,
    longitude: 48
  };
  const position = [51.505, -0.09]; //variable holds a default position for the map

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

  let counter = 0;

  //Fetching the data and returning the map
  //iterates over request array & checks if its latitude and longitude fall within the current map boundaries obtained from mapRef.current.getBounds(). 
  //If a request falls within the boundaries, the counter is incremented.
  for (let i = 0; i < request.length; i++) {
    if (
      request[i].latitude >= mapRef.current.getBounds()._southWest.lat &&
      request[i].latitude <= mapRef.current.getBounds()._northEast.lat &&
      request[i].longitude >= mapRef.current.getBounds()._southWest.lng &&
      request[i].longitude <= mapRef.current.getBounds()._northEast.lng
    )
      counter++;
  }

  //render the data on the map
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      ref={mapRef} //prop assigns the mapRef reference to the MapContainer.
      className="z-20"
    >
      <LocateUser />
      {/* This component listens for map events and updates the currentBoundaries state accordingly. */}
      <InnerComponent setBoundaries={setCurrentBoundaries} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={{ lat: request.latitude, lng: request.longitude }}>
        <Popup>hello</Popup>
      </Marker>
    </MapContainer>
  );
}
export default ShowMap;
