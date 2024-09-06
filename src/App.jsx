
import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
  
   const [password, setPassword]=useState("")
   const [lenght ,setlenght]=useState(8)
   const [character ,setCharacter]=useState( false)
   const [number ,setNumber]=useState(false)
   
   const passwordGenerator=useCallback(  () =>{
     let pass = ""
     let str = "ABCDEFGHIGKMLNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if (number) str += "0123456789"
     if (character) str += "!@#$%^&*()|?><"
     for (let i = 1; i < lenght; i++) {
       let char = Math.floor(Math.random() * str.length + 1)
       pass += str.charAt(char)
      
     }


     setPassword(pass)

   }, [number,character,lenght,setPassword])

       useEffect(()=> {
    passwordGenerator()
  },[lenght,character,number,passwordGenerator]);

   const passwordreff=useRef(null)

   const passwordrefference=useCallback(() =>{
    window.navigator.clipboard.write(password)
    passwordreff.current?.select()
    passwordreff.current?.setSelectionRange(0,5)
   },[password])

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md  rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-600' >
    <h1 className='text-white text-center pb-1'>Password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
      <input type="text"
        value={password}
       placeholder='passowrd'
       readOnly
       className='outline-none w-full px-1 py-3'
        ref={passwordreff}
      
      />
      <button  onClick={passwordrefference}
      className='outline-none bg-blue-700 text-white shrink-0 py-2 px-2'>Copy</button>
    </div>


    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
      
          value={lenght}
          onChange={(e)=>{setlenght(e.target.value)}}
          className='cursor-pointer'
          max={50}
          min={6}
          
         />
         <label >lenght:{lenght}</label>
         
      </div>


      <div  className='flex items-center gap-x-1'>
       <input type="checkbox"
    
       defaultChecked={number}
       onChange={()=>{
         setNumber((prev)=>!prev); }} />
                    <label htmlFor="input-number">Number</label>
      </div>
      

      <div  className='flex items-center gap-x-1'>
       <input type="checkbox"
    
       defaultChecked={character}
       onChange={()=>{
         setCharacter((prev)=>!prev); }}
         id='input-character'
         
         />
               <label htmlFor="input-character">Character</label>
   
      </div>

    </div>
    
   </div>
     
    </>
  )
}

export default App
