const intialState={
    todos:[],
    loading:false,
    error:""
}

export const todoReducer=(state=intialState,action)=>{
    switch (action.type){
        case "FETCH_SUCCESS":
            return {
                ...state,
                todos:action.payload
            }
        case "FETCH_LOADING":
            return {
                ...state,
                loading:true
            }
        case "FETCH_ERROR":
            return {
                ...state,
                error:action.payload
            }
        default:
            return state
    }
}
