import React, { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '../../components/NavbarMain'
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Home.css'
import { Button, Modal, Typography } from '@mui/material';
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])
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

    const modalStyle = {
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
        p: 4,
    };

    const commentStyle = {
        padding: "10px 10px",
        border: "0.5px solid gray"
    }

    const Card = ({ children, reference }) => {
        return (
            <div ref={reference}>
                {children}
            </div>
        );
    };

    const Loader = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    }

    const lastItemRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    if (pages < TOTAL_PAGES) {
                        getPosts(pages);
                        setPages((pages) => pages + 1);
                    } else {
                        setHasMore(false);
                    }
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

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
            <Navbar />
            <div className='home-container'>
                {posts.map((item, index) =>
                    index + 1 === posts.length ? (
                        <Card reference={lastItemRef} key={index}>
                            <div className='card'>
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
                                <div className='button'>
                                    <Button>
                                        <FavoriteIcon sx={{ fontSize: 35, color: "pink" }} />
                                    </Button>
                                </div>
                            </div>
                        </Card>

                    ) : (
                        <Card key={index}>
                            <div className='card'>
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
                                <div className='button'>
                                    <Button>
                                        <FavoriteIcon sx={{ fontSize: 35, color: "pink" }} />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )
                )}

                {isLoading && <Loader />}
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography sx={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                        {post.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {post.body}
                    </Typography>

                    <Typography id="modal-modal-comment" sx={{ mt: 5, fontWeight: "bold" }}>
                        Comment
                    </Typography>
                    <Box sx={commentStyle}>
                        {comment.map((item, index) => {
                            return (
                                <div key={index} style={{ marginBottom: "5px" }}>
                                    <Typography variant='h6' component='h3'>
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