import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, IconButton, Box, CardHeader } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUser from '../modals/EditUser';
import axios from 'axios';

const ProfileCard = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState(null);
    const [userData, setUserData] = React.useState([])

    const handleOpen = (userId) => {
        setOpen(true);
        setSelectedUserId(userId);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}get-user`)
            if (data && data.users) {
                setUserData(data.users)
            }
        } catch (error) {
            console.log("Error in fetching data ", error);
        }
    }

    const handleDelete = async (userId) => {
        try {
            // Make a DELETE request to your server to delete the user
            await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_URL}delete-user/${userId}`);
            // Refresh the user data after deletion
            getUserData();
        } catch (error) {
            console.log("Error deleting user: ", error);
        }
    };

    React.useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {userData.map((item, index) => (
                <Card
                    key={index}
                    sx={{
                        width: '400px',
                        height: 'auto',
                        boxShadow: 'none',
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                        marginTop: '40px',
                        backgroundColor: '#fff',
                    }}
                >
                    <CardMedia
                        component="img"
                        alt="User Image"
                        image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}uploads/${item.userImg}`}
                        sx={{ objectFit: 'cover', height: '240px' }}
                    />
                    <CardContent sx={{ textAlign: 'center', marginTop: '30px' }}>
                        <Typography variant="h6">{item.firstname} {item.lastname}</Typography>
                        <Typography variant="body2">{item.email}</Typography>
                        <Typography variant="body2">{item.contact}</Typography>
                        <Typography variant="body2">{item.address1}</Typography>
                        <Typography variant="body2">{item.address2}</Typography>
                        <Typography variant="body2">{item.city}, {item.state}</Typography>
                        <Typography variant="body2">{item.country}</Typography>
                        <Typography variant="body2">{item.zipCode}</Typography>
                    </CardContent>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        margin: '20px 0'
                    }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#3f51b5',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                },
                            }}
                            startIcon={<EditIcon />}
                            onClick={() => handleOpen(item._id)}
                        >
                            Edit
                        </Button>
                        <EditUser open={open} handleClose={handleClose} userId={selectedUserId} />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#e91e63',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#d81b60',
                                },
                            }}
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </Button>
                    </Box>
                </Card>
            ))}
        </>
    );
};

export default ProfileCard;
