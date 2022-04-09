import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyle from './styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
import LoadingCircle from '../LoadingCircle/LoadingCircle'

const Cart = ({ cart, onUpdateCartQty, onAddToCart, onRemovefromCart, onEmptyCart, setPage }) => {
    setPage(1)
    const classes = useStyle()
    if (!cart.line_items) return (<LoadingCircle></LoadingCircle>)

    const EmptyCart = () => {
        return (<Typography variant='subtitle1'> Your Cart is Empty</Typography>)
    }
    const FilledCart = () => {
        return (
            <div >
                <Grid container spacing={3} >
                    {cart.line_items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={12} md={4} lg={3}>
                            <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onAddToCart={onAddToCart} onRemovefromCart={onRemovefromCart} ></CartItem>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cartDetails}>
                    <Typography variant="h4">
                        subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button
                            className={classes.emtyButton}
                            size='large'
                            type='button'
                            variant='contained'
                            color="secondary"
                            onClick={() => onEmptyCart()}>Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Container>
            <div className={classes.toolbar}></div>

            <Typography className={classes.title} variant='h3' gutterBottom> Here is your Shopping Cart: </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

        </Container>
    )
}

export default Cart
