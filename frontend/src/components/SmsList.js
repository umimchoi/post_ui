import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card, CardHeader, Typography, CardContent, TextField, Button } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function SmsList() {
    return (
        <div className="sms">
            <DeleteSMSButton />
            {/*<SmsForm />*/}
            <SmsContainer/>
        </div>
    );
}

function DeleteSMSButton() {
    const delete_sms = async() => {
        await axios
             .delete("http://localhost:5000/sms")
             .then((res) => {
                 console.log(res)
             })
             .catch((err) => {
                 console.log(err);
             });
         window.location.reload();
     };
    return(
        <Button className="deleteSMS" style={{ color: "white", fontWeight: "bold" }} onClick={delete_sms}> DELETE SMS </Button>
    );
}

function SmsContainer(){
    const [postSMS, setPostSMS] = useState([]);
    const [errorMsg, setErrormsg] = useState('');
    
    useEffect(async() =>{
        await axios.get('http://localhost:5000/sms')
            .then(response => {
                console.log(response)
                setPostSMS(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrormsg('Error retreiving data')
            })
    });

    return(
        <div class="bankref">
            {postSMS.map((sms) => (
                <div class="SmsCard">
                    <SmsCard sms={sms}/>
                </div>
            ))}
        </div>
    );
}



function SmsCard({sms}) {
    return (
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
    )
}
 
function SmsForm(){
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
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
        <Card style={{ width: "300px" }}>
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
    );
}
export default SmsList