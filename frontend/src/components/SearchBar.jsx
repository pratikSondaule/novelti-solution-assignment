import { IconButton, Paper } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    return (
        <Paper
            component='form'
            sx={{
                borderRadius: '20px',
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 }
            }}
        >
            <input
                className='search-bar'
                placeholder='Search'
            />
            <IconButton type='submit' sx={{ p: '10px', color: '#000' }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBar
