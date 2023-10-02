import React, { useState } from 'react'
import Add from '../Utils/img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';





function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      // Create User With Firebase 
      // This will function will create user and then stored in res as a object
      const res = await createUserWithEmailAndPassword(auth, email, password)
      //This will be used to store the image 
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setErr(true);
        },  
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "user", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db,"userChats",res.user.uid), { })
            navigate("/")
          });
        }
      );
    } catch (err) {
      console.log(err)
      setErr(true);
    }
  };

  // Design
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Display name" />
          <input required type="email" placeholder="E-mail" />
          <input required type="password" placeholder="Password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button >Sign up</button>
        </form>
        {err && <span>Something went wrong !! Try Again</span>}
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register