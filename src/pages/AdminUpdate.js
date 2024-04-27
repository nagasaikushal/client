import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { FormControlLabel, Checkbox, TextField, Button } from '@mui/material';
import config from '../config';

const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
        isHotel: false
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setData({
            ...data,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.url}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success("Updated Successfully");
            } else {
                toast.error("Not Updated");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getSingleUserData = async () => {
            try {
                const response = await fetch(`${config.url}/api/admin/users/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const userData = await response.json();
                setData(userData);
            } catch (error) {
                console.log(error);
            }
        };

        getSingleUserData();
    }, [params.id, authorizationToken]); // Only re-run the effect if params.id or authorizationToken change

    return (
        <>
            <section id="contact">
                <h1 className="section-header">Update User Details</h1>
                <div className="contact-wrapper">
                    <form id="contact-form" className="form-horizontal" onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            id="username"
                            placeholder="Name"
                            name="username"
                            value={data.username}
                            onChange={handleInput}
                            autoComplete='off'
                            required
                            sx={{ mb: 2, width: '400px', color: 'white',backgroundColor:'white',borderRadius:'10px' }}
                        />
                        {/* Other input fields */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.isHotel}
                                    onChange={handleInput}
                                    name="isHotel"
                                    color="primary"
                                />
                            }
                            label="Is Hotel Owner?"
                            sx={{ mb: 2 }}
                        />
                        <br>
                        </br>
                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                              maxWidth:'350px'
                            }}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AdminUpdate;
