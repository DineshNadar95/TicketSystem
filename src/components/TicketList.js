import firebase from 'firebase/app'
import React, { useState, useEffect,useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
// import SignaturePad from './Signature'
import SignaturePad from 'react-signature-canvas'
import "../sigCanvas.css"


const TicketList = () =>{
    const sigCanvas =useRef({});
    let table =null;
    let userid = firebase.auth().currentUser.uid;
    const[tickets,setTickets] = useState([]);
    const tiks = []
    
    useEffect(()=>{
        async function fetchData(){
            try{
                
                await firebase.firestore().collection('Ticket').get().then(snapshot=>{
                snapshot.forEach((ele)=>{
                    // console.log(ele.data())
                    tiks.push(ele)
                    // setTickets(tickets => [...tickets,ele.data()])
                        // setTickets(...tickets,ele.data())
                    })
                    setTickets(tiks)
            })}catch(e){
                alert(e)
            }
            
        }
        fetchData();
    },[])
    
    // setTickets(tiks)
    // console.log(tickets[0].data())
    const onView = (e) =>{
        console.log(e)
        // SignaturePad.current.fromDataURL(e)
      }
    if(tickets.length >0){
        table=
            <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th className="text-center">Ticket Name</th>
                    <th className="text-center">Work</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Created by</th>
                    <th className="text-center">Signature</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(tick => (
                    <tr key={tick.data().ticket_name}>
                    <Link to={`/ViewTicket/${tick.id}`}>
                        <td className="text-center">{tick.data().ticket_name}</td>
                    </Link>
                        <td className="text-center">{tick.data().ticket_work}</td>
                        <td className="text-center">{tick.data().status}</td>
                        <td className="text-center">{tick.data().createdby}</td>
                        <td className="text-center">
                        <Popup 
                            modal 
                            trigger={<button onClick={()=>this.onView(tick.data().signature)}>View</button>}
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
                            <button onClick={close}>Close</button>
                            </div>
                            </div>
                            )}
                
                </Popup>
                        </td>
                    </tr >
                ))
                }
            </tbody>
            
            </table>
        return(
            <div>
                {table}
            </div>
        )
    }else{
        return(
            <div>
            <h1>No Tickets created yet!</h1>
            </div>
        )
    }
    
}

export default TicketList;