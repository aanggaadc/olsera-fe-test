import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavbarMain from '../../components/NavbarMain';
import Card from '../../components/Card'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import { toast } from 'react-toastify'

export default function LikedPosts({ getComment }) {
    const location = useLocation()
    const posts = JSON.parse(localStorage.getItem('likedPost'))
    const dispatch = useDispatch()
    const { setPostData } = bindActionCreators(actionCreators, dispatch);

    const unlikePost = (id, title) => {
        const filterPost = posts.filter(item => item.id !== id)
        localStorage.setItem('likedPost', JSON.stringify(filterPost))
        toast.success(`Successfully unlike ${title} posts`, {
            onClose: () => setTimeout(() => {
                window.location.reload()
            }, 3000)
        })
    }

    return (
        <>
            <NavbarMain title="Liked Posts" />
            <div className='home-container'>
                {posts ? posts.map((item, index) =>
                    <Card key={index}>
                        <div className='content'>
                            <Link style={{ textDecoration: "none" }}
                                to={`/posts/${item.id}`}
                                state={{ background: location }}>
                                <h4 onClick={() => {
                                    setPostData(item)
                                    getComment(item.id)
                                }}>{item.title}</h4>
                            </Link>
                            <p>{item.body}</p>
                        </div>
                        <IconButton onClick={() => {
                            unlikePost(item.id, item.title)
                        }}>
                            <DeleteIcon sx={{ fontSize: 35, color: "red" }} />
                        </IconButton>
                    </Card>

                ) :
                    <h1 style={{ textAlign: "center" }}>No post liked yet</h1>
                }
            </div>
        </>
    )
}