import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card, CardHeader, Typography, CardContent, TextField, Button } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
function PostList() {
    const [postSMS, setPostSMS] = useState([])
    const [bankrefs, setBankrefs] = useState([])
    const [errorMsg, setErrormsg] = useState('')
    const [id, setID] = useState('')
    const [ref1, setRef1] = useState('')
    const [ref2, setRef2] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
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
    }, []);

    const post_bankref = () => {
        var ref = {
            id: id,
            ref1: ref1,
            ref2: ref2
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
            phone: phone,
            message: message
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
        <div class="postsystem">
            <div className="sms">
                {/*<Card style={{ width: "300px" }}>
                    <p style={{ color: "rgba(6,147,101,1)", fontWeight: "bold" }}> SMS </p>
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField
                                error={phone.length === 0 ? true : false}
                                required id="standard-required" label="Phone no" onChange={(e) => setPhone(e.target.value)} />
                            <TextField
                                error={message.length === 0 ? true : false}
                                required id="standard-required" label="Message" onChange={(e) => setMessage(e.target.value)} />
                            <br></br>
                            {phone.length !== 0 && message.length !== 0 ? <Button className="buttonPost" onClick={post_sms}> POST </Button> : null}
                        </div>
                    </form>
                    <br></br>
                </Card>
    <br></br> */}
                <div class="bankref">
                    {postSMS.map((sms) => (
                        <div className="cardd">
                            <Card>
                                <CardHeader title="SMS" >  </CardHeader>
                                <CardContent style={{ backgroundColor: 'white' }}>
                                    <div className="text">
                                        <PhoneIphoneIcon style={{ height: "18px" }} />&nbsp;<p style={{ fontWeight: "bold" }}> phone : </p>&nbsp; <p>{sms.phone} </p>
                                    </div>
                                    <hr></hr>
                                    <div className="text message">
                                        <MailOutlineIcon style={{ height: "18px" }} />&nbsp;<p style={{ fontWeight: "bold" }}>message : </p>
                                    </div>
                                    <span>{sms.message}</span>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bank">
               {/* <Card style={{ width: "300px" }}>
                    <p style={{ color: "#f37335", fontWeight: "bold" }}> Bankrefs </p>
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField
                                error={id.length === 0 ? true : false}
                                required id="standard-required" label="ref id" onChange={(e) => setID(e.target.value)} />
                            <TextField
                                error={ref1.length === 0 ? true : false}
                                required id="standard-required" label="ref1" onChange={(e) => setRef1(e.target.value)} />
                            <TextField
                                error={ref2.length === 0 ? true : false}
                                required id="standard-required" label="ref2" onChange={(e) => setRef2(e.target.value)} />
                            <br></br>
                            {id.length !== 0 && ref1.length !== 0 && ref2.length !== 0 ? <Button className="buttonPost" onClick={post_bankref}> POST </Button> : null}
                        </div>
                        <br></br>
                    </form>
                </Card>
                    <br></br> */}
                <div class="bankref">
                    {bankrefs.map((ref) => (
                        <div className="cardd">
                            <Card>
                                <CardHeader title="Bankref" className="headerbank">  </CardHeader>
                                <CardContent style={{ backgroundColor: 'white' }} >
                                    <div className="text">
                                        <PermIdentityIcon style={{ height: "18px" }} />&nbsp; <p style={{ fontWeight: "bold" }}>id : &nbsp;</p> {ref.id}
                                    </div>
                                    <hr></hr>
                                    <div className="text">
                                        <LibraryBooksIcon style={{ height: "18px" }} />&nbsp; <p style={{ fontWeight: "bold" }}>ref1 :&nbsp;</p> {ref.ref1}
                                    </div>
                                    <hr></hr>
                                    <div className="text">
                                        <LibraryBooksIcon style={{ height: "18px" }} />&nbsp; <p style={{ fontWeight: "bold" }}>ref2 : &nbsp;</p>{ref.ref2}
                                    </div>
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