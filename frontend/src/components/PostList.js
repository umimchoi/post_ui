import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card, Typography, CardContent } from '@material-ui/core';

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
console.log(bankrefs)
    return (
        <div class="bankrefs">
            <div class="sms">
                List of Post 
                {
                    {posts}.length ?
                    {posts}.map(post => <div key={post.id}>{post.id}</div>) :
                    null
                }
                { errorMsg ? <div>{errorMsg}</div> : null}
            </div> <br></br>
            <div class="bankref">
                <p> Bankrefs </p>
                {bankrefs.map((ref) => (
                     <Card>
                     <CardContent>
                         <Typography gutterBottom>
                          id : {ref.id}
                         </Typography>
                         <Typography gutterBottom>
                          ref1 : {ref.ref1}
                         </Typography>
                         <Typography gutterBottom>
                          ref2 : {ref.ref2}
                         </Typography>
                      </CardContent>
                     </Card>
            ))} 
            </div>
        </div>
    )
}

export default PostList