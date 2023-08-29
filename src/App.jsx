import { useQuery, useMutation } from '@tanstack/react-query'

const posts = [
  {id:1,title:"titile 1"},
  {id:2,title:"titile 2"},
]


function App() {

  console.log(posts)
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(()=> [...posts]),
    // queryFn: () => Promise.reject("Error Message"),
    
  })

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(()=> posts.push({id:crypto.randomUUID(),title}))
    }
  })

  if (postQuery.isLoading)
    return <h1>Loading...</h1>
  
  if (postQuery.isError)
    return <pre>{JSON.stringify(postQuery.error)}</pre>
  return (
    <div>
      {postQuery.data.map((post, i) => <p key={i}>{post.title}</p>)}
      <button onClick={()=>newPostMutation.mutate("New Post")}>Add Post</button>
   </div>
  )
}
function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
