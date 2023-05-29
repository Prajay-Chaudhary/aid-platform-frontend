import React, { useState, useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import LoadingScreen from "./LoadingScreen";

const LocateUser = () => {
  const [loading, setLoading] = useState(true);

  // loading screen only on window load
  useEffect(() => {
    //set a timeout of 4500 milliseconds to simulate the loading screen, 
    //then the loading state is set to false, indicating that the loading is complete.
    setTimeout(() => setLoading(false), 4500);
  }, []);

  const map = useMapEvents({
    locationfound(e) {
      //map is panned to the user's location using the panTo method, 
      //and the view is set to the user's location using the setView method. 
      map.panTo(e.latlng, map.setView(e.latlng));
      //save location to user session
      sessionStorage.setItem("userLocation", JSON.stringify(e.latlng));
      localStorage.setItem("userLocation", JSON.stringify(e.latlng));
      map.loading = false;
      setLoading(false);
    }
  });

  //automatically trigger the map.locate() method when the map object changes.
  //This ensures that the user's location is initially located when the component mounts and whenever the map object changes.
  useEffect(() => {
    map.locate();
  }, [map]);

  if (loading) {
    return <LoadingScreen />;
  } else if (!loading) {
    return null;
  }
};
export default LocateUser;
