import { useEffect, useState } from "react";
import { app } from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const id = "42YiXZV8srDTIGhcI8vH";
function App() {
  const [data, setData] = useState({});
  //users is the name of the collection

  const auth = getAuth(app);

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  //signing out the user
  useEffect(()=>{
    onAuthStateChanged(auth,(data)=>{
      if(data)
        console.log("We're logged in ",data);
        else
        console.log("We're logged out");
    })
  },[])

  const userSignOut=async()=>{
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="App-header gap-10 flex justify-center items-center">
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <button onClick={addData}>Log In</button>
      <button onClick={userSignOut}>SignOut</button>
    </div>
  );
}

export default App;

//onAuthStateChanged is a method provided by Firebase Authentication that allows you to set up an observer on the user's authentication state. This observer will be triggered whenever there is a change in the user's sign-in state, such as when the user signs in or signs out.
