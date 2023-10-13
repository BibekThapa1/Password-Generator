import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordCopiedToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "1234567890";
    if (charactersAllowed) str += "!@#$%^&*(){}";
    for (let i = 0; i < length; i++) {
      let randomChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomChar);
    }
    setPassword(pass);
  }, [numberAllowed, length, charactersAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, length, charactersAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full h-screen bg-black py-6 text-white">
        <div className="password-container   bg-slate-600 w-10vw flex justify-center flex-col px-2 py-3 rounded-md">
          <h1 className="text-3xl mt-3 pb-10 text-center">
            Password Generator
          </h1>
          <div className="form flex justify-center">
            <input
              type="text"
              value={password}
              placeholder="password"
              className="input py-1 px-1 rounded-sm text-xl text-black"
              ref={passwordRef}
              readOnly
            />
            <button
              className="rounded bg-blue-500 text-xl px-2"
              onClick={passwordCopiedToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center gap-3 justify-around px-4 pt-4 text-xl">
            <div className="range pl-3 py-3 flex gap-1 items-center">
              <input
                type="range"
                min={6}
                max={30}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className=" flex gap-1 justify-center items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numbersAllowed"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
                className="cursor-pointer justify-self-center text-xl"
              />
              <label className="cursor-pointer" htmlFor="numbersAllowed">
                Numbers
              </label>
            </div>
            <div className="flex gap-1 justify-center items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="charactersAllowed"
                onChange={() => {
                  setCharactersAllowed((prev) => !prev);
                }}
                className="cursor-pointer justify-self-center text-xl"
              />
              <label className="cursor-pointer" htmlFor="charactersAllowed">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
