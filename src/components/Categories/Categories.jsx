import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useStyles from './styles';
import { useLocation } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import { Slide } from '@mui/material';

const Categories = ({ categories, category, setCategory, setPage, searchProducts, setPaginationVisibility }) => {
    let classes = useStyles()

    const handleChange = (event, newValue) => {
        setCategory(newValue);
        setPage(1)
        setPaginationVisibility(true)
    };
    const location = useLocation()
    return (
        <div>
            {location.pathname !== '/cart' && !location.pathname.includes('/productDetails') &&
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs
                        value={category}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="All products" value="all" />
                        {categories.map((item) => (
                            <Tab label={item} key={item} value={item} />
                        ))}
                        <SearchBar searchProducts={searchProducts} setCategory={setCategory} setPaginationVisibility={setPaginationVisibility}></SearchBar>
                    </Tabs>

                </Box>}



        </div >
    )
}

export default Categories
