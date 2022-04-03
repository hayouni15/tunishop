import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Chip } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

const Product = ({ product, onAddtoCart }) => {
    const classes = useStyles();
    console.log(classes.cardContent)
    let link = `/productDetails/${product.id}`
    return (
        <Card className={classes.root}>
            <CardMedia component={Link} to={link} className={classes.media} image={product.image?.url} title={product.name}></CardMedia>
            <CardContent style={{ paddingBottom: '0px' }}>
                <div className={classes.cardContent} >
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography variant="h5" gutterBottom>
                                {product.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" gutterBottom>
                                {product.price.formatted} DT
                            </Typography>
                        </Grid>
                    </Grid>
                    {product.inventory.managed && product.inventory.available < 10 && product.inventory.available > 0 && (
                        <Alert style={{ width: 'fit-content' }} severity="warning">Low Stock!   ({product.inventory.available} remaining)</Alert>
                    )}
                    {product.inventory.managed && product.inventory.available === 0 && (
                        <Alert style={{ width: 'fit-content' }} severity="error">Out of Stock</Alert>
                    )}
                    {((product.inventory.managed && product.inventory.available > 10) || !product.inventory.managed) && (
                        <Alert style={{ width: 'fit-content' }} severity="success">In Stock</Alert>
                    )}

                    <Grid container alignItems="center" style={{ margin: '10px' }} >
                        <Typography variant="body2" color='textSecondary' gutterBottom>
                            Categories   :
                        </Typography>
                        {product.categories.map((gategory) => ((
                            <Chip key={gategory.name} label={gategory.name} variant="outlined" />
                        )))}
                    </Grid>
                    <Divider variant="middle" />

                    <CardActions disableSpacing className={classes.carActions}>
                        <IconButton arial-label="add to cart" onClick={() => onAddtoCart(product.id, 1)}>
                            <AddShoppingCart></AddShoppingCart>
                        </IconButton>
                    </CardActions>

                </div>
            </CardContent>
        </Card >
    )
}

export default Product
