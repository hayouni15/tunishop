import { Card, Container, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, LinearProgress } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useStyles from './styles'
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import SendIcon from '@mui/icons-material/Send';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const RatingsPanel = ({ ratings, detailedRatings, ratingsAverage }) => {
    let classes = useStyles()
    console.log(ratings)
    console.log(detailedRatings)
    console.log(ratingsAverage)

    return (
        <Container style={{ maxWidth: '900px', marginTop: '20px' }} >
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Card style={{ width: "100%" }}>

                    <Grid container spacing={5} alignItems="center" >
                        <Grid xs={12} sm={12} md={4} lg={4} item style={{ padding: '30px' }}>
                            <Typography variant="body2" component="div" style={{ fontWeight: "bold" }}>
                                Ratings:
                            </Typography>
                            <Box style={{ margin: '19px auto 19px', borderRadius: '10px' }}
                                sx={{
                                    width: 170,
                                    height: 130,
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}>
                                <Grid style={{ textAlign: 'center', paddingTop: '16px' }} >
                                    <div>
                                        <Typography style={{ color: '#f6b01e' }} gutterBottom variant="h6" component="div">
                                            {ratingsAverage.toFixed(1)}/5
                                        </Typography>
                                        <Rating
                                            name="text-feedback"
                                            value={ratingsAverage}
                                            readOnly
                                            size="small"
                                            precision={0.5}
                                        />
                                        <Typography gutterBottom variant="h6" component="div">
                                            {ratings.length} avis vérifiés
                                        </Typography>
                                    </div>
                                </Grid>
                            </Box>
                            {Object.keys(detailedRatings.values).map((key, index) => (
                                <Box key={index} style={{ borderRadius: '10px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ minWidth: 15 }}>
                                            <Typography variant="body2" >{key}</Typography>
                                        </Box>
                                        <Box sx={{ minWidth: 30 }}>
                                            <StarIcon fontSize="small" style={{ marginTop: '1px', color: '#faaf00' }}></StarIcon>
                                        </Box>
                                        <Box sx={{ minWidth: 30 }}>
                                            <Typography variant="body2" >({detailedRatings.values[key].length})</Typography>
                                        </Box>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress

                                                classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}

                                                variant="determinate"
                                                style={{ height: '10px', borderRadius: '10px' }}
                                                value={((100 * detailedRatings.values[key].length) / detailedRatings['total'])} />
                                        </Box>

                                    </Box>
                                </Box>))}
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8} style={{ padding: '30px' }}>
                            <Typography variant="body2" component="div" style={{ fontWeight: "bold" }}>
                                COMMENTAIRES (1):
                            </Typography>
                            <Divider style={{ margin: 'auto' }} variant="middle" />

                            <Grid style={{ paddingTop: '16px' }} >
                                {[ratings[0], ratings[1]].map((rating) => (
                                    <div key={rating._id} style={{ marginBottom: "10px" }}>
                                        <Chip
                                            avatar={<Avatar alt={rating.reviewerID} />}
                                            label={rating.reviewerID}
                                            variant="outlined"
                                            style={{ border: 'none' }}
                                        />
                                        <br />
                                        <Rating
                                            name="text-feedback"
                                            value={rating.rating}
                                            readOnly
                                            size="small"
                                            precision={0.5}
                                        />
                                        <Typography gutterBottom variant="body2" component="div">
                                            {rating.review}
                                        </Typography>
                                        <Typography variant="body2" style={{ marginRight: "10px" }} color='textSecondary'>
                                            {rating.updatedAt.split('T')[0]} | {rating.reviewerID}
                                        </Typography>
                                    </div >
                                ))}


                            </Grid>
                            <Divider style={{ margin: 'auto', marginTop: '5px', marginBottom: '5px' }} variant="middle" />
                            <Button color="secondary" size="small"><Typography variant="body2" style={{ marginRight: "10px" }}>
                                Voir Plus
                            </Typography><DoubleArrowIcon /></Button>

                        </Grid>
                    </Grid>
                </Card>
            </Grid >
            <div className={classes.toolbar}></div>
        </Container >
    )
}

export default RatingsPanel
