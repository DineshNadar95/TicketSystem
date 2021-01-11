import React, { useContext, useState } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';

function SignIn() {
//   onChangePost(e){
//     this.setState({
//         post:e.target.value
//     })
// }
  // const post =""
  const [post, setPost] = useState("Foreman");
  const onChangePost = async (event)=>{
    setPost(event.target.value);
    console.log(post)
  }
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    return <Redirect to={`/ProfilePage/${post}` }/>;
  }
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <br></br>

                        <div>
                            <select defaultValue="Foreman" onChange={onChangePost}>
                                <option value="Foreman">Foreman</option>
                                <option value="gc_super">G.C Super</option>
                            </select>
                        </div>

                        <br></br>
        <button type="submit">Log in</button>

        <button className="forgotPassword" onClick={passwordReset}>
          Forgot Password
        </button>
      </form>

      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;
