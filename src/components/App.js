import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import Landing from './Landing';
import Navigation from './Navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
// ----------------------------------------------
import userSignupDetails from './userSignupDetails';
import ProfilePage from './ProfilePage';
import createTicket from './createTicket';
import TicketList from './TicketList';
import ViewTicket from './ViewTicket'
import SignaturePad from './Signature'
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
        </div>
        <Route exact path="/"  component={Landing} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/userSignupDetails" component={userSignupDetails} />
        <PrivateRoute exact path="/ProfilePage/:post" component={ProfilePage}/>
        <PrivateRoute exact path="/createTicket" component={createTicket}/>
        <PrivateRoute exact path = '/TicketList' component={TicketList}/>
        <PrivateRoute exact path='/ViewTicket/:id' component={ViewTicket}/>
        <Route path='/SignaturePad' component={SignaturePad}/>

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        
      </Router>
    </AuthProvider>
  );
}

export default App;
