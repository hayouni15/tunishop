import React from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import useStyle from './style'
import PaginationBar from './../Pagination/PaginationBar'
import LoadingCircle from '../LoadingCircle/LoadingCircle'





const Products = ({ products, onAddtoCart, page, setPage, pagesCount, paginationVisibility, setCategory, setPaginationVisibility }) => {
    const classes = useStyle()
    if (!products) return (<LoadingCircle></LoadingCircle>)
    return (
        <main className={classes.content}>

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
