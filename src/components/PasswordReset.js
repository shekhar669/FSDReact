import React, {useState,useEffect,useCallback } from 'react';
import config from "../config";

 const PasswordReset = (props) => {
 const[resetInput,setResetInput] = useState({email:'', password:'',confirmPassword:''});
  //handle button click of password reset form
   const saveForm =e =>{
        e.preventDefault();
        props.handleData(false);
        console.log('reset input : '+JSON.stringify(resetInput));
       
        if (resetInput.password !== resetInput.confirmPassword) {
        alert("Passwords don't match");
         }else {
            fetch(config.baseUrl.concat('/reset/updatePassword'),{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resetInput)
        })
        .then(res=> res.json())
        .then(res=> {
            alert(JSON.stringify(res));
            
        })
        .catch(err=> console.log(err))
        }
       
    }

  return (
      <React.Fragment>
      {
           props.showResetFlag ?
            <section>
            <form onSubmit={saveForm}>
            <div class="div-comp">
             <label className="label">email</label>
            <br></br>
            <input type="text" name="email" onChange={e=> setResetInput({...resetInput,email: e.target.value})} />
            <br></br>
            <label className="label">new password</label>
            <br></br>
           <input type="password" name="password" onChange={e=> setResetInput({...resetInput,password: e.target.value})} />
            <br></br>
            <label className="label">confirm password</label>
            <br></br>
            <input type="password" name="confirmPassword" onChange={e=> setResetInput({...resetInput,confirmPassword: e.target.value})} />
            <br></br> 
            <input type="submit" name="submit" value="submit" />
            </div>
            </form>
            </section>
        :''
        }
       </React.Fragment>
  );
};

export default PasswordReset;