import { getAllU } from "../api/UserApi";

export const getAllUsers = () => async(dispatch) => {
    try {
        const {data} = await getAllU()
        return dispatch({type:'getAllUsers', payload: data.result})
    } catch (error) {
        console.log(error);
    }
}