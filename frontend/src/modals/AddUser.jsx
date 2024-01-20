import React, { useEffect, useState } from 'react';
import { Box, Modal, Stack } from '@mui/material';
import { fetchAPI } from '../utils/fetchApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ... (previous imports)

const AddUser = ({ open, handleClose }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userImg, setUserImg] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState(0);
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [zipCode, setZipCode] = useState(0);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null); // Updated to store object
    const [selectedState, setSelectedState] = useState(null); // Updated to store object
    const [selectedCity, setSelectedCity] = useState(null); // Updated to store object

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('userImg', userImg); // Assuming 'userImg' is a File object
            formData.append('email', email);
            formData.append('contact', contact);
            formData.append('address1', address1);
            formData.append('address2', address2);
            formData.append('state', selectedState ? selectedState.name : ''); // Use the name property
            formData.append('city', selectedCity ? selectedCity.name : ''); // Use the name property
            formData.append('country', selectedCountry ? selectedCountry.name : ''); // Use the name property
            formData.append('zipCode', zipCode);

            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}add-user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data) {
                alert('User added successfully');
                navigate('/');
            }
        } catch (error) {
            console.log("Error in adding data ", error);
        }
    };

    useEffect(() => {
        // Fetch countries on component mount
        fetchAPI('').then((data) => setCountries(data));
    }, []);

    useEffect(() => {
        // Fetch states when a country is selected
        if (selectedCountry) {
            fetchAPI(`${selectedCountry.iso2}/states`).then((data) => setStates(data));
        }
    }, [selectedCountry]);

    useEffect(() => {
        // Fetch cities when a state is selected
        if (selectedCountry && selectedState) {
            fetchAPI(`${selectedCountry.iso2}/states/${selectedState.iso2}/cities`).then((data) => setCities(data));
        }
    }, [selectedCountry, selectedState]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 450,
                bgcolor: 'background.paper',
                borderRadius: '4px',
                boxShadow: 24,
                p: 4,
            }}>
                <form className='form'>
                    <div style={{
                        display: 'flex',
                        gap: '20px'
                    }}>
                        <input placeholder="First name" name='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        <input placeholder="Last name" name='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </div>

                    <input type='file' name='userImg' onChange={(e) => setUserImg(e.target.files[0])} />
                    <input placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Mobile" name='contact' value={contact} onChange={(e) => setContact(e.target.value)} />
                    <input placeholder="Address 1" name='address1' value={address1} onChange={(e) => setAddress1(e.target.value)} />
                    <input placeholder="Address 2" name='address2' value={address2} onChange={(e) => setAddress2(e.target.value)} />

                    {/* Country Dropdown */}

                    <select
                        name='country'
                        value={selectedCountry ? selectedCountry.iso2 : ''}
                        onChange={(e) => setSelectedCountry(countries.find(country => country.iso2 === e.target.value))}
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.iso2} value={country.iso2}>
                                {country.name}
                            </option>
                        ))}
                    </select>


                    {/* State Dropdown */}

                    <select
                        name='state'
                        value={selectedState ? selectedState.iso2 : ''}
                        onChange={(e) => setSelectedState(states.find(state => state.iso2 === e.target.value))}
                    >
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state.iso2} value={state.iso2}>
                                {state.name}
                            </option>
                        ))}
                    </select>


                    {/* City Dropdown */}

                    <select
                        name='city'
                        value={selectedCity ? selectedCity.id : ''}
                        onChange={(e) => {
                            const selectedCityValue = e.target.value;
                            const foundCity = cities.find(city => city.id.toString() === selectedCityValue.toString());
                            console.log('Selected City:', foundCity);
                            setSelectedCity(foundCity);
                        }}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>


                    <input placeholder="Pincode" name='zipCode' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    <button type='submit' onClick={handleSubmit}>Add</button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddUser;


