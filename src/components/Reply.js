import React, {useState,useEffect,useCallback } from 'react';
import {useHistory} from 'react-router-dom';
 
const Reply = (props) => {
const [relies, setReplies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const history =useHistory();
  
 const[reply,setReply] = useState({message: '', fromUser: '',tweetId:props.tweetId});
  // handle button click of login form
   const saveForm =e =>{
        e.preventDefault();
        props.handleData(false);
        if(sessionStorage.getItem('user-info')){
           let usr=JSON.parse(sessionStorage.getItem('user-info'));
	       reply.fromUser=usr.name;
           console.log(usr.name  + ''+ JSON.stringify(reply));
        }else{
            alert('Please login first to add reply!')
        }
        console.log('reply home ' +props.showCompFlag);
        // save the reply in api
        fetch('http://localhost:8080/api/v1.0/tweets/replies/add',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reply)
        })
        .then(res=> res.json())
        .then(res=> {
            setReply(res);
            alert('reply created successfully!')
            
        })
        .catch(err=> console.error(err))
       
    }

  return (
      <React.Fragment>
      {
           props.showCompFlag ?
            <section>
            <form onSubmit={saveForm}>
            <div class="div-comp">
            <label className="label">message</label>
            <br></br>
            <textarea rows="10" cols="50" name="message" onChange={e=> setReply({...reply,message: e.target.value})} />
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

export default Reply;