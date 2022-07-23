import React, { useState, useEffect, useRef, useCallback } from 'react'
import NavbarMain from '../../components/NavbarMain';
import { Modal, Typography } from '@mui/material';
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Admin() {
    const userData = JSON.parse(localStorage.getItem('authData'))
    const [posts, setPosts] = useState([])
    const adminPosts = posts.filter(item => item.userId === userData.id)
    const [post, setPost] = useState({
        title: "",
        body: ""
    })
    const [comment, setComment] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [pages, setPages] = useState(1)
    const observer = useRef()
    const TOTAL_PAGES = 10
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

    const Card = ({ children, reference }) => {
        return (
            <div className='card-post'>
                {children}
            </div>
        );
    };

    const getPosts = async (page) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        await Axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10)`)
            .then(response => {
                setPosts([...posts, ...response.data])
                setIsLoading(false)
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
                    index + 1 === adminPosts.length ? (
                        <Card key={index}>
                            <div className='content'>
                                <h4 onClick={() => {
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
                        </Card>

                    ) : (
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
                        </Card>
                    )
                )}
            </div>

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
        </>
    )
}