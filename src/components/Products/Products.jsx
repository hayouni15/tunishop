import React from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import useStyle from './style'
import PaginationBar from './../Pagination/PaginationBar'





const Products = ({ products, onAddtoCart, page, setPage, pagesCount }) => {
    const classes = useStyle()
    if (!products) return 'loading...'
    return (
        <main className={classes.content}>

            <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={12} md={4} lg={3}>
                        <Product product={product} onAddtoCart={onAddtoCart} />
                    </Grid>
                ))}
            </Grid>
            <PaginationBar pagesCount={pagesCount} setPage={setPage} page={page}></PaginationBar>
        </main>
    )
}

export default Products
