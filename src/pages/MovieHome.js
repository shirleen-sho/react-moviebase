import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList, getGenreList } from '../stores/actions/movieAction';
import { Rings, Grid } from  'react-loader-spinner'
import { motion } from 'framer-motion'
import { Carousel, Rate, BackTop } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function MovieHome() {
    const queryParams = new URLSearchParams(window.location.search)
    let current_page = queryParams.get("page")
    if (current_page === null) { current_page = 1; }
    let current_genre = queryParams.get("genre")
    if (current_genre === null) { current_genre = 'all'; }
    let search_title = queryParams.get("searchMovie")

    const { 
        getListMovieTotalPages,
        getListMovieCurrentPage,
        getListMovieResult, 
        getListMovieLoading, 
        // getListMovieError,
        getListGenreResult,
        getListGenreLoading,
        // getListGenreError
    } = useSelector((state) => state.movieReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenreList());
        dispatch(getMovieList({page: current_page, genre: current_genre, title: search_title}));
    }, [dispatch, current_page, current_genre, search_title]);

    let pagination = [];
    for (let i = 1; i <= getListMovieTotalPages; i++) {
        if (current_genre === 'all') {
            if (i === getListMovieCurrentPage) {
                pagination.push(<a href={`?page=${i}`} key={i}><button className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 p-1 lg:p-2 rounded-full text-rose-50 bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>{i}</button></a>);
            } else {
                pagination.push(<a href={`?page=${i}`} key={i}><button className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 p-1 lg:p-2 rounded-full text-rose-700 bg-rose-50 hover:text-rose-50 hover:bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>{i}</button></a>);
            }
        }
        else {
            if (i === getListMovieCurrentPage) {
                pagination.push(<a href={`?page=${i}&genre=${current_genre}`} key={i}><button className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 p-1 lg:p-2 rounded-full text-rose-50 bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>{i}</button></a>);
            } else {
                pagination.push(<a href={`?page=${i}&genre=${current_genre}`} key={i}><button className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 p-1 lg:p-2 rounded-full text-rose-700 bg-rose-50 hover:text-rose-50 hover:bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>{i}</button></a>);
            }
        }
    }

    const contentStyle = {
        color: '#fff',
        background: 'rgb(15 23 42)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    };

    const styleBackTop = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 10,
        backgroundColor: 'rgb(15 23 42)',
        color: '#fff',
        textAlign: 'center'
    };

    return(
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.2} }}
        >
            <BackTop style={styleBackTop}>
                <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
            </BackTop>
            {/* <div className='header relative flex justify-start items-center h-fit'>
                <div className='absolute ml-24 w-96'>
                    <h1 className='font-bold text-white text-5xl mb-6'>John Wick 3 : Parabellum</h1>
                    <p className='font-medium text-white text-sm'>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
                </div>
                <img src='/assets/images/Poster.png' className="max-w-full h-full" alt="Poster"/>
            </div> */}
            <Carousel autoplay>
                <div>
                    <div style={contentStyle} className='h-80 md:h-100 lg:h-screen px-10 md:px-16 flex flex-row flex-wrap gap-10'>
                        <div className='gap-8 md:gap-10 lg:gap-14 w-full sm:w-1/2 flex flex-col pt-16 sm:pt-20 lg:pt-44'>
                            <span className='font-bold text-4xl sm:text-3xl lg:text-6xl lg:leading-tight'>Welcome to MovieBase !</span>
                            <span className='text-base md:text-xl lg:text-2xl italic'>MovieBase is a movie database web app</span>
                        </div>
                        <div className='w-1/2 h-full sm:p-12 lg:p-20 hidden sm:block'>
                            <img src='assets/images/movie.png' alt='Movie' className='w-auto h-full'/>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={contentStyle} className='h-80 md:h-100 lg:h-screen gap-3 lg:gap-10 pt-20 sm:pt-24 lg:pt-44 px-10'>
                        <span className='text-xl md:text-2xl lg:text-4xl'>You can find movies by the <span className='text-blue-300'>title</span> or <a href='#genres' className='text-rose-300 hover:text-rose-300'>genres</a></span>
                        <span className='text-xl md:text-2xl lg:text-4xl'>Create an account and sign in to write <span className='text-yellow-500'>reviews</span></span>
                    </div>
                </div>
            </Carousel>
            <div className='p-12' id='genres'>
                <h2 className='font-bold text-xl md:text-2xl mb-8 text-center lg:text-left'>Genres</h2>
                <div className='flex justify-center items-center flex-wrap gap-4'>
                    { current_genre === 'all' 
                        ? (<a href='/'><button className='px-3 md:px-4 lg:px-5 py-1 lg:py-2 rounded-md text-rose-50 bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>All</button></a>)
                        : (<a href='/'><button className='px-3 md:px-4 lg:px-5 py-1 lg:py-2 rounded-md text-rose-700 bg-rose-50 hover:text-rose-50 hover:bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>All</button></a>)
                    }
                    { getListGenreLoading ? (
                        <Rings color="#BE123C" height={80} width={80}/>
                    ) : (
                        getListGenreResult.length > 0 && getListGenreResult.map(genre => { return (
                            current_genre === genre 
                            ? (<a href={`?genre=${genre}`} key={genre}>
                                <button className='px-3 md:px-4 lg:px-5 py-1 lg:py-2 rounded-md text-rose-50 bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>{genre}</button>
                            </a>) 
                            : (<a href={`?genre=${genre}`} key={genre}>
                                <button className='px-3 md:px-4 lg:px-5 py-1 lg:py-2 rounded-md text-rose-700 bg-rose-50 hover:text-rose-50 hover:bg-rose-700 font-bold text-xs md:text-sm lg:text-base'>{genre}</button>
                            </a>)
                            ) 
                        })
                    ) }
                </div>
            </div>
            <div className='px-12 pt-0 pb-16 gap-x-9 gap-y-12 flex justify-center flex-row flex-wrap'>
                { getListMovieLoading ? (
                    <Grid color="#BE123C" height={80} width={80}/>
                ) : ( 
                 getListMovieResult.length > 0 && getListMovieResult.map(item => { return (
                    <Link to={`/detail/${item._id}`} key={item._id} className='text-slate-900 hover:text-blue-600'>
                        <div className='movie-card w-48 flex flex-col flex-wrap gap-1'>
                            <div className='w-48 h-72'>
                                <LazyLoadImage 
                                    effect='blur'
                                    width='100%' 
                                    height='100%'
                                    src={`https://image.tmdb.org/t/p/original${item.poster}`} 
                                    className='object-cover rounded-lg'
                                    alt='Movie Poster' 
                                    placeholderSrc={process.env.PUBLIC_URL + '/spinner.gif'} 
                                />
                            </div>
                            { /* item.year ganti jadi item.rating*/}
                            <div className='flex flex-row items-center mt-3'>
                                <Rate disabled allowHalf defaultValue={item.rating} style={{ fontSize: 14 }}/>
                                {/* <span className='ml-3' style={{ fontSize: 10 }}>({item.reviews.length})</span> */}
                            </div>
                            <span className='font-bold text-lg mb-2'>{item.title}</span>
                            <div className='flex flex-row flex-wrap gap-1'>
                                { item.genres.length > 0 && item.genres.map(g => { return (
                                    <div key={g} className='px-1 text-gray-400 bg-gray-100 font-bold' style={{ fontSize: 10 }}>{g}</div>
                                ) }) }
                            </div>
                        </div>
                    </Link>
                ) }) )}
            </div>
            <div className='pages p-12 pt-0'>
                <div className='flex justify-center items-center flex-wrap gap-3 md:gap-4'>
                    {pagination}
                </div>
            </div>
        </motion.div>
    )
}

export default MovieHome;