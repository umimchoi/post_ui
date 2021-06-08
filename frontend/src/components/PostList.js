import React, { useState, useEffect } from "react";
import axios from 'axios'

function PostList() {
    const [posts, setPosts] = useState([])
    const [bankrefs, setBankrefs] = useState([])
    const [errorMsg, setErrormsg] = useState('')

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts1') 
        .then(response => {
            console.log(response)
            setPosts(response.data)
        })
        .catch(error => {
            console.log(error)
            setErrormsg('Error retreiving data')
        })
 
         axios
       .get(`http://localhost:5000/bankref`)
       .then((res) => {
           console.log(res)
           setBankrefs(res.data)
       })
       .catch((err) => {
         console.log(err)
       });
      },[]);

    return (
        <div>
                List of Post 
                {
                    {posts}.length ?
                    {posts}.map(post => <div key={post.id}>{post.id}</div>) :
                    null
                }
                { errorMsg ? <div>{errorMsg}</div> : null}
        </div>
    )
}

export default PostList