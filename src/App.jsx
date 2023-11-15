import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numallowed,setNumallowed]=useState(false);
  const [charallowed,setCharallowed]=useState(false);
  const [password,setPassword]=useState('');
  const passRef=useRef(null);

  const generatePassword=useCallback(()=>{
    //as soon as page loads we want something to generate password and so as component loads,we want another hook to execute this function. It wont be possible without having refernce(geenratePassword) to execute this method.Therefore saving value into the variable

    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklkmnopqrstuvwxyz";
    
    if(numallowed) str+="0123456789"
    
    if(charallowed) str+="!@#$%^&*()_+"

    for(let i=1;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }

    setPassword(pass);
  },[length,numallowed,charallowed]) //[] is a dependency array. Here it means as long as these don't change too frequently

  useEffect(()=>{
    generatePassword()
  },[length,numallowed,charallowed])//[] is also a dependency array. Here it means that, as soon as something changes,execute the code.

  const copyPasswordToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    passRef.current?.select()
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        readOnly
        placeholder='Password'
        ref={passRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6} 
          max={100} 
          value={length}
          className='cursor-pointer' 
          onChange={(e)=>setLength(e.target.value)}
          name="" 
          id=""/>
          <label htmlFor='length'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numallowed}
          onChange={()=>{
            setNumallowed((prev)=>!prev)
          }}
          name="" 
          id=""
          />
          <label htmlFor='number'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={charallowed}
          onChange={()=>{
            setCharallowed((prev)=>!prev)
          }}
          name="" 
          id=""
          />
          <label htmlFor='charInput'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
