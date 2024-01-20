import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import SearchBar from './SearchBar'

const Navbar = () => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            px='200px'
            py='25px'
            sx={{ position: 'sticky', background: '#3f51b5', top: '0', justifyContent: 'space-between' }}
        >
            <Link to='/' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src={logo} alt='Logo' style={{ height: '45px' }} />
                <Typography
                    variant='h5'
                    color='white'
                    sx={{ marginLeft: '20px' }}
                    fontWeight='bold'
                >
                    Novelti Solutions
                </Typography>
            </Link>
            <SearchBar />
        </Stack>
    )
}

export default Navbar
