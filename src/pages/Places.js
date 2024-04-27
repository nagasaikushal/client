import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Places = () => {
    const { places } = useAuth();
    const navigate = useNavigate();

    const handleBookNow = () => {
        // Navigate to the desired page when "Book Now" button is clicked
        navigate('/BookingScreen');
    };

    return (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', color: 'black' }}>
            <h2 style={{ textAlign: 'center', color: 'blue' }}>Explore Amazing Places</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {places && places.map(place => (
                    <div key={place._id} style={{ width: '300px', margin: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'silver' }}>
                        <div style={{ backgroundColor: 'white', padding: '20px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                {place.images.length > 0 ? (
                                    place.images.map((image, index) => (
                                        <img key={index} src={image} alt={`${index + 1}`} style={{ width: '100%', borderRadius: '10px' }} />
                                    ))
                                ) : (
                                    <img src="/default-image.jpg" alt="Default" style={{ width: '100%', borderRadius: '10px' }} />
                                )}
                            </div>
                            <div> 
                                <h3 style={{ color: 'black' }}>{place.title}</h3>
                                <p style={{ color: 'black' }}>{place.description}</p>
                                <p><strong style={{ color: 'black' }}>Location:</strong> {place.location.address}, {place.location.city}, {place.location.state}, {place.location.country}</p> 
                                {place.video && <p style={{ color: 'black' }}><strong>Video:</strong> <a href={place.video}>Watch Video</a></p>}
                                <p style={{ color: 'black' }}><strong>Opening Hours:</strong> {place.openingHours}</p>
                                <p style={{ color: 'black' }}><strong>Entry Fees:</strong> {place.entryFees}</p>
                                <p style={{ color: 'black' }}><strong>Contact Information:</strong> Phone: {place.contactInformation.phone}, Email: {place.contactInformation.email}, Website: <a href={place.contactInformation.website}>{place.contactInformation.website}</a></p>
                                <button onClick={handleBookNow} style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Book Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Places;
