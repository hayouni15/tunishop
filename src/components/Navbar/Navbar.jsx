import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { ShoppingCart } from "@material-ui/icons";
import useStyle from './styles';
import logo from '../../assets/logo.png'
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ cart }) => {
    let classes = useStyle()
    const location = useLocation();
    return (
        <div>
            <AppBar position="static" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="my ecommerce" className={classes.image} />
                    </Typography>
                    <div className="classes.grow"></div>
                    {location.pathname !== "/cart" && (
                        <div className="classes.button">
                            <IconButton component={Link} to="/cart" arial-label="show cart" color="inherit">
                                <Badge badgeContent={cart.total_items} color="secondary">
                                    <ShoppingCart></ShoppingCart>
                                </Badge>
                            </IconButton>

                        </div>)}

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
