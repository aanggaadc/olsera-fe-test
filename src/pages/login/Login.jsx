import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Modal,
    TextField,
    Grid,
    Button
} from '@mui/material';
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { fillUser } = bindActionCreators(actionCreators, dispatch);

    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }} id="modal-modal-title" variant="h6" component="h2">
                        Login
                    </Typography>
                    <Formik
                        initialValues={{
                            id: "",
                            email: ""
                        }}
                        onSubmit={(values) => {
                            Axios.get(`https://jsonplaceholder.typicode.com/users/${values.id}`)
                                .then((response) => {
                                    const apiData = response.data
                                    if (apiData.email === values.email) {
                                        navigate('/admin')
                                        fillUser(response.data)
                                        localStorage.setItem('authData', JSON.stringify(apiData))
                                        toast.success("You're Succesfully Login")
                                    } else {
                                        toast.error("Wrong Email!!")
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        toast.error(error.response.data.message);
                                    } else {
                                        toast.error("Cannot Connect to Server");
                                    }
                                })
                        }
                        }
                    >
                        {({ handleSubmit, handleChange }) => (
                            <Form>
                                <TextField sx={{ marginTop: "15px" }} fullWidth label="userId" name='id' onChange={handleChange} />
                                <TextField sx={{ marginTop: "15px" }} fullWidth label="email" name='email' onChange={handleChange} required />

                                <Grid container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "10px", marginTop: "50px" }}>
                                    <Link style={{ textDecoration: "none" }} to="/">
                                        <Button style={{
                                            backgroundColor: "#fff",
                                            color: "#000"
                                        }} variant="contained">Cancel</Button>
                                    </Link>
                                    <Button onClick={handleSubmit} variant="contained">Login</Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>

                </Box>
            </Modal>
        </>
    );
}
