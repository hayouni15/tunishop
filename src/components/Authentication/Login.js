import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, Divider, Snackbar, Stack } from '@mui/material';
import makeStyles from "@material-ui/styles/makeStyles";
import logo from '../../assets/logo.png'
import PasswordTextField from './PasswordTextField';


const Login = ({ loginDialogOpen, setLoginDialogOpen, logIn, sessionInfo }) => {
    const [loginAlert, setLoginAlert] = useState(false)
    const handleLogin = () => {
        let logInCredentials = {
            email: document.getElementById("email").value,
            password: document.getElementById("standard-adornment-password").value
        }
        logIn(logInCredentials)
        console.log(logInCredentials)
    }

    const useStyles = makeStyles({
        phoneExt: {
            width: 60,
            color: "red"
        }
    });
    const classes = useStyles()
    const handleClose = () => {
        setLoginDialogOpen(false);
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoginAlert(false);
    };
    useEffect(() => {
        console.log(sessionInfo)
        if ('user' in sessionInfo) {
            localStorage.setItem('token', sessionInfo.user.token);
            setLoginDialogOpen(false);
            setLoginAlert(true)
        }

    }, [sessionInfo]
    )
    return (
        <div>
            <Snackbar
                open={loginAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    <div style={{ width: 'fit-content', margin: 'auto', marginTop: "15px" }} >
                        <img src={logo} alt="my ecommerce" className={classes.image} />
                    </div>
                    We are happy to see you back!
                </Alert>
            </Snackbar>
            <Dialog open={loginDialogOpen} onClose={handleClose}>
                <DialogContent>
                    <div style={{ width: 'fit-content', margin: 'auto', marginTop: "15px" }} >
                        <img src={logo} alt="my ecommerce" className={classes.image} />
                    </div>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContentText>
                        Please enter your details:
                    </DialogContentText>
                    <TextField
                        id="email"
                        autoFocus
                        margin="dense"
                        label="Adresse e-mail"
                        type="email"
                        fullWidth
                        variant="standard"
                        color="success"
                        style={{ margin: '20px', width: '-webkit-fill-available' }}
                    />
                    <PasswordTextField></PasswordTextField>
                    <Stack spacing={2} direction="column">
                        <Button onClick={handleLogin} variant="contained" color="success">
                            SE CONNECTER
                        </Button>
                    </Stack>

                </DialogContent>
                <Divider></Divider>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleClose}>SignUp</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Login
