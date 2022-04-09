import { Card, Container, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useStyles from './styles'
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import SendIcon from '@mui/icons-material/Send';

const RelatedProductTemplate = (relatedProduct) => {
    return (
        <Chip
            component={Link} to={`/productDetails/${relatedProduct.product.id}`}
            avatar={<Avatar alt="Natacha" src={relatedProduct.product.image.url} />}
            label={relatedProduct.product.name}
            variant="outlined"
            style={{ cursor: 'pointer' }}
        />
    )
}
const DetailedProduct = ({ products, searchProducts, setCategory, setPage, setPagesCount, handleAddToCart }) => {
    let classes = useStyles()
    let { ProductId } = useParams();
    console.log(ProductId)
    console.log(products)
    const product = products.find(({ id }) => id === ProductId);
    console.log(product)
    if (!product) {
        searchProducts(ProductId)
        setCategory('')
        setPagesCount(1)
        return (
            <LoadingCircle></LoadingCircle>
        )
    }
    else {
        console.log('fetched already')

    }

    return (
        <>
            <Container style={{ maxWidth: '900px' }}>
                <div className={classes.toolbar}>
                </div>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Card className={classes.slide} >
                        <div className="slide-container">
                            <Fade>
                                {product.assets.map((asset) => (
                                    <div key={asset.id} className="each-fade">
                                        <img className={classes.slideImage} src={asset.url} alt="imagee" />
                                    </div>
                                ))}
                                <div key={product.id} className="each-fade">
                                    <img className={classes.slideImage} src={product.image.url} alt="imagee" />
                                </div>
                            </Fade>
                        </div>
                    </Card>
                    <Card style={{ width: "100%" }}>
                        <Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
                            <Box sx={{ my: 3, mx: 2 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={9}>
                                        <Typography gutterBottom variant="h6" style={{ fontWeight: 'bold', width: 'max-content' }} component="div">
                                            {product.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ color: '#6bc36b', fontWeight: 'bold' }} gutterBottom variant="h6" component="div">
                                            {product.price.formatted} DT
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="body1" component="div">
                                    Description:
                                </Typography>

                                <Typography style={{ paddingLeft: '34px' }} dangerouslySetInnerHTML={{ __html: product.description }} color="textSecondary" variant="body2"></Typography>
                            </Box>
                            <Divider variant="middle" />
                            <Box sx={{ m: 2 }}>
                                <Typography gutterBottom variant="body1">
                                    Similar products
                                </Typography>
                                <Stack direction="row" spacing={1} style={{ display: 'block' }}>
                                    {product.related_products.map((prod) => (
                                        <RelatedProductTemplate key={prod.id} product={prod}></RelatedProductTemplate>
                                    ))}
                                </Stack>
                            </Box>
                            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                                <Button variant="outlined" endIcon={<SendIcon />}>
                                    Nous contacter
                                </Button>
                                <IconButton arial-label="add to cart" onClick={() => handleAddToCart(product.id, 1)}>
                                    <AddShoppingCart></AddShoppingCart>
                                </IconButton>
                                <IconButton arial-label="add to cart" onClick={() => handleAddToCart(product.id, 1)}>
                                    <SendIcon></SendIcon>
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <div className={classes.toolbar}></div>
            </Container>
        </>

    )
}

export default DetailedProduct
