import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles'

const Checkout = () => {
    let classes = useStyles()
    let steps = ["step 1", "step 2"]
    let [activeStep, setActiveStep] = useState(0)

    return (
        <>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

            </main>
        </>
    )
}

export default Checkout
