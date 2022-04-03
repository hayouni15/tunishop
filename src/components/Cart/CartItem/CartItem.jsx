import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
const CartItem = ({ item, onUpdateCartQty, onAddToCart, onRemovefromCart }) => {
    const classes = useStyles()
    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media}>
            </CardMedia>
            <CardContent className='classes.cardContent'>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)} >-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)} >+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => onRemovefromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
