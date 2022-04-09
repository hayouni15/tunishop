import React from 'react'
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Grid, IconButton } from '@material-ui/core'
import useStyle from './styles'

let ArrowBack = () => {
    return (
        <IconButton aria-label="delete" disabled color="primary">
            <NavigateBeforeIcon />
        </IconButton>
    )
}
let ArrowNext = () => {
    return (
        <IconButton aria-label="delete" disabled color="primary">
            <NavigateNextIcon />
        </IconButton>
    )
}

let handleOnPageChange = (e, setPage) => {
    e.target.textContent ? setPage(parseInt(e.target.textContent)) : console.log('error')
}

const PaginationBar = ({ pagesCount, setPage, page, paginationVisibility }) => {
    const classes = useStyle()
    return (
        <div>
            {paginationVisibility === true && (
                <Grid className={classes.pagination} container alignItems="center">
                    <ArrowBack></ArrowBack>
                    <Stack spacing={2}>
                        <Pagination
                            count={pagesCount ? pagesCount : 1}
                            variant="outlined"
                            color="primary"
                            hideNextButton={true}
                            hidePrevButton={true}
                            defaultPage={1}
                            page={page}
                            onChange={e => handleOnPageChange(e, setPage)}
                        />
                    </Stack>

                    <ArrowNext></ArrowNext>
                </Grid>
            )
            }
        </div>


    )
}

export default PaginationBar
