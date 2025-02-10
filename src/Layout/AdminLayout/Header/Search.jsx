import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';


function Search() {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 ,borderRadius:'28px',backgroundColor:'rgb(255,255,255,0.4)'}}
        >
            <IconButton sx={{ p: '10px' ,color:'rgb(255,255,255,0.4)' }} aria-label="menu">
                <ArrowForwardIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 ,color:'rgb(255,255,255)'}}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton type="button" sx={{ p: '10px',color:'rgb(255,255,255)' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default Search