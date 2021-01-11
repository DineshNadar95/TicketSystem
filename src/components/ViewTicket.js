import firebase from 'firebase/app'
import React, { useState, useEffect,useRef } from 'react';
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
// import SignaturePad from './Signature'
import SignaturePad from 'react-signature-canvas'
import "../sigCanvas.css"
// import Popup from 'reactjs-popup';

const ViewTicket = (props) =>{
    const sigCanvas =useRef({});

    const clear = () => sigCanvas.current.clear();

    async function save(){
        await db.collection('Ticket').doc(ticketID).update({'status':'Approved',
            'signature':sigCanvas.current.getTrimmedCanvas().toDataURL()})
        alert('Ticket as been Approved')
        props.history.push('/TicketList');
        // console.log(sigCanvas.current.getTrimmedCanvas().toDataURL('img/png'))
    }
    let statusDet = null
    let u = firebase.auth().currentUser.uid
    let ticketID = props.match.params.id;
    let db = firebase.firestore();
    const[cuser,setCUser] = useState('');
    const[user,setUser] = useState({});
    // async function onApprove(){
    //     await db.collection('Ticket').doc(ticketID).update({'status':'Approved'})
    //     alert('Ticket as been Approved')
        
    //     props.history.push('/TicketList');
    //     // return(
    //     //     <div>
    //     //     <SignaturePad/>
    //     //     </div>
    //     // )
        
    // }

    async function onDecline(){
        await db.collection('Ticket').doc(ticketID).update({'status':'Declined'})
        alert('Ticket as been Declined')
        props.history.push('/TicketList');
    }
    useEffect(()=>{
        async function fetchData(){
            try{
                await db.collection('Users').doc(u).get().then(item=>{
                        setCUser(item.data())
                })
                    
                await db.collection('Ticket').doc(ticketID).get().then(querySnapshot =>{
                        setUser(querySnapshot.data())
            })}catch(e){
                alert(e)
            }
            
        }
        fetchData();
    },[])
    console.log(cuser)
    console.log(user)

    if(cuser.post == "Foreman"){
        return(
            <div>
            <h1>Foreman's Page</h1>
            <div className="text-left">
                <div className="heading">Ticket Name:</div> {user.ticket_name} 
                <br /><br />
                <div className="heading">Work:</div>  {user.ticket_work}
                <br /><br />
                <div className="heading">Status:</div>  {user.status}
                <br /><br />
                
        </div>
                       
            </div>
        )
    }else if(cuser.post == "gc_super"){
        if(user.status=="Pending"){
            statusDet = 
            <div>
            <div className="signature-div">
            <Popup 
                modal 
                trigger={<button>Approve</button>}
                closeOnDocumentClick={false}
                >
                {close => (
                <div>
                    <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                        className:"signatureCanvas"
                }}
                />
                <div className="signatureButton">
                <button onClick={save}>Approve</button>
                <button onClick={clear}>Clear</button>
                <button onClick={close}>Close</button>
                </div>
                </div>
                )}
                
                </Popup>
                </div>
                <button onClick={onDecline}>Decline</button>
            </div>
                        
        }else{
            statusDet=<div></div>
        }
        return(
            <div>
            <h1>G.C Super's Page</h1>
            <div className="text-left">
                <div className="heading">Ticket Name:</div> {user.ticket_name} 
                <br /><br />
                <div className="heading">Work:</div>  {user.ticket_work}
                <br /><br />
                <div className="heading">Status:</div>  {user.status}
                <br /><br />
                <div className="heading">Createdby:</div>  {user.createdby}
                <br /><br />
                {statusDet}
        </div>
            </div>
        )
    }else{
        return(
            <div>
            <h1>Unknown Ticket</h1>
            
            </div>
        )
    }
    


}

export default ViewTicket;