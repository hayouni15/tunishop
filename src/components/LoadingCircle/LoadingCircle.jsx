import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingCircle = () => {
    return (
        <div style={{ textAlign: "center" }} >
            <span style={{ position: "absolute", top: '50%' }}>
                <CircularProgress />
            </span>
        </div>
    )
}

export default LoadingCircle
