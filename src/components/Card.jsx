import React from 'react'
// import { Link } from 'react-router-dom'
// import { IconButton } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Card({ reference, children }) {
    return (
        <div className='card-post' ref={reference}>
            {children}
        </div>
    )
}