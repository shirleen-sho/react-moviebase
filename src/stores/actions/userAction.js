import axios from 'axios';

export const EDIT_USER_PROFILE = "EDIT_USER_PROFILE"

export const editUserProfile = (inputEditProfile) => {
    return async(dispatch) => {      // dispatch sebagai penghubung
        try {
            // loading
            dispatch({
                type: EDIT_USER_PROFILE,
                payload: {
                    loading: true,
                    data: false,
                    errorMessage: false
                }
            })

            const res = await axios.put('http://notflixtv.herokuapp.com/api/v1/users', inputEditProfile)
            console.log(res)
            dispatch({
                type: EDIT_USER_PROFILE,
                payload: {
                    loading: false,
                    data: res.data.data.docs,
                    errorMessage: false
                }
            })
            
        } catch (error){
            dispatch({
                type: EDIT_USER_PROFILE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        }
    }
}