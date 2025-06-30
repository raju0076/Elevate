


export const fetchsucces=(data)=>(
    
        {type:"FETCH_SUCCESS", payload:data}
    
)


export const fetchloading=()=>(
    {type:"FETCH_LOADING",payload:true}
)

export const fetcherror=(error)=>(
    {type:"FETCH_ERROR", payload:error}
)



export const fetchData=()=>{
    return (dispatch)=>{
       
                dispatch(fetchloading())
                fetch("https://fakestoreapi.com/products")
                .then(res=>res.json())
                .then(res=>{
                    dispatch(fetchsucces(res))
                })
                .catch(error=>{
                    dispatch(fetcherror(error))
        
                })
        
            
    }
}