import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            ////////
            padding: '34px',
            width: '75%',
            margin: 'auto',
            marginTop: '34px'
        },
        root: {
            flexGrow: 1,
        }
    }
})

export default useStyles