import React, { useEffect, useReducer } from 'react'
import { fetchData, fetchloading, fetchsucces } from '../Redux/actions'



export const Practice = () => {


    

    useEffect(()=>{
        dispatch(fetchData())
    },[])

  
  return (
    <div className='grid grid-cols-4 gap-7 '>
       {state.todos.map(el=>(
        <div key={el.id} className='shadow-md text-center'>
              <img src={el.image} alt="title" />
              <h1>{el.title}</h1>
              <p>{el.price}</p>
              <p>{el.category}</p>
        </div>
       ))}
    </div>
  )
}
