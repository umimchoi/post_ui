import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card, Typography, CardContent, TextField, Button } from '@material-ui/core';

function PostList() {
    const [postSMS, setPostSMS] = useState([])
    const [bankrefs, setBankrefs] = useState([])
    const [errorMsg, setErrormsg] = useState('')
    const [id, setID] = useState('')
    const [ref1, setRef1] = useState()
    const [ref2, setRef2] = useState()
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [sms, setsms] = useState({
        phone : "",
        message : ""
       });
    const [ref, setRef] = useState({
       id : "",
       ref1 : "",
       ref2 : ""
      });
    useEffect(() => {
        axios.get('http://localhost:5000/sms') 
        .then(response => {
            console.log(response)
            setPostSMS(response.data)
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

    const post_sms = () => {
        var sms = {
            phone : phone,
            message : message
        }
        console.log(sms)
            axios
            .post("http://localhost:5000/sms", sms)
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
            <div className="sms">
            <p> SMS </p>
            <form noValidate autoComplete="off">
            <div>
                <TextField required id="standard-required" label="Required" defaultValue="phone" onChange={(e) => setPhone(e.target.value)} />
                <TextField required id="standard-required" label="Required" defaultValue="message" onChange={(e) => setMessage(e.target.value)}/>
                <br></br>
                <Button className="buttonPost" onClick={post_sms}> POST </Button>
            </div>
            </form>
            <br></br>
                <div class="bankref">
                        {postSMS.map((sms) => (
                            <div>
                            <Card>
                                <CardContent style={{backgroundColor:'#f3f0d7'}}>
                                    <Typography gutterBottom>
                                    phone : {sms.phone}
                                    </Typography>
                                    <Typography gutterBottom>
                                    message : {sms.message}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <br></br>
                            </div>
                            ))} 
                </div>
            </div>
            <div className="bank">
            <p> Bankrefs </p>
            <form noValidate autoComplete="off">
            <div>
                <TextField required id="standard-required" label="Required" defaultValue="ref id" onChange={(e) => setID(e.target.value)} />
                <TextField required id="standard-required" label="Required" defaultValue="ref1" onChange={(e) => setRef1(e.target.value)}/>
                <TextField required id="standard-required" label="Required" defaultValue="ref2" onChange={(e) => setRef2(e.target.value)}/>
                <br></br>
                <Button className="buttonPost" onClick={post_bankref}> POST </Button>
            </div>
            <br></br>
            </form>
                <div class="bankref">
                        {bankrefs.map((ref) => (
                            <div>
                            <Card>
                                <CardContent style={{backgroundColor:'#f3f0d7'}} >
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
                            <br></br>
                            </div>
                            ))} 
                            
                </div>
            </div>
        </div>
    )
}

export default PostList