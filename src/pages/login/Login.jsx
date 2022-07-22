import React, { useEffect } from 'react';
import {
    Grid,
    TextField,
    Box,
    Button,
} from '@mui/material';
import './Login.css'
import Axios from 'axios'

export default function Login() {

    useEffect(() => {
        Axios.get("https://jsonplaceholder.typicode.com/users/")
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div id='login'>
            <Box sx={{
                width: 300,
                height: 300,
            }}>
                <Grid
                    container
                    spacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
                    <Grid item xs={12}>
                        <TextField label="Username"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth> Login </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};