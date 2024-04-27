import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import './AdminPlaces.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const AdminPlaces = () => {
  const [placeData, setPlaceData] = useState({
    title: '',
    description: '',
    location: {
      address: '',
      city: '',
      state: '',
      country: ''
    },
    images: [],
    video: '',
    openingHours: '',
    entryFees: '',
    contactInformation: {
      phone: '',
      email: '',
      website: ''
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      const imagesArray = value.split(',');
      setPlaceData({ ...placeData, [name]: imagesArray });
    } else if (name.includes('location.')) {
      const [, subField] = name.split('.');
      setPlaceData({
        ...placeData,
        location: {
          ...placeData.location,
          [subField]: value
        }
      });
    } else if (name.includes('contactInformation.')) {
      const [, subField] = name.split('.');
      setPlaceData({
        ...placeData,
        contactInformation: {
          ...placeData.contactInformation,
          [subField]: value
        }
      });
    } else {
      setPlaceData({ ...placeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/api/places/data`, placeData);
      console.log(response.data);
      toast.success('Place added successfully!');
      navigate('/places');
    } catch (error) {
      console.error('Error adding place:', error);
      toast.error('Error in adding the place!');
    }
  };

  return (
    <div className="admin-places-container">
      <h2>Add New Place</h2>
      <form onSubmit={handleSubmit} className="place-form">
        {/* Form fields */}
        <Button type="submit" variant="contained" className="submit-btn">Add Place</Button>
      </form>
    </div>
  );
};

export default AdminPlaces;
