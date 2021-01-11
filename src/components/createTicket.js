import React, { useState, Component } from 'react';
import firebase from 'firebase/app'
import { useHistory } from "react-router-dom";




const CreateTicks = () => {
    let history = useHistory();
    const[tname,setTname] = useState("");
    const[twork,setTWork] = useState("");

    const onChangeTicketname = e =>{
        setTname(e.target.value);
    }

    const onChangeTicketWork = e =>{
        setTWork(e.target.value);
    };

    async function onSubmit(e){
        e.preventDefault();
        try{
        const newTicket = {
            ticket_name: tname,
            ticket_work: twork,
            createdby: firebase.auth().currentUser.uid,
            status:'Pending',
            signature:''
            
            
        };
        await firebase.firestore().collection('Ticket').doc().set(newTicket);
        history.push('/home');
    }
        catch (e) {
            alert(e);
        }
    }

    return(
        <div>
                    <br></br>
                    <h2 className="text-center"> ENTER TICKET DETAILS</h2>
                    <hr />
                    <br></br>
                    <form onSubmit={onSubmit} className="container">
                        <div className="form-group row">
                            <label className="col">TICKET NAME </label>
                            <input type="text" required
                                pattern="[A-Za-z]{1,25}"

                                className="form-control col"
                                value={tname}
                                onChange={onChangeTicketname}
                            />
                        </div>

                        <div className="form-group row">
                            <label className="col">WORK</label>
                            <input
                                type="text"
                                required
                                pattern="[A-Za-z]{1,25}"
                                className="form-control col"
                                value={twork}
                                onChange={onChangeTicketWork}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <button id='submitButton' name='submitButton' type='submit' className="btn btn-primary float-right container">
                                 CREATE TICKET
				</button>

                        </div>
                    </form>


                </div>
    )
    
}

export default CreateTicks;