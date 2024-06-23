import { useState,useCallback, useEffect,useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [charAllowed,setcharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  //useRef hook
 const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*"

    for (let i = 1; i <=length; i++){
      let char= Math.floor(Math.random()*str.length + 1)            //generating random 
      pass+=str.charAt(char)
    }

    setPassword(pass)
  },
  [length,numberAllowed,charAllowed,setPassword])

  const copyPassToClip=useCallback(()=>{
    passwordRef.current?.select(); //an outline is hovered over the password so that user knows that it is copied
    
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
  passwordGenerator()              //password generator runs when any of the dependency is changed
},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">

    <h1 className="text-white text-center my-3">Password generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input
         type="text"
          value={password} 
          className="outline-none w-full px-5 py-2.5 text-center me-2 mb-2"
          placeholder="password"
          readOnly
          ref={passwordRef}>
          </input>

          <button
          onClick={copyPassToClip} type="button" class="text-white bg-gradient-to-r
           from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
           focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
            font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>

    <div className='flex items-center gap-x-1'>

      <input type="range"
      min={8}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}/>
      <label className='font-medium'>Length:{length}</label>
    </div>

    <div className='flex items-center gap-x-1'>

        <input type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setnumberAllowed((prev)=>!prev)      //reverses the previous value (true to false)
        }}
         />
         <label >Numbers</label>
    </div>

    <div className='flex items-center gap-x-1'>

         <input type="checkbox"
         defaultChecked={numberAllowed}
         id="numberInput"
         onChange={()=>{
         setcharAllowed((prev)=>!prev)      //reverses the previous value (true to false)
        }}
          />
            <label >Characters</label>
        </div>
      </div>
  </div>
    </>
  )
}

export default App
