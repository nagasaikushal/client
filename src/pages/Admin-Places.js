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

  const navigate=useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      const imagesArray = value.split(',');
      setPlaceData({ ...placeData, [name]: imagesArray });
    } else if (name.includes('location.')) {
      const [locationField, subField] = name.split('.');
      setPlaceData({
        ...placeData,
        location: {
          ...placeData.location,
          [subField]: value
        }
      });
    } else if (name.includes('contactInformation.')) {
      const [contactField, subField] = name.split('.');
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
        <TextField
          label="Title"
          fullWidth
          name="title"
          value={placeData.title}
          onChange={handleChange}
          required
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          name="description"
          multiline
          rows={4}
          value={placeData.description}
          onChange={handleChange}
          required
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <h3>Location:</h3>
        <TextField
          label="Address"
          fullWidth
          name="location.address"
          value={placeData.location.address}
          onChange={handleChange}
          required
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="City"
          fullWidth
          name="location.city"
          value={placeData.location.city}
          onChange={handleChange}
          required
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="State"
          fullWidth
          name="location.state"
          value={placeData.location.state}
          onChange={handleChange}
          required
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Country"
          fullWidth
          name="location.country"
          value={placeData.location.country}
          onChange={handleChange}
          required
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />

        <TextField
          label="Images (Separate URLs with commas)"
          fullWidth
          name="images"
          value={placeData.images.join(',')}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Video"
          fullWidth
          name="video"
          value={placeData.video}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Opening Hours"
          fullWidth
          name="openingHours"
          value={placeData.openingHours}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Entry Fees"
          fullWidth
          name="entryFees"
          value={placeData.entryFees}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <h3>Contact Information:</h3>
        <TextField
          label="Phone"
          fullWidth
          name="contactInformation.phone"
          value={placeData.contactInformation.phone}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Email"
          fullWidth
          name="contactInformation.email"
          value={placeData.contactInformation.email}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <TextField
          label="Website"
          fullWidth
          name="contactInformation.website"
          value={placeData.contactInformation.website}
          onChange={handleChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            '& label': {
              color: '#0b0b0b',
            },
            '&:hover label': {
              color: '#4caf50',
            },
          }}
        />
        <Button type="submit" variant="contained" className="submit-btn">Add Place</Button>
      </form>
    </div>
  );
};

export default AdminPlaces;
