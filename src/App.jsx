import { useQuery } from '@tanstack/react-query'

const posts = [
  {id:1,title:"titile 1"},
  {id:2,title:"titile 2"},
]


function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(()=> [...posts]),
    // queryFn: () => Promise.reject("Error Message"),
    
  })

  if (postQuery.isLoading)
    return <h1>Loading...</h1>
  
  if (postQuery.isError)
    return <pre>{JSON.stringify(postQuery.error)}</pre>
  return (
    <>
      <h1>TanStack Query</h1>
    </>
  )
}
function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
