import * as React from 'react';
import { Container, Grid, Box, Link } from '@mui/material';
import logo from '../../assets/logo.png'

const Navbar = ({ cart }) => {
    return (
        <Box style={{ background: '#232F3E' }} color="white" px={{ xs: 3, sm: 10 }} py={{ xs: 3, sm: 1 }} pt={{ xs: 0, sm: 10 }}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link underline="hover" href="/" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link underline="hover" href="/" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link underline="hover" href="/" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link underline="hover" href="/" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                        <Box>
                            <Link underline="hover" color="inherit">Contact us</Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 5 }}>
                    <img src={logo} alt="my ecommerce" />
                    <div>
                        &copy; {new Date().getFullYear()}
                    </div>

                </Box>
            </Container>
        </Box>
    )
}

export default Navbar
