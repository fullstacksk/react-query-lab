import { useQuery, useMutation , useQueryClient} from '@tanstack/react-query'

const posts = [
  {id:1,title:"titile 1"},
  {id:2,title:"titile 2"},
]


function App() {

  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(()=> [...posts]),
    // queryFn: () => Promise.reject("Error Message"),
    
  })

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(()=> posts.push({id:crypto.randomUUID(),title}))
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })

  if (postQuery.isLoading)
    return <h1>Loading...</h1>
  
  if (postQuery.isError)
    return <pre>{JSON.stringify(postQuery.error)}</pre>
  return (
    <div>
      {postQuery.data.map((post, i) => <p key={i}>{post.title}</p>)}
      <button onClick={()=>newPostMutation.mutate("New Post")} disabled={newPostMutation.isLoading}>Add Post</button>
   </div>
  )
}
function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
