import { useState } from "react"
import './app.css'

function App() {
  const [bgColor,setbgColor] = useState("white")

  return (
    <div style={{backgroundColor : bgColor, height: "100vh", padding: "20px"  }}>
      <button onClick={()=>{setbgColor("blue")}}>Blue</button>
      <button onClick={()=>{setbgColor("red")}}>Red</button>
      <button onClick={()=>{setbgColor("green")}}>Green</button>
      <button onClick={()=>{setbgColor("black")}}>Black</button>
      <button onClick={()=>{setbgColor("white")}}>Default</button>
    </div>
  )
}

export default App
