import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import config from '../config';

const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contactData, setContactData] = useState([]);

  // Wrap the definition of getContactsData in useCallback
  const getContactsData = useCallback(async () => {
    try {
      const response = await fetch(`${config.url}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("Contact data", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [authorizationToken]); // Include authorizationToken as a dependency

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${config.url}/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        }
      });
      if (response.ok) {
        getContactsData(); // No need to modify this call
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Deleting");
    }
  }

  useEffect(() => {
    getContactsData(); // Call the memoized getContactsData function
  }, [getContactsData]); // Include getContactsData in the dependency array

  return (
    <div style={styles.container}>
      {contactData.map((curContactData, index) => {
        const { username, email, message, _id } = curContactData;
        return (
          <div key={index} style={styles.contactItem}>
            <p style={styles.username}>{username}</p>
            <p style={styles.email}>{email}</p>
            <p style={styles.message}>{message}</p>
            <button style={styles.deleteBtn} onClick={() => deleteContactById(_id)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  contactItem: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
  },
  username: {
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default AdminContacts;
