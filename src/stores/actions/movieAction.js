import axios from 'axios';

export const GET_MOVIE_LIST = "GET_MOVIE_LIST"
export const GET_GENRE_LIST = "GET_GENRE_LIST"
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL"
export const GET_SEARCH_MOVIE = "GET_SEARCH_MOVIE"

export const getMovieList = ({page, genre, title}) => {
    return async(dispatch) => {      // dispatch sebagai penghubung
        try {
            // loading
            dispatch({
                type: GET_MOVIE_LIST,
                payload: {
                    loading: true,
                    data: false,
                    totalPages: false,
                    currentPage: false,
                    errorMessage: false
                }
            })

            if (title !== null) {
                const movieSearch = await axios.get(`https://notflixtv.herokuapp.com/api/v1/movies?search=${title}`)
                console.log(movieSearch)
                // sebelumnya: https://awesome-movie-data.herokuapp.com/api/v1/movies/search/?like=${title}&page=${page}
                dispatch({
                    type: GET_MOVIE_LIST,
                    payload: {
                        loading: false,
                        data: movieSearch.data.data.docs,
                        totalPages: movieSearch.data.data.totalPages,
                        currentPage: movieSearch.data.data.page,
                        errorMessage: false
                    }
                })
            }
            else if(genre !== 'all') {
                const movieSelectedGenre = await axios.get(`https://notflixtv.herokuapp.com/api/v1/movies?page=${page}&genre=${genre}`)
                console.log(movieSelectedGenre)
                // sebelumnya: https://awesome-movie-data.herokuapp.com/api/v1/movies/genre?genre=${genre}&page=${page}
                dispatch({
                    type: GET_MOVIE_LIST,
                    payload: {
                        loading: false,
                        data: movieSelectedGenre.data.data.docs,
                        totalPages: movieSelectedGenre.data.data.totalPages,
                        currentPage: movieSelectedGenre.data.data.page,
                        errorMessage: false
                    }
                })
            }
            else {
                const movieAll = await axios.get(`https://notflixtv.herokuapp.com/api/v1/movies?page=${page}`)
                console.log(movieAll)
                // sebelumnya: https://awesome-movie-data.herokuapp.com/api/v1/movies/all/?page=${page}
                dispatch({
                    type: GET_MOVIE_LIST,
                    payload: {
                        loading: false,
                        data: movieAll.data.data.docs,
                        totalPages: movieAll.data.data.totalPages,
                        currentPage: movieAll.data.data.page,
                        errorMessage: false
                    }
                })
            }

            
        } catch (error){
            dispatch({
                type: GET_MOVIE_LIST,
                payload: {
                    loading: false,
                    data: false,
                    totalPages: false,
                    currentPage: false,
                    errorMessage: error.message
                }
            })
        }
    }
}

export const getGenreList = () => {
    return async(dispatch) => {      // dispatch sebagai penghubung
        try {
            // loading
            dispatch({
                type: GET_GENRE_LIST,
                payload: {
                    loading: true,
                    data: false,
                    errorMessage: false
                }
            })

            const genreAll = await axios.get(`https://notflixtv.herokuapp.com/api/v1/movies/genres`)
            console.log(genreAll)
            // sebelumnya: https://awesome-movie-data.herokuapp.com/api/v1/movies/allgenre

            dispatch({
                type: GET_GENRE_LIST,
                payload: {
                    loading: false,
                    data: genreAll.data.data,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: GET_GENRE_LIST,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        }
    }
}

export const getMovieDetail = (id) => {
    return async(dispatch) => {      // dispatch sebagai penghubung
        try {
            // loading
            dispatch({
                type: GET_MOVIE_DETAIL,
                payload: {
                    loading: true,
                    data: false,
                    errorMessage: false
                }
            })

            const movieDetail = await axios.get(`https://notflixtv.herokuapp.com/api/v1/movies/${id}`)
            console.log(movieDetail)
            // sebelumnya: https://awesome-movie-data.herokuapp.com/api/v1/movies?movieId=${id}

            dispatch({
                type: GET_MOVIE_DETAIL,
                payload: {
                    loading: false,
                    data: movieDetail.data.data,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: GET_MOVIE_DETAIL,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        }
    }
}