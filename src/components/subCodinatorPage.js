import React, { Component } from 'react';
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
        await db.collection('Pr_accountant').doc(u).get().then(querySnapshot =>{
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
                </div>
            )
        }else if(this.state.user.post == "Pr_accountant"){
            return(
                <div>
                <h1>Accountant's Page</h1>
                </div>
            )
        }else if(this.state.user.post == "sub_contractor"){
            return(
                <div>
                <h1>Sub Contractor Page</h1>
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