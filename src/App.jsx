import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>TanStack Query [React Query]</h1>
      <h3>Count : {count}</h3>
      <button onClick={()=>setCount(count + 1)}>Increment</button>
    </>
  )
}

export default App
