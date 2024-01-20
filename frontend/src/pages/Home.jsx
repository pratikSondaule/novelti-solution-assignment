import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { Box, Button, Modal, Typography } from '@mui/material';
import AddUser from '../modals/AddUser';

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Typography variant='h4' style={{ marginRight: '10px', fontWeight: 'bold', color: '#333' }}>
                    Welcome to <span style={{ color: '#3f51b5' }}>User Management System</span>
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleOpen}
                    style={{ backgroundColor: '#3f51b5', color: '#fff', '&:hover': { backgroundColor: '#303f9f' } }}
                >
                    Add User
                </Button>
                <AddUser open={open} handleClose={handleClose} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                <ProfileCard />
            </div>
        </div>
    );
};

export default Home;
