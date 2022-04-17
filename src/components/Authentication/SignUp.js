import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, InputAdornment, Stack, Snackbar, Alert } from '@mui/material';
import logo from '../../assets/logo.png'

import makeStyles from "@material-ui/styles/makeStyles";
import PasswordTextField from './PasswordTextField';

const SignUp = ({ signupDialogOpen, setSignupDialogOpen, signUp, signUpInfo }) => {
    const [signUpAlert, setSignUpAlert] = useState(false)
    const useStyles = makeStyles({
        phoneExt: {
            width: 60,
            color: "red"
        }
    });
    const classes = useStyles()
    const handleClose = () => {
        setSignupDialogOpen(false);
    };
    const handleCreateAccount = () => {
        let newUser = {
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("standard-adornment-password").value
        }
        signUp(newUser)

    }
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSignUpAlert(false);
    };

    useEffect(() => {
        if (signUpInfo.status === 201) {
            setSignupDialogOpen(false);
            setSignUpAlert(true)
        }
        else {
            console.log(signUpInfo)
        }
    }, [signUpInfo]
    )

    return (
        <div>
            <Snackbar
                open={signUpAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    <div style={{ width: 'fit-content', margin: 'auto', marginTop: "15px" }} >
                        <img src={logo} alt="my ecommerce" className={classes.image} />
                    </div>
                    Account Created Successfully
                </Alert>
            </Snackbar>
            <Dialog open={signupDialogOpen} onClose={handleClose}>

                <DialogContent >
                    <div style={{ width: 'fit-content', margin: 'auto', marginTop: "15px" }} >
                        <img src={logo} alt="my ecommerce" className={classes.image} />
                    </div>

                    <div >
                        <TextField id="name" autoFocus margin="dense" style={{ margin: '20px' }} label="Prénom" variant="standard" color="success" />
                        <TextField id="surname" autoFocus style={{ margin: '20px' }} label="Nom" variant="standard" color="success" />
                    </div>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Adresse e-mail"
                        type="email"
                        fullWidth
                        variant="standard"
                        color="success"
                        style={{ margin: '20px', width: '-webkit-fill-available' }}
                        id="email"
                    />
                    <Stack direction="row" >
                        <TextField
                            label="Préfixe"
                            className={classes.phoneExt}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    position="start">+216</InputAdornment>,
                            }}
                            disabled
                            variant="standard"
                            style={{ margin: '20px', marginRight: '10px' }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            style={{ margin: '20px', marginLeft: '10px', width: '-webkit-fill-available' }}
                            label="Téléphone mobile (optionnel)"
                            variant="standard"
                            color="success"
                            id="phone" />
                    </Stack>
                    <PasswordTextField></PasswordTextField>
                    <Stack spacing={2} direction="column">
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Je souhaite recevoir des email de nouveau produit." />
                        {(signUpInfo.status !== 201 && signUpInfo.status) &&
                            (<Alert severity="error">
                                Failed to Create an account
                                <br />
                                {signUpInfo.data.keyValue[Object.keys(signUpInfo.data.keyValue)[0]]}
                                <br />
                                Value is already in use!
                            </Alert>)}
                        <Button onClick={handleCreateAccount} variant="contained" color="success">
                            CREER MON COMPTE
                        </Button>
                    </Stack>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleClose}>J'ai deja un compte</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default SignUp
