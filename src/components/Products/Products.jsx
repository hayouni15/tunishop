import { Grid, Typography } from '@material-ui/core'
import Product from './Product/Product'
import useStyle from './style'
import PaginationBar from './../Pagination/PaginationBar'
import LoadingCircle from '../LoadingCircle/LoadingCircle'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React from "react";





const Products = ({ products, onAddtoCart, page, setPage, pagesCount, paginationVisibility, setCategory, setPaginationVisibility, sortBy, setSortBy, productsCount }) => {
    const classes = useStyle()
    const options = ["Newest first", "Price Low to High", "Price Hight to Low", "Most Sold"];


    if (!products) return (<LoadingCircle></LoadingCircle>)


    return (
        <main className={classes.content}>
            <Grid container spacing={4}>
                <Grid xs={6} item>
                    <Typography color='textSecondary' gutterBottom style={{ width: "max-content" }}>
                        {page}-{pagesCount} ({productsCount} résultats)
                    </Typography>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "right" }} xs={6} item>
                    <Autocomplete
                        size="small"
                        value={sortBy}
                        onChange={(event, newValue) => {
                            setSortBy(newValue);
                        }}
                        id="sortMenu"
                        disabled={false}
                        options={options}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField disabled  {...params} label="sort by" />}
                    />
                </Grid>
            </Grid>
            <br />
            <div>
            </div>
            <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={12} md={4} lg={3}>
                        <Product
                            product={product}
                            onAddtoCart={onAddtoCart}
                            setCategory={setCategory}
                            setPaginationVisibility={setPaginationVisibility}
                            setPage={setPage} />
                    </Grid>
                ))}
            </Grid>
            <PaginationBar
                pagesCount={pagesCount}
                setPage={setPage}
                page={page}
                paginationVisibility={paginationVisibility}></PaginationBar>
        </main>
    )
}

export default Products
