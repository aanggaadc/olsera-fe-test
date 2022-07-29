import React, {useEffect} from 'react'
import NavbarMain from '../../components/NavbarMain';
import {IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify'

export default function LikedPosts() {
    const posts = JSON.parse(localStorage.getItem('likedPost'))
    
    const unlikePost = (id) => {
        const filterPost = posts.filter(item => item.id !== id)
        localStorage.setItem('likedPost', JSON.stringify(filterPost))
        window.location.reload()        
    }

    return (
        <>
            <NavbarMain />
            <div className='home-container'>
                {posts ? posts.map((item, index) =>
                    <div key={index} className='card-post'>
                        <div className='content'>
                            <h4 >{item.title}</h4>
                            <p>{item.body}</p>
                        </div>
                        <IconButton onClick={() => {
                                unlikePost(item.id)
                            }}>
                                <DeleteIcon sx={{ fontSize: 35, color: "red" }} />
                            </IconButton>
                    </div>
                    
                ) :
                <h1 style={{textAlign: "center"}}>No post liked yet</h1>
            }
            </div>

            {/* <Modal
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
            </Modal> */}
        </>
    )
}