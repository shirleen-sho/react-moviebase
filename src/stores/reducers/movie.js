import { GET_MOVIE_LIST, GET_GENRE_LIST, GET_MOVIE_DETAIL } from "../actions/movieAction";

const initialState = {
    getListMovieTotalPages: false,
    getListMovieCurrentPage: false,
    getListMovieResult: false,
    getListMovieLoading: false,
    getListMovieError: false,
    getListGenreResult: false,
    getListGenreLoading: false,
    getListGenreError: false,
    getDetailMovieResult: false,
    getDetailMovieLoading: false,
    getDetailMovieError: false
};

const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_LIST:
            return { ...state,
                getListMovieTotalPages: action.payload.totalPages,
                getListMovieCurrentPage: action.payload.currentPage,
                getListMovieResult: action.payload.data,
                getListMovieLoading: action.payload.loading,
                getListMovieError: action.payload.errorMessage
            };
        case GET_GENRE_LIST:
            return { ...state,
                getListGenreResult: action.payload.data,
                getListGenreLoading: action.payload.loading,
                getListGenreError: action.payload.errorMessage
            };
        case GET_MOVIE_DETAIL:
            return { ...state,
                getDetailMovieResult: action.payload.data,
                getDetailMovieLoading: action.payload.loading,
                getDetailMovieError: action.payload.errorMessage
            };
        default: return state;
    }
}

export default movieReducer