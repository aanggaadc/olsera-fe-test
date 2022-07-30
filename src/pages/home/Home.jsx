import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import NavbarMain from '../../components/NavbarMain';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Home.css'
import { IconButton } from '@mui/material';
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";

export default function Home({ getComment }) {
    const dispatch = useDispatch();
    const location = useLocation()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [pages, setPages] = useState(1)
    const observer = useRef()
    const TOTAL_PAGES = 10
    const { setPostData } = bindActionCreators(actionCreators, dispatch);

    const Card = ({ children, reference }) => {
        return (
            <div className='card-post' ref={reference}>
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

        await Axios.get(`/posts?_page=${page}&_limit=10)`)
            .then(response => {
                setPosts([...posts, ...response.data])
                setIsLoading(false)
            })
    }

    const likePost = (id, title, body) => {
        if (localStorage.getItem('likedPost') === null) {
            localStorage.setItem('likedPost', '[]')
        }
        const newLike = {
            id: id,
            title: title,
            body: body,
        }

        const dataLike = JSON.parse(localStorage.getItem('likedPost'))
        dataLike.push(newLike)

        localStorage.setItem('likedPost', JSON.stringify(dataLike))
    }

    useEffect(() => {
        getPosts(pages)
        setPages((pages) => pages + 1)
    }, [])

    return (
        <>
            <NavbarMain title="Home" />
            <div className='home-container'>
                {posts.map((item, index) =>
                    index + 1 === posts.length ? (
                        <Card reference={lastItemRef} key={index}>
                            <div className='content'>
                                <Link style={{ textDecoration: "none" }}
                                    to={`/posts/${item.id}`}
                                    state={{ background: location }}>
                                    <h4 style={{ cursor: "pointer" }} onClick={() => {
                                        setPostData(item)
                                        getComment(item.id)
                                    }}>{item.title}</h4>
                                </Link>
                                <p>{item.body}</p>
                            </div>
                            <IconButton onClick={() => {
                                likePost(item.id, item.title, item.body)
                                toast.success(`You like ${item.title} posts`)
                            }}>
                                <FavoriteIcon sx={{ fontSize: 35, color: "pink" }} />
                            </IconButton>
                        </Card>

                    ) : (
                        <Card key={index}>
                            <div className='content'>
                                <Link style={{ textDecoration: "none" }}
                                    to={`/posts/${item.id}`}
                                    state={{ background: location }}>
                                    <h4 style={{ cursor: "pointer" }} onClick={() => {
                                        setPostData(item)
                                        getComment(item.id)
                                    }}>{item.title}</h4>
                                </Link>
                                <p>{item.body}</p>
                                <Outlet />

                            </div>
                            <IconButton onClick={() => {
                                likePost(item.id, item.title, item.body)
                                toast.success(`You like ${item.title} posts`)
                            }}>
                                <FavoriteIcon sx={{ fontSize: 35, color: "pink" }} />
                            </IconButton>
                        </Card>
                    )
                )}

                {isLoading && <Loader />}
            </div>

        </>
    )
}