import React, { useContext, useState } from 'react'
import { collection, query, where,getDocs, setDoc, updateDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from '../Context/AuthContext'

function Search() {

  const [userName, setuserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const{currentUser}=useContext(AuthContext);

  function handleKey(e) {
    e.code === "Enter" && handleSearch();
  }

  async function handleSearch() {
    const q = query(
      collection(db, "user"), 
      where("displayName", "==", userName)
      );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        console.log(doc.data());
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  }
  // TO select the friends conversation after searching 
  async function handleSelect(){
    // here we will check if the chats between the user exsists or not,if not then we will create a new chat among them 
    const combinedId = currentUser.uid>user.uid? 
    currentUser.uid+user.uid 
    : user.uid+currentUser.uid
    try{
      const res=await getDoc(doc(db,"chats",combinedId));
      console.log(res)
      if(!res.exists()){  // if res not exists in chats collection then we will create
        await setDoc(doc(db,"chats",combinedId),{messages:[]})

        // create userChat
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

      }
    } catch(err){
       
    }
    // create the chagt

    setUser(null);
    setuserName("");
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={e => setuserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.DisplayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search