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
        width: "100%",
        maxWidth: "800px",
        height: "auto"
    }
}))