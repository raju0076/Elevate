import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import { useRef } from 'react'

function App() {
 const [time,setTime]=useState(0)
 const [isRunning,setIsRunnig]=useState(false)
 const ref=useRef(null)
 const [show,setShow]=useState(false)
 const [showChild,setShowChild]=useState(false)


 useEffect(()=>{

   if(isRunning){
    
    ref.current=setInterval(()=>{
        setTime((prev)=>prev+1)
    },100)

   }
  return ()=>clearInterval(ref.current)

 },[isRunning])

const handleStart=()=>{
  setIsRunnig(true)
}

const handleStop=()=>{
  setIsRunnig(false)
  clearInterval(ref.current)
}

const handleReset=()=>{
  setIsRunnig(false)
  setTime(0)
}

const showForm=()=>{
  setShow(!show)
}

const handleChild=()=>{
  setShowChild(!showChild)
}
  return (
    <>
     <h1>timer:{time}</h1>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>


      <button onClick={showForm}>Show Form</button>

      {show && (
        <div style={{width:"100%",height:"100px",color:"white", background:"black"}}>
              <div onClick={handleChild} style={{cursor:"pointer"}}>I am Main div click me</div>
              {showChild && (
                <div>I am child DIV i am not clickable</div>
              )}
        </div>
      )}
    </>
  )
}

export default App
