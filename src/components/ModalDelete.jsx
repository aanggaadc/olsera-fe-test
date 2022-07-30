import React from 'react'
import { Modal, Typography, Box, Button } from "@mui/material";


export default function ModalDelete({ openDeleteModal, handleCloseDeleteModal }) {

    return (
        <Modal
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "400px",
                    bgcolor: "white",
                    border: "none",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography
                    sx={{ fontWeight: "bold" }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Delete Post
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure delete this post?
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <Button
                        sx={{ backgroundColor: "red" }}
                        variant="contained"
                        onClick={handleCloseDeleteModal}
                    >
                        Yes
                    </Button>
                    <Button
                        sx={{ backgroundColor: "gray" }}
                        variant="contained"
                        onClick={handleCloseDeleteModal}
                    >
                        No
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}