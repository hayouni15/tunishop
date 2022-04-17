import { Card, Container, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, LinearProgress } from '@material-ui/core';
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
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import RatingsPanel from './RatingsPanel'


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

const DetailedProduct = ({ products, searchProducts, handleAddToCart, ratings, fetchRatings, features, fetchFeatures }) => {
    let classes = useStyles()
    let ratingsAverage = 0
    let detailedRatings = {
        total: ratings.count,
        values: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        }
    }

    let { ProductId } = useParams();
    const product = products.find(({ _id }) => _id === ProductId);

    ratings ? console.log(ratings) : console.log("loding ratings")
    features ? console.log(features) : console.log("loading features")

    useEffect(() => {
        console.log('here')
        product && fetchRatings({ "productID": product._id })
        product && fetchFeatures({ "productID": product._id })
    }, [product])

    if (!product) {
        searchProducts({ "query": { _id: { "value": ProductId, "isExact": true } } })
        return (
            <LoadingCircle></LoadingCircle>
        )
    } else {

        if (ratings) {

            for (let index = 0; index < ratings.length; index++) {
                if (ratings[index].rating === 1) detailedRatings.values['1'].push(ratings[index])
                if (ratings[index].rating === 2) detailedRatings.values['2'].push(ratings[index])
                if (ratings[index].rating === 3) detailedRatings.values['3'].push(ratings[index])
                if (ratings[index].rating === 4) detailedRatings.values['4'].push(ratings[index])
                if (ratings[index].rating === 5) detailedRatings.values['5'].push(ratings[index])

            }
            detailedRatings.total = ratings.length
            console.log(detailedRatings)
            ratings.map((rating) => {
                ratingsAverage += rating.rating
            })
            ratingsAverage = ratingsAverage / ratings.length
        }
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
                                {product.images.map((imageUrl, index) => (
                                    <div key={index} className="each-fade">
                                        <img className={classes.slideImage} src={imageUrl} alt="imagee" />
                                    </div>
                                ))}
                                <div key={product.id} className="each-fade">
                                    <img className={classes.slideImage} src={product.images[0]} alt="imagee" />
                                </div>
                            </Fade>
                        </div>
                    </Card>
                    <Card style={{ width: "100%" }}>
                        <Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
                            <Box sx={{ my: 3, mx: 2 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={10}>
                                        <Typography gutterBottom variant="h6" style={{ fontWeight: 'bold', width: 'max-content' }} component="div">
                                            {product.title}
                                        </Typography>

                                        <Box
                                            sx={{
                                                width: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Rating
                                                name="text-feedback"
                                                value={ratingsAverage}
                                                readOnly
                                                size="small"
                                                precision={0.5}
                                            />
                                            <Box sx={{ ml: 1 }}>{`(${ratings.length})`}</Box>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ color: '#6bc36b', fontWeight: 'bold' }} gutterBottom variant="h6" component="div">
                                            {product.price} DT
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box mb={2} mt={2}>
                                    {features.map((feature) => (
                                        <Grid key={feature._id} container alignItems="center" >
                                            <Grid item xs={8} sm={8} md={4} lg={4}>
                                                <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>
                                                    {feature.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={8} lg={8}>
                                                <Typography variant="caption" gutterBottom >
                                                    {feature.value}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Box>
                                <Typography variant="body2" component="div" style={{ fontWeight: "bold" }}>
                                    Description:
                                </Typography>

                                <Typography style={{ paddingLeft: '34px' }} dangerouslySetInnerHTML={{ __html: product.desc }} color="textSecondary" variant="body2"></Typography>
                            </Box>
                            <Divider variant="middle" />
                            <Box sx={{ m: 2 }}>
                                <Typography gutterBottom variant="body1">
                                    Similar products
                                </Typography>
                                <Stack direction="row" spacing={1} style={{ display: 'block' }}>
                                    {product.relatedProducts.map((prod) => (
                                        <RelatedProductTemplate key={prod.id} product={prod}></RelatedProductTemplate>
                                    ))}
                                </Stack>
                            </Box>
                            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                                <Button variant="outlined" endIcon={<SendIcon />}>
                                    Nous contacter
                                </Button>
                                <IconButton arial-label="add to cart" onClick={() => handleAddToCart(product._id, 1)}>
                                    <AddShoppingCart></AddShoppingCart>
                                </IconButton>
                                <IconButton arial-label="add to cart" onClick={() => handleAddToCart(product._id, 1)}>
                                    <SendIcon></SendIcon>
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                </Grid>

            </Container>
            {ratingsAverage && <RatingsPanel ratings={ratings} detailedRatings={detailedRatings} ratingsAverage={ratingsAverage}>
            </RatingsPanel>}

        </>

    )
}

export default DetailedProduct
