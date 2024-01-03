import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import API_BASE_URL from '../../config/apiConfig';
import { token } from '../../utils/auth';
import { toast } from 'react-toastify';

const FavoriteButton = ({ requestId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heartRef = useRef(null);

  const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Useeffect to check the status if the request has been marked as favourite
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/favorites/check?request_id=${requestId}`, { headers });
        setIsFavorited(response.data.isFavorited);
        setIsLoading(false);  // Set loading to false after fetching
      } catch (error) {
        console.error("Error checking favorite status:", error);
        setIsLoading(false);  // Handle loading state in case of an error
      }
    };

    checkFavoriteStatus();
  }, [requestId]);

  useEffect(() => {
    if (isFavorited) {
      heartRef.current.style.color = 'red';
    }
  }, [isFavorited]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorited) {
        // Remove from favorites logic
        await axios.delete(`${API_BASE_URL}/favorites/destroy?request_id=${requestId}`, { headers });
      } else {
        // Add to favorites logic
        await axios.post(`${API_BASE_URL}/favorites`, { request_id: requestId }, { headers });
      }

      setIsFavorited(!isFavorited);

      // Show success toast
      toast.success(`Successfully ${isFavorited ? 'removed from' : 'added to'} favorites!`);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to toggle favorite.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <button onClick={handleToggleFavorite} className="text-white">
      <div ref={heartRef} style={{ color: isFavorited ? 'red' : 'black' }}>
        <FaHeart />
      </div>
    </button>
  );
};

export default FavoriteButton;
