import React, { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '../../components/NavbarMain'
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Home.css'
import { Button } from '@mui/material';
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Home() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [pages, setPages] = useState(1)
    const observer = useRef()
    const TOTAL_PAGES = 10

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
                        getData(pages);
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

    const getData = async (page) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        await Axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10)`)
            .then(response => {
                console.log(response)
                setData([...data, ...response.data])
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getData(pages)
        setPages((pages) => pages + 1)
    }, [])

    return (
        <>
            <Navbar />
            <div className='home-container'>
                {data.map((item, index) =>
                    index + 1 === data.length ? (
                        <Card reference={lastItemRef} key={index}>
                            <div className='card'>
                                <div className='content'>
                                    <h4>{item.body}</h4>
                                    <p>{item.title}</p>
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
                                    <h4>{item.body}</h4>
                                    <p>{item.title}</p>
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
        </>
    )
}