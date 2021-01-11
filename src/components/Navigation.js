import React, { useContext,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import firebase from 'firebase/app'
import '../App.css';

 const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  // const [userdata,setuserData] = useState('');
  // await firebase.firestore.collection()
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/home" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to={`/TicketList`} activeClassName="active">
            Tickets
          </NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signup" activeClassName="active">
            Sign-up
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/signin" activeClassName="active">
            Sign-In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
