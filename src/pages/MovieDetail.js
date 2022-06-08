/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player'
import ModalImage from 'react-modal-image'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '../stores/actions/movieAction';
import axios from 'axios';
import { Grid } from  'react-loader-spinner'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Tabs, Rate, Form, Input, message, Card } from 'antd';
import { FrownOutlined, EditOutlined } from '@ant-design/icons'
import 'antd/dist/antd.min.css';
const { TabPane } = Tabs;

function MovieDetail() {
    const { id } = useParams()
    const { getDetailMovieResult, getDetailMovieLoading } = useSelector((state) => state.movieReducer);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getMovieDetail(id)); }, [dispatch, id]);

    const [formReview] = Form.useForm();
    // const [inputReview, setInputReview] = useState({
    //     title: '',
    //     rating: '',
    //     content: ''
    // });

    // const handleReviewInput = e => {
    //     setInputReview({
    //         ...inputReview,
    //         [e.target.id]: e.target.value
    //     });
    // };

    const onReset = () => {
        formReview.resetFields();
    };

    const onFinish = async (values) => {
        const inputReview = {
            'title': values.title, 
            'rating': values.rate*2, 
            'content': values.content
        }
        console.log(inputReview);
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        try {
            const res = await axios.post(`https://notflixtv.herokuapp.com/api/v1/reviews/${id}/create`, inputReview, { headers: {"Authorization" : `Bearer ${token}`} })
            console.log(res)
            const userReview = {
                'data': res.data.data
            }
            localStorage.setItem('userReview', JSON.stringify(userReview))
            formReview.resetFields()
            message.success('Add Review SUCCESS !')
            window.location.reload()

        } catch (error) {
            console.log(error)
            message.error('Add Review ERROR !')
        }
    }

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.2} }}
        >
            { getDetailMovieLoading ? (
                <div className='p-10 flex justify-center items-center flex-row gap-10'>
                    <Grid color="#BE123C" height={80} width={80}/>
                </div>
            ) : ( 
                getDetailMovieResult && 
                    <div className='p-10 flex flex-col md:flex-row gap-8 md:gap-5 w-full'>
                        <div className='w-full md:w-1/3 lg:w-1/4'>
                            <ModalImage
                                small={`https://image.tmdb.org/t/p/original${getDetailMovieResult.poster}`}
                                large={`https://image.tmdb.org/t/p/original${getDetailMovieResult.poster}`}
                                className='w-full'
                                alt='Poster'
                            />
                        </div>
                            {/* { screen.width < 768
                                ? (<Tabs tabPosition='top' centered className='w-full md:w-2/3 lg:w-3/4'>)
                                : (<Tabs tabPosition='left' className='w-full md:w-2/3 lg:w-3/4'>)
                            } */}
                        <Tabs tabPosition={ screen.width < 768 ? 'top' : 'left'} centered className='w-full md:w-2/3 lg:w-3/4'>
                            <TabPane tab="Overview" key="1">
                                <div className='pt-4 md:px-3 flex justify-center flex-col gap-2'>
                                    <h1 className='font-bold text-3xl'>{getDetailMovieResult.title}</h1>
                                    <div className='flex items-center flex-wrap gap-3'>
                                        { getDetailMovieResult.genres.length > 0 && getDetailMovieResult.genres.map(genre => { 
                                            return (
                                                <a href={`/?genre=${genre}`} key={genre}>
                                                    <button className='px-3 py-1 rounded-md text-rose-700 bg-rose-50 hover:text-rose-50 hover:bg-rose-700 font-bold text-xs'>{genre}</button>
                                                </a>
                                            )}) 
                                        }
                                    </div>
                                    <span className='mt-4 text-justify'>{getDetailMovieResult.synopsis}</span>
                                    <span><Rate disabled allowHalf defaultValue={getDetailMovieResult.rating/2}/><span className='ml-3'>({getDetailMovieResult.reviews.length} reviews)</span></span>
                                    { getDetailMovieResult.trailer !== 'https://www.youtube.com/watch?v=undefined' &&
                                    (<>
                                        <span className='my-2 font-medium'>Trailer :</span>
                                        <div className='player-wrapper'>
                                            <ReactPlayer 
                                                className='react-player'
                                                url={getDetailMovieResult.trailer} 
                                                controls
                                                width='100%'
                                                height='100%'
                                            />
                                        </div>
                                    </>) 
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="Casts" key="2">
                                <div className='w-full pt-4 md:pl-3 gap-x-7 gap-y-5 flex justify-center md:justify-start flex-row flex-wrap'>
                                    { getDetailMovieResult.casts.length > 0 && getDetailMovieResult.casts.map(cast => { return (
                                            <div className='w-24 flex flex-col gap-1 text-center' key={cast.cast_id}>
                                                <div className='w-24 h-36'>
                                                    <LazyLoadImage 
                                                        effect='blur'
                                                        width='100%' 
                                                        height='100%'
                                                        src={ cast.profile_path !== null ? (`https://image.tmdb.org/t/p/original${cast.profile_path}`) : (`https://via.placeholder.com/960x1440?text=No+Image`) } 
                                                        className='object-cover rounded-lg' 
                                                        alt='Cast Profile'
                                                        placeholderSrc={process.env.PUBLIC_URL + '/spinner.gif'} 
                                                    />
                                                </div>
                                                <span className='font-bold text-xs mt-2'>{cast.name}</span> 
                                                <span style={{ fontSize: 10 }}>as {cast.character || '-'}</span>
                                            </div>
                                    ) }) }
                                </div>
                                { getDetailMovieResult.casts.length === 0 &&
                                    <div className='p-6 flex flex-row flex-wrap justify-center items-center gap-2'>
                                        <span className='font-medium text-base text-rose-700'>Sorry, no data available</span>
                                        <FrownOutlined style={{ color: '#be123c', fontSize: 18 }} />
                                    </div>
                                }
                            </TabPane>
                            <TabPane tab="Reviews" key="3">
                                <div className='pt-5 md:pt-0 flex flex-col gap-5'>
                                { !localStorage.getItem('isUserLogin') ? (
                                    <div className='flex bg-gray-100 p-4 justify-center items-center flex-row gap-10'>
                                        <div className='font-light text-sm'><span className='font-bold'>Sign in</span> to write your review !</div>
                                    </div>
                                ) : (
                                    <Form
                                        name="validate_other"
                                        form={formReview} 
                                        onFinish={onFinish}
                                    >
                                        <Card
                                            className='drop-shadow-md hover:drop-shadow-lg'
                                            headStyle={{ color: 'rgb(15 23 42)' }}
                                            actions={[
                                                <button 
                                                    key="reset" 
                                                    onClick={onReset}
                                                    className='w-full h-full'
                                                >
                                                    Reset
                                                </button>,
                                                <button
                                                    key="submit"
                                                    htmlType="submit" 
                                                    className='font-bold border-none border-0 w-full h-full'
                                                >
                                                    Submit
                                                </button>
                                            ]}
                                            title="Write your review !"
                                        >
                                            <Form.Item
                                                name="title"
                                                label="Title"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input the title of review!',
                                                        whitespace: true,
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                                        <Form.Item 
                                                            name="rate" 
                                                            label="Rate"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please input the rating of review!'
                                                                }
                                                            ]}
                                                        >
                                                            <Rate allowHalf/>
                                                        </Form.Item>
                                            <Form.Item
                                                name="content"
                                                label="Content"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input the content of review!',
                                                },
                                                ]}
                                            >
                                                <Input.TextArea showCount maxLength={200} />
                                            </Form.Item>
                                        </Card>
                                    </Form>
                                ) }
                                    { getDetailMovieResult.reviews.length > 0 ? ( getDetailMovieResult.reviews.map(review => { return (
                                        <div key={review._id} className='flex flex-col gap-2 bg-gray-100 p-4'>
                                            <div className='flex flex-row justify-between items-center'>
                                                <span className='font-bold text-sm text-justify'>{ review.title || 'No title' }</span>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <span className='text-xs text-gray-400'>{ review.reviewer.first_name + ' ' + review.reviewer.last_name }</span>
                                                    <img 
                                                        src={ review.reviewer.image || 'https://via.placeholder.com/900?text=No+Image' }
                                                        className="h-5 rounded-full" 
                                                        alt="Profile Pic"
                                                    />
                                                </div>
                                            </div>
                                            <Rate disabled allowHalf defaultValue={review.rating/2} style={{ fontSize: 14 }}/>
                                            <span className='text-xs text-justify'>{ review.content || 'No content' }</span>
                                        </div>
                                        ) })) : (
                                        <div className='p-6 flex flex-row flex-wrap justify-center items-center gap-2'>
                                            <span className='font-medium text-base text-rose-700'>No review yet</span>
                                            <EditOutlined style={{ color: '#be123c', fontSize: 18 }} />
                                        </div>
                                        )
                                    }
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
            )}
        </motion.div>
    )
}

export default MovieDetail;