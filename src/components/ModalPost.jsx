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
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/index";

export default function ModalPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()
    const { clearPostData } = bindActionCreators(actionCreators, dispatch);
    const { post } = useSelector((state) => {
        return state;
    });

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
            open={location.pathname === `/admin/create` || location.pathname === `/admin/posts/${id}/edit`}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AppBar position="static">
                    <Toolbar>
                        {location.pathname === `/admin/create` ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Create Post
                        </Typography>
                            :
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Edit Post
                            </Typography>}

                        <IconButton onClick={() => {
                            clearPostData()
                            navigate(-1)
                        }} >
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
                                <TextField sx={{ marginTop: "15px" }} fullWidth label="title" value={post.title} name='title' onChange={handleChange} required />
                                <TextField sx={{ marginTop: "15px" }} fullWidth label="body" value={post.body} name='body' onChange={handleChange} required />

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