import { Card, Container, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom';
import useStyles from './styles'
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const DetailedProduct = ({ products }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleChange = useCallback(newIndex => {
        setActiveIndex(newIndex);
    }, []);
    let classes = useStyles()
    let { ProductId } = useParams();
    const product = products.find(({ id }) => id === ProductId);
    return (
        <>
            <Container>
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

                        <CardContent className='classes.cardContent'>
                            <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="h4"></Typography>
                            <Typography variant="h5">asdas</Typography>
                        </CardContent>
                        <CardActions disableSpacing className={classes.carActions}>
                            <IconButton arial-label="add to cart">
                                <AddShoppingCart></AddShoppingCart>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Container>
        </>

    )
}

export default DetailedProduct
