import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
 
const RegisterUser = (props) =>{
  const history =useHistory();
  const[userInput,setUserInput] = useState({firstName: '',lastName:'', loginId:'', email: '',password:'',confirmPassword:''});
  // handle button click of login form
   const saveForm = e =>{
        e.preventDefault();
        console.log('input...'+userInput);

        if (userInput.password !== userInput.confirmPassword) {
        alert("Passwords don't match");
         }else{
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
    }

      return (<form onSubmit={saveForm}>
        <div class="div-comp">
        <table>
        <tr>
        <td><label className="label">First Name</label></td>
        <td><input type="text" name="firstName" onChange={e=> setUserInput({...userInput,firstName: e.target.value})} /></td>
        </tr>
        <tr>
        <td><label className="label">Last Name</label></td>
        <td><input type="text" name="lastName" onChange={e=> setUserInput({...userInput,lastName: e.target.value})} /></td>
        </tr>
        <tr>
        <td><label className="label">Login Id</label></td>
        <td><input type="text" name="loginId" onChange={e=> setUserInput({...userInput,loginId: e.target.value})} /></td>
        </tr>
        <tr>
        <td><label className="label">Email</label></td>
        <td><input type="text" name="email" onChange={e=> setUserInput({...userInput,email: e.target.value})}/></td>
         </tr>
         <tr>
        <td><label className="label">Contact Number</label></td>
        <td><input type="text" name="contactnumber" onChange={e=> setUserInput({...userInput,contactnumber: e.target.value})}/></td>
         </tr>
        <tr>
        <td><label className="label">Password</label></td>
        <td><input type="password" name="password" onChange={e=> setUserInput({...userInput,password: e.target.value})}/></td>
        </tr>
        <tr>
        <td><label className="label">Confirm Password</label></td>
        <td><input type="password" name="confirmPassword" onChange={e=> setUserInput({...userInput,confirmPassword: e.target.value})}/></td>
        </tr>
        <tr>
        <td colSpan="2"><input type="submit" name="submit" value="submit" /></td>
        </tr>
        </table>
        </div>
    </form>);
}
  
export default RegisterUser;