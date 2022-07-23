import React, { useState, useEffect } from 'react'
import NavbarMain from '../../components/NavbarMain';
import { Modal, Typography, IconButton, Box, Button } from '@mui/material';
import Axios from 'axios'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalPost from '../../components/ModalPost'
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";

export default function Admin() {
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem('authData'))
    const [posts, setPosts] = useState([])
    const adminPosts = posts.filter(item => item.userId === userData.id)
    const [post, setPost] = useState({
        title: "",
        body: ""
    })
    const [comment, setComment] = useState([])
    const [pages, setPages] = useState(1)
    const { setPostData } = bindActionCreators(actionCreators, dispatch);

    //MODAL VIEW POST
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setPost({
            title: "",
            body: ""
        })
        setComment([])
        setOpen(false)
    };

    // MODAL DELETE
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const Card = ({ children }) => {
        return (
            <div className='card-post'>
                {children}
            </div>
        );
    };

    const getPosts = async (page) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        await Axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10)`)
            .then(response => {
                setPosts([...posts, ...response.data])
            })
    }

    const getComment = (id) => {
        Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then(response => {
                setComment(response.data)
            })
    }

    useEffect(() => {
        getPosts(pages)
        setPages((pages) => pages + 1)
    }, [])

    return (
        <>
            <NavbarMain />
            <div className='home-container'>
                {adminPosts.map((item, index) =>
                    <Card key={index}>
                        <div className='content'>
                            <h4 style={{ cursor: "pointer" }} onClick={() => {
                                setPost({
                                    title: item.title,
                                    body: item.body
                                })
                                getComment(item.id)
                                setTimeout(() => {
                                    handleOpen()
                                }, 500)
                            }}>{item.title}</h4>
                            <p>{item.body}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <Link style={{ textDecoration: "none" }} to={`/admin/posts/${item.id}/edit`} state={{ background: location }}>
                                <Button variant="contained" color='primary'
                                    onClick={() => {
                                        setPost({
                                            title: item.title,
                                            body: item.body
                                        })
                                        setPostData(item)
                                    }}>
                                    Edit
                                </Button>
                            </Link>
                            <Button sx={{ backgroundColor: "red" }} variant="contained" onClick={handleOpenDeleteModal}>
                                Delete
                            </Button>
                        </div>

                    </Card>
                )}
            </div>

            <Link to='/admin/create' state={{ background: location }}>
                <IconButton sx={{ zIndex: 1, position: "fixed", bottom: 0, right: '10px' }} >
                    <AddCircleIcon color='primary' sx={{ fontSize: 50 }} />
                </IconButton>
            </Link>

            <Outlet />

            {/* MODAL VIEW */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "400px",
                    height: "700px",
                    overflowY: "auto",
                    bgcolor: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography sx={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                        {post.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {post.body}
                    </Typography>

                    <Typography id="modal-modal-comment" sx={{ mt: 5, fontWeight: "bold" }}>
                        Comments
                    </Typography>
                    <Box sx={{
                        padding: "10px 10px",
                        border: "0.5px solid gray"
                    }}>
                        {comment.map((item, index) => {
                            return (
                                <div key={index} style={{ marginBottom: "10px" }}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {item.name}
                                    </Typography>
                                    <Typography>
                                        {item.body}
                                    </Typography>
                                </div>
                            )
                        })}
                    </Box>
                </Box>
            </Modal>

            {/* MODAL CREATE & EDIT */}
            <ModalPost openModalPost />

            {/* MODAL DELETE */}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "400px",
                    bgcolor: 'white',
                    border: 'none',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography sx={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                        Delete Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure delete this post?
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: '10px',
                        marginTop: "20px"
                    }}>
                        <Button sx={{ backgroundColor: "red" }} variant='contained' onClick={handleCloseDeleteModal}>
                            Yes
                        </Button>
                        <Button sx={{ backgroundColor: "gray" }} variant='contained' onClick={handleCloseDeleteModal}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}