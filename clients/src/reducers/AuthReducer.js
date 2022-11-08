const initialState = {
    token:''
}


export const AuthReducer = (auth = initialState, action) => {
    switch(action.type) {
        case 'register':
            return [...auth,action.payload]
        case 'login': 
            return {...auth,token:action.payload}
        case 'getuser_by_id':
            return [...auth, action.payload]
        case 'resetpassword':
            return [...auth, action.payload]
        case 'tokenconfirm':
            return [...auth, action.payload]
        default:
            return auth
    }
}