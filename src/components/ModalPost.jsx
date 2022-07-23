import React from 'react'
import {
    Box,
    Typography,
    Modal,
    TextField,
    Grid,
    Button,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form } from 'formik'
import Axios from 'axios'

export default function ModalPost({ openModalPost, handleClosePost }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        boxShadow: 24,
    };

    return (
        <Modal
            open={openModalPost}
            onClose={handleClosePost}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Create Post
                        </Typography>
                        <IconButton onClick={handleClosePost} >
                            <CloseIcon sx={{ color: "#fff" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ padding: "10px 50px" }}>
                    <Formik
                        initialValues={{
                            title: "",
                            body: ""
                        }}
                        onSubmit={(values) => {

                        }
                        }
                    >
                        {({ handleSubmit, handleChange }) => (
                            <Form>
                                <TextField sx={{ marginTop: "15px" }} fullWidth label="title" name='title' onChange={handleChange} required />
                                <TextField sx={{ marginTop: "15px" }} fullWidth label="body" name='body' onChange={handleChange} required />

                                <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "10px", marginTop: "100px" }}>
                                    <Button onClick={handleSubmit} style={{
                                        backgroundColor: "#fff",
                                        color: "#000"
                                    }} variant="contained">Save</Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modal>
    )
}