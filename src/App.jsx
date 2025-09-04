import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
        
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) {
      str = str + "0123456789";
    }
    if(charAllowed){
      str = str + "@!#$%&()?/{}[]"
    }
   for(let i = 0; i < length; i++){
    const randomIndex = Math.floor(Math.random() * str.length);
    pass = pass + str[randomIndex];
   }

   setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
       window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])

 

  return (
    <div className="container">
      <h1 className='head'>Password Generator</h1>
      <div className="box">
            <input className='input'
                type="text"
                placeholder='password' 
                value={password} 
                readOnly
                ref={passwordRef}
            />
            <button className='btn'
               onClick={copyPasswordToClipboard}   
               >Copy</button>
        </div>
        <div className="options">
             <div>
              <input className="option"
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
             </div>
             <div>
              <input className="option"
                  type="checkbox" 
                  defaultChecked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                  />
              <label>Include Numbers</label>
             </div>
             <div>
              <input className="option"
                  type="checkbox" 
                  defaultChecked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                  />
               <label>Include Charachter</label>
             </div>
        </div>
    </div>
  )
}

export default App
