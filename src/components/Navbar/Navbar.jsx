import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { ShoppingCart } from "@material-ui/icons";
import useStyle from './styles';
import logo from '../../assets/logo.png'
import { Link, useLocation } from "react-router-dom";
import AccountMenu from "../Authentication/AccountMenu";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SignUp from "../Authentication/SignUp";
import Login from "../Authentication/Login";

const Navbar = ({ cart, signUp, signUpInfo, sessionInfo, logIn, setSessionInfo }) => {
    let classes = useStyle()
    const location = useLocation();
    const [signupDialogOpen, setSignupDialogOpen] = useState(false)
    const [loginDialogOpen, setLoginDialogOpen] = useState(false)
    return (
        <div>
            <AppBar position="static" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="my ecommerce" className={classes.image} />
                    </Typography>
                    <div className="classes.grow"></div>
                    <AccountMenu setSignupDialogOpen={setSignupDialogOpen} setLoginDialogOpen={setLoginDialogOpen} setSessionInfo={setSessionInfo}></AccountMenu>

                    <SignUp signupDialogOpen={signupDialogOpen} setSignupDialogOpen={setSignupDialogOpen} signUp={signUp} signUpInfo={signUpInfo}></SignUp>
                    <Login loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} logIn={logIn} sessionInfo={sessionInfo}></Login>

                    <div className="classes.button">
                        <IconButton component={Link} to="/cart" arial-label="show cart" color="inherit">
                            <Badge badgeContent={1} color="secondary">
                                <FavoriteIcon></FavoriteIcon>
                            </Badge>
                        </IconButton>
                    </div>
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
