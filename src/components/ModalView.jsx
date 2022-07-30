import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import {
    Modal,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/index";


export default function ModalView() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { clearPostData, clearCommentData } = bindActionCreators(actionCreators, dispatch);
    const { post, comment } = useSelector((state) => {
        return state;
    });

    return (
        <Modal
            open={true}
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
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton sx={{}} onClick={() => {
                        clearPostData()
                        clearCommentData()
                        navigate(-1)
                    }} >
                        <CloseIcon sx={{ color: "#000" }} />
                    </IconButton>
                </Box>

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
                    {comment.state.map((item, index) => {
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
    )
}