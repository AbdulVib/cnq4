export const initialState = {
    user: null,
    // allPosts: []
};

const reducer = (state, action) => {
    switch (action.type) {

        case 'USER':
            return {
                ...state,
                user: action.payload
            }

        case 'CLEAR_ALL':
            return {
                user: null
            }

        // case 'ALL_POST':
        //     return {
        //         ...state,
        //         allPosts: [...state.allPosts, ...action.payload]
        //     }

        default:
            return state
    }
}

export default reducer
