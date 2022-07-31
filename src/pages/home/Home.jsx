import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavbarMain from '../../components/NavbarMain';
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Home.css'
import { IconButton } from '@mui/material';
import Axios from 'axios'
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
    const likedPosts = JSON.parse(localStorage.getItem('likedPost'))

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
                            <IconButton disabled={likedPosts.find(post => post.id === item.id)}
                                onClick={() => {
                                    likePost(item.id, item.title, item.body)
                                    toast.success(`You like ${item.title} posts`)
                                }}>
                                {likedPosts.find(post => post.id === item.id) ?
                                    <CheckCircleIcon sx={{ fontSize: 35, color: "pink" }} /> :
                                    <FavoriteIcon sx={{ fontSize: 35, color: "pink" }} />
                                }
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
                            </div>
                            <IconButton disabled={likedPosts.find(post => post.id === item.id)}
                                onClick={() => {
                                    likePost(item.id, item.title, item.body)
                                    toast.success(`You like ${item.title} posts`)
                                }}>
                                {likedPosts.find(post => post.id === item.id) ?
                                    <CheckCircleIcon sx={{ fontSize: 35, color: "pink" }} /> :
                                    <FavoriteIcon sx={{ fontSize: 35, color: "pink" }} />
                                }
                            </IconButton>
                        </Card>
                    )
                )}

                {isLoading && <Loader />}
            </div>

        </>
    )
}