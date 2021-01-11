import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import axios from 'axios';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from "react-router-dom";

export default class subConProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = { user: {}}
        
        // this.onSubmit = this.onSubmit.bind(this);
        // this.onSubmitImage = this.onSubmitImage.bind(this);
        // this.onRemoveImage = this.onRemoveImage.bind(this);
        // this.onSubmitPassword = this.onSubmitPassword.bind(this);
        // this.checkImage = this.checkImage.bind(this)
        // this.removeImageTagF = this.removeImageTagF.bind(this)

    }

    async componentDidMount() {
        let u = firebase.auth().currentUser.uid
        let db = firebase.firestore();
        let collectionset = this.props.match.params.post;
        await db.collection(collectionset).doc(u).get().then(querySnapshot =>{
            this.setState({user:querySnapshot.data()})
            console.log(this.state.user)
            // querySnapshot.docs.map(doc =>{
            //     return doc.data();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        if(this.state.user.post == "Foreman"){
            return(
                <div>
                <h1>Foreman's Page</h1>
                <div className="text-left">
                                <div className="heading">Name:</div> {this.state.user.first_name} {this.state.user.last_name}
                                <br /><br />
                                <div className="heading">EMAIL:</div>  {this.state.user.email}
                                <br /><br />
                                <div className="heading">PHONE:</div>  {this.state.user.phone_number}
                                <br /><br />
                            </div>
                <Link to="/createTicket">
                    <button>Create Ticket</button>
                </Link>
                
                </div>
            )
        }else if(this.state.user.post == "gc_super"){
            return(
                <div>
                <h1>G.C Super's Page</h1>
                <div className="text-left">
                                <div className="heading">Name:</div> {this.state.user.first_name} {this.state.user.last_name}
                                <br /><br />
                                <div className="heading">EMAIL:</div>  {this.state.user.email}
                                <br /><br />
                                <div className="heading">PHONE:</div>  {this.state.user.phone_number}
                                <br /><br />
                            </div>
                </div>
            )
        }else{
            return(
                <div>
                <h1>Unknown Page</h1>
                </div>
            )
        }
        
    }
}