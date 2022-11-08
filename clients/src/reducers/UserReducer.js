const IntialState = {
    user:[],
    allUsers: [],
    rating: []
}

export const UserReducer = (user = IntialState, action) => {
    switch (action.type) {
        case 'getUser':
            return {...user, user:action.payload}
        case 'getAllUsers': 
            return {...user, allUsers:action.payload}
        case 'getrating':
            return {...user, rating:action.payload}
        case 'updateUser':
            return {...user, user:action.payload}  
        case 'updateAvatar':
            return {...user, user:action.payload}

        case 'deleteUser':
            return {...user, allUsers:action.payload}
        default:
            return user;
    }
}