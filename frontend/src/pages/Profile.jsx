import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const Profile = () => {
    return (
        <Box
            sx={{
                height: '90vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    marginBottom: '20px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <img
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    src='https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww'
                    alt="Profile"
                />
            </Box>

            <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant='h5' sx={{ marginBottom: '10px' }}>Pratik Sondaule</Typography>
                <Typography variant='h5' sx={{ marginBottom: '10px' }}>+91-9075180804</Typography>
                <Typography variant='h5' sx={{ marginBottom: '10px' }}>pratiksondaule@gmail.com</Typography>
                <Typography variant='h5' sx={{ marginBottom: '10px' }}>Nagpur, Maharashtra</Typography>
                <Typography variant='h5'>India</Typography>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#303f9f',
                        },
                        marginRight: '10px',
                    }}
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
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
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default Profile;
