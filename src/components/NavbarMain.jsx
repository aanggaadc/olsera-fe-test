import React from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom'
import { Button, AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

export default function NavbarMain() {
    const navigate = useNavigate()
    const authData = localStorage.getItem('authData')

    const handleLogout = () => {
        toast.success("You are logged out, see ya!!");
        localStorage.removeItem("authData");
        navigate('/login')
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography style={{ fontWeight: "600" }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{ textDecoration: "none", color: "#fff" }} to='/'> Homepage</Link>
                    </Typography>
                    {authData && <Button onClick={handleLogout} style={{
                        backgroundColor: "red",
                        color: "#fff",
                        marginRight: "10px"
                    }} variant="contained" >
                        Logout
                    </Button >}
                    <Link style={{ color: '#fff' }} to='/liked-posts'>
                        <FavoriteIcon />
                    </Link>
                    <MoreIcon />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
