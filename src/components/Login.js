import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import PasswordReset from './PasswordReset';
import config from "../config";

const Login = (props) =>{
const history =useHistory();
const[userInput,setUserInput] = useState({ loginId: '', password: ''});
const[showResetFlag,setShowResetFlag] = useState(false);

const handleDataFromResetPwd=(data)=>{
     setShowResetFlag(data);
 }

 const onResetClick =()=>{
     console.log('reset click');
     setShowResetFlag(true);
  }

  // handle button click of login form
   const saveForm = e =>{
        e.preventDefault();
        console.log(userInput);
        // save the product in api
        fetch(config.baseUrl.concat('/login'),{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        })
        .then(res=> res.json())
        .then(res=> {
            setUserInput(res);
            console.log('login res'+ JSON.stringify(res));
            sessionStorage.setItem("user-info", JSON.stringify(res));
            alert("logged in successfully");
            history.push("/addtweet");
        })
        .catch(err=> console.error(err))
    }

useEffect(()=>{
if(sessionStorage.getItem('user-info')){
    alert("already logged in...forwading to tweets");
	history.push("/addtweet");
}

},[]);

      {
        if(sessionStorage.getItem('user-info')){
         return   <div>
            <h2>Already Logged In</h2>
           </div>
        }else{
        return <div class="div-comp">
        <form onSubmit={saveForm}>
        <label className="label">Login ID</label>
        <input type="text" name="loginId" onChange={e=> setUserInput({...userInput,loginId: e.target.value})} />
        <label className="label">Password</label>
        <input type="password" name="password" onChange={e=> setUserInput({...userInput,password: e.target.value})}/>
        <input type="submit" name="submit" value="submit" />
        </form>
       <button onClick={onResetClick}>Reset Password</button>
        {
           showResetFlag ?
           <PasswordReset showResetFlag={showResetFlag} handleData={handleDataFromResetPwd}/> :''
         }
        </div>
    }}

}

export default Login;