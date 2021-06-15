import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card, CardHeader, Typography, CardContent, TextField, Button } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

function BankList() {
    return (
        <div className="bank">
            <DeleteBankButton />
            {/*<BankForm />*/}
            <BankContainer/>
        </div>
    );
}

function DeleteBankButton() {
    const delete_bank = async() => {
        await axios
             .delete("http://localhost:5000/bankref")
             .then((res) => {
                 console.log(res)
             })
             .catch((err) => {
                 console.log(err);
             });
         window.location.reload();
     };
    return(
        <Button className="deleteBank" style={{ color: "white", fontWeight: "bold" }} onClick={delete_bank}> DELETE BankRef </Button>
    );
}

function BankContainer(){
    const [bankrefs, setBankrefs] = useState([]);
    const [errorMsg, setErrormsg] = useState('');
    
    useEffect( async() =>{
        await axios
            .get(`http://localhost:5000/bankref`)
            .then((res) => {
              //  console.log(res)
                setBankrefs(res.data)
            })
            .catch((err) => {
                console.log(err)
                setErrormsg('Error retreiving data')
            });
        });

    return(
        <div class="bankref">
            { bankrefs.map((ref) => (
                <div class="SmsCard">
                    <BankCard Ref={ref}/>
                </div>
            ))}
        </div>
    );
}



function BankCard({Ref}) {
console.log(Ref)
    return (
        <div className="cardd">
            <Card>
                <CardHeader title="Bankref" className="headerbank">  </CardHeader>
                <CardContent style={{ backgroundColor: 'white' }} >
                    <div className="text">
                        <PermIdentityIcon style={{ height: "18px" }} />&nbsp; <p style={{ fontWeight: "bold" }}>id : &nbsp;</p> {Ref.id}
                    </div>
                    <hr></hr>
                    <div className="text">
                        <LibraryBooksIcon style={{ height: "18px" }} />&nbsp; <p style={{ fontWeight: "bold" }}>ref1 :&nbsp;</p> {Ref.ref1}
                    </div>
                    <hr></hr>
                    <div className="text">
                        <LibraryBooksIcon style={{ height: "18px" }} />&nbsp; <p style={{ fontWeight: "bold" }}>ref2 : &nbsp;</p>{Ref.ref2}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
 
function BankForm(){
    const [id, setID] = useState('')
    const [ref1, setRef1] = useState('')
    const [ref2, setRef2] = useState('')
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
    return (
        <Card style={{ width: "300px" }}>
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
    );
}
export default BankList