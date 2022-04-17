import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Chip } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material'

const Product = ({ product, onAddtoCart, setCategory, setPage, setPaginationVisibility }) => {
    const classes = useStyles();
    let link = `/productDetails/${product._id}`
    const handleCategoryButtonClick = (e) => {
        setCategory(e.target.textContent);
        setPage(1)
        setPaginationVisibility(true)
    }
    return (
        <Card className={classes.root}>
            <CardMedia component={Link} to={link} className={classes.media} image={product.images[0]} title={product.name}></CardMedia>
            <CardContent style={{ paddingBottom: '0px' }}>
                <div className={classes.cardContent} >
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom>
                                {product.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography style={{ color: 'rgb(129 157 129)' }} gutterBottom>
                                {product.price} DT
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid container alignItems="center" style={{ margin: '10px' }} >
                        <Typography variant="body2" style={{ marginRight: "10px" }} color='textSecondary' gutterBottom>
                            Categories:
                        </Typography>
                        <Chip onClick={handleCategoryButtonClick} size="small" style={{ cursor: "pointer" }} key={product.category} label={product.category} variant="outlined"></Chip>
                    </Grid>
                    <Divider variant="middle" />


                    <Grid container alignItems="center">
                        <Grid item >
                            <CardActions disableSpacing className={classes.carActions}>
                                <IconButton arial-label="add to cart" onClick={() => onAddtoCart(product._id, 1)}>
                                    <AddShoppingCart></AddShoppingCart>
                                </IconButton>
                            </CardActions>
                        </Grid>
                        <Grid item xs>
                            {product.inventory < 10 && product.inventory > 0 && (
                                <Alert style={{ width: 'fit-content', background: 'none', float: 'right' }} severity="warning">Low Stock({product.inventory})</Alert>
                            )}
                            {product.inventory === 0 && (
                                <Alert style={{ width: 'fit-content', background: 'none', float: 'right' }} severity="error">Out of Stock</Alert>
                            )}
                            {(product.inventory >= 10) && (
                                <Alert style={{ width: 'fit-content', background: 'none', float: 'right' }} severity="success">In Stock</Alert>
                            )}
                        </Grid>
                    </Grid>

                </div>
            </CardContent>
        </Card >
    )
}

export default Product
