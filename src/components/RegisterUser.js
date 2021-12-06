import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
 
const RegisterUser = (props) =>{
  const history =useHistory();
  const[userInput,setUserInput] = useState({ name: '', email: '',password:''});
  // handle button click of login form
   const saveForm = e =>{
        e.preventDefault();
        console.log(userInput);
        // save the product in api
        fetch('http://localhost:8080/api/v1.0/tweets/register',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        })
        .then(res=> res.json())
        .then(res=> {
            setUserInput(res);
            alert('user created successfully!')
            history.push("/login");
        })
        .catch(err=> console.error(err))
    }

      return (<form onSubmit={saveForm}>
        <div class="div-comp">
        <table>
        <tr>
        <td><label className="label">Name</label></td>
        <td><input type="text" name="name" onChange={e=> setUserInput({...userInput,name: e.target.value})} /></td>
        </tr>
        <tr>
        <td><label className="label">Email</label></td>
        <td><input type="text" name="email" onChange={e=> setUserInput({...userInput,email: e.target.value})}/></td>
         </tr>
        <tr>
        <td><label className="label">Password</label></td>
        <td><input type="password" name="password" onChange={e=> setUserInput({...userInput,password: e.target.value})}/></td>
        </tr>
        <tr>
        <td colSpan="2"><input type="submit" name="submit" value="submit" /></td>
        </tr>
        </table>
        </div>
    </form>);
 
 
}
  
export default RegisterUser;