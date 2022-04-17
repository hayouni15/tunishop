import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';


const SearchBar = ({ searchProducts, setCategory, setPaginationVisibility, setSearchTerm }) => {
    const handleOnSearch = () => {
        let v = document.getElementById("searchInput").value
        setSearchTerm(v)
        setCategory("refresh")
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleOnSearch()
        }
    }
    return (
        <Paper
            elevation={0}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
        >
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
                sx={{ ml: 1, flex: 1, width: 'max-content' }}
                placeholder="What are you looking for?"
                inputProps={{ 'aria-label': 'What are you looking for?' }}
                id='searchInput'
                onKeyUp={(e) => handleKeyPress(e)}
            />
            <IconButton onClick={handleOnSearch} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>

        </Paper>
    )
}

export default SearchBar
