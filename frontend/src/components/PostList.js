import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card, Typography, CardContent, TextField, Button } from '@material-ui/core';

function PostList() {
    const [posts, setPosts] = useState([])
    const [bankrefs, setBankrefs] = useState([])
    const [errorMsg, setErrormsg] = useState('')
    const [id, setID] = useState('')
    const [ref1, setRef1] = useState()
    const [ref2, setRef2] = useState()
    const [ref, setRef] = useState({
       id : "",
       ref1 : "",
       ref2 : ""
      });
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
const post_bankref = () => {
    var ref = {
        id : id,
        ref1 : ref1,
        ref2 : ref2
    }
    console.log(ref)
        axios
          .post("http://localhost:5000/bankref", ref)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err);
          });
          window.location.reload();
      };
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
            <form noValidate autoComplete="off">
      <div>
      <TextField required id="standard-required" label="Required" defaultValue="ref id" onChange={(e) => setID(e.target.value)} />
      <TextField required id="standard-required" label="Required" defaultValue="ref1" onChange={(e) => setRef1(e.target.value)}/>
      <TextField required id="standard-required" label="Required" defaultValue="ref2" onChange={(e) => setRef2(e.target.value)}/>
      <Button onClick={post_bankref}> POST </Button>
        </div>
        </form>
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