import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    media: {
        height: "200px"
    },
    slide: {
        textAlign: "center"
    },
    slideImage: {

        maxWidth: "900px",
        maxHeight: "470px",
        hight: "400px",
        width: "100%"
    },
    colorPrimary: {
        backgroundColor: '#d5c9c9 !important',
    },
    barColorPrimary: {
        backgroundColor: '#faaf00 !important'
    }
}))