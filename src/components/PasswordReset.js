import React, {useState,useEffect,useCallback } from 'react';

 const PasswordReset = (props) => {
 const[resetInput,setResetInput] = useState({email:'', password:''});
  //handle button click of password reset form
   const saveForm =e =>{
        e.preventDefault();
        props.handleData(false);
        console.log('reset input : '+JSON.stringify(resetInput));
       fetch('http://localhost:8080/api/v1.0/tweets/reset/updatePassword',{
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
           <input type="text" name="password" onChange={e=> setResetInput({...resetInput,password: e.target.value})} />
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